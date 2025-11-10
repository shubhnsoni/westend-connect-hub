-- Create ads table for managing advertisement placements
CREATE TABLE public.ads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT,
  size TEXT NOT NULL CHECK (size IN ('small', 'medium', 'large', 'banner')),
  placement TEXT NOT NULL CHECK (placement IN ('blog-sidebar', 'blog-post', 'home-sidebar', 'general')),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID NOT NULL
);

-- Enable RLS
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;

-- Anyone can view active ads
CREATE POLICY "Anyone can view active ads"
ON public.ads
FOR SELECT
USING (is_active = true OR has_role(auth.uid(), 'admin'::app_role));

-- Admins can create ads
CREATE POLICY "Admins can create ads"
ON public.ads
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update ads
CREATE POLICY "Admins can update ads"
ON public.ads
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete ads
CREATE POLICY "Admins can delete ads"
ON public.ads
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ads_updated_at
BEFORE UPDATE ON public.ads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();