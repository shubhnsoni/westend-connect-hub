import { useState, useMemo } from "react";
import Header from "@/components/Header";
import TopAdBanner from "@/components/TopAdBanner";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

import EventCalendar from "@/components/EventCalendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Video, Info, PartyPopper, ArrowRight, Download, CalendarX } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AdPlacement from "@/components/AdPlacement";
import EventSubmissionForm from "@/components/EventSubmissionForm";
import { downloadICS } from "@/lib/generateICS";
import NewsletterDialog from "@/components/NewsletterDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { usePageContent } from "@/hooks/usePageContent";
import zoomLogoWhite from "@/assets/zoom-logo-white.png";
import { useTranslation } from "@/hooks/useTranslation";

const parseLocalDate = (dateStr: string) => {
  const [datePart, timePart] = dateStr.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours = 0, minutes = 0] = (timePart || '').split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

const getMeetingCredentials = (meeting: { meeting_id?: string | null; passcode?: string | null; description?: string | null } | null | undefined) => {
  if (!meeting) return { meetingId: null, passcode: null };

  const meetingId = meeting.meeting_id?.trim() || null;
  const passcode = meeting.passcode?.trim() || null;

  if (meetingId || passcode) {
    return { meetingId, passcode };
  }

  const description = meeting.description || "";
  const meetingIdMatch = description.match(/meeting\s*id[:\s]*([0-9][0-9\s-]{5,})/i);
  const passcodeMatch = description.match(/passcode[:\s]*([a-z0-9-]+)/i);

  return {
    meetingId: meetingIdMatch?.[1]?.trim() || null,
    passcode: passcodeMatch?.[1]?.trim() || null,
  };
};

const Events = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const { getContent } = usePageContent("events");
  const { t } = useTranslation();

  const heroBadge = getContent('hero_badge', 'EVENTS & CALENDAR');
  const heroTitle = getContent('hero_title', 'Events & Meetings');
  const heroSubtitle = getContent('hero_subtitle', 'Join us at our monthly meetings and community events');
  const meetingBadge = getContent('meeting_badge', 'NEXT MEETING');
  const meetingTitle = getContent('meeting_title', 'WECA Meeting');
  const meetingSubtitle = getContent('meeting_subtitle', 'All West End residents are welcome to attend');
  const meetingFormat = getContent('meeting_format', 'In person and on Zoom (link posted morning of meeting)');
  const calendarTitle = getContent('calendar_title', 'Event Calendar');
  const calendarSubtitle = getContent('calendar_subtitle', 'Browse events by date');
  const upcomingTitle = getContent('upcoming_title', 'Upcoming Events');
  const upcomingSubtitle = getContent('upcoming_subtitle', 'Mark your calendar for these important community gatherings');
  const noEventsTitle = getContent('no_events_title', 'No upcoming events');
  const noEventsSubtitle = getContent('no_events_subtitle', 'Check back soon for new community gatherings!');
  const pastTitle = getContent('past_title', 'Past Events');
  const pastSubtitle = getContent('past_subtitle', 'Browse our community event history');
  const submitTitle = getContent('submit_title', 'Have an Event?');
  const submitSubtitle = getContent('submit_subtitle', "Submit a community event for review and we'll add it to the calendar");
  const newsletterTitle = getContent('newsletter_title', 'Stay Informed');
  const newsletterSubtitle = getContent('newsletter_subtitle', 'Get updates about upcoming meetings and community news');
  const newsletterButton = getContent('newsletter_button', 'Subscribe to Newsletter');

  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ['events-page-upcoming'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('submission_status', 'approved')
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  const { data: pastEvents = [] } = useQuery({
    queryKey: ['events-page-past'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .lt('start_date', new Date().toISOString())
        .eq('submission_status', 'approved')
        .order('start_date', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const pastEventsByYear = useMemo(() => {
    const grouped: Record<number, typeof pastEvents> = {};
    pastEvents.forEach((event) => {
      const year = parseLocalDate(event.start_date).getFullYear();
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(event);
    });
    return Object.entries(grouped)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, events]) => ({ year: Number(year), events }));
  }, [pastEvents]);

  const { data: allEvents = [] } = useQuery({
    queryKey: ['events-page-calendar'],
    queryFn: async () => {
      const { data: eventsData, error: eventsError } = await supabase
        .from('events').select('*').order('start_date', { ascending: true });
      if (eventsError) throw eventsError;
      const { data: meetingsData, error: meetingsError } = await supabase
        .from('meetings').select('*').order('date', { ascending: true });
      if (meetingsError) throw meetingsError;
      const meetingEvents = (meetingsData || []).map(m => ({
        id: m.id, title: m.title, start_date: m.date, end_date: null,
        location: m.location, description: m.description,
      }));
      return [...(eventsData || []), ...meetingEvents];
    },
  });

  const { data: nextMeeting } = useQuery({
    queryKey: ['events-page-meeting'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meetings').select('*')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true }).limit(1).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const nextMeetingCredentials = getMeetingCredentials(nextMeeting as any);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Events & Meetings | West End Civic Association"
        description="Join us at WECA monthly meetings and community events. Stay connected with your West End neighborhood."
        canonicalUrl="https://westendrockvillemd.org/events"
        jsonLd={upcomingEvents.length > 0 ? upcomingEvents.map(event => ({
          "@context": "https://schema.org",
          "@type": "Event",
          name: event.title,
          startDate: event.start_date,
          ...(event.end_date ? { endDate: event.end_date } : {}),
          ...(event.location ? { location: { "@type": "Place", name: event.location } } : {}),
          ...(event.description ? { description: event.description } : {}),
          eventAttendanceMode: event.zoom_link
            ? "https://schema.org/MixedEventAttendanceMode"
            : "https://schema.org/OfflineEventAttendanceMode",
          organizer: { "@type": "Organization", name: "West End Civic Association" },
        })) : undefined}
      />
      <Header />
      <div className="pt-20">
        <TopAdBanner />
      </div>
      
      <main className="bg-background" id="main-content">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full text-sm font-medium mb-6">
                <Calendar className="w-4 h-4" />
                <span>{t(heroBadge)}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">{t(heroTitle)}</h1>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">{t(heroSubtitle)}</p>
            </div>
          </div>
        </section>

        {/* Monthly Meeting */}
        {nextMeeting && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
                  <span className="text-primary">{t(meetingBadge)}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t(meetingTitle)}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t(meetingSubtitle)}</p>
              </div>

              <Card className="p-8 shadow-xl border-2 border-border rounded-2xl max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg mb-2">{t("When")}</h3>
                        <p className="text-muted-foreground">
                          {parseLocalDate(nextMeeting.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    {nextMeeting.location && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-lg mb-2">{t("Where")}</h3>
                          <p className="text-muted-foreground">{nextMeeting.location}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Video className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg mb-2">{t("Format")}</h3>
                        <p className="text-muted-foreground">{t(meetingFormat)}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    {nextMeeting.description && (
                      <div className="bg-muted/50 rounded-xl p-6 mb-4">
                        <h3 className="font-bold text-foreground text-lg mb-2">{t("About")}</h3>
                        <p className="text-muted-foreground">{nextMeeting.description}</p>
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      {nextMeeting.zoom_link && (
                        <Button 
                          className="w-full flex items-center justify-center gap-2 bg-[#2D8CFF] hover:bg-[#2171D8] text-white border-0" 
                          asChild
                        >
                          <a href={nextMeeting.zoom_link} target="_blank" rel="noopener noreferrer">
                            <span className="text-sm font-medium">Join with</span>
                            <img src={zoomLogoWhite} alt="Zoom" className="h-4 w-auto" loading="lazy" />
                          </a>
                        </Button>
                      )}
                      {(nextMeetingCredentials.meetingId || nextMeetingCredentials.passcode) && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {[nextMeetingCredentials.meetingId && `Meeting ID: ${nextMeetingCredentials.meetingId}`, nextMeetingCredentials.passcode && `Passcode: ${nextMeetingCredentials.passcode}`].filter(Boolean).join(' · ')}
                        </p>
                      )}
                      {nextMeeting.agenda_url && (
                        <Button variant="outline" className="w-full" asChild>
                          <a href={nextMeeting.agenda_url} target="_blank" rel="noopener noreferrer">{t("View Agenda")}</a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Calendar */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t(calendarTitle)}</h2>
              <p className="text-muted-foreground">{t(calendarSubtitle)}</p>
            </div>
            <EventCalendar events={allEvents} />
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <PartyPopper className="w-8 h-8 text-primary" />
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t(upcomingTitle)}</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t(upcomingSubtitle)}</p>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="space-y-8 mb-8">
                {upcomingEvents.map((event) => {
                  const eventDate = parseLocalDate(event.start_date);
                  return (
                    <Card key={event.id} className="overflow-hidden shadow-xl border-0 hover:shadow-2xl transition-all rounded-2xl">
                      <div className="bg-primary text-primary-foreground p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                            <Calendar className="w-6 h-6" />
                          </div>
                          <h3 className="text-2xl font-bold">{t(event.title)}</h3>
                        </div>
                      </div>
                      <div className="p-8 bg-background">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-bold text-foreground mb-1">{t("When")}</p>
                              <p className="text-muted-foreground">
                                {eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                          {event.location && (
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-bold text-foreground mb-1">{t("Where")}</p>
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
                                <p className="font-bold text-foreground mb-1">{t("Details")}</p>
                                <p className="text-muted-foreground text-sm">{t(event.description)}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 flex-wrap mt-6">
                          {event.zoom_link && (
                            <Button variant="outline" className="flex items-center gap-2" asChild>
                              <a href={event.zoom_link} target="_blank" rel="noopener noreferrer">
                                <Video className="w-4 h-4" />
                                {t("Join with Zoom")}
                              </a>
                            </Button>
                          )}
                          {event.registration_url && (
                            <Button className="flex-1" asChild>
                              <a href={event.registration_url} target="_blank" rel="noopener noreferrer">{t("Register Now")}</a>
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => downloadICS({
                            title: event.title, description: event.description || "",
                            startDate: event.start_date, endDate: event.end_date || event.start_date,
                            location: event.location || "",
                          })}>
                            <Download className="w-4 h-4 mr-1" />.ics
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="p-12 text-center border-dashed border-2">
                <CalendarX className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground mb-1">{t(noEventsTitle)}</p>
                <p className="text-sm text-muted-foreground/70">{t(noEventsSubtitle)}</p>
              </Card>
            )}
          </div>
        </section>

        {/* Past Events */}
        {pastEventsByYear.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className="mb-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t(pastTitle)}</h2>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t(pastSubtitle)}</p>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {pastEventsByYear.map(({ year, events }) => (
                  <AccordionItem key={year} value={String(year)} className="border rounded-xl px-6 bg-card shadow-sm">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <span className="flex items-center gap-3">
                        <span>{year}</span>
                        <span className="text-sm font-normal text-muted-foreground">({events.length} event{events.length !== 1 ? 's' : ''})</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="divide-y divide-border">
                        {events.map((event) => {
                          const eventDate = parseLocalDate(event.start_date);
                          return (
                            <div key={event.id} className="flex items-center gap-6 py-4 first:pt-0 last:pb-0">
                              <div className="w-16 h-16 rounded-xl bg-muted flex flex-col items-center justify-center flex-shrink-0">
                                <span className="text-xs font-medium text-muted-foreground uppercase">
                                  {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                                </span>
                                <span className="text-xl font-bold text-foreground leading-tight">{eventDate.getDate()}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-foreground truncate">{t(event.title)}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                  </span>
                                  {event.location && (
                                    <span className="flex items-center gap-1 truncate">
                                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                      {event.location}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="flex-shrink-0" onClick={() => downloadICS({
                                title: event.title, description: event.description || "",
                                startDate: event.start_date, endDate: event.end_date || event.start_date,
                                location: event.location || "",
                              })}>
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* Submit Event */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t(submitTitle)}</h2>
              <p className="text-muted-foreground">{t(submitSubtitle)}</p>
            </div>
            <EventSubmissionForm />
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
             <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t(newsletterTitle)}</h2>
             <p className="text-xl mb-8 text-primary-foreground/90">{t(newsletterSubtitle)}</p>
             <Button variant="secondary" size="lg" className="rounded-full px-8 text-base shadow-lg" onClick={() => setIsNewsletterOpen(true)}>
               {t(newsletterButton)}
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
