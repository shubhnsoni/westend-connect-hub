import { Calendar, Newspaper, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { usePageContent } from "@/hooks/usePageContent";
import { useTranslation } from "@/hooks/useTranslation";

const iconMap: Record<string, React.ComponentType<any>> = { Calendar, Newspaper, Compass };

const defaultLinks = [
  { icon: "Calendar", title: "Events & Meetings", description: "Stay informed about upcoming community gatherings", href: "/events" },
  { icon: "Newspaper", title: "News & Updates", description: "Read the latest stories and development updates", href: "/blog" },
  { icon: "Compass", title: "Resources", description: "Access city services, zoning information, and helpful links", href: "/resources" },
];

const QuickLinks = () => {
  const { getJSON } = usePageContent("homepage");
  const { t } = useTranslation();
  const links = getJSON('quick_links', defaultLinks);

  return (
    <section className="py-10 bg-background relative -mt-20 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {links.map((link: any, index: number) => {
            const Icon = iconMap[link.icon] || Calendar;
            return (
              <a 
                key={index} 
                href={link.href}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full border border-primary/15 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-primary/5 backdrop-blur-xl rounded-2xl overflow-hidden group-hover:bg-primary/10">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-white/50 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-500 shadow-inner">
                      <Icon className="w-9 h-9 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {t(link.title)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(link.description)}
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
