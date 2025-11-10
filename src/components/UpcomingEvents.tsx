import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const UpcomingEvents = () => {
  const { data: events = [] } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          What's Happening Next
        </h2>
        <p className="text-lg text-muted-foreground">
          Mark your calendar for upcoming events
        </p>
      </div>

      <div className="space-y-4 mb-8 flex-1">
        {events.map((event, index) => {
          const eventDate = new Date(event.start_date);
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
                      {event.title}
                    </h3>
                    <div className="space-y-1 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{timeStr}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-auto">
        <Button variant="outline" size="default" className="w-full" asChild>
          <a href="/events" className="group">
            See Full Calendar
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default UpcomingEvents;
