-- Fix security issue: Revert meeting-documents bucket to private
-- This prevents unauthorized public access to potentially sensitive meeting materials
UPDATE storage.buckets 
SET public = false 
WHERE id = 'meeting-documents';

-- Ensure proper RLS policies are in place for authenticated access
-- (These policies should already exist from previous migrations)