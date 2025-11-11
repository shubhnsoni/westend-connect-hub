-- Fix security issue: Prevent email harvesting from newsletter_subscribers table
-- Drop all existing SELECT policies to ensure clean slate
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Public can view subscribers" ON public.newsletter_subscribers;

-- Create single restrictive policy: Only admins can view subscriber data
CREATE POLICY "Admins only can view subscribers" ON public.newsletter_subscribers
  FOR SELECT 
  USING (has_role(auth.uid(), 'admin'::app_role));