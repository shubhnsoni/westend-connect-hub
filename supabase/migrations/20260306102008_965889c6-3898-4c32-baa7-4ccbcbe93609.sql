ALTER TABLE public.ads DROP CONSTRAINT ads_placement_check;
ALTER TABLE public.ads ADD CONSTRAINT ads_placement_check CHECK (placement = ANY (ARRAY['blog-sidebar', 'blog-post', 'blog-post-sidebar', 'home-sidebar', 'top-banner', 'footer-banner', 'news-sidebar', 'general']));

ALTER TABLE public.ads DROP CONSTRAINT ads_size_check;
ALTER TABLE public.ads ADD CONSTRAINT ads_size_check CHECK (size = ANY (ARRAY['small', 'medium', 'large', 'banner', 'sidebar', 'square']));