import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import zoomIcon from "@/assets/zoom-icon.png";
import { useRef } from "react";

const Meetings = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { data: nextMeeting } = useQuery({
    queryKey: ['next-meeting'],
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

  const { data: pastMeetings = [] } = useQuery({
    queryKey: ['past-meetings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .lt('date', new Date().toISOString())
        .order('date', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data || [];
    },
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div id="meetings" className="animate-fade-in h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Meetings
        </h3>
        <p className="text-muted-foreground">
          Monthly meetings held second Thursday, September to May at 7 PM
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {nextMeeting ? (
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Next Meeting</p>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {new Date(nextMeeting.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </h4>
                </div>
                
                {nextMeeting.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{nextMeeting.location}</p>
                    </div>
                  </div>
                )}

                {nextMeeting.description && (
                  <p className="text-sm text-muted-foreground">{nextMeeting.description}</p>
                )}

                <div className="flex gap-2 mt-3">
                  {nextMeeting.location?.includes('zoom.us') && (
                    <Button 
                      variant="outline" 
                      className="flex-1 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors" 
                      asChild
                    >
                      <a href={nextMeeting.location} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <img src={zoomIcon} alt="Zoom" className="w-5 h-5" />
                        Join Zoom
                      </a>
                    </Button>
                  )}
                  <Button variant={nextMeeting.location?.includes('zoom.us') ? "outline" : "default"} className="flex-1" asChild>
                    <a href="/events">View Full Calendar</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2">
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">No upcoming meetings scheduled</p>
              <Button className="w-full mt-4" variant="outline" asChild>
                <a href="/events">View Full Calendar</a>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Past Meetings Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Past Meetings
            </h4>
            <Button variant="ghost" size="sm" asChild>
              <a href="/resources" className="text-primary hover:text-primary/80">See All Minutes</a>
            </Button>
          </div>
          
          {pastMeetings.length > 0 ? (
            <div className="relative group">
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background shadow-md"
                onClick={() => scroll('left')}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div 
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2"
              >
                {pastMeetings.map((meeting) => (
                  <a
                    key={meeting.id}
                    href={meeting.minutes_url || "/resources"}
                    className="min-w-[calc(50%-6px)] snap-start flex-shrink-0 p-4 rounded-lg border-2 border-border hover:border-primary transition-all group/card bg-card"
                    target={meeting.minutes_url ? "_blank" : undefined}
                    rel={meeting.minutes_url ? "noopener noreferrer" : undefined}
                  >
                    <div>
                      <p className="font-medium text-foreground text-sm group-hover/card:text-primary transition-colors line-clamp-2">
                        {meeting.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(meeting.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background shadow-md"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No past meetings available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meetings;
