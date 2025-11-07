-- Enable realtime for all content tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.meetings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback;
ALTER PUBLICATION supabase_realtime ADD TABLE public.newsletter_subscribers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.resources;
ALTER PUBLICATION supabase_realtime ADD TABLE public.media_library;