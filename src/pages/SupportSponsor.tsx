import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Calendar, Star, Award } from "lucide-react";

const SupportSponsor = () => {
  return (
    <>
      <SEO 
        title="Sponsor an Event | West End Civic Association"
        description="Sponsor a WECA community event and show your support for West End neighborhood activities and celebrations."
        keywords="event sponsorship, community events, WECA sponsor, Rockville events"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <div className="pt-20">
          <TopAdBanner />
        </div>
        
        <main className="flex-grow pt-8">
          {/* Hero Section */}
          <section className="relative py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <Gift className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-6 animate-fade-in">
                  Sponsor an Event
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Support our community events and connect with West End residents
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto space-y-8">
                
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl">Why Sponsor a WECA Event?</CardTitle>
                    <CardDescription className="text-base">
                      Make a meaningful impact in your community
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose prose-sm max-w-none">
                      <p>
                        Event sponsorship is a fantastic way for businesses and community members to support 
                        WECA's mission while gaining visibility among our engaged residents. From seasonal 
                        celebrations to educational programs, your sponsorship helps make these events possible.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                        <Star className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Brand Visibility</h3>
                          <p className="text-sm text-muted-foreground">
                            Your logo featured on event materials, signage, and digital promotions
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                        <Award className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Community Recognition</h3>
                          <p className="text-sm text-muted-foreground">
                            Recognition in our newsletter and social media channels
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Popular Events to Sponsor</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-lg">Spring Community Cleanup</h3>
                        </div>
                        <p className="text-muted-foreground">Annual neighborhood beautification event (April)</p>
                        <p className="text-sm text-primary mt-1">Sponsorship: $500-$1,000</p>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-lg">Summer Block Party</h3>
                        </div>
                        <p className="text-muted-foreground">Community celebration with activities for all ages (July)</p>
                        <p className="text-sm text-primary mt-1">Sponsorship: $750-$1,500</p>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-lg">Halloween Doggie Parade</h3>
                        </div>
                        <p className="text-muted-foreground">Annual pet costume parade and festival (October)</p>
                        <p className="text-sm text-primary mt-1">Sponsorship: $500-$1,200</p>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-lg">Holiday Celebration</h3>
                        </div>
                        <p className="text-muted-foreground">Festive gathering with caroling and refreshments (December)</p>
                        <p className="text-sm text-primary mt-1">Sponsorship: $600-$1,000</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sponsorship Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <h3 className="font-semibold mb-3">What Your Sponsorship Includes:</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Logo placement on all event marketing materials</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Recognition on WECA website and social media</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Mention in our monthly newsletter (distributed to 1,000+ residents)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Signage at the event location</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Opportunity to distribute promotional materials at the event</span>
                          </li>
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="gap-2">
                          Become an Event Sponsor
                        </Button>
                        <Button size="lg" variant="outline">
                          View Sponsorship Packages
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Get Started</CardTitle>
                    <CardDescription>
                      Interested in sponsoring an event? Contact us to discuss opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p><strong>Email:</strong> <a href="mailto:events@weca.org" className="text-primary hover:underline">events@weca.org</a></p>
                      <p><strong>Phone:</strong> (301) 555-WECA</p>
                      <p className="text-sm text-muted-foreground">We'll respond within 2 business days with sponsorship details and availability.</p>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default SupportSponsor;
