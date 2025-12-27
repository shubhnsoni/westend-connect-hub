import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import FooterAdBanner from "@/components/FooterAdBanner";
import EventsTicker from "@/components/EventsTicker";
import ContributionMeter from "@/components/ContributionMeter";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Target, Users, Calendar, Mail, Globe, Building, Wallet } from "lucide-react";

const SupportContribute = () => {
  return (
    <>
      <SEO 
        title="Contribute to WECA | West End Civic Association"
        description="Make a contribution to support WECA's mission of enhancing quality of life in the West End neighborhood of Rockville."
        keywords="contribute WECA, support community, Rockville contribution, neighborhood support"
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
                <Heart className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-4 animate-fade-in">
                  Contribute to WECA
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Your contribution helps us continue our mission of enhancing quality of life in West End
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Contribution Meter */}
                <ContributionMeter current={1700} goal={1800} />

                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl">Why Does Your Contribution Matter?</CardTitle>
                    <CardDescription className="text-base">
                      All contributions support WECA priorities and initiatives
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      The West End Civic Association is a volunteer-run non-profit organization 
                      dedicated to preserving and enhancing the quality of life in our historic neighborhood. 
                      Your contribution directly supports our Priorities, community outreach and events.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                        <Target className="w-10 h-10 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">Priorities</h3>
                        <p className="text-sm text-muted-foreground">
                          Advocacy for deer management, zoning, and pedestrian safety
                        </p>
                      </div>
                      <div className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                        <Users className="w-10 h-10 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">Community Outreach</h3>
                        <p className="text-sm text-muted-foreground">
                          Newsletters, updates, and neighbor engagement programs
                        </p>
                      </div>
                      <div className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                        <Calendar className="w-10 h-10 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">Events</h3>
                        <p className="text-sm text-muted-foreground">
                          Spring Fest, Fall Fest, happy hours, and community gatherings
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">How Your Contributions Help</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 p-6 rounded-lg mb-6">
                      <h3 className="font-semibold mb-4">What It Funds</h3>
                      <p className="text-muted-foreground mb-4">
                        Communication is the largest part of WECA where it takes more than just effort on the part of the officers.
                      </p>
                      <p className="text-muted-foreground">
                        From website hosting and domain fees, email list services charges (we use Mailchimp), bank fees, and event costs, 
                        your contribution ensures we are able to effectively communicate, survey and inform the neighbors of what's happening 
                        in the neighborhood and the city.
                      </p>
                    </div>

                    <div className="border-2 border-primary/20 p-6 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
                      <h3 className="text-xl font-semibold mb-4">Support Our Annual Budget: $1,800.00</h3>
                      <p className="text-muted-foreground mb-4">This cost includes:</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">Website (Domain & Hosting)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">Mailchimp (List serv)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Building className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">Bank Fees</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">Upfront event costs for Spring and Fall*</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        *This is mostly covered by a Montgomery county grant, however these grants take several months to be paid out after the events.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How to Contribute</CardTitle>
                    <CardDescription>
                      Multiple ways to support WECA's mission
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                        <Wallet className="w-8 h-8 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-2">Contribute via Zelle</h3>
                          <p className="text-muted-foreground mb-2">
                            Send your contribution directly to our account:
                          </p>
                          <p className="font-mono text-primary font-semibold">WECAoutreach@gmail.com</p>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="font-semibold mb-3">Mail a Check</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Make checks payable to "West End Civic Association" and mail to:
                        </p>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="font-mono text-sm">
                            WECA Treasurer<br/>
                            P.O. Box 4746<br/>
                            Rockville, MD 20849
                          </p>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="font-semibold mb-3">Employer Matching</h3>
                        <p className="text-sm text-muted-foreground">
                          Many employers will match your charitable contributions! Check with your HR 
                          department to see if your company offers a matching gift program. This is an 
                          easy way to double your impact.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Questions?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      Have questions about making a contribution or want to discuss other ways to support WECA?
                    </p>
                    <p className="break-all sm:break-normal">
                      <strong>Email:</strong>{" "}
                      <a href="mailto:WECAoutreach@gmail.com" className="text-primary hover:underline">
                        WECAoutreach@gmail.com
                      </a>
                    </p>
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

export default SupportContribute;
