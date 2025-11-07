import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import NewsletterDialog from "@/components/NewsletterDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, MapPin, Users } from "lucide-react";
import halloweenParadeImage from "@/assets/halloween-doggie-parade.jpg";

const BlogPost = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-20">
        <TopAdBanner />
      </div>
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* Main Content */}
          <article>
              <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>October 15, 2025</span>
                  <span>•</span>
                  <span className="text-primary">Newsletter</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">WECA October 2025 Update</h1>
                <p className="text-lg text-muted-foreground">
                  Community updates, meeting recaps, and important announcements for West End residents
                </p>
              </div>

              {/* Introduction */}
              <Card className="p-6 mb-8 bg-secondary/50">
                <p className="text-lg">
                  Dear Neighbors,
                </p>
                <p className="mt-4">
                  Thank you to everyone who joined us for our October 9th WECA meeting. Below you'll find a recap of what was discussed, 
                  along with several important community updates and opportunities to get involved. In this issue, we're sharing details on 
                  the Village-Wide Halloween Doggie Parade, a message from Woodley Gardens Pool, Council member Barry Jackson's update on 
                  the King Farm Master Plan Proposal, and an important notice from Peerless Rockville regarding changes to the Historic 
                  Preservation Ordinance.
                </p>
                <p className="mt-4">
                  We encourage you to read through and stay engaged with our neighborhood events and initiatives.
                </p>
              </Card>

              {/* Table of Contents */}
              <Card className="p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">In This Issue</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• October meeting recap</li>
                  <li>• Village-Wide Halloween Doggie Parade</li>
                  <li>• A message from Woodley Gardens Pool</li>
                  <li>• Message from Councilmember Barry Jackson regarding King Farm Master Plan Proposal</li>
                  <li>• Be Aware: Update to Historic Preservation Ordinance - Peerless Rockville</li>
                </ul>
              </Card>

              {/* Meeting Recap */}
              <section className="mb-8">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  WECA Meeting Recap – October 9, 2025
                </h2>

                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="welcome">
                    <AccordionTrigger className="text-lg font-semibold">
                      Welcome & Ice Breaker
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>The meeting began with a warm welcome and a short ice breaker</li>
                        <li>Neighbors had a chance to introduce themselves and connect with one another</li>
                        <li>This created a friendly and engaging atmosphere to start the evening</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="officers">
                    <AccordionTrigger className="text-lg font-semibold">
                      Introduction of Officers
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>The current WECA officers were introduced</li>
                        <li>The team reaffirmed their commitment to neighborhood service and collaboration</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="business">
                    <AccordionTrigger className="text-lg font-semibold">
                      Business Items
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">President's Report:</h4>
                        <p className="mb-2">
                          The President highlighted recent accomplishments and ongoing initiatives, including community engagement 
                          efforts and updates on neighborhood projects.
                        </p>
                        <ul className="list-decimal list-inside space-y-1 ml-4">
                          <li>We engaged with the community and received survey responses to shape WECA's priorities from the listening session.</li>
                          <li>We are still working on the transition to the online newsletter.</li>
                          <li>A website refresh is underway with tons of information to help connect the neighbors to city and public services</li>
                          <li>We grew the email list by 96 new subscribers since the September meeting</li>
                          <li>We are still exploring an IRS non-profit designation - 501(c)3 and were suggested to look into a 501(c)4 designation instead</li>
                          <li>We are seeking volunteer, website designers/developers, graphics designers, lawyers and accountants/CPA.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Treasurer's Report:</h4>
                        <p className="mb-2">
                          The Treasurer presented the current financial standing of the association, noting income, expenses, and available 
                          funds to support future WECA activities.
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Our treasurer has reported that our funds are low and we were seeking contributions to keep us running.</li>
                          <li>A note from Peter Fosselman, who works for the Montgomery County that a reimbursement from the Spring Fest is 
                          underway and we should have it soon.</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="safety">
                    <AccordionTrigger className="text-lg font-semibold">
                      Public Safety Report
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Lt. Matney provided the public safety update</li>
                        <li>He addressed neighborhood concerns and shared recent statistics</li>
                        <li>Emphasized ongoing cooperation between residents and the Rockville Police Department to maintain safety in the West End</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="survey">
                    <AccordionTrigger className="text-lg font-semibold">
                      Re-cap of Listening Sessions & Survey Results
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">
                        The results of the recent listening sessions and priorities survey were shared with attendees. Key issues identified 
                        by residents were presented, along with discussion on how they align with WECA's broader mission and goals.
                      </p>
                      <p className="font-semibold">The top 3 priorities were:</p>
                      <ul className="list-decimal list-inside space-y-1 ml-4 mt-2">
                        <li>Deer management</li>
                        <li>Town Center Master Plan Zoning update</li>
                        <li>Improving the walking path between Forest and Nelson</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="action">
                    <AccordionTrigger className="text-lg font-semibold">
                      Priorities & Action Plan
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>The leadership team outlined the top priorities moving forward, along with a proposed action plan</li>
                        <li>Residents were encouraged to stay involved as WECA works toward practical, community-driven solutions</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="minutes">
                    <AccordionTrigger className="text-lg font-semibold">
                      Minutes & Record keeping
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>The group discussed how meeting minutes will be recorded and approved in the future</li>
                        <li>The process at the moment is comparatively the same as before</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="forum">
                    <AccordionTrigger className="text-lg font-semibold">
                      Open Forum
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>The meeting closed with an open forum</li>
                        <li>Residents had the opportunity to share additional questions, concerns, and ideas</li>
                        <li>This exchange reinforced the value of active participation and collective problem-solving</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              {/* Halloween Doggie Parade */}
              <section className="mb-8">
                <Card className="overflow-hidden border-2 border-orange-200 dark:border-orange-800">
                  <img 
                    src={halloweenParadeImage} 
                    alt="Village-Wide Halloween Doggie Parade - Saturday, October 25, 3:00-5:00 PM at Welsh Park, 355 Martins Lane" 
                    className="w-full h-auto"
                  />
                </Card>
              </section>

              {/* Woodley Gardens Pool */}
              <section className="mb-8">
                <Card className="p-6 border-l-4 border-l-primary">
                  <h2 className="text-2xl font-bold mb-4">Message from Woodley Gardens Pool: Community Update</h2>
                  <p className="mb-4">Dear WG Pool Community,</p>
                  <p className="mb-4">
                    The Woodley Gardens Community Swim and Recreation Association invites you to an update meeting regarding the 
                    future of the pool:
                  </p>
                  <Card className="p-4 bg-secondary mb-4">
                    <div className="flex items-start gap-3 mb-2">
                      <Calendar className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Monday, October 20, 7:30–8:30 p.m.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Carnation Room, Rockville Senior Center</p>
                        <p className="text-sm text-muted-foreground">1150 Carnation Drive, Rockville</p>
                      </div>
                    </div>
                  </Card>
                  <p className="mb-4">
                    We need your support and your feedback as we share potential next steps for our beloved community pool. We'll be discussing:
                  </p>
                  <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
                    <li>Progress to date</li>
                    <li>Overview of provisional plan and estimated finances</li>
                    <li>Your questions and comments</li>
                    <li>Opportunities to get involved — we need fundraising and grant writing experience</li>
                  </ul>
                  <p className="mb-4">
                    There is a long way to go and strong community support will be essential for us to move forward.
                  </p>
                  <p className="italic">
                    Please help spread the word, and we look forward to seeing you there.
                  </p>
                  <p className="mt-4 font-semibold">The WGCSRA Board</p>
                </Card>
              </section>

              {/* King Farm Message */}
              <section className="mb-8">
                <Card className="p-6 border-l-4 border-l-primary">
                  <h2 className="text-2xl font-bold mb-4">
                    Message from Councilmember Barry Jackson regarding King Farm Master Plan Proposal
                  </h2>
                  <div className="space-y-4">
                    <p>
                      I want to call attention to a proposal that has received input from across the city in regard to the King Farm 
                      Farmstead. The Mayor and Council will be taking up the King Farm Farmstead Master Plan this coming Monday night.
                    </p>
                    <p>
                      It is a very thorough plan with a number of options to finally see the city utilize this property for all the 
                      residents of Rockville.
                    </p>
                    <p>
                      It is a pretty thorough process of engagement involving people from across the city, a website and numerous 
                      discussions on the Council. In fact it has basically been a topic of discussion in the city of Rockville since 
                      the land and buildings were transferred by the King Farm developer to the City of Rockville.
                    </p>
                    <p className="font-semibold">
                      That was 30 years ago, and today the buildings stand vacant and unused.
                    </p>
                    <p>
                      Since the Farmstead is to serve the entire City, I wanted to reach out and make sure you saw the document and 
                      time to read it, digest it and formulate comments on the Master Plan.
                    </p>
                    <div className="bg-secondary p-4 rounded-lg space-y-2">
                      <p className="font-semibold">Resources:</p>
                      <p className="text-sm">
                        <a 
                          href="https://engagerockville.com/27156/widgets/92700/documents/73768" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          View the Farmstead Master Plan →
                        </a>
                      </p>
                      <p className="text-sm">
                        <a 
                          href="https://engagerockville.com/kingfarm" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Project overview and history on Engage Rockville →
                        </a>
                      </p>
                    </div>
                    <p>
                      I'm happy to answer any questions, comments or concerns you might have. Your feedback is welcome!
                    </p>
                    <p className="font-semibold text-primary">
                      Be sure to get your comments in to the Mayor and Council by Monday afternoon if you want to give feedback. 
                      The proposal will be heard and perhaps voted on Monday night, October 20.
                    </p>
                    <p className="italic">-From Councilmember Barry Jackson</p>
                  </div>
                </Card>
              </section>

              {/* Historic Preservation Notice */}
              <section className="mb-8">
                <Card className="p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-l-amber-500">
                  <h2 className="text-2xl font-bold mb-4 text-amber-900 dark:text-amber-100">
                    Be Aware: Update to Historic Preservation Ordinance - Peerless Rockville
                  </h2>
                  <p>
                    In the last email dated October 8th, 2025, a message and information mis-quoted from a Peerless Rockville email. 
                    To provide you with the most accurate information from Peerless Rockville on the Update to Historic Preservation 
                    Ordinance, please visit their website or their blogpost on this matter.
                  </p>
                </Card>
              </section>

              {/* Support Section */}
              <section className="mb-8">
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary">
                  <h2 className="text-2xl font-bold mb-4">Support the West End Civic Association</h2>
                  <p className="mb-4">
                    Volunteers welcome - contact us if you would like to get involved!
                  </p>
                  <p className="font-semibold mb-2">Help us support the events and work we do!</p>
                  <div className="space-y-2 mb-4">
                    <p><strong>Zelle:</strong> wecaoutreach@gmail.com</p>
                    <p><strong>Mail:</strong></p>
                    <p className="ml-4">
                      West End Civic Association<br />
                      P.O. Box 1052<br />
                      Rockville, MD 20849
                    </p>
                  </div>
                  <Button onClick={() => setIsNewsletterOpen(true)} className="w-full sm:w-auto">
                    Join Our Newsletter
                  </Button>
                </Card>
              </section>
            </article>
        </div>
      </main>
      <Footer />
      <NewsletterDialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
    </div>
  );
};

export default BlogPost;
