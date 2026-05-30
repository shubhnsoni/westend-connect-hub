
-- Create page_content table
CREATE TABLE public.page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text',
  content TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_slug, section_key)
);

-- Enable RLS
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read
CREATE POLICY "Anyone can view page content"
ON public.page_content FOR SELECT
USING (true);

-- Only admins can insert
CREATE POLICY "Admins can create page content"
ON public.page_content FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update
CREATE POLICY "Admins can update page content"
ON public.page_content FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete page content"
ON public.page_content FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_page_content_updated_at
BEFORE UPDATE ON public.page_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed Charter & Bylaws content
INSERT INTO public.page_content (page_slug, section_key, content_type, content, label, display_order) VALUES
('charter-bylaws', 'hero_title', 'text', 'Charter & Bylaws', 'Hero Title', 1),
('charter-bylaws', 'hero_subtitle', 'text', 'Official governing documents of the West End Civic Association', 'Hero Subtitle', 2),
('charter-bylaws', 'main_title', 'text', 'BYLAWS OF THE WEST END CIVIC ASSOCIATION', 'Main Title', 3),
('charter-bylaws', 'article_1', 'html', '<h3>ARTICLE I - NAME</h3><p>The name of this organization shall be the West End Civic Association, Inc., hereinafter referred to as "WECA" or "the Association."</p>', 'Article I - Name', 4),
('charter-bylaws', 'article_2', 'html', '<h3>ARTICLE II - PURPOSE</h3><p>The purpose of this Association shall be:</p><ul><li>To promote the general welfare of the residents of the West End neighborhood of Rockville, Maryland;</li><li>To encourage civic responsibility and participation in community affairs;</li><li>To provide a forum for discussion of matters affecting the community;</li><li>To represent the interests of the community before governmental bodies;</li><li>To preserve and enhance the quality of life in the neighborhood.</li></ul>', 'Article II - Purpose', 5),
('charter-bylaws', 'article_3', 'html', '<h3>ARTICLE III - BOUNDARIES</h3><p>The boundaries of the West End neighborhood shall be defined as the area bounded by:</p><ul><li>North: The southern boundary of the CSX railroad right-of-way</li><li>East: The western boundary of Rockville Town Center</li><li>South: West Montgomery Avenue</li><li>West: The eastern boundary of the I-270 right-of-way</li></ul>', 'Article III - Boundaries', 6),
('charter-bylaws', 'article_4', 'html', '<h3>ARTICLE IV - MEMBERSHIP</h3><p><strong>Section 1.</strong> Any person who resides within the boundaries of the West End neighborhood, or who owns property therein, shall be eligible for membership in the Association.</p><p><strong>Section 2.</strong> Each household shall be entitled to one vote on matters brought before the membership.</p><p><strong>Section 3.</strong> There shall be no dues required for membership, though voluntary contributions are encouraged.</p>', 'Article IV - Membership', 7),
('charter-bylaws', 'article_5', 'html', '<h3>ARTICLE V - OFFICERS</h3><p><strong>Section 1.</strong> The officers of the Association shall be: President, Vice President, Secretary, and Treasurer.</p><p><strong>Section 2.</strong> Officers shall be elected at the annual meeting and shall serve for a term of one year or until their successors are elected.</p><p><strong>Section 3.</strong> Officers may serve consecutive terms.</p><p><strong>Section 4.</strong> Vacancies in any office may be filled by appointment by the remaining officers until the next annual meeting.</p>', 'Article V - Officers', 8),
('charter-bylaws', 'article_6', 'html', '<h3>ARTICLE VI - DUTIES OF OFFICERS</h3><p><strong>Section 1. President.</strong> The President shall preside at all meetings of the Association, shall be the chief executive officer, and shall perform such other duties as are customarily incident to the office.</p><p><strong>Section 2. Vice President.</strong> The Vice President shall assist the President and shall preside in the absence of the President.</p><p><strong>Section 3. Secretary.</strong> The Secretary shall keep minutes of all meetings, maintain membership records, and handle correspondence.</p><p><strong>Section 4. Treasurer.</strong> The Treasurer shall be responsible for all funds of the Association, shall maintain financial records, and shall provide financial reports at meetings.</p>', 'Article VI - Duties of Officers', 9),
('charter-bylaws', 'article_7', 'html', '<h3>ARTICLE VII - MEETINGS</h3><p><strong>Section 1.</strong> Regular meetings of the Association shall be held monthly, except during summer months, at a time and place determined by the officers.</p><p><strong>Section 2.</strong> The annual meeting shall be held in January of each year for the purpose of electing officers and conducting other business.</p><p><strong>Section 3.</strong> Special meetings may be called by the President or by written request of ten or more members.</p><p><strong>Section 4.</strong> Notice of meetings shall be given to members at least one week in advance.</p>', 'Article VII - Meetings', 10),
('charter-bylaws', 'article_8', 'html', '<h3>ARTICLE VIII - QUORUM</h3><p>A quorum for the transaction of business at any meeting shall consist of ten members present.</p>', 'Article VIII - Quorum', 11),
('charter-bylaws', 'article_9', 'html', '<h3>ARTICLE IX - COMMITTEES</h3><p>The President may appoint such committees as deemed necessary to carry out the work of the Association.</p>', 'Article IX - Committees', 12),
('charter-bylaws', 'article_10', 'html', '<h3>ARTICLE X - AMENDMENTS</h3><p>These bylaws may be amended at any regular meeting of the Association by a two-thirds vote of the members present, provided that the proposed amendment has been submitted in writing at the previous regular meeting.</p>', 'Article X - Amendments', 13),
('charter-bylaws', 'article_11', 'html', '<h3>ARTICLE XI - PARLIAMENTARY AUTHORITY</h3><p>Robert''s Rules of Order, Revised, shall govern the proceedings of the Association in all cases not provided for in these bylaws.</p>', 'Article XI - Parliamentary Authority', 14),
('charter-bylaws', 'footer_note', 'text', 'These bylaws were adopted by the West End Civic Association and last amended at the annual meeting.', 'Footer Note', 15);

-- Seed FAQ content as JSON
INSERT INTO public.page_content (page_slug, section_key, content_type, content, label, display_order) VALUES
('faq', 'hero_title', 'text', 'Frequently Asked Questions', 'Hero Title', 1),
('faq', 'hero_subtitle', 'text', 'Find answers to common questions about WECA and the West End neighborhood.', 'Hero Subtitle', 2),
('faq', 'categories', 'json', '[{"title":"About WECA","items":[{"q":"What is the West End Civic Association?","a":"WECA is a volunteer-run organization representing residents of Rockville''s historic West End neighborhood. We advocate for community interests, organize events, and serve as a liaison between residents and local government."},{"q":"Who can join WECA?","a":"Any one above the age of 18 who lives within the boundaries of the West End Civic Association is a member."},{"q":"How are decisions made?","a":"Decisions are made through open discussion and voting at monthly meetings. All residents in attendance have a voice. The elected board oversees day-to-day operations between meetings."},{"q":"What has WECA accomplished?","a":"WECA has successfully advocated for traffic calming measures, organized community clean-ups and festivals, provided input on development proposals, and maintained communication channels to keep residents informed."}]},{"title":"Meetings","items":[{"q":"When and where do meetings happen?","a":"WECA meets the second Thursday of each month from September through May at 7:00 PM at the Rockville Memorial Library, 21 Maryland Ave, Rockville, MD 20850."},{"q":"Can I attend on Zoom?","a":"Yes! Meetings are held in a hybrid format. A Zoom link is posted the morning of each meeting on our website and social media channels."},{"q":"What topics are discussed at meetings?","a":"Topics include development updates, city planning and zoning, community safety, upcoming events, neighborhood maintenance, and any issues raised by residents."},{"q":"Where can I find past meeting minutes?","a":"Meeting minutes are published on our website under Resources → Archives after they are approved at the following month''s meeting."}]},{"title":"Getting Involved","items":[{"q":"How can I volunteer?","a":"Visit our Volunteer Sign-Up page at /get-involved/volunteer to share your interests and availability. We need help with event planning, communications, clean-ups, and more."},{"q":"How can I donate to WECA?","a":"WECA accepts donations via Zelle. Visit our Support page for details. All contributions go directly toward community events and initiatives."},{"q":"Can I submit a community event?","a":"Yes! Reach out via our Contact page with your event details. Community-submitted events are reviewed and posted by our team."}]},{"title":"Neighborhood","items":[{"q":"How do I report a zoning or development concern?","a":"You can use our Report an Issue form on the Get Involved page, or contact the City of Rockville''s Department of Community Planning and Development Services directly at 240-314-8200."},{"q":"How do I report a pothole, streetlight, or other infrastructure issue?","a":"Use the City of Rockville''s SeeClickFix app or call 240-314-8567. You can also report it through our website and we''ll help route it to the right department."},{"q":"Is the West End a historic district?","a":"Yes, the West End is one of Rockville''s oldest neighborhoods with homes dating back to the early 1900s. While not all properties are individually designated, the area has significant historic character."}]},{"title":"Resources","items":[{"q":"Where can I find WECA''s charter and bylaws?","a":"Our charter and bylaws are available on the Resources page under WECA Documents."},{"q":"How do I access past newsletters?","a":"Visit the News & Updates section of our website. Newsletter archives are available in both blog and PDF format."},{"q":"Who do I contact at City Hall?","a":"Visit our City Services resource page for a directory of key contacts including the Mayor''s office, police non-emergency line, public works, and code enforcement."}]}]', 'FAQ Categories', 3);

