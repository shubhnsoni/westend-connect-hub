
-- 1. Create handle_new_user trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 2. Add unique constraint on members.email
ALTER TABLE public.members ADD CONSTRAINT members_email_unique UNIQUE (email);
