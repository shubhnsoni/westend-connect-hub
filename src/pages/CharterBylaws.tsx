import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import FooterAdBanner from "@/components/FooterAdBanner";
import EventsTicker from "@/components/EventsTicker";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Scale } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePageContent } from "@/hooks/usePageContent";
import { useTranslation } from "@/hooks/useTranslation";

const CharterBylaws = () => {
  const { getContent } = usePageContent("charter-bylaws");
  const { t } = useTranslation();

  const heroTitle = getContent('hero_title', 'Charter & By-Laws');
  const heroSubtitle = getContent('hero_subtitle', 'Official governing documents of the West End Civic Association');
  const adoptedDate = getContent('adopted_date', 'Adopted May 9, 2024');

  return (
    <>
      <SEO
        title="Charter & Bylaws | West End Civic Association"
        description="Official Charter and Bylaws of the West End Civic Association, adopted May 9, 2024."
        keywords="WECA bylaws, WECA charter, association rules, governing documents, West End Rockville"
        canonicalUrl="https://westendrockvillemd.org/resources/charter-bylaws"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <div className="pt-20">
          <TopAdBanner />
        </div>

        <EventsTicker />

        <main className="flex-grow pt-4">
          {/* Hero */}
          <section className="relative py-14 sm:py-20 bg-gradient-to-b from-primary/8 via-primary/3 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                  <Scale className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-3 animate-fade-in">
                  {t(heroTitle)}
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto animate-fade-in">
                  {t(heroSubtitle)}
                </p>
                <p className="text-sm text-muted-foreground mt-3 font-medium animate-fade-in">
                  {t(adoptedDate)}
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto space-y-10">

                {/* ───── CHARTER ───── */}
                <Card className="overflow-hidden border-2 border-primary/15">
                  <div className="bg-primary/5 px-6 py-5 sm:px-8 sm:py-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary shrink-0" />
                    <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-foreground">{t("Charter")}</h2>
                  </div>
                  <CardContent className="px-6 sm:px-8 py-6 sm:py-8">
                    {/* Preamble */}
                    <p className="text-base leading-relaxed text-foreground mb-8">
                      The residents of that part of the city of Rockville, Montgomery County, Maryland, known as the West End, do hereby establish and adopt this Charter pertaining to the organization and operation of a non-profit civic association which will concern itself with those problems and interests which properly are and should be the subject of the community as a whole.
                    </p>

                    <Accordion type="multiple" defaultValue={["charter-1", "charter-3", "charter-5"]} className="space-y-2">
                      {/* Article I */}
                      <AccordionItem value="charter-1" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article I — Name
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5">
                          The name of this organization shall be the West End Civic Association and shall hereinafter be referred to as the Association.
                        </AccordionContent>
                      </AccordionItem>

                      {/* Article II */}
                      <AccordionItem value="charter-2" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article II — Membership
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5 space-y-4">
                          <p>
                            Membership in this Association shall include all adult residents (18 years of age and over) of the West End area of the City of Rockville, as defined by the attached map.
                          </p>
                          <div className="bg-muted/50 rounded-lg p-4 border">
                            <h4 className="font-semibold mb-2">Section 1 — Boundaries</h4>
                            <p className="mb-3">
                              The geographical areas shown in the attached map encompassed by the Association are defined to include: West End Park, Beall Subdivision, Rockville Heights, Roxboro, Martins Lane Complex, Monument Triangle, Rose Hill Falls, Rose Hill, Court House Walk.
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              The physical boundaries of the area are defined roughly as follows: Along the axis of Interstate 270 from the intersection with Great Falls Road to the south boundary of the Woodley Gardens Park and along the southern edge of said area in the northeasterly direction to intersect with the northwest boundary of the residences at 720 and 719 Wilson Avenue, thence in a southeasterly direction toward the southwest corner of Welsh Park, to include the residences on the northeastern side of the 700 block of Wilson Avenue, 403 Mannakee Street, and along the northeast boundary of the residences on Lynch Court and Lynch Street. Due east to the intersection of North Street and the east boundary of Welsh Park and along the eastern edge of said park in a northeasterly direction to the intersection of Rock Terrace School and Martins Lane, along the eastern edge of said school to the intersection of the north boundary of Bickford Avenue, along said boundary in a southeastern direction to the intersection of North Washington Street. Continue on North Washington Street until it becomes South Washington Street. Continue on South Washington Street across Maryland Avenue and make a left onto Lynn Manor Drive. The residences on the North and South of Lynn Manor Drive and the residences on the East and West of Lynn Manor Court are included. Continue along the axis of South Washington Street to the intersection of East Argyle St., in a southeasterly direction along the axis of East Argyle St. to intersect the west boundary of the residence at 10 East Argyle Street, in a northerly and then easterly direction along the west and north boundaries of this property, and along the north boundary of the residences at 501 Monroe Street, to intersect Monroe St. Proceeding in a southerly direction along the axis of Monroe St. to intersect the south boundary of the residence at 9 East Argyle Street in a westerly direction along the south boundary of the 2 residences on the south side of East Argyle Street and West Argyle Street, to intersect with Maryland Avenue, in a southwesterly direction along the axis of Maryland Avenue, crossing Great Falls Road and Potomac Street and, finally, intersecting Interstate 270, said point being the place of beginning described herein.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Article III */}
                      <AccordionItem value="charter-3" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article III — Purpose
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5">
                          <p className="mb-3">The purposes for which this Association is formed are:</p>
                          <ol className="list-[upper-alpha] pl-6 space-y-2">
                            <li>To promote, foster and protect the interests of the community known as the West End and its environs, as well as the City of Rockville as a whole.</li>
                            <li>To forward, promote and preserve the general welfare, character, and appearance of the community and to improve by any and all lawful and proper means its status and condition.</li>
                            <li>To promote cooperative activities and friendly spirit within the community.</li>
                          </ol>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Article IV */}
                      <AccordionItem value="charter-4" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article IV — Nature
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5">
                          The operations carried out by the Association shall NOT be for profit and no part of the assets of the organization shall inure to the benefit of any member or individual.
                        </AccordionContent>
                      </AccordionItem>

                      {/* Article V */}
                      <AccordionItem value="charter-5" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article V — Organization
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5 space-y-6">
                          <p>The affairs of this Association shall be managed by an Executive Board.</p>

                          <div>
                            <h4 className="font-semibold mb-2">Section 1 — Membership</h4>
                            <p>The Executive Board shall be comprised of the six elected officers of the Association, who will serve for a term of one year (June 1 to May 31), together with appointed Block Captains and appointed chairs of standing or special committees and the most current past president, who shall serve for a period of one year as a member of the Executive Board following his/her term in office.</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Section 2 — Duties</h4>
                            <p className="mb-2">There shall be vested in the Executive Board a general power of supervision over the affairs of the Association, which power shall include authority:</p>
                            <ol className="list-[upper-alpha] pl-6 space-y-1.5">
                              <li>To be sensitive to and represent the best interests of the members of the Association.</li>
                              <li>To direct the activities of the officers.</li>
                              <li>To establish internal administrative procedures.</li>
                              <li>To devise Association policies.</li>
                              <li>To propose Association projects and programs.</li>
                              <li>To undertake any and all activities leading to the accomplishment of the Association objectives, subject to the restrictions and limitations contained in the charter and By-Laws.</li>
                            </ol>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Section 3 — Officers and Their Duties</h4>
                            <p className="mb-3">
                              The officers of this Association shall consist of a president, a vice president, a second vice president, a recording secretary, a corresponding secretary, and a treasurer. In addition to the following duties, each officer will be responsible for maintaining the records of his or her own office.
                            </p>
                            <div className="space-y-3">
                              <div className="bg-muted/40 rounded-lg p-3 border">
                                <span className="font-semibold">A. President</span> — The President shall provide general supervision over the affairs of the Association, enforce the Charter and By-Laws, preside at all meetings of the Association and shall perform such other duties as properly pertain to the office. It is the responsibility of the President to develop the meeting agendas.
                              </div>
                              <div className="bg-muted/40 rounded-lg p-3 border">
                                <span className="font-semibold">B. Vice-President</span> — In the absence of the President, the Vice-President shall perform the duties of the President, and otherwise serve as an assistant to the President in the supervision of Association affairs. The Vice-President shall arrange for the facilities and services necessary for the meetings of the Association.
                              </div>
                              <div className="bg-muted/40 rounded-lg p-3 border">
                                <span className="font-semibold">C. Second Vice-President, Outreach</span> — The Second Vice President shall work to increase involvement of current West End residents, to encourage awareness of the Association and participation of new residents, and to coordinate with other Rockville associations on City-wide issues.
                              </div>
                              <div className="bg-muted/40 rounded-lg p-3 border">
                                <span className="font-semibold">D. Recording Secretary</span> — The Recording Secretary shall record the proceedings of the Association. The Recording Secretary shall be responsible for maintaining a current Block Captain list. The Recording Secretary shall remind Board members of meetings well in advance of the meeting.
                              </div>
                              <div className="bg-muted/40 rounded-lg p-3 border">
                                <span className="font-semibold">E. Corresponding Secretary</span> — At the direction of the Executive Board, this officer shall originate and coordinate all correspondence, news releases, petitions, newsletters and other written matter of the Executive Board and the Association.
                              </div>
                              <div className="bg-muted/40 rounded-lg p-3 border">
                                <span className="font-semibold">F. Treasurer</span> — The Treasurer shall be accountable for all monies pertaining to the conduct of Association affairs and shall maintain a record of all transactions of the Association and report regularly at Association meetings. Disbursements made by the Treasurer from Association funds shall be with the concurrence of the President.
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Article VI */}
                      <AccordionItem value="charter-6" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article VI — Block Captains
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5 space-y-4">
                          <div>
                            <h4 className="font-semibold mb-1">Section 1</h4>
                            <p>For the purposes of representation in the Association, the community shall be divided into block areas as determined by the Executive Board with each block area represented by a Block Captain. In addition, a Block-Captain-at-Large may be appointed to represent any block not represented by a Block Captain. Once a permanent Block Captain has been appointed for a vacant block, that Block-Captain-at-Large may be reappointed to another vacant block or relieved of his/her duties.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Section 2</h4>
                            <p>Block Captain candidates can be recommended by any member of the Executive Board and the appointment requires a majority vote of the Board.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Section 3</h4>
                            <p>The Block Captain shall carry forth those functions as described in the By-Laws.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Article VII */}
                      <AccordionItem value="charter-7" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article VII — Standing and Special Committees
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5">
                          Standing and special committees of the Association will be established by the Executive Board as needed.
                        </AccordionContent>
                      </AccordionItem>

                      {/* Article VIII */}
                      <AccordionItem value="charter-8" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article VIII — Amendments
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5 space-y-4">
                          <div>
                            <h4 className="font-semibold mb-1">Section 1</h4>
                            <p>A proposed amendment to the Charter may be submitted to the general membership by:</p>
                            <ol className="list-[upper-alpha] pl-6 space-y-1 mt-2">
                              <li>A petition signed by 25 members of the Association and presented to the President, or</li>
                              <li>A majority vote of the members of the Executive Board of this Association present at a regular or special meeting of the Executive Board.</li>
                            </ol>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Section 2</h4>
                            <p>The proposed amendment shall be placed on the agenda of the next General Meeting of the Association.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Section 3</h4>
                            <p>Copies of the proposed amendment shall be made available to the members of the Association one week prior to the meeting at which it is to be considered and discussed.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Section 4</h4>
                            <p>A two-thirds vote of the members present at the meeting of the Association at which a proposed amendment to the Charter is scheduled to be considered shall be required to adopt the proposed amendment.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Article IX */}
                      <AccordionItem value="charter-9" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article IX — Adoption of Charter
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5">
                          This Charter shall be effective when adopted by a two-thirds vote of the members of the Association at a meeting scheduled for the adoption of the Charter.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                {/* ───── DIVIDER ───── */}
                <div className="flex items-center gap-4 py-2">
                  <Separator className="flex-1" />
                  <span className="text-muted-foreground text-sm font-medium tracking-wider uppercase">By-Laws</span>
                  <Separator className="flex-1" />
                </div>

                {/* ───── BY-LAWS ───── */}
                <Card className="overflow-hidden border-2 border-primary/15">
                  <div className="bg-primary/5 px-6 py-5 sm:px-8 sm:py-6 flex items-center gap-3">
                    <Scale className="w-6 h-6 text-primary shrink-0" />
                    <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-foreground">By-Laws</h2>
                  </div>
                  <CardContent className="px-6 sm:px-8 py-6 sm:py-8">
                    <Accordion type="multiple" defaultValue={["bylaw-1", "bylaw-2"]} className="space-y-2">

                      {/* By-Law Article I */}
                      <AccordionItem value="bylaw-1" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article I — Membership
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5">
                          Any resident of the Association area who is over eighteen (18) years of age is a member of the Association by virtue of residence.
                        </AccordionContent>
                      </AccordionItem>

                      {/* By-Law Article II */}
                      <AccordionItem value="bylaw-2" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article II — Meetings
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5 space-y-6">
                          <div>
                            <h4 className="font-semibold mb-2">Section 1 — Executive Board</h4>
                            <ol className="list-[upper-alpha] pl-6 space-y-2">
                              <li>The Executive Board shall conduct regular meetings at least once each quarter of the year, preferably at a public place on a regularly specified day and on a schedule made known to the members of the Association.</li>
                              <li>Special Executive Board meetings may be called by the President or by nine (9) members of the Executive Board notifying the President of their desire to hold a special meeting. The President shall notify the Executive Board no later than 3 days from receiving the demand for a special meeting and the meeting shall be held no later than five days from notification to the President. Special Executive Board meetings may be held via email or other remote access venue as needed.</li>
                              <li>Each member of the Executive Board present at a meeting shall be entitled to one vote on any issue presented for vote at that meeting. No proxy votes shall be permitted.</li>
                              <li>A quorum shall consist of at least nine (9) of the members of the Executive Board, at least two of whom must be elected officers.</li>
                              <li>All questions within the purview of the Executive Board shall be decided by a majority vote of those members present, except as subsequently specified herein.</li>
                              <li>All Executive Board meetings shall be open for general membership attendance.</li>
                              <li>Any member of the Association may request a hearing before the Board on a relevant issue.</li>
                              <li>No Executive Board member may hold concurrently elected office in the City, County or State government. No Executive Board member may hold concurrently an appointed office in the City on the Planning Commission, Board of Appeals or Historic District Commission nor may he or she be president of another homeowners or residents association.</li>
                              <li>The incoming President will announce the appointment of Standing Committee Chairs annually following the election.</li>
                            </ol>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Section 2 — General Association</h4>
                            <p>General Meetings shall be advertised to all members of the Association and shall be held no less than twice during the period from September through May of each calendar year on the dates selected by the Executive Board for that purpose. All members of the Association must be notified in writing of all General Meetings and their proposed agendas at least one week prior to the meetings.</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-1">Section 3</h4>
                            <p>Special meetings of the Association membership may be called by the President or by a petition signed by 25 members of the Association.</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-1">Section 4</h4>
                            <p>A quorum necessary for the transaction of any business at such meetings shall consist of those members attending.</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-1">Section 5</h4>
                            <p>Except as otherwise provided herein, Robert's Rules of Order, Revised, shall govern procedure.</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Section 6</h4>
                            <ol className="list-[upper-alpha] pl-6 space-y-2">
                              <li>The agenda at all General Meetings shall include reports from the Executive Board and standing and special committees of the Association on the plans and status of the Association, its finances and matters affecting the community as a whole.</li>
                              <li>Business proposed by the Executive Board will be considered and opportunity given for business to be initiated from the floor. Only those matters which have been properly announced on the publicized agenda or have been proposed at the previous General Meeting may be voted upon.</li>
                            </ol>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* By-Law Article III */}
                      <AccordionItem value="bylaw-3" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article III — Voting
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5">
                          Each member of the Association present at a duly convened meeting shall have one vote. No proxy votes will be permitted.
                        </AccordionContent>
                      </AccordionItem>

                      {/* By-Law Article IV */}
                      <AccordionItem value="bylaw-4" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article IV — Election
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5 space-y-4">
                          <div>
                            <h4 className="font-semibold mb-1">Section 1</h4>
                            <p>With Executive Board approval, a nominating committee shall be appointed by the President in March. This committee shall present a slate of candidates and their brief biographical data to the Executive Board in April and submit it for publication in the May WECA newsletter.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Section 2</h4>
                            <p>Any member of the Association shall be eligible for election to any office. The nominee receiving the majority of votes cast shall be elected. If no one receives a majority vote, those two candidates receiving the highest number of votes shall participate in a run-off election.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Section 3</h4>
                            <p>Officers shall be elected annually at the regularly scheduled last meeting of the Association in May of each calendar year.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Section 4</h4>
                            <p>Nominations from the floor for any office will be in order, provided the individual being nominated qualifies as a member of the Association and consents thereto.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Section 5</h4>
                            <p>All vacancies in elected offices shall be filled by election at the next regularly scheduled meeting of the Executive Board after the vacancy occurs.</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Section 6</h4>
                            <p>No person may serve in the office of president for more than four (4) consecutive years.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* By-Law Article V */}
                      <AccordionItem value="bylaw-5" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article V — Duties of Block Captains
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5">
                          <h4 className="font-semibold mb-2">Section 1 — Duties</h4>
                          <ol className="list-[upper-alpha] pl-6 space-y-2">
                            <li>The Block Captain shall be responsible for the dissemination of the semi-annual WECA newsletter and other WECA information to the membership in the assigned block area.</li>
                            <li>The Block Captain shall provide a channel for the membership to express their opinions and recommendations to the Executive Board. To facilitate this communication, Block Captains are strongly encouraged to attend Executive Board meetings and remain well-informed on issues before the Association.</li>
                            <li>The Block Captain shall, when directed by the Executive Board, seek signatures to petitions endorsed by the Executive Board.</li>
                            <li>A majority vote of the Executive Board will be required before any assignment other than those set forth above is made to the Block Captain.</li>
                          </ol>
                        </AccordionContent>
                      </AccordionItem>

                      {/* By-Law Article VI */}
                      <AccordionItem value="bylaw-6" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article VI — Association Representation
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5 space-y-3">
                          <p>No person or persons shall represent the Association in any manner unless duly authorized by the President, the Executive Board, by the By-Laws, or by resolution of the members in the particular matter of representation.</p>
                          <p>No document shall represent the views of the Association in any matter unless signed by the President or other officer authorized by the Executive Board.</p>
                        </AccordionContent>
                      </AccordionItem>

                      {/* By-Law Article VII */}
                      <AccordionItem value="bylaw-7" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article VII — Accounts and Finance
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5 space-y-3">
                          <p>The President of the Association may authorize routine or administrative expenditures as required to conduct legitimate business of and for the benefit of the Association. The Executive Board may authorize expenditures for Association approved projects. No expenditure may be authorized in excess of funds in the treasury.</p>
                          <p>The Treasurer will provide a detailed report of the year's financial activities annually at the Association General Meeting in May. This report will be printed in the fall newsletter.</p>
                        </AccordionContent>
                      </AccordionItem>

                      {/* By-Law Article VIII */}
                      <AccordionItem value="bylaw-8" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article VIII — Removal from Office
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5">
                          <h4 className="font-semibold mb-1">Section 1</h4>
                          <p className="mb-2">Any member of the Executive Board may be removed from office by:</p>
                          <ol className="list-[upper-alpha] pl-6 space-y-1">
                            <li>A two-thirds vote of the Executive Board present at a regular or special meeting of the Executive Board, or</li>
                            <li>A two-thirds vote of the members of the Association present at a General or special meeting of the Association after a petition for such removal, signed by at least 25 members of the Association, has been presented to the President.</li>
                          </ol>
                        </AccordionContent>
                      </AccordionItem>

                      {/* By-Law Article IX */}
                      <AccordionItem value="bylaw-9" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article IX — Adoption and Amendment of By-Laws
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5 space-y-3">
                          <p>These By-Laws shall be effective when adopted by a two-thirds vote of the members of the Association present at a General or special meeting of the Association.</p>
                          <p>A proposed amendment to these By-Laws must be submitted in writing and made available to the members of the Association at the scheduled General Meeting of the Association. This distribution shall be made one week prior to the meeting at which the amendment is scheduled to be considered and discussed.</p>
                          <p>A two-thirds vote of the members present at the meeting subsequent to the introduction and circulation of a proposed amendment to the By-Laws shall be required to adopt the proposed amendment.</p>
                        </AccordionContent>
                      </AccordionItem>

                      {/* By-Law Article X */}
                      <AccordionItem value="bylaw-10" className="border rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-lg font-semibold font-cormorant hover:no-underline">
                          Article X — Communications
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-foreground/90 pb-5 space-y-3">
                          <p>WECA uses various means to communicate and disseminate information to its members. First, the WECA newsletter will be distributed to all households twice a year (no later than one week in advance of General Meetings of the Association). In addition, WECA shall maintain a website (accessible by the public at large) and a listserv (recipients restricted to members of WECA) to disseminate timely information; other formats may be added in the future as technology changes.</p>
                          <p>The President and the chairperson(s) of the Communications Committee shall determine the content and the means of dissemination.</p>
                          <p>All email addresses provided to WECA shall be used exclusively for WECA business and not shared.</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Footer note */}
                <p className="text-center text-sm text-muted-foreground italic pb-4">
                  Charter and By-Laws adopted May 9, 2024 by the West End Civic Association.
                </p>

              </div>
            </div>
          </section>
        </main>

        <FooterAdBanner />
        <Footer />
      </div>
    </>
  );
};

export default CharterBylaws;
