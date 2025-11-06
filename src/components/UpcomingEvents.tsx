import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, ArrowRight } from "lucide-react";

const events = [
  {
    date: "Nov 15",
    title: "WECA Monthly Meeting",
    time: "7:00 PM",
    location: "City Hall",
    description: "Join us for our regular community meeting to discuss neighborhood matters."
  },
  {
    date: "Nov 23",
    title: "Neighborhood Tree Planting",
    time: "10:00 AM",
    location: "Beall Avenue",
    description: "Help beautify our neighborhood by planting trees along Beall Avenue."
  },
  {
    date: "Dec 5",
    title: "Holiday Lighting Walk",
    time: "6:00 PM",
    location: "Welsh Park",
    description: "Celebrate the season with a festive walk through the neighborhood."
  }
];

const UpcomingEvents = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          What's Happening Next
        </h2>
        <p className="text-lg text-muted-foreground">
          Mark your calendar for upcoming events
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {events.map((event, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-shadow duration-300 hover-scale border-l-4 border-l-primary"
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-lg p-2.5 text-center min-w-[56px]">
                  <div className="text-xl font-bold leading-none mb-0.5">
                    {event.date.split(' ')[1]}
                  </div>
                  <div className="text-[10px] uppercase font-medium">
                    {event.date.split(' ')[0]}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {event.title}
                  </h3>
                  <div className="space-y-1 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
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
