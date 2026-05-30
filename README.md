# West End Civic Association (WECA) Website

Official website for the West End Civic Association in Rockville, MD — a volunteer, resident-led organization serving 5,000+ residents of the historic West End neighborhood.

Live site: https://westendrockvillemd.org

## Stack

- **Frontend:** React 18 + Vite 5 + TypeScript, Tailwind CSS, shadcn/ui, React Router
- **Backend:** Supabase (Postgres, Auth, Storage, Edge Functions)
- **Email:** Gmail SMTP for transactional, Mailchimp for newsletter
- **AI features (translation, admin assistant, event parsing):** OpenAI / Gemini via edge functions, with fallback to alternate providers

## Local development

```bash
npm install
npm run dev          # http://localhost:8080
```

Required `.env`:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
```

## Build & deploy

```bash
npm run build        # outputs to dist/
```

Upload `dist/` to the web host (DreamHost / any static host). For SPA routing, an `.htaccess` (Apache) or equivalent rewrite must send all non-file requests to `/index.html`.

## Edge functions

Located in `supabase/functions/`. Deploy with the Supabase CLI:

```bash
supabase functions deploy <function-name>
```

Required secrets on the Supabase project:

- `OPENAI_API_KEY` *or* `GEMINI_API_KEY` (for AI features)
- `MAILCHIMP_API_KEY`, `MAILCHIMP_AUDIENCE_ID`
- `GMAIL_USER`, `GMAIL_APP_PASSWORD`

## Admin

Admin CMS lives at `/admin`. Users must exist in `auth.users` and have a row in `public.user_roles` with role `admin`.

## Migration / hosting move

See [`MIGRATION.md`](./MIGRATION.md) for the full step-by-step procedure for moving the site to a different host or Supabase project.
