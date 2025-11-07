import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, FileText } from "lucide-react";

const pastMeetings = [
  { date: "September 12, 2024", title: "September Meeting Minutes" },
  { date: "May 9, 2024", title: "May Meeting Minutes" },
  { date: "April 11, 2024", title: "April Meeting Minutes" },
];

const Meetings = () => {
  return (
    <div id="meetings" className="animate-fade-in h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Meetings
        </h3>
        <p className="text-muted-foreground">
          Join us at our community meetings
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <Card className="border-2 hover:border-primary/50 transition-all">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Next Meeting</p>
                <h4 className="text-xl font-bold text-foreground mb-3">Thursday, October 9th @ 7 PM</h4>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Rockville City Hall</p>
                  <p className="text-sm text-muted-foreground">111 Maryland Avenue, Rockville, MD 20850</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">7:00 PM - 9:00 PM</p>
                  <p className="text-sm text-muted-foreground">Doors open at 6:45 PM</p>
                </div>
              </div>

              <Button className="w-full mt-4" asChild>
                <a href="/events">View All Meetings</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Past Meetings Section */}
        <Card className="border-2">
          <CardContent className="p-6">
            <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Past Meetings
            </h4>
            <div className="space-y-3">
              {pastMeetings.map((meeting, index) => (
                <a
                  key={index}
                  href="/resources"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                      {meeting.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{meeting.date}</p>
                  </div>
                  <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
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
