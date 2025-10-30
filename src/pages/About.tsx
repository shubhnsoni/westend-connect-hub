import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Users, Home, BookOpen, ScrollText } from "lucide-react";
import boundariesMap from "@/assets/west-end-boundaries-map.jpg";
import aerialView from "@/assets/west-end-aerial-view.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TopAdBanner />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20 shadow-lg mb-6">
              <BookOpen className="w-4 h-4" />
              <span>History & Community</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">About West End</h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Discover the rich history and vibrant community of Rockville's West End neighborhood
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-16">
          
          {/* Overview Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Overview</h2>
            </div>
            
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p className="text-foreground leading-relaxed">
                  Rockville's West End neighborhood comprises 700+ acres next to downtown Rockville. The area is generally bordered on the west by I-270, on the north by Nelson Street, on the east by Rockville Town Center, and on the south by Maryland Avenue. It also includes properties southeast of Maryland Avenue on both sides of Argyle Street and the Courthouse Walk development. In addition to the historic West End area, the community includes the neighborhoods of Rose Hill, Rose Hill Falls, Chestnut Lodge, and Thirty Oaks (carved out of property that was once part of Chestnut Lodge).
                </p>
                
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-2">Population & Housing</p>
                    <p className="text-muted-foreground">
                      The West End had an estimated population of approximately 5,000 in 2018, consisting of over 1,600 households. The area remains predominantly residential. Most of the single-unit detached homes are zoned either R-60 or R-90. There are some multi-unit residential developments in the northeastern portion of the area. There are mixes of single-unit detached houses and townhouses in the Rose Hill and Rose Hill Falls Planned Developments and more townhouses at Courthouse Walk and Cambridge Cluster. The remaining household units are assisted living or senior housing. Average West End household size is 3.1.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* History Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Home className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">History</h2>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Early Settlement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Parts of the West End were among the areas first settled in Rockville. The neighborhood encompasses part of the 1784 "Williamsburgh" tract of 200 acres surveyed by William Prather Williams that was later subdivided into 85 lots along Wood Lane, Middle Lane, Commerce Lane (Montgomery Avenue), and Jefferson Street.
                  </p>
                  <p>
                    In the late 1770s, the Beall family settled on land near what is now North Adams Street. The family homestead was built in 1815 and extended well to the north to Martins Lane. This Beall-Dawson house still exists at 103 West Montgomery Avenue. The house and grounds have been owned by the City of Rockville since 1965 and are occupied by the Montgomery County Historical Society.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Free Black Communities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    The West End is the home of Rockville's three original free black communities.
                  </p>
                  <p>
                    The Bealls sold numerous small parcels of their land to the freed slaves and other African American families, notably along Martins Lane and Middle Lane, which became two of Rockville's free black neighborhoods.
                  </p>
                  <p>
                    The north side of Martins Lane had been farmed in the 1830s by Samuel Martin, a free black person. Many descendants of these original families still reside along Martins Lane. The community is known as Haiti and the neighborhood contains homes dating from the mid-1800s through the late twentieth century. Of particular note is the historic Haiti Cemetery that is located to the rear of 205 Martins Lane. Currently owned and maintained by the Crutchfield family, this is the earliest known cemetery for black residents of Rockville and is a locally designated historic site.
                  </p>
                  <p>
                    Another community of free black residents was established prior to the Civil War near the intersection of Great Falls Road and Maryland Avenue. Three free African American women and one man purchased contiguous properties that encompassed more than ten acres. After the Civil War they brought their families to their land holdings. Previously the children and spouses had been scattered around Montgomery County. This community endured for more than 100 years. Today there are two locally designated historic properties: the Bessie Hill House (602 Great Falls Road), is the home of a grandchild of Ann Wilson, who was an original purchaser in 1845. The other, the Kelley House, at the corner of Maryland Avenue and Great Falls Road (628 Great Falls Road), is located on the property of Thomas Price, another of the original free black settlers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Railroad Era & Resort Destination</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Rockville grew slowly as a mostly farming community in the 19th century until the Metropolitan Branch of the B&O Railroad arrived in 1873. The railroad provided a new gateway to Washington, DC and spurred the creation of a summer resort, attracting Washington residents to Rockville's "healthy" climate. Several large houses in the West End became boarding houses and the Woodlawn Hotel (opened 1889 and later became Chestnut Lodge Hospital) was constructed on West Montgomery Avenue – one of three grand hotels in the area. The Woodlawn was Rockville's premier destination during the town's heyday as a summer resort. The hotel became the westernmost destination point for the Washington and Rockville Electric Railway Company's trolley line.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Development & Subdivisions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    Prompted by Rockville's growing reputation as a resort destination in the late 1800s, farmland at the western limits of town, along Darnestown and Great Falls Roads, was subdivided by developers from Rockville and Washington, DC. Margaret Beall subdivided her 67-acre estate in 1875 and began to sell lots for new houses to the north and northwest of the Beall-Dawson House. Another local woman, Rebecca Veirs, bought and developed land for housing along Darnestown Road in 1887-1888 around what is now Thomas and Wall Streets, which became R.T. Veirs Addition.
                  </p>
                  <p>
                    Other subdivisions were created in the West End throughout the nineteenth century. The most ambitious was West End Park by Washingtonian Henry N. Copp around 1890. Copp designed the 520-acre West End Park subdivision in a plan of diagonal streets with connecting circles, large lots, and land set aside for churches, schools, and parks. The traffic circles at Mannakee Street and Beall Avenue and at Laird, Luckett and Lynch Streets are enduring results of the original design.
                  </p>
                  <p>
                    Quarter-acre lots sold quickly, and large Victorian homes were built before Copp's development went bankrupt following economic recessions and lawsuits. Many of the lots remained vacant until well into the twentieth century. Rockville's first suburban building boom was over by the end of the 19th century. Large ornate Victorian houses were the typical prototype in the West End prior to the turn of the 20th century. These are the homes that "provide the flavor of the historic district" according to the Maryland Historical Trust survey form for the West Montgomery Avenue Historic District.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>20th Century Evolution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    The start of the new century, through the mid-1900s, brought a variety of residential styles. Bungalows, Craftsman, Colonial Revival, and Cape Cod styles were commonly constructed. The gradual development of the area gives the West End its eclectic mix of architectural styles ranging from distinctive Victorians to modern split-level houses. The result of this patchwork development pattern and variety of architectural styles is a unique neighborhood reflecting the evolution of small towns in America beginning in the late 1800s and continuing into the 21st century.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Boundaries Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">West End Boundaries</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Street Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src={boundariesMap} 
                    alt="West End street boundaries map" 
                    className="w-full h-auto rounded-lg"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Aerial View</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src={aerialView} 
                    alt="West End aerial view" 
                    className="w-full h-auto rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Charter and Bylaws Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <ScrollText className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Charter and By-Laws</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Last updated: May 9, 2024
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              {/* Charter */}
              <AccordionItem value="charter" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <ScrollText className="w-5 h-5 text-primary" />
                    <span className="text-xl font-semibold">Charter</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 pt-2 pb-4 text-foreground">
                    <p className="leading-relaxed">
                      The residents of that part of the city of Rockville, Montgomery County, Maryland, known as the West End, do hereby establish and adopt this Charter pertaining to the organization and operation of a non-profit civic association which will concern itself with those problems and interests which properly are and should be the subject of the community as a whole.
                    </p>

                    {/* Article I - Name */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE I - Name</h4>
                      <p>The name of this organization shall be the West End Civic Association and shall hereinafter be referred to as the Association.</p>
                    </div>

                    {/* Article II - Membership */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE II - Membership</h4>
                      <p className="mb-3">Membership in this Association shall include all adult residents (18 years of age and over) of the West End area of the City of Rockville, as defined by the attached map.</p>
                      
                      <div className="pl-4">
                        <p className="font-semibold mb-2">Section 1. Boundaries</p>
                        <p className="text-sm leading-relaxed">
                          The geographical areas shown in the attached map encompassed by the Association are defined to include: West End Park, Beall Subdivision, Rockville Heights, Roxboro, Martins Lane Complex, Monument Triangle, Rose Hill Falls, Rose Hill, Court House Walk. The physical boundaries of the area encompassed are defined roughly as follows:
                        </p>
                        <p className="text-sm leading-relaxed mt-2">
                          Along the axis of Interstate 270 from the intersection with Great Falls Road to the south boundary of the Woodley Gardens Park and along the southern edge of said area in the northeasterly direction to intersect with the northwest boundary of the residences at 720 and 719 Wilson Avenue, thence in a southeasterly direction toward the southwest corner of Welsh Park, to include the residences on the northeastern side of the 700 block of Wilson Avenue, 403 Mannakee Street, and along the northeast boundary of the residences on Lynch Court and Lynch Street. Due east to the intersection of North Street and the east boundary of Welsh Park and along the eastern edge of said park in a northeasterly direction to the intersection of Rock Terrace School and Martins Lane, along the eastern edge of said school to the intersection of the north boundary of Bickford Avenue, along said boundary in a southeastern direction to the intersection of North Washington Street. Continue on North Washington Street until it becomes South Washington Street. Continue on South Washington Street across Maryland Avenue and make a left onto Lynn Manor Drive. The residences on the North and South of Lynn Manor Drive and the residences on the East and West of Lynn Manor Court are included. Continue along the axis of South Washington Street to the intersection of East Argyle St., in a southeasterly direction along the axis of East Argyle St. to intersect the west boundary of the residence at 10 East Argyle Street, in a northerly and then easterly direction along the west and north boundaries of this property, and along the north boundary of the residences at 501 Monroe Street, to intersect Monroe St. Proceeding in a southerly direction along the axis of Monroe St. to intersect the south boundary of the residence at 9 East Argyle Street in a westerly direction along the south boundary of the 2 residences on the south side of East Argyle Street and West Argyle Street, to intersect with Maryland Avenue, in a southwesterly direction along the axis of Maryland Avenue, crossing Great Falls Road and Potomac Street and, finally, intersecting Interstate 270, said point being the place of beginning described herein.
                        </p>
                      </div>
                    </div>

                    {/* Article III - Purpose */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE III - Purpose</h4>
                      <p className="mb-2">The purposes for which this Association is formed are:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>To promote, foster and protect the interests of the community known as the West End and its environs, as well as the City of Rockville as a whole.</li>
                        <li>To forward, promote and preserve the general welfare, character, and appearance of the community and to improve by any and all lawful and proper means its status and condition.</li>
                        <li>To promote cooperative activities and friendly spirit within the community.</li>
                      </ul>
                    </div>

                    {/* Article IV - Nature */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE IV - Nature</h4>
                      <p>The operations carried out by the Association shall NOT be for profit and no part of the assets of the organization shall inure to the benefit of any member or individual.</p>
                    </div>

                    {/* Article V - Organization */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE V - Organization</h4>
                      <p className="mb-3">The affairs of this Association shall be managed by an Executive Board.</p>
                      
                      <div className="space-y-3 pl-4">
                        <div>
                          <p className="font-semibold mb-1">Section 1. Membership</p>
                          <p className="text-sm">The Executive Board shall be comprised of the six elected officers of the Association, who will serve for a term of one year (June 1 to May 31), together with appointed Block Captains and appointed chairs of standing or special committees and the most current past president, who shall serve for a period of one year as a member of the Executive Board following his/her term in office.</p>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-1">Section 2. Duties</p>
                          <p className="text-sm mb-2">There shall be vested in the Executive Board a general power of supervision over the affairs of the Association, which power shall include authority:</p>
                          <ul className="list-disc pl-6 text-sm space-y-1">
                            <li>To be sensitive to and represent the best interests of the members of the Association.</li>
                            <li>To direct the activities of the officers.</li>
                            <li>To establish internal administrative procedures.</li>
                            <li>To devise Association policies.</li>
                            <li>To propose Association projects and programs.</li>
                            <li>To undertake any and all activities leading to the accomplishment of the Association objectives, subject to the restrictions and limitations contained in the charter and By-Laws.</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-1">Section 3. Officers and their duties</p>
                          <p className="text-sm mb-2">The officers of this Association shall consist of a president, a vice president, a second vice president, a recording secretary, a corresponding secretary, and a treasurer. In addition to the following duties, each officer will be responsible for maintaining the records of his or her own office.</p>
                          <ul className="list-none space-y-2 text-sm">
                            <li><strong>A. President</strong> – The President shall provide general supervision over the affairs of the Association, enforce the Charter and By-Laws, preside at all meetings of the Association and shall perform such other duties as properly pertain to the office. It is the responsibility of the President to develop the meeting agendas.</li>
                            <li><strong>B. Vice-President</strong> – In the absence of the President, the Vice-President shall perform the duties of the President, and otherwise serve as an assistant to the President in the supervision of Association affairs. The Vice-President shall arrange for the facilities and services necessary for the meetings of the Association.</li>
                            <li><strong>C. Second Vice-President, Outreach</strong> – The Second Vice President shall work to increase involvement of current West End residents, to encourage awareness of the Association and participation of new residents, and to coordinate with other Rockville associations on City-wide issues.</li>
                            <li><strong>D. Recording Secretary</strong> – The Recording Secretary shall record the proceedings of the Association. The Recording Secretary shall be responsible for maintaining a current Block Captain list. The Recording Secretary shall remind Board members of meetings well in advance of the meeting.</li>
                            <li><strong>E. Corresponding Secretary</strong> – At the direction of the Executive Board, this officer shall originate and coordinate all correspondence, news releases, petitions, newsletters and other written matter of the Executive Board and the Association.</li>
                            <li><strong>F. Treasurer</strong> – The Treasurer shall be accountable for all monies pertaining to the conduct of Association affairs and shall maintain a record of all transactions of the Association and report regularly at Association meetings. Disbursements made by the Treasurer from Association funds shall be with the concurrence of the President.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Articles VI-IX abbreviated for brevity */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE VI - Block Captains</h4>
                      <p className="text-sm">For the purposes of representation in the Association, the community shall be divided into block areas as determined by the Executive Board with each block area represented by a Block Captain.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE VII - Standing and Special Committee</h4>
                      <p className="text-sm">Standing and special committees of the Association will be established by the Executive Board as needed.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE VIII - Amendments</h4>
                      <p className="text-sm">A proposed amendment to the Charter may be submitted to the general membership by a petition signed by 25 members or by a majority vote of the Executive Board. A two-thirds vote of members present is required to adopt amendments.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE IX - Adoption of Charter</h4>
                      <p className="text-sm">This Charter shall be effective when adopted by a two-thirds vote of the members of the Association at a meeting scheduled for the adoption of the Charter.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* By-Laws */}
              <AccordionItem value="bylaws" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <ScrollText className="w-5 h-5 text-primary" />
                    <span className="text-xl font-semibold">By-Laws</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 pt-2 pb-4 text-foreground">
                    {/* Article I */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE I - Membership</h4>
                      <p>Any resident of the Association area who is over eighteen (18) years of age is a member of the Association by virtue of residence.</p>
                    </div>

                    {/* Article II - Meetings */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE II - Meetings</h4>
                      
                      <div className="space-y-3 pl-4 text-sm">
                        <div>
                          <p className="font-semibold mb-1">Section 1. Executive Board</p>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>The Executive Board shall conduct regular meetings at least once each quarter of the year.</li>
                            <li>Special Executive Board meetings may be called by the President or by nine (9) members of the Executive Board.</li>
                            <li>Each member of the Executive Board present at a meeting shall be entitled to one vote. No proxy votes shall be permitted.</li>
                            <li>A quorum shall consist of at least nine (9) members of the Executive Board, at least two of whom must be elected officers.</li>
                            <li>All Executive Board meetings shall be open for general membership attendance.</li>
                            <li>No Executive Board member may hold concurrently elected office in the City, County or State government.</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-1">Section 2. General Association</p>
                          <p>General Meetings shall be advertised to all members of the Association and shall be held no less than twice during the period from September through May of each calendar year.</p>
                        </div>

                        <div>
                          <p className="font-semibold mb-1">Section 3-6. Additional Meeting Procedures</p>
                          <p>Special meetings may be called by the President or by petition. A quorum consists of those members attending. Robert's Rules of Order shall govern procedure.</p>
                        </div>
                      </div>
                    </div>

                    {/* Article III - Voting */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE III - Voting</h4>
                      <p className="text-sm">Each member of the Association present at a duly convened meeting shall have one vote. No proxy votes will be permitted.</p>
                    </div>

                    {/* Article IV - Election */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE IV - Election</h4>
                      <p className="text-sm mb-2">Key election provisions:</p>
                      <ul className="list-disc pl-6 text-sm space-y-1">
                        <li>A nominating committee shall be appointed by the President in March.</li>
                        <li>Officers shall be elected annually at the last meeting in May.</li>
                        <li>Any member of the Association shall be eligible for election to any office.</li>
                        <li>No person may serve as president for more than four (4) consecutive years.</li>
                      </ul>
                    </div>

                    {/* Article V - Block Captains */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE V - Duties of Block Captains</h4>
                      <p className="text-sm mb-2">Block Captains are responsible for:</p>
                      <ul className="list-disc pl-6 text-sm space-y-1">
                        <li>Dissemination of the semi-annual WECA newsletter and other information to their assigned block area.</li>
                        <li>Providing a channel for membership to express opinions to the Executive Board.</li>
                        <li>When directed, seeking signatures to petitions endorsed by the Executive Board.</li>
                      </ul>
                    </div>

                    {/* Article VI - Representation */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE VI - Association Representation</h4>
                      <p className="text-sm">No person shall represent the Association unless duly authorized by the President, the Executive Board, by the By-Laws, or by resolution of the members.</p>
                    </div>

                    {/* Article VII - Finance */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE VII - Accounts and Finance</h4>
                      <p className="text-sm">The President may authorize routine expenditures. The Executive Board may authorize expenditures for approved projects. No expenditure may exceed funds in the treasury. The Treasurer will provide a detailed annual financial report.</p>
                    </div>

                    {/* Article VIII - Removal */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE VIII - Removal from Office</h4>
                      <p className="text-sm">Any member of the Executive Board may be removed by a two-thirds vote of the Executive Board or by a two-thirds vote of the Association members after a petition signed by at least 25 members.</p>
                    </div>

                    {/* Article IX - Amendments */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE IX - Adoption and Amendment of By-Laws</h4>
                      <p className="text-sm">These By-Laws shall be effective when adopted by a two-thirds vote of members present. Amendments require written submission, one week advance distribution, and a two-thirds vote at the subsequent meeting.</p>
                    </div>

                    {/* Article X - Communications */}
                    <div>
                      <h4 className="font-bold text-lg mb-2">ARTICLE X - Communications</h4>
                      <p className="text-sm">WECA uses various means to communicate and disseminate information to its members including newsletters (distributed twice yearly), a public website, and a members-only listserv. All email addresses provided to WECA shall be used exclusively for WECA business and not shared.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
