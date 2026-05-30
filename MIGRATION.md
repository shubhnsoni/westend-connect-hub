# WECA Site Migration Guide

Step-by-step procedure for migrating this site to a new hosting environment (DreamHost frontend + a new Supabase backend). Follow phases in order. **Do not flip DNS until §6 smoke tests pass.**

---

## 0. Inventory

**Frontend:** React 18 + Vite static SPA. Builds to `dist/`. Host can be any static web host (DreamHost, Netlify, Cloudflare Pages, S3+CloudFront, etc.). DreamHost does **not** run Node at runtime — it only serves the prebuilt `dist/`.

**Backend (Supabase):**
- 20+ public-schema tables with RLS
- 5 public storage buckets: `blog-images`, `resources`, `event-images`, `media-library`, `meeting-documents`
- 9 edge functions: `setup-admin`, `reset-admin-password`, `send-notification-email`, `mailchimp-sync`, `parse-event-datetime`, `admin-ai-assistant`, `generate-sitemap`, `translate`, `banner-manager`
- DB functions: `update_updated_at_column`, `handle_new_user`, `has_role`
- `app_role` enum, `user_roles` table for admin auth

---

## 1. Export source from Lovable

This migration can start from either a GitHub-connected Lovable project or a downloaded ZIP. The ZIP route is the lowest-involvement path when GitHub has not been connected yet.

### Option A: Download ZIP from Lovable

1. In Lovable, use the project download/export button and save the ZIP.
2. Extract it locally:

```bash
unzip weca-project.zip -d weca-project
cd weca-project
```

3. Create a permanent git history before making post-migration edits:

```bash
git init
git add .
git commit -m "WECA export from Lovable"
```

4. Push it to GitHub/GitLab/Bitbucket when a repository is available:

```bash
git remote add origin <repo-url>
git branch -M main
git push -u origin main
```

### Option B: Push directly from Lovable to GitHub

If Lovable GitHub integration is already connected, push the current project to a repository you control and clone it locally:

```bash
git clone <repo-url> weca-project
cd weca-project
```

### Source verification

Before touching the backend, verify the source package:

```bash
npm ci
npm run build
```

Expected result: `dist/` is created successfully.

---

## 2. Provision the new Supabase project

1. Create a new project on supabase.com (free tier is fine for this site).
2. Note the new `Project URL`, `anon key`, `service_role key`, and `Project Ref`.
3. Install the Supabase CLI locally and `supabase login`.

---

## 3. Database migration

Run from a machine that can reach both old and new databases.

```bash
export OLD_DB_URL="postgres://postgres:[PASSWORD]@db.OLD_REF.supabase.co:5432/postgres"
export NEW_DB_URL="postgres://postgres:[PASSWORD]@db.NEW_REF.supabase.co:5432/postgres"

# 1. Schema (tables, types, functions, triggers, RLS policies, GRANTs)
pg_dump "$OLD_DB_URL" \
  --schema-only --no-owner --no-acl \
  --schema=public \
  -f weca-schema.sql

# 2. Data (rows only)
pg_dump "$OLD_DB_URL" \
  --data-only --no-owner --no-acl \
  --schema=public \
  --disable-triggers \
  -f weca-data.sql

# 3. Restore in order
psql "$NEW_DB_URL" -f weca-schema.sql
psql "$NEW_DB_URL" -f weca-data.sql
```

This intentionally excludes the `auth`, `storage`, `supabase_functions`, `realtime`, and `vault` schemas — the new project manages those itself.

**Verify:**
```sql
-- Row counts must match the old project
SELECT 'blog_posts' AS t, count(*) FROM blog_posts
UNION ALL SELECT 'events', count(*) FROM events
UNION ALL SELECT 'resources', count(*) FROM resources
UNION ALL SELECT 'meetings', count(*) FROM meetings
UNION ALL SELECT 'leadership', count(*) FROM leadership;
```

---

## 4. Auth / user migration

Supabase password hashes **cannot be transferred** across projects. Admins must reset their passwords after cutover.

### 4.1 Export users from old project

```bash
curl -H "Authorization: Bearer $OLD_SERVICE_ROLE_KEY" \
     -H "apikey: $OLD_SERVICE_ROLE_KEY" \
     "$OLD_SUPABASE_URL/auth/v1/admin/users?per_page=1000" > users.json
```

### 4.2 Re-create each admin user in the new project

For each admin email (only admins really need migrating; non-admin accounts can re-register):

```bash
curl -X POST \
  -H "Authorization: Bearer $NEW_SERVICE_ROLE_KEY" \
  -H "apikey: $NEW_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.org","email_confirm":true,"password":"TEMP_RANDOM_LONG_PW"}' \
  "$NEW_SUPABASE_URL/auth/v1/admin/users"
```

### 4.3 Assign admin role

For each newly created admin user, in the new project:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('NEW_USER_UUID_FROM_STEP_3_2', 'admin');
```

### 4.4 Verify

```sql
SELECT u.email, r.role
FROM auth.users u
JOIN public.user_roles r ON r.user_id = u.id;
```

Every admin must appear with role `admin`. Then trigger password reset for each via the `reset-admin-password` edge function or have them use the "forgot password" flow.

---

## 5. Storage migration

For each of the 5 buckets:

```bash
BUCKETS=("blog-images" "resources" "event-images" "media-library" "meeting-documents")

for B in "${BUCKETS[@]}"; do
  # 1. Download from old project
  supabase storage cp -r --experimental \
    "ss:///$B" "./$B" \
    --project-ref OLD_REF

  # 2. Create bucket on new project (mark Public in dashboard, or via SQL below)
  # 3. Upload to new project
  supabase storage cp -r --experimental \
    "./$B" "ss:///$B" \
    --project-ref NEW_REF
done
```

Make every bucket **public** (matches current setup) and add a public-read policy:

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images','blog-images',true)
ON CONFLICT (id) DO UPDATE SET public = true;
-- repeat for the other 4 buckets

CREATE POLICY "Public read"
ON storage.objects FOR SELECT
USING (bucket_id IN ('blog-images','resources','event-images','media-library','meeting-documents'));
```

### 5.1 Rewrite stored URLs

Tables store full storage URLs that point at the **old** project (`OLD_REF.supabase.co/storage/v1/object/public/...`). Rewrite them to the new project:

```sql
DO $$
DECLARE
  old_host TEXT := 'OLD_REF.supabase.co';
  new_host TEXT := 'NEW_REF.supabase.co';
BEGIN
  UPDATE blog_posts    SET content      = REPLACE(content,      old_host, new_host) WHERE content      LIKE '%' || old_host || '%';
  UPDATE blog_posts    SET cover_image  = REPLACE(cover_image,  old_host, new_host) WHERE cover_image  LIKE '%' || old_host || '%';
  UPDATE events        SET image_url    = REPLACE(image_url,    old_host, new_host) WHERE image_url    LIKE '%' || old_host || '%';
  UPDATE events        SET description  = REPLACE(description,  old_host, new_host) WHERE description  LIKE '%' || old_host || '%';
  UPDATE resources     SET file_url     = REPLACE(file_url,     old_host, new_host) WHERE file_url     LIKE '%' || old_host || '%';
  UPDATE meetings      SET document_url = REPLACE(document_url, old_host, new_host) WHERE document_url LIKE '%' || old_host || '%';
  UPDATE media_library SET file_url     = REPLACE(file_url,     old_host, new_host) WHERE file_url     LIKE '%' || old_host || '%';
  UPDATE leadership    SET image_url    = REPLACE(image_url,    old_host, new_host) WHERE image_url    LIKE '%' || old_host || '%';
  UPDATE ads           SET image_url    = REPLACE(image_url,    old_host, new_host) WHERE image_url    LIKE '%' || old_host || '%';
END $$;
```

(Adjust column names if the schema dump revealed different ones.)

### 5.2 Validation checklist

- [ ] All 5 buckets exist and are **Public** on the new project
- [ ] File counts match: `SELECT bucket_id, count(*) FROM storage.objects GROUP BY 1;`
- [ ] 10 random file public URLs open with 200 OK and correct `Content-Type`
- [ ] No DB row still references the old project host (`SELECT count(*) FROM blog_posts WHERE cover_image LIKE '%OLD_REF%';` → 0)
- [ ] Admin upload test in each manager succeeds and new URLs use the new host

---

## 6. Edge functions + secrets

