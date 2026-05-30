
-- Create newsletters table for editable newsletter content
CREATE TABLE public.newsletters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  featured_image_url TEXT,
  layout_style TEXT NOT NULL DEFAULT 'classic',
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  author_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;

-- Anyone can view published newsletters
CREATE POLICY "Anyone can view published newsletters"
  ON public.newsletters FOR SELECT
  USING (status = 'published' OR has_role(auth.uid(), 'admin'::app_role));

-- Admins can create newsletters
CREATE POLICY "Admins can create newsletters"
  ON public.newsletters FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update newsletters
CREATE POLICY "Admins can update newsletters"
  ON public.newsletters FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete newsletters
CREATE POLICY "Admins can delete newsletters"
  ON public.newsletters FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Auto-update timestamps
CREATE TRIGGER update_newsletters_updated_at
  BEFORE UPDATE ON public.newsletters
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
