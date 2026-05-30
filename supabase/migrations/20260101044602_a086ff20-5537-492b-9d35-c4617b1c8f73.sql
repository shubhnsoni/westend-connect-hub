
-- Create function to automatically create blog post when meeting minutes are added
CREATE OR REPLACE FUNCTION public.create_blog_post_from_meeting()
RETURNS TRIGGER AS $$
DECLARE
  month_name TEXT;
  year_text TEXT;
  post_slug TEXT;
  post_title TEXT;
  post_content TEXT;
  post_excerpt TEXT;
BEGIN
  -- Only create blog post if minutes_url is provided
  IF NEW.minutes_url IS NOT NULL AND (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.minutes_url IS NULL)) THEN
    -- Extract month and year from meeting date
    month_name := TO_CHAR(NEW.date, 'FMMonth');
    year_text := TO_CHAR(NEW.date, 'YYYY');
    
    -- Generate slug
    post_slug := LOWER(month_name) || '-' || year_text || '-meeting-minutes';
    
    -- Generate title
    post_title := month_name || ' ' || year_text || ' Meeting Minutes';
    
    -- Generate excerpt
    post_excerpt := 'Read the official minutes from the WECA ' || month_name || ' ' || year_text || ' community meeting. Stay informed about decisions that affect our neighborhood.';
    
    -- Generate content with proper formatting
    post_content := '<h2>Meeting Details</h2>
<div class="event-box">
<p><strong>Date:</strong> ' || TO_CHAR(NEW.date, 'FMMonth DD, YYYY') || '</p>
<p><strong>Location:</strong> ' || COALESCE(NEW.location, 'Community Meeting') || '</p>
</div>

<h2>About This Meeting</h2>
<p>' || COALESCE(NEW.description, 'The West End Civic Association held its regular community meeting to discuss important neighborhood matters, ongoing projects, and future initiatives.') || '</p>

<h2>Official Minutes</h2>
<p>The complete meeting minutes are available for download. These minutes provide a detailed record of all discussions, motions, and decisions made during the meeting.</p>

<blockquote>
<p>Meeting minutes are an essential part of our community''s transparency. They ensure all residents can stay informed about decisions that affect our neighborhood.</p>
</blockquote>

<p><a href="' || NEW.minutes_url || '" target="_blank" rel="noopener noreferrer">📄 Download Official Meeting Minutes (PDF)</a></p>

<h2>Get Involved</h2>
<p>WECA meetings are open to all West End residents. Join us at our next meeting to participate in shaping our community''s future.</p>';

    -- Check if blog post with this slug already exists
    IF NOT EXISTS (SELECT 1 FROM public.blog_posts WHERE slug = post_slug) THEN
      INSERT INTO public.blog_posts (
        title,
        slug,
        content,
        excerpt,
        author_id,
        status,
        published_at,
        tags
      ) VALUES (
        post_title,
        post_slug,
        post_content,
        post_excerpt,
        NEW.created_by,
        'published',
        NOW(),
        ARRAY['Meeting Minutes', 'WECA', year_text]
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on meetings table
DROP TRIGGER IF EXISTS create_blog_post_on_meeting_minutes ON public.meetings;
CREATE TRIGGER create_blog_post_on_meeting_minutes
  AFTER INSERT OR UPDATE ON public.meetings
  FOR EACH ROW
  EXECUTE FUNCTION public.create_blog_post_from_meeting();
