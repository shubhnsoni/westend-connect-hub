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
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative -mt-20 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <a 
                key={index} 
                href={link.href}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background rounded-2xl overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-md">
                      <Icon className="w-9 h-9 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
