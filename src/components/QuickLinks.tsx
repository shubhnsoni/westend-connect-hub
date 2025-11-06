import { Calendar, Newspaper, Compass, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const links = [
  {
    icon: Calendar,
    title: "Events & Meetings",
    description: "Stay informed about upcoming community gatherings",
    href: "/events"
  },
  {
    icon: Newspaper,
    title: "News & Updates",
    description: "Read the latest stories and development updates",
    href: "/blog"
  },
  {
    icon: Compass,
    title: "Resources",
    description: "Access city services, zoning information, and helpful links",
    href: "/resources"
  },
  {
    icon: MessageSquare,
    title: "Feedback",
    description: "Share your thoughts, report issues, or ask questions",
    href: "#contact"
  }
];

const QuickLinks = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-background relative -mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <a 
                key={index} 
                href={link.href}
                className="group animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
