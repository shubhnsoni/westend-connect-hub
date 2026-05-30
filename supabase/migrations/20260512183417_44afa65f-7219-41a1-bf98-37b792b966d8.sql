
-- Ensure unique (page_slug, section_key) so seeding is idempotent
CREATE UNIQUE INDEX IF NOT EXISTS page_content_slug_key_unique
  ON public.page_content (page_slug, section_key);

-- Seed rows for new public pages and missing homepage sections.
-- ON CONFLICT DO NOTHING means existing edits are preserved.
INSERT INTO public.page_content (page_slug, section_key, content_type, content, label, display_order) VALUES
  -- Resources: City Services
  ('resources-city-services', 'hero_title', 'text', 'City of Rockville Resources', 'Hero Title', 10),
  ('resources-city-services', 'hero_subtitle', 'text', 'Important city services, contacts, and resources for West End residents', 'Hero Subtitle', 20),
  ('resources-city-services', 'contacts_heading', 'text', 'City Contact Information', 'Contacts Heading', 30),
  ('resources-city-services', 'essential_services_heading', 'text', 'Essential Services', 'Essential Services Heading', 40),
  ('resources-city-services', 'other_services_heading', 'text', 'Other City Services', 'Other Services Heading', 50),
  ('resources-city-services', 'emergency_heading', 'text', 'Emergency Information', 'Emergency Heading', 60),

  -- Resources: Archives
  ('resources-archives', 'hero_title', 'text', 'Documents & Archives', 'Hero Title', 10),
  ('resources-archives', 'hero_subtitle', 'text', 'Historical records and archived materials from the West End Civic Association', 'Hero Subtitle', 20),
  ('resources-archives', 'tab_meetings_label', 'text', 'Meeting Minutes', 'Meetings Tab Label', 30),
  ('resources-archives', 'tab_documents_label', 'text', 'Documents', 'Documents Tab Label', 40),
  ('resources-archives', 'meetings_heading', 'text', 'Meeting Minutes Archive', 'Meetings Section Heading', 50),
  ('resources-archives', 'meetings_intro', 'text', 'Access past meeting minutes and agendas organized by year', 'Meetings Intro', 60),
  ('resources-archives', 'documents_heading', 'text', 'Document Archive', 'Documents Section Heading', 70),
  ('resources-archives', 'documents_intro', 'text', 'Historical documents and archived materials', 'Documents Intro', 80),
  ('resources-archives', 'empty_meetings', 'text', 'No archived meeting minutes available yet.', 'Empty State - Meetings', 90),
  ('resources-archives', 'empty_documents', 'text', 'No archived documents available yet.', 'Empty State - Documents', 100),

  -- Resources: WECA
  ('resources-weca', 'hero_title', 'text', 'WECA Resources', 'Hero Title', 10),
  ('resources-weca', 'hero_subtitle', 'text', 'Official documents and resources from the West End Civic Association', 'Hero Subtitle', 20),
  ('resources-weca', 'official_docs_heading', 'text', 'Official Documents', 'Official Documents Heading', 30),
  ('resources-weca', 'library_heading', 'text', 'Resource Library', 'Resource Library Heading', 40),

  -- Support: Contribute
  ('support-contribute', 'hero_title', 'text', 'Contribute to WECA', 'Hero Title', 10),
  ('support-contribute', 'hero_subtitle', 'text', 'Your contribution helps us continue our mission of enhancing quality of life in West End', 'Hero Subtitle', 20),
  ('support-contribute', 'why_heading', 'text', 'Why Does Your Contribution Matter?', 'Why Heading', 30),
  ('support-contribute', 'why_subheading', 'text', 'All contributions support WECA priorities and initiatives', 'Why Subheading', 40),
  ('support-contribute', 'why_body', 'text', 'The West End Civic Association is a volunteer-run non-profit organization dedicated to preserving and enhancing the quality of life in our historic neighborhood. Your contribution directly supports our Priorities, community outreach and events.', 'Why Body', 50),
  ('support-contribute', 'how_heading', 'text', 'How Your Contributions Help', 'How Heading', 60),
  ('support-contribute', 'how_body', 'text', 'Communication is the largest part of WECA where it takes more than just effort on the part of the officers. From website hosting and domain fees, email list services charges (we use Mailchimp), bank fees, and event costs, your contribution ensures we are able to effectively communicate, survey and inform the neighbors of what''s happening in the neighborhood and the city.', 'How Body', 70),
  ('support-contribute', 'methods_heading', 'text', 'How to Contribute', 'Methods Heading', 80),
  ('support-contribute', 'methods_subheading', 'text', 'Multiple ways to support WECA''s mission', 'Methods Subheading', 90),
  ('support-contribute', 'zelle_email', 'text', 'WECAoutreach@gmail.com', 'Zelle Email', 100),
  ('support-contribute', 'mail_address', 'text', 'WECA Treasurer\nP.O. Box 4746\nRockville, MD 20849', 'Mailing Address', 110),
  ('support-contribute', 'questions_heading', 'text', 'Questions?', 'Questions Heading', 120),
  ('support-contribute', 'questions_body', 'text', 'Have questions about making a contribution or want to discuss other ways to support WECA?', 'Questions Body', 130),

  -- Support: Sponsor
  ('support-sponsor', 'hero_title', 'text', 'Sponsor an Event', 'Hero Title', 10),
  ('support-sponsor', 'hero_subtitle', 'text', 'Support our community events and connect with West End residents', 'Hero Subtitle', 20),
  ('support-sponsor', 'benefits_heading', 'text', 'Sponsorship Benefits', 'Benefits Heading', 30),
  ('support-sponsor', 'benefits_subheading', 'text', 'Up to 3 sponsors per event', 'Benefits Subheading', 40),
  ('support-sponsor', 'benefits_price', 'text', '$350', 'Sponsorship Price', 50),
  ('support-sponsor', 'why_heading', 'text', 'Why Sponsor a WECA Event?', 'Why Heading', 60),
  ('support-sponsor', 'why_body', 'text', 'Event sponsorship is a fantastic way for businesses and community members to support WECA''s mission while gaining visibility among our engaged residents.', 'Why Body', 70),
  ('support-sponsor', 'events_heading', 'text', 'Popular Events to Sponsor', 'Events Heading', 80),
  ('support-sponsor', 'cta_heading', 'text', 'Get Started', 'CTA Heading', 90),
  ('support-sponsor', 'cta_body', 'text', 'Interested in sponsoring an event? Contact us to discuss opportunities', 'CTA Body', 100),

  -- Surveys
  ('surveys', 'hero_title', 'text', 'Community Surveys & Polls', 'Hero Title', 10),
  ('surveys', 'hero_subtitle', 'text', 'Your voice matters! Share your opinions on community issues and help shape decisions for the West End.', 'Hero Subtitle', 20),
  ('surveys', 'polls_heading', 'text', 'Active Polls', 'Polls Heading', 30),
  ('surveys', 'empty_polls', 'text', 'No active polls right now. Check back soon!', 'Empty State', 40),
  ('surveys', 'cta_heading', 'text', 'Want to Share More?', 'CTA Heading', 50),
  ('surveys', 'cta_body', 'text', 'Have ideas or concerns beyond our current polls? We''d love to hear from you directly.', 'CTA Body', 60),

  -- Volunteer Signup (listing)
  ('volunteer-signup', 'hero_title', 'text', 'Volunteer Opportunities', 'Hero Title', 10),
  ('volunteer-signup', 'hero_subtitle', 'text', 'Find ways to get involved and make a difference in our community.', 'Hero Subtitle', 20),
  ('volunteer-signup', 'empty_heading', 'text', 'No Opportunities Right Now', 'Empty Heading', 30),
  ('volunteer-signup', 'empty_body', 'text', 'Check back soon for new volunteer opportunities!', 'Empty Body', 40),

  -- Volunteer Form (signup form for a specific opportunity)
  ('volunteer-form', 'form_heading', 'text', 'Sign Up', 'Form Heading', 10),
  ('volunteer-form', 'submit_label', 'text', 'Sign Up to Volunteer', 'Submit Button Label', 20),
  ('volunteer-form', 'thank_you_heading', 'text', 'Thank You!', 'Thank You Heading', 30),
  ('volunteer-form', 'thank_you_body', 'text', 'Thanks for signing up. We''ll be in touch soon.', 'Thank You Body', 40),

  -- Homepage: missing component sections
  ('homepage', 'meetings_heading', 'text', 'Upcoming Meetings', 'Meetings Section Heading', 200),
  ('homepage', 'meetings_intro', 'text', 'Join us at our upcoming community gatherings', 'Meetings Section Intro', 210),
  ('homepage', 'upcoming_events_heading', 'text', 'Upcoming Events', 'Upcoming Events Heading', 220),
  ('homepage', 'upcoming_events_intro', 'text', 'Mark your calendar for these upcoming community events', 'Upcoming Events Intro', 230),
  ('homepage', 'newsletter_heading', 'text', 'Stay Connected', 'Newsletter Heading', 240),
  ('homepage', 'newsletter_intro', 'text', 'Subscribe to receive WECA updates straight to your inbox', 'Newsletter Intro', 250),
  ('homepage', 'contact_heading', 'text', 'Get in Touch', 'Contact Heading', 260),
  ('homepage', 'contact_intro', 'text', 'Reach out with questions, ideas, or just to say hello', 'Contact Intro', 270),
  ('homepage', 'community_poll_label', 'text', 'Community Poll', 'Poll Label', 280)
ON CONFLICT (page_slug, section_key) DO NOTHING;
