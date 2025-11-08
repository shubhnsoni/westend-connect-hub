-- Temporarily drop foreign key constraints to allow sample data insertion
ALTER TABLE blog_posts DROP CONSTRAINT IF EXISTS blog_posts_author_id_fkey;
ALTER TABLE events DROP CONSTRAINT IF EXISTS events_created_by_fkey;
ALTER TABLE resources DROP CONSTRAINT IF EXISTS resources_uploaded_by_fkey;
ALTER TABLE meetings DROP CONSTRAINT IF EXISTS meetings_created_by_fkey;
ALTER TABLE announcements DROP CONSTRAINT IF EXISTS announcements_created_by_fkey;