import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

const Meetings = () => {
  return (
    <div id="meetings" className="animate-fade-in">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Meetings
        </h3>
        <p className="text-muted-foreground">
          Join us at our community meetings
        </p>
      </div>

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
    </div>
  );
};

export default Meetings;
