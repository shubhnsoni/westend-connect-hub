import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, ArrowRight, History, Video } from "lucide-react";
import zoomIcon from "@/assets/zoom-icon.png";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMemo } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { usePageContent } from "@/hooks/usePageContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

const parseLocalDate = (dateStr: string) => {
  const [datePart, timePart] = dateStr.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours = 0, minutes = 0] = (timePart || '').split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

const UpcomingEvents = () => {
  const { t } = useTranslation();
  const { getContent } = usePageContent("homepage");
  const { data: events = [] } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('submission_status', 'approved')
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: pastEvents = [] } = useQuery({
    queryKey: ['past-events-home'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .lt('start_date', new Date().toISOString())
        .eq('submission_status', 'approved')
        .order('start_date', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data || [];
    },
  });

  const eventsByYear = useMemo(() => {
    const grouped: Record<string, typeof pastEvents> = {};
    pastEvents.forEach((event) => {
      const year = parseLocalDate(event.start_date).getFullYear().toString();
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(event);
    });
    return Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a));
  }, [pastEvents]);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Clock className="w-6 h-6 text-primary" />
          {t(getContent("upcoming_events_heading", "Upcoming Events"))}
        </h3>
        <p className="text-muted-foreground">
          {t(getContent("upcoming_events_intro", "Mark your calendar for upcoming events"))}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {events.length > 0 ? events.map((event) => {
          const eventDate = parseLocalDate(event.start_date);
          const dateStr = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const timeStr = eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          
          return (
            <Card 
              key={event.id} 
              className="hover:shadow-lg transition-shadow duration-300 hover-scale border-l-4 border-l-primary"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-lg p-2.5 text-center min-w-[56px]">
                    <div className="text-xl font-bold leading-none mb-0.5">
                      {dateStr.split(' ')[1]}
                    </div>
                    <div className="text-[10px] uppercase font-medium">
                      {dateStr.split(' ')[0]}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-foreground mb-2">
                      {t(event.title)}
                    </h3>
                    <div className="space-y-1 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{eventDate.toLocaleString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.zoom_link && (
                        <div className="flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5" />
                          <span>{t("In person and on Zoom")}</span>
                        </div>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {t(event.description)}
                      </p>
                    )}
                    {event.zoom_link && (
                      <Button variant="outline" size="sm" className="mt-2 text-xs" asChild>
                        <a href={event.zoom_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                          <img src={zoomIcon} alt="Zoom" className="w-4 h-4" loading="lazy" />
                          {t("Join with Zoom")}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        }) : (
          <Card className="border-dashed border-2">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">{t("No upcoming events scheduled")}</p>
              <p className="text-xs text-muted-foreground/60 mt-1">{t("Check the full calendar for past and future events")}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mb-4">
        <Button variant="outline" size="default" className="w-full" asChild>
          <a href="/events" className="group">
            {t("See Full Calendar")}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      {/* Past Events - Year-Grouped Accordion */}
      <div className="space-y-3">
        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          {t("Past Events")}
        </h4>
        
        {eventsByYear.length > 0 ? (
          <Accordion type="single" collapsible defaultValue={eventsByYear[0]?.[0]}>
            {eventsByYear.map(([year, yearEvents]) => (
              <AccordionItem key={year} value={year}>
                <AccordionTrigger className="text-base font-semibold">
                  {year} ({yearEvents.length} event{yearEvents.length !== 1 ? 's' : ''})
                </AccordionTrigger>
                <AccordionContent>
                  <ScrollArea className={yearEvents.length > 5 ? "h-[300px]" : ""}>
                    <div className="space-y-2 pr-3">
                      {yearEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm truncate">{t(event.title)}</p>
                            <p className="text-xs text-muted-foreground">
                              {parseLocalDate(event.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              {event.location && ` · ${event.location}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">{t("No past events available")}</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
