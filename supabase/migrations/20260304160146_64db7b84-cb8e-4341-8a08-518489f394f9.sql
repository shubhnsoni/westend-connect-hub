INSERT INTO public.page_content (page_slug, section_key, content_type, content, label, display_order) VALUES
('media', 'hero_title', 'text', 'Media Gallery', 'Hero Title', 0),
('media', 'hero_subtitle', 'text', 'Experience the West End through photos and videos from our community', 'Hero Subtitle', 1),
('media', 'share_title', 'text', 'Share Your Stories', 'Share Section Title', 2),
('media', 'share_description', 'text', 'Have photos or videos from West End events? We''d love to feature them!', 'Share Section Description', 3),
('media', 'share_cta_label', 'text', 'Submit Media', 'Share CTA Label', 4),
('media', 'share_cta_email', 'text', 'WECAoutreach@gmail.com', 'Share Contact Email', 5),
('media', 'bottom_cta_title', 'text', 'Stay Updated', 'Bottom CTA Title', 6),
('media', 'bottom_cta_description', 'text', 'Subscribe to receive updates about new photos, videos, and community content', 'Bottom CTA Description', 7)
ON CONFLICT DO NOTHING;