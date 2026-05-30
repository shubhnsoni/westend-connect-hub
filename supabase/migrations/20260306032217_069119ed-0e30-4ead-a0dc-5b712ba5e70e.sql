DROP TRIGGER IF EXISTS create_blog_post_on_meeting_minutes ON public.meetings;
DROP FUNCTION IF EXISTS public.create_blog_post_from_meeting();