import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Meetings = () => {
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
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
  });

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
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Next Meeting</p>
                  <h4 className="text-xl font-bold text-foreground mb-3">
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
                      <p className="font-semibold text-foreground">{nextMeeting.location}</p>
                    </div>
                  </div>
                )}

                {nextMeeting.description && (
                  <p className="text-sm text-muted-foreground">{nextMeeting.description}</p>
                )}

                <Button className="w-full mt-4" asChild>
                  <a href="/events">View All Meetings</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2">
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">No upcoming meetings scheduled</p>
              <Button className="w-full mt-4" variant="outline" asChild>
                <a href="/events">View All Meetings</a>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Past Meetings Section */}
        <Card className="border-2">
          <CardContent className="p-6">
            <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Past Meetings
            </h4>
            <div className="space-y-3">
              {pastMeetings.length > 0 ? (
                pastMeetings.map((meeting) => (
                  <a
                    key={meeting.id}
                    href={meeting.minutes_url || "/resources"}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                    target={meeting.minutes_url ? "_blank" : undefined}
                    rel={meeting.minutes_url ? "noopener noreferrer" : undefined}
                  >
                    <div>
                      <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                        {meeting.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(meeting.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No past meetings available</p>
              )}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <a href="/resources">See All Minutes</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Meetings;
