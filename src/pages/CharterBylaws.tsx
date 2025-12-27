import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import FooterAdBanner from "@/components/FooterAdBanner";
import EventsTicker from "@/components/EventsTicker";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const CharterBylaws = () => {
  return (
    <>
      <SEO 
        title="Charter & Bylaws | West End Civic Association"
        description="Official Charter and Bylaws of the West End Civic Association - governing rules and procedures."
        keywords="WECA bylaws, WECA charter, association rules, governing documents"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <div className="pt-20">
          <TopAdBanner />
        </div>
        
        <EventsTicker />
        
        <main className="flex-grow pt-4">
          {/* Hero Section */}
          <section className="relative py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <FileText className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-4 animate-fade-in">
                  Charter & Bylaws
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Official governing documents of the West End Civic Association
                </p>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">BYLAWS OF THE WEST END CIVIC ASSOCIATION</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm max-w-none space-y-6">
                    
                    <section>
                      <h3 className="text-xl font-semibold text-foreground">ARTICLE I - NAME</h3>
                      <p className="text-muted-foreground">
                        The name of this organization shall be the West End Civic Association, Inc., hereinafter referred to as "WECA" or "the Association."
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold text-foreground">ARTICLE II - PURPOSE</h3>
                      <p className="text-muted-foreground">
                        The purpose of this Association shall be:
                      </p>
                      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                        <li>To promote the general welfare of the residents of the West End neighborhood of Rockville, Maryland;</li>
                        <li>To encourage civic responsibility and participation in community affairs;</li>
                        <li>To provide a forum for discussion of matters affecting the community;</li>
                        <li>To represent the interests of the community before governmental bodies;</li>
                        <li>To preserve and enhance the quality of life in the neighborhood.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold text-foreground">ARTICLE III - BOUNDARIES</h3>
                      <p className="text-muted-foreground">
                        The boundaries of the West End neighborhood shall be defined as the area bounded by:
                      </p>
                      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                        <li>North: The southern boundary of the CSX railroad right-of-way</li>
                        <li>East: The western boundary of Rockville Town Center</li>
                        <li>South: West Montgomery Avenue</li>
                        <li>West: The eastern boundary of the I-270 right-of-way</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold text-foreground">ARTICLE IV - MEMBERSHIP</h3>
                      <p className="text-muted-foreground">
                        <strong>Section 1.</strong> Any person who resides within the boundaries of the West End neighborhood, or who owns property therein, shall be eligible for membership in the Association.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Section 2.</strong> Each household shall be entitled to one vote on matters brought before the membership.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Section 3.</strong> There shall be no dues required for membership, though voluntary contributions are encouraged.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold text-foreground">ARTICLE V - OFFICERS</h3>
                      <p className="text-muted-foreground">
                        <strong>Section 1.</strong> The officers of the Association shall be: President, Vice President, Secretary, and Treasurer.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Section 2.</strong> Officers shall be elected at the annual meeting and shall serve for a term of one year or until their successors are elected.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Section 3.</strong> Officers may serve consecutive terms.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Section 4.</strong> Vacancies in any office may be filled by appointment by the remaining officers until the next annual meeting.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold text-foreground">ARTICLE VI - DUTIES OF OFFICERS</h3>
                      <p className="text-muted-foreground">
                        <strong>Section 1. President.</strong> The President shall preside at all meetings of the Association, shall be the chief executive officer, and shall perform such other duties as are customarily incident to the office.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Section 2. Vice President.</strong> The Vice President shall assist the President and shall preside in the absence of the President.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Section 3. Secretary.</strong> The Secretary shall keep minutes of all meetings, maintain membership records, and handle correspondence.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Section 4. Treasurer.</strong> The Treasurer shall be responsible for all funds of the Association, shall maintain financial records, and shall provide financial reports at meetings.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold text-foreground">ARTICLE VII - MEETINGS</h3>
                      <p className="text-muted-foreground">
                        <strong>Section 1.</strong> Regular meetings of the Association shall be held monthly, except during summer months, at a time and place determined by the officers.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Section 2.</strong> The annual meeting shall be held in January of each year for the purpose of electing officers and conducting other business.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Section 3.</strong> Special meetings may be called by the President or by written request of ten or more members.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Section 4.</strong> Notice of meetings shall be given to members at least one week in advance.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold text-foreground">ARTICLE VIII - QUORUM</h3>
                      <p className="text-muted-foreground">
                        A quorum for the transaction of business at any meeting shall consist of ten members present.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold text-foreground">ARTICLE IX - COMMITTEES</h3>
                      <p className="text-muted-foreground">
                        The President may appoint such committees as deemed necessary to carry out the work of the Association.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold text-foreground">ARTICLE X - AMENDMENTS</h3>
                      <p className="text-muted-foreground">
                        These bylaws may be amended at any regular meeting of the Association by a two-thirds vote of the members present, provided that the proposed amendment has been submitted in writing at the previous regular meeting.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold text-foreground">ARTICLE XI - PARLIAMENTARY AUTHORITY</h3>
                      <p className="text-muted-foreground">
                        Robert's Rules of Order, Revised, shall govern the proceedings of the Association in all cases not provided for in these bylaws.
                      </p>
                    </section>

                    <div className="border-t pt-6 mt-8">
                      <p className="text-sm text-muted-foreground italic">
                        These bylaws were adopted by the West End Civic Association and last amended at the annual meeting.
                      </p>
                    </div>

                  </CardContent>
                </Card>
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
