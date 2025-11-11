-- Fix security issue: Restrict user_roles table access to admins only
-- Drop the overly permissive policy that allows anyone to view all roles
DROP POLICY IF EXISTS "Anyone can view roles" ON public.user_roles;

-- Create a new policy that restricts SELECT access to admins only
CREATE POLICY "Only admins can view user roles" ON public.user_roles
  FOR SELECT 
  USING (has_role(auth.uid(), 'admin'::app_role));