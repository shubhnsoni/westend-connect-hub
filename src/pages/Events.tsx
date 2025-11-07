import { useState } from "react";
import Header from "@/components/Header";
import TopAdBanner from "@/components/TopAdBanner";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Video, Info, PartyPopper, ArrowRight } from "lucide-react";
import AdPlacement from "@/components/AdPlacement";
import NewsletterDialog from "@/components/NewsletterDialog";

const Events = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <SEO 
        title="Events & Meetings | West End Civic Association"
        description="Join us at WECA monthly meetings and community events. Stay connected with your West End neighborhood."
      />
      <Header />
      <div className="pt-20">
        <TopAdBanner />
      </div>
      
      <main className="bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full text-sm font-medium mb-6">
                <Calendar className="w-4 h-4" />
                <span>EVENTS & CALENDAR</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Events & Meetings</h1>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Join us at our monthly meetings and community events
              </p>
            </div>
          </div>
        </section>

        {/* Monthly Meeting Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
                <span className="text-primary">MONTHLY MEETINGS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">WECA Meetings</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All West End residents are welcome to attend our monthly meetings
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2 space-y-8">
                <Card className="p-8 shadow-xl border-2 border-border rounded-2xl">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-foreground leading-relaxed mb-6">
                      There are two General Membership meetings each year in 
                      <strong> October and May</strong>. The May meeting includes the election of the officers for the 
                      following year. All meetings typically include guest speakers, business items, a report from the 
                      Rockville Police Department, announcements, and an open forum.
                    </p>
                    
                    <div className="bg-muted/50 rounded-xl p-6 mb-6 border border-border">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-lg mb-2">Schedule</h3>
                          <p className="text-muted-foreground">
                            Second Thursday of each month from September to May at 7:00 PM
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <Video className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-lg mb-2">Meeting Format</h3>
                          <p className="text-muted-foreground">
                            Held in person and on Zoom (link will be posted on the website by the morning of the meeting)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-6 border-l-4 border-primary">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-lg mb-3">Location</h3>
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
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <PartyPopper className="w-8 h-8 text-primary" />
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Upcoming Events</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Mark your calendar for these important community gatherings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* October Meeting */}
              <Card className="overflow-hidden shadow-xl border-0 hover:shadow-2xl transition-all rounded-2xl">
                <div className="bg-primary text-primary-foreground p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">October Meeting</h3>
                  </div>
                </div>
                <div className="p-8 bg-background">
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground mb-1">When</p>
                        <p className="text-muted-foreground">Thursday, October 9th, 2025 @ 7:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground mb-1">Where</p>
                        <p className="text-muted-foreground">Rockville Memorial Library</p>
                        <p className="text-sm text-muted-foreground">21 Maryland Ave, Rockville MD 20850</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Video className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground mb-1">Zoom</p>
                        <p className="text-muted-foreground text-sm">Available on the day of the meeting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* November Meeting */}
              <Card className="overflow-hidden shadow-xl border-0 hover:shadow-2xl transition-all rounded-2xl">
                <div className="bg-secondary text-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">November Meeting</h3>
                  </div>
                </div>
                <div className="p-8 bg-background">
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground mb-1">When</p>
                        <p className="text-muted-foreground">Thursday, November 13th, 2025 @ 7:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground mb-1">Where</p>
                        <p className="text-muted-foreground">Rockville Memorial Library</p>
                        <p className="text-sm text-muted-foreground">21 Maryland Ave, Rockville MD 20850</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Video className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground mb-1">Zoom</p>
                        <p className="text-muted-foreground text-sm">Available on the day of the meeting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-muted/50 border-2 border-border text-center rounded-2xl">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Note:</strong> No meetings in December 2025
              </p>
            </Card>

            <div className="mt-12">
              <AdPlacement size="banner" />
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Informed</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Get updates about upcoming meetings and community news
            </p>
            <Button variant="secondary" size="lg" className="rounded-full px-8 text-base shadow-lg" onClick={() => setIsNewsletterOpen(true)}>
              Subscribe to Newsletter
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>

      <NewsletterDialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
      <Footer />
    </div>
  );
};

export default Events;