### 6.1 Deploy all 9 functions

```bash
cd supabase/functions
for FN in setup-admin reset-admin-password send-notification-email mailchimp-sync \
          parse-event-datetime admin-ai-assistant generate-sitemap translate banner-manager; do
  supabase functions deploy "$FN" --project-ref NEW_REF
done
```

Function-level config in `supabase/config.toml` (`verify_jwt = false`) is honored on deploy.

### 6.2 Set secrets on the new project

```bash
supabase secrets set --project-ref NEW_REF \
  OPENAI_API_KEY=sk-...                    `# or GEMINI_API_KEY=...` \
  MAILCHIMP_API_KEY=... \
  MAILCHIMP_AUDIENCE_ID=... \
  GMAIL_USER=... \
  GMAIL_APP_PASSWORD=...
```

The 3 AI functions (`translate`, `parse-event-datetime`, `admin-ai-assistant`) auto-detect provider in this order:
`OPENAI_API_KEY` → `GEMINI_API_KEY` → `LOVABLE_API_KEY`. Setting just **one** of them is enough.

### 6.3 Auth configuration

In the new Supabase project dashboard → Authentication → URL Configuration:

- **Site URL:** `https://westendrockvillemd.org`
- **Redirect URLs:** `https://westendrockvillemd.org/**`, `https://www.westendrockvillemd.org/**`
- Customize email templates (confirm, magic link, password recovery) with WECA branding
- Enable HIBP password check (Auth → Providers → Email)

---

## 7. Build + deploy frontend

### 7.1 Update `.env`

```
VITE_SUPABASE_URL=https://NEW_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<new anon key>
VITE_SUPABASE_PROJECT_ID=NEW_REF
```

### 7.2 Regenerate types

```bash
supabase gen types typescript --project-id NEW_REF > src/integrations/supabase/types.ts
```

### 7.3 Build

```bash
npm ci
npm run build       # outputs dist/
cp deploy/dreamhost.htaccess dist/.htaccess
```

Or use the bundled helper:

```bash
./scripts/build-dreamhost.sh
```

### 7.4 Upload to DreamHost

```bash
rsync -avz --delete dist/ user@server:/home/user/westendrockvillemd.org/
```

### 7.5 `.htaccess` (SPA routing)

Place in the web root:

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache assets
<FilesMatch "\.(js|css|woff2|png|jpg|jpeg|gif|svg|avif|webp|ico)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
```

Enable Let's Encrypt HTTPS in the DreamHost panel.

---

## 8. Smoke tests (run BEFORE flipping DNS)

Test against DreamHost via `/etc/hosts` override:

```
<DreamHost IP>  westendrockvillemd.org  www.westendrockvillemd.org
```

- [ ] Home loads, language switcher works (EN/ES/ZH)
- [ ] Blog list + post detail
- [ ] Events page, event detail, ICS download
- [ ] Resources, Media library, Meetings (PDF viewer)
- [ ] Newsletter signup → DB row + Mailchimp record
- [ ] Contact / Report Issue / Feedback / Volunteer / Membership forms
- [ ] Community Poll vote persists
- [ ] Admin login (with reset password)
- [ ] Admin: create blog post → AI assistant → SEO analyzer → publish → appears publicly
- [ ] Admin: upload image in each manager → URL works
- [ ] Admin: send test notification email → arrives via Gmail SMTP
- [ ] Admin: trigger Mailchimp sync → succeeds
- [ ] `/sitemap.xml` returns 200
- [ ] Deep link (e.g. `/blog/some-slug`) loads SPA, not 404

If anything fails, fix on the new backend **before** flipping DNS.

---

## 9. DNS cutover

**T-48h:** lower DNS TTL on `westendrockvillemd.org` to 300 s.

**T-0:** repoint A/CNAME records to DreamHost. Remove the `/etc/hosts` override and verify against the public domain.

**T+24h:** if stable, remove the custom domain from the old host. After ~1 week, raise TTL back to 3600 s and cancel the old hosting subscription.

---

## 10. Rollback

If anything breaks within the first 24 h:

1. Revert DNS records to the previous host's IP (TTL is 300 s, so propagation is fast).
2. The old backend was never touched — the public site returns immediately.
3. Diagnose the new environment off-line.