-- Seed Priorities content as JSON
INSERT INTO public.page_content (page_slug, section_key, content_type, content, label, display_order) VALUES
('priorities', 'hero_title', 'text', 'WECA Priorities', 'Hero Title', 1),
('priorities', 'hero_subtitle', 'text', 'Our current focus areas and initiatives to serve the West End community', 'Hero Subtitle', 2),
('priorities', 'items', 'json', '[{"title":"Deer Management by the City of Rockville","status":"In Progress","statusColor":"bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20","bgColor":"bg-amber-50/50 dark:bg-amber-950/20","icon":"Clock","description":"In the meeting of October 9, 2025, a possible petition was discussed. A petition is being prepared by the president to present in the November meeting.","details":"Working with the City of Rockville to implement effective deer management strategies that protect our community while respecting wildlife. The overpopulation of deer in our neighborhood has led to increased vehicle collisions, damage to gardens and landscaping, and potential health concerns from tick-borne diseases. We are advocating for humane and effective population control measures."},{"title":"Zoning Creation from Town Centre Master Plan 2040","status":"Under Review","statusColor":"bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20","bgColor":"bg-blue-50/50 dark:bg-blue-950/20","icon":"FileText","description":"Working with the City of Rockville on zoning updates aligned with the 2040 master plan.","details":"Ensuring that zoning changes reflect the community''s vision for thoughtful development and preservation of our neighborhood character. WECA is actively participating in public hearings and submitting formal comments to ensure that any new zoning regulations protect the residential nature of West End while allowing for appropriate mixed-use development in designated areas."},{"title":"Path Identification and Request (Forest to Nelson)","status":"Proposed","statusColor":"bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20","bgColor":"bg-emerald-50/50 dark:bg-emerald-950/20","icon":"CheckCircle2","description":"Request to make path clear and visible from Forest to Nelson for improved pedestrian safety.","details":"Advocating for better signage, lighting, and maintenance of pedestrian pathways to enhance safety and accessibility for all residents. This includes working with the city to formally designate the path, install proper lighting, and ensure regular maintenance to keep it accessible year-round."}]', 'Priority Items', 3);
