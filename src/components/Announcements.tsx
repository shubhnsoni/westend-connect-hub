import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Megaphone } from "lucide-react";

const announcements = [
  {
    title: "Listening Session Highlights",
    date: "October 1, 2024",
    category: "Community",
    description: "Thanks to everyone who packed our Listening Session (25+ neighbors!). Keep the momentum going: take our quick survey and choose the top 3 priorities for WECA."
  },
  {
    title: "Meeting Location Change",
    date: "September 28, 2024",
    category: "Important",
    description: "Please note: Our monthly meetings have moved to Rockville Memorial Library. See the meeting section for details."
  },
  {
    title: "Neighborhood Tree Planting Initiative",
    date: "September 15, 2024",
    category: "Environment",
    description: "Join us for a community tree planting event along Beall Avenue. Help make our neighborhood greener!"
  }
];

const Announcements = () => {
  return (
    <div id="announcements" className="animate-fade-in">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Megaphone className="w-6 h-6 text-primary" />
          Announcements
        </h3>
        <p className="text-muted-foreground">
          Important community updates
        </p>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <Card key={index} className="border-l-4 border-l-secondary hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{announcement.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{announcement.date}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="flex-shrink-0">
                  {announcement.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm">{announcement.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
