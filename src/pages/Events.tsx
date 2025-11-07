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
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Events = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ['events-page-upcoming'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: nextMeeting } = useQuery({
    queryKey: ['events-page-meeting'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

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
        {nextMeeting && (
          <section className="py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className="mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
                  <span className="text-primary">NEXT MEETING</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">WECA Meeting</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  All West End residents are welcome to attend
                </p>
              </div>

              <Card className="p-8 shadow-xl border-2 border-border rounded-2xl max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg mb-2">When</h3>
                        <p className="text-muted-foreground">
                          {new Date(nextMeeting.date).toLocaleDateString('en-US', { 
                            weekday: 'long',
                            month: 'long', 
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {nextMeeting.location && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-lg mb-2">Where</h3>
                          <p className="text-muted-foreground">{nextMeeting.location}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Video className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg mb-2">Format</h3>
                        <p className="text-muted-foreground">
                          In person and on Zoom (link posted morning of meeting)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    {nextMeeting.description && (
                      <div className="bg-muted/50 rounded-xl p-6 mb-4">
                        <h3 className="font-bold text-foreground text-lg mb-2">About</h3>
                        <p className="text-muted-foreground">{nextMeeting.description}</p>
                      </div>
                    )}
                    {nextMeeting.agenda_url && (
                      <Button variant="outline" className="w-full" asChild>
                        <a href={nextMeeting.agenda_url} target="_blank" rel="noopener noreferrer">
                          View Agenda
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

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

            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {upcomingEvents.map((event) => {
                  const eventDate = new Date(event.start_date);
                  return (
                    <Card key={event.id} className="overflow-hidden shadow-xl border-0 hover:shadow-2xl transition-all rounded-2xl">
                      <div className="bg-primary text-primary-foreground p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                            <Calendar className="w-6 h-6" />
                          </div>
                          <h3 className="text-2xl font-bold">{event.title}</h3>
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
                              <p className="text-muted-foreground">
                                {eventDate.toLocaleDateString('en-US', { 
                                  weekday: 'long',
                                  month: 'long', 
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: 'numeric',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                          {event.location && (
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-bold text-foreground mb-1">Where</p>
                                <p className="text-muted-foreground">{event.location}</p>
                              </div>
                            </div>
                          )}
                          {event.description && (
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Info className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-bold text-foreground mb-1">Details</p>
                                <p className="text-muted-foreground text-sm">{event.description}</p>
                              </div>
                            </div>
                          )}
                          {event.registration_url && (
                            <Button className="w-full" asChild>
                              <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                                Register Now
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No upcoming events at this time. Check back soon!</p>
              </Card>
            )}

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
