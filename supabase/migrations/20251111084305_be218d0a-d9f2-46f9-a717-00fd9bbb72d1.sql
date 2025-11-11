-- Fix security issue: Profiles table exposing all emails
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);