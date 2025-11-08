-- Make meeting-documents bucket public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'meeting-documents';