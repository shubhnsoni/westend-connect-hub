import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, FileText, Video } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import zoomLogoWhite from "@/assets/zoom-logo-white.png";
import { useTranslation } from "@/hooks/useTranslation";
import { usePageContent } from "@/hooks/usePageContent";

const parseLocalDate = (dateStr: string) => {
  const [datePart, timePart] = dateStr.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours = 0, minutes = 0] = (timePart || '').split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const Meetings = () => {
  const { t } = useTranslation();
  const { getContent } = usePageContent("homepage");
  const { data: nextMeeting } = useQuery({
    queryKey: ['homepage-next-meeting'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true })
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
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
        .limit(20);
      
      if (error) throw error;
      return data || [];
    },
  });

  const meetingsByYear = useMemo(() => {
    const grouped: Record<string, typeof pastMeetings> = {};
    pastMeetings.forEach((meeting) => {
      const year = parseLocalDate(meeting.date).getFullYear().toString();
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(meeting);
    });
    return Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a));
  }, [pastMeetings]);

  const nextMeetingCredentials = getMeetingCredentials(nextMeeting as any);

  return (
    <div id="meetings" className="animate-fade-in h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          {t(getContent("meetings_heading", "Meetings"))}
        </h3>
        <p className="text-muted-foreground">
          {t(getContent("meetings_intro", "Monthly meetings held second Thursday, September to May at 7 PM"))}
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {nextMeeting ? (
          <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-lg p-2.5 text-center min-w-[56px]">
                  <div className="text-xl font-bold leading-none mb-0.5">
                    {parseLocalDate(nextMeeting.date).toLocaleDateString('en-US', { day: 'numeric' })}
                  </div>
                  <div className="text-[10px] uppercase font-medium">
                    {parseLocalDate(nextMeeting.date).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-foreground mb-2">{t(nextMeeting.title)}</h4>

                  <div className="space-y-1 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {parseLocalDate(nextMeeting.date).toLocaleString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </span>
                    </div>

                    {nextMeeting.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{nextMeeting.location}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5" />
                      <span>{t("In person and on Zoom")}</span>
                    </div>
                  </div>


                  <div className="mt-3 flex flex-col gap-2">
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/events">{t("View Full Calendar")}</a>
                    </Button>

                    {nextMeeting.zoom_link && (
                      <Button 
                        className="w-full bg-[#2D8CFF] hover:bg-[#2171D8] text-white border-0 gap-2" 
                        asChild
                      >
                        <a href={nextMeeting.zoom_link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          <span className="text-sm font-medium">Join with</span>
                          <img src={zoomLogoWhite} alt="Zoom" className="h-4 w-auto" loading="lazy" />
                        </a>
                      </Button>
                    )}
                    {(nextMeetingCredentials.meetingId || nextMeetingCredentials.passcode) && (
                      <p className="text-xs text-muted-foreground">
                        {[nextMeetingCredentials.meetingId && `Meeting ID: ${nextMeetingCredentials.meetingId}`, nextMeetingCredentials.passcode && `Passcode: ${nextMeetingCredentials.passcode}`].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2">
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">{t("No upcoming meetings scheduled")}</p>
              <Button className="w-full mt-4" variant="outline" asChild>
                <a href="/events">{t("View Full Calendar")}</a>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Past Meetings - Year-Grouped Accordion */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              {t("Past Meetings & Minutes")}
            </h4>
          </div>
          
          {meetingsByYear.length > 0 ? (
            <Accordion type="single" collapsible defaultValue={meetingsByYear[0]?.[0]}>
              {meetingsByYear.map(([year, meetings]) => (
                <AccordionItem key={year} value={year}>
                  <AccordionTrigger className="text-base font-semibold">
                    {year} ({meetings.length} meeting{meetings.length !== 1 ? 's' : ''})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {meetings.map((meeting) => (
                        <div key={meeting.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm truncate">{t(meeting.title)}</p>
                            <p className="text-xs text-muted-foreground">
                              {parseLocalDate(meeting.date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                            </p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0 ml-2">
                            {meeting.minutes_url && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={meeting.minutes_url} target="_blank" rel="noopener noreferrer">{t("Minutes")}</a>
                              </Button>
                            )}
                            {meeting.agenda_url && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={meeting.agenda_url} target="_blank" rel="noopener noreferrer">{t("Agenda")}</a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">{t("No past meetings available")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meetings;
