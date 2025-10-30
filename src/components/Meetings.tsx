import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Video } from "lucide-react";

const Meetings = () => {
  return (
    <section id="meetings" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">Upcoming Meeting</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>

          <Card className="overflow-hidden shadow-xl border-2 border-primary/20 animate-scale-in">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6" />
                <h3 className="text-2xl font-bold">October Meeting 2025</h3>
              </div>
              <p className="text-primary-foreground/90">Join us for community updates and discussions</p>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                {/* Date & Time */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">When</h4>
                    <p className="text-muted-foreground">Thursday, October 9th, 2025 @ 7:00 PM</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Where</h4>
                    <p className="text-muted-foreground">Rockville Memorial Library - Rockville Town Center</p>
                    <p className="text-muted-foreground">21 Maryland Ave, Rockville MD 20850</p>
                    <p className="text-muted-foreground font-medium mt-1">Meeting Room 2 (Second Floor)</p>
                  </div>
                </div>

                {/* Virtual Option */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Join Virtually</h4>
                    <p className="text-muted-foreground mb-2">Can't make it in person? Join us via Zoom</p>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://us06web.zoom.us/j/85048870797?pwd=zZakxmaiNnHimXwi4YIVuUsNnKMCSM.1" target="_blank" rel="noopener noreferrer">
                        Join Zoom Meeting
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> The meeting location has changed. Please note the new venue at Rockville Memorial Library.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Meetings;
