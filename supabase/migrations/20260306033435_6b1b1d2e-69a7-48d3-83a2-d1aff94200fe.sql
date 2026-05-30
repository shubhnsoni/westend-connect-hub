ALTER TABLE public.meetings ADD COLUMN IF NOT EXISTS zoom_link text;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS zoom_link text;