INSERT INTO public.page_content (page_slug, section_key, content_type, content, label, display_order) VALUES
('support', 'hero_title', 'text', 'Support WECA', 'Hero Title', 0),
('support', 'hero_subtitle', 'text', 'Help us continue serving the West End community through advertising, sponsorship, or direct contributions', 'Hero Subtitle', 1),
('support', 'advertise_title', 'text', 'Advertise with Us', 'Advertise Card Title', 2),
('support', 'advertise_subtitle', 'text', 'Reach our engaged community of West End residents', 'Advertise Card Subtitle', 3),
('support', 'advertise_description', 'html', 'The West End Civic Association website connects you with thousands of engaged residents in one of Rockville''s most vibrant neighborhoods. Our advertising opportunities include banner ads, sidebar placements, and featured listings in our newsletter.', 'Advertise Description', 4),
('support', 'advertise_cta_label', 'text', 'Get Advertising Information', 'Advertise CTA Label', 5),
('support', 'advertise_cta_email', 'text', 'wecaoutreach@gmail.com', 'Advertise Contact Email', 6),
('support', 'sponsor_title', 'text', 'Sponsor an Event', 'Sponsor Card Title', 7),
('support', 'sponsor_subtitle', 'text', 'Support community gatherings and build local connections', 'Sponsor Card Subtitle', 8),
('support', 'sponsor_description', 'html', 'WECA hosts numerous community events throughout the year, from neighborhood picnics to educational seminars. Event sponsorship is a wonderful way to show your support for the West End while gaining visibility among local residents.', 'Sponsor Description', 9),
('support', 'sponsor_cta_label', 'text', 'Become an Event Sponsor', 'Sponsor CTA Label', 10),
('support', 'contribute_title', 'text', 'Contribute to WECA', 'Contribute Card Title', 11),
('support', 'contribute_subtitle', 'text', 'Your donation helps us serve the community better', 'Contribute Card Subtitle', 12),
('support', 'contribute_description', 'html', 'Your financial support helps WECA advocate for residents, organize community events, maintain our digital presence, and preserve the character of our historic neighborhood. Every contribution makes a difference.', 'Contribute Description', 13),
('support', 'contribute_zelle_email', 'text', 'wecaoutreach@gmail.com', 'Zelle Payment Email', 14),
('support', 'contribute_thank_you', 'text', 'Thank you for supporting the West End community!', 'Thank You Message', 15)
ON CONFLICT DO NOTHING;