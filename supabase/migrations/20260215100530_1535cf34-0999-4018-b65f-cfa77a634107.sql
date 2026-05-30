
-- Create community_polls table
CREATE TABLE public.community_polls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  votes JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.community_polls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active polls" ON public.community_polls
  FOR SELECT USING (is_active = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can vote on polls" ON public.community_polls
  FOR UPDATE USING (is_active = true);

CREATE POLICY "Admins can create polls" ON public.community_polls
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete polls" ON public.community_polls
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Create members table
CREATE TABLE public.members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  interests TEXT[] DEFAULT '{}'::text[],
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register as member" ON public.members
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view members" ON public.members
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update members" ON public.members
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete members" ON public.members
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Add submission_status to events table
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS submission_status TEXT NOT NULL DEFAULT 'approved';

-- Allow anyone to submit events with pending status
CREATE POLICY "Anyone can submit events" ON public.events
  FOR INSERT WITH CHECK (submission_status = 'pending');
