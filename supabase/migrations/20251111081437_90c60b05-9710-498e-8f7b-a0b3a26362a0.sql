-- Add status and submitted_by columns to events table for community event submissions
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
ADD COLUMN IF NOT EXISTS submitted_by UUID REFERENCES auth.users(id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

-- Add comment for documentation
COMMENT ON COLUMN events.status IS 'Status of the event: pending (awaiting approval), approved (visible on site), rejected (not approved)';
COMMENT ON COLUMN events.submitted_by IS 'User ID of community member who submitted the event (NULL for admin-created events)';