import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What's Happening Next
          </h2>
          <p className="text-lg text-muted-foreground">
            Mark your calendar for these upcoming community events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {events.map((event, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow duration-300 animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 text-center min-w-[60px]">
                    <div className="text-2xl font-bold leading-none mb-1">
                      {event.date.split(' ')[1]}
                    </div>
                    <div className="text-xs uppercase">
                      {event.date.split(' ')[0]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <a href="/events" className="group">
              See Full Calendar
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
