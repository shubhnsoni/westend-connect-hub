import { Card, CardContent } from "@/components/ui/card";
import { Mail, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { usePageContent } from "@/hooks/usePageContent";
import { useTranslation } from "@/hooks/useTranslation";

const defaultLeaders = [
  { name: "Ajay Khetarpal", role: "President", email: "westendcapresident@gmail.com", initial: "AK", bio: "A long-time West End resident and community advocate, Ajay leads WECA's mission to preserve the neighborhood's character while fostering inclusive growth." },
  { name: "Darlene Pierro", role: "Vice President", email: "westendca.vp@gmail.com", initial: "DP", bio: "Darlene coordinates community outreach and event planning, bringing decades of neighborhood involvement and a passion for connecting residents." },
  { name: "Louise Lovell", role: "Treasurer", email: "westendca.treasurer@gmail.com", initial: "LL", bio: "Louise manages WECA's finances with transparency and precision, ensuring every contribution directly benefits our community programs." },
  { name: "Kelly Kalepe", role: "Recording Secretary", email: "westendca.recordingsecretary@gmail.com", initial: "KK", bio: "Kelly documents meeting proceedings and maintains our records, keeping the community informed about decisions and discussions." },
  { name: "Duane Rollins", role: "Corresponding Secretary", email: "", initial: "DR", bio: "Duane handles external communications and correspondence, serving as a key liaison between WECA and city officials." },
];

const Leadership = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { getContent, getJSON } = usePageContent("homepage");
  const { t } = useTranslation();

  const badge = getContent('leadership_badge', 'OUR TEAM');
  const title = getContent('leadership_title', 'Meet Our Leadership Team');
  const subtitle = getContent('leadership_subtitle', 'Dedicated volunteers working to serve and strengthen our West End community');
  const leaders = getJSON('leadership_members', defaultLeaders);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const autoScroll = setInterval(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 400, behavior: 'smooth' });
      }
    }, 5000);
    return () => clearInterval(autoScroll);
  }, []);

  return (
    <div id="leadership" className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
            <span className="text-primary">{t(badge)}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t(title)}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t(subtitle)}</p>
        </div>

        <div className="relative">
          <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory" style={{ scrollbarWidth: 'thin' }}>
            {leaders.map((leader: any, index: number) => (
              <Card key={index} className="flex-shrink-0 w-[380px] hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 group snap-start">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-3xl font-bold text-primary-foreground">{leader.initial}</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl text-foreground mb-1 leading-tight">{leader.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium mb-3 uppercase tracking-wide">{t(leader.role)}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t(leader.bio)}</p>
                      {leader.email && (
                        <a href={`mailto:${leader.email}`} className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group/link px-4 py-2 bg-primary/10 rounded-lg hover:bg-primary/20">
                          <Mail className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                          <span>{t("Contact")}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership;
