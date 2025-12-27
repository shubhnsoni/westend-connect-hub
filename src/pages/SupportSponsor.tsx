import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import FooterAdBanner from "@/components/FooterAdBanner";
import EventsTicker from "@/components/EventsTicker";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Calendar, Star, Award } from "lucide-react";

const events = [
  { name: "Spring Fest", date: "May 2026" },
  { name: "Fall Fest", date: "October 2026" },
  { name: "West End Photography Challenge", description: "What makes you a West End resident" },
  { name: "Holiday Toy & Book Drive", date: "December" },
  { name: "WECA Happy Hours", date: "Throughout the year" }
];

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
        
        <EventsTicker />
        
        <main className="flex-grow pt-4">
          {/* Hero Section */}
          <section className="relative py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <Gift className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-4 animate-fade-in">
                  Sponsor an Event
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Support our community events and connect with West End residents
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Sponsorship Benefits Card */}
                <Card className="border-2 border-primary/20 bg-gradient-to-b from-primary/5 to-background">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Sponsorship Benefits</CardTitle>
                    <CardDescription className="text-lg">Up to 3 sponsors per event</CardDescription>
                    <div className="text-4xl font-bold text-primary mt-4">$350</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>1 Sidebar ad in newsletters & update emails (sent every 2 weeks) up to 2 months leading to the event</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Sponsor logo/name placement in all flyers and social media posts</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Recognition at the event</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Opportunity to raffle items</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-6" size="lg">
                      Become a Sponsor
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl">Why Sponsor a WECA Event?</CardTitle>
                    <CardDescription className="text-base">
                      Make a meaningful impact in your community
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Event sponsorship is a fantastic way for businesses and community members to support 
                      WECA's mission while gaining visibility among our engaged residents.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
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
                  <CardContent>
                    <div className="grid gap-3">
                      {events.map((event, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                          <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                          <div className="flex-1">
                            <h3 className="font-semibold">{event.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {event.description || event.date}
                            </p>
                          </div>
                        </div>
                      ))}
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
                      <p><strong>Email:</strong> <a href="mailto:WECAoutreach@gmail.com" className="text-primary hover:underline">WECAoutreach@gmail.com</a></p>
                      <p className="text-sm text-muted-foreground">We'll respond within 2 business days with sponsorship details and availability.</p>
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

export default SupportSponsor;
