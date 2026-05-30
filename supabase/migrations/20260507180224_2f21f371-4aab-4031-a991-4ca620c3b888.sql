
CREATE TABLE public.advertising_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_key text NOT NULL UNIQUE,
  name text NOT NULL,
  price_amount text NOT NULL DEFAULT '',
  price_period text NOT NULL DEFAULT '/year',
  badge_text text,
  icon_key text NOT NULL DEFAULT 'award',
  accent text NOT NULL DEFAULT 'primary',
  benefits jsonb NOT NULL DEFAULT '[]'::jsonb,
  cta_label text NOT NULL DEFAULT 'Get Started',
  cta_url text NOT NULL DEFAULT 'mailto:WECAoutreach@gmail.com',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.advertising_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active tiers" ON public.advertising_tiers
  FOR SELECT USING (is_active = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert tiers" ON public.advertising_tiers
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update tiers" ON public.advertising_tiers
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete tiers" ON public.advertising_tiers
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER set_advertising_tiers_updated_at
  BEFORE UPDATE ON public.advertising_tiers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.advertising_tiers (tier_key, name, price_amount, price_period, badge_text, icon_key, accent, benefits, cta_label, cta_url, display_order)
VALUES
  ('platinum', 'Platinum', '$650', '/year', 'Best Value', 'crown', 'primary',
   '["Website top of page banner ad","Newsletter & updates top banner ad","1 Side bar ad in each newsletter (Typically 7-8/year). No advertising in update emails.","Meet a local business owner 5 min presentation in 2 General meetings"]'::jsonb,
   'Get Started', 'mailto:WECAoutreach@gmail.com', 1),
  ('gold', 'Gold', '$550', '/year', NULL, 'medal', 'amber',
   '["Website footer of page banner ad","Newsletter & updates footer banner ad","1 Side bar ad in each newsletter (Typically 7-8/year). No advertising in update emails.","Meet a local business owner 5 min presentation in one monthly meeting"]'::jsonb,
   'Get Started', 'mailto:WECAoutreach@gmail.com', 2),
  ('silver', 'Silver', '$350', '/year', NULL, 'award', 'slate',
   '["1 Side bar ad in each newsletter (Typically 7-8/year). No advertising in update emails."]'::jsonb,
   'Get Started', 'mailto:WECAoutreach@gmail.com', 3);

INSERT INTO public.page_content (page_slug, section_key, content_type, content, label, display_order)
VALUES
  ('support-advertise', 'hero_title', 'text', 'Advertise with WECA', 'Hero Title', 1),
  ('support-advertise', 'hero_subtitle', 'text', 'Reach our engaged community of West End residents through our newsletter and website', 'Hero Subtitle', 2),
  ('support-advertise', 'why_title', 'text', 'Why Advertise with WECA?', 'Why Advertise Title', 3),
  ('support-advertise', 'why_description', 'text', 'Connect with a highly engaged local audience', 'Why Advertise Description', 4),
  ('support-advertise', 'why_benefits', 'json',
   '[{"icon":"users","title":"Active Community","body":"Over 1,000 engaged residents regularly read our newsletter"},{"icon":"trending-up","title":"High Visibility","body":"Multiple advertising placements across our website"},{"icon":"megaphone","title":"Local Reach","body":"Direct connection to West End neighborhood residents"}]',
   'Why Advertise Benefits', 5),
  ('support-advertise', 'contact_title', 'text', 'Contact Us', 'Contact Title', 6),
  ('support-advertise', 'contact_description', 'text', 'Ready to advertise with WECA? Get in touch to discuss your advertising needs', 'Contact Description', 7),
  ('support-advertise', 'contact_email', 'text', 'WECAoutreach@gmail.com', 'Contact Email', 8),
  ('support-advertise', 'contact_response_time', 'text', 'We typically respond within 2 business days', 'Contact Response Time', 9);
