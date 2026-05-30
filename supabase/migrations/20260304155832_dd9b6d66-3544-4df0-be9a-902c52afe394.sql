INSERT INTO public.page_content (page_slug, section_key, content_type, content, label, display_order) VALUES
('charter-bylaws', 'hero_title', 'text', 'Charter & By-Laws', 'Hero Title', 0),
('charter-bylaws', 'hero_subtitle', 'text', 'Official governing documents of the West End Civic Association', 'Hero Subtitle', 1),
('charter-bylaws', 'adopted_date', 'text', 'Adopted May 9, 2024', 'Adoption Date', 2)
ON CONFLICT DO NOTHING;