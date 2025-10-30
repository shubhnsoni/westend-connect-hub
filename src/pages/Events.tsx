import Header from "@/components/Header";
import TopAdBanner from "@/components/TopAdBanner";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Video, Info, PartyPopper } from "lucide-react";
import AdPlacement from "@/components/AdPlacement";

const Events = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <TopAdBanner />
      
      <main className="bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20 shadow-lg mb-6">
                <Calendar className="w-4 h-4" />
                <span>Stay Connected with WECA</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Events & Meetings</h1>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Join us at our monthly meetings and community events
              </p>
            </div>
          </div>
        </section>

        {/* Monthly Meeting Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Monthly WECA Meetings</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <Card className="p-8 shadow-lg border-2 border-border">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-foreground leading-relaxed mb-6">
                      All West End residents are welcome. There are two General Membership meetings each year in 
                      <strong> October and May</strong>. The May meeting includes the election of the officers for the 
                      following year. All meetings typically include guest speakers, business items, a report from the 
                      Rockville Police Department, announcements, and an open forum.
                    </p>
                    
                    <div className="bg-muted/50 rounded-lg p-6 mb-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-2">Schedule</h3>
                          <p className="text-muted-foreground">
                            Second Thursday of each month from September to May at 7:00 PM
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <Video className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-2">Meeting Format</h3>
                          <p className="text-muted-foreground">
                            Held in person and on Zoom (link will be posted on the website by the morning of the meeting)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-lg p-6 border-l-4 border-primary">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-3">Location</h3>
                          <p className="font-semibold text-foreground mb-2">Rockville Memorial Library</p>
                          <p className="text-muted-foreground mb-1">21 Maryland Ave, Rockville MD 20850</p>
                          <p className="text-sm text-muted-foreground mb-3">
                            Follow signs for the meeting
                          </p>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Info className="w-4 h-4 text-primary" />
                              <span className="text-muted-foreground">Access to the Library is via the Town Centre</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Info className="w-4 h-4 text-primary" />
                              <span className="text-muted-foreground">Parking is free for 1:30 hours</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Info className="w-4 h-4 text-primary" />
                              <span className="text-muted-foreground">Meetings are held in Meeting Room 1 or 2</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <AdPlacement size="large" className="mb-6" />
                <AdPlacement size="medium" />
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <PartyPopper className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Upcoming Events</h2>
              </div>
              <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* October Meeting */}
              <Card className="overflow-hidden shadow-lg border-2 border-primary/30 hover:shadow-xl transition-all">
                <div className="bg-primary text-primary-foreground p-5">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    <h3 className="text-xl font-bold">October Meeting 2025</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground">When</p>
                        <p className="text-muted-foreground">Thursday, October 9th, 2025 @ 7:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground">Where</p>
                        <p className="text-muted-foreground">Rockville Memorial Library</p>
                        <p className="text-sm text-muted-foreground">21 Maryland Ave, Rockville MD 20850</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Video className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground">Zoom</p>
                        <p className="text-muted-foreground text-sm">Available on the day of the meeting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* November Meeting */}
              <Card className="overflow-hidden shadow-lg border-2 border-border hover:shadow-xl transition-all">
                <div className="bg-secondary text-white p-5">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    <h3 className="text-xl font-bold">November Meeting 2025</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground">When</p>
                        <p className="text-muted-foreground">Thursday, November 13th, 2025 @ 7:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground">Where</p>
                        <p className="text-muted-foreground">Rockville Memorial Library</p>
                        <p className="text-sm text-muted-foreground">21 Maryland Ave, Rockville MD 20850</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Video className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground">Zoom</p>
                        <p className="text-muted-foreground text-sm">Available on the day of the meeting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-muted border-2 border-border text-center">
              <p className="text-muted-foreground mb-2">
                <strong className="text-foreground">Note:</strong> No meetings in December 2025
              </p>
            </Card>

            <div className="mt-8">
              <AdPlacement size="banner" />
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Know about upcoming meetings and newsletters
            </p>
            <Button variant="secondary" size="lg" asChild>
              <a href="/#newsletter">Subscribe to Newsletter</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
