import { Button } from "@/components/ui/button";
import { MapPin, Users, Heart, Calendar } from "lucide-react";
import headerBg from "@/assets/header-bg.png";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { usePageContent } from "@/hooks/usePageContent";
import { useTranslation } from "@/hooks/useTranslation";

const iconMap: Record<string, React.ComponentType<any>> = { MapPin, Users, Heart };

const defaultStats = [
  { value: "700+", label: "Acres", icon: "MapPin" },
  { value: "1,600+", label: "Households", icon: "Users" },
  { value: "100%", label: "Volunteer-Led", icon: "Heart" },
];

const Hero = () => {
  const { getContent, getJSON } = usePageContent("homepage");
  const { t } = useTranslation();

  const { data: nextMeeting } = useQuery({
    queryKey: ['hero-next-meeting'],
    queryFn: async () => {
      const now = new Date().toISOString();
      const { data } = await supabase
        .from('meetings')
        .select('id, title, date')
        .gte('date', now)
        .eq('status', 'upcoming')
        .order('date', { ascending: true })
        .limit(1)
        .single();
      return data;
    },
  });

  const formatMeetingDate = (dateStr: string) => {
    const [datePart, timePart] = dateStr.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = (timePart || '00:00').split(':').map(Number);
    const date = new Date(year, month - 1, day, hours, minutes);
    return format(date, "MMM d '@' h:mm a");
  };

  const badge = getContent('hero_badge', 'Serving 5,000+ Residents Since 1970');
  const title = getContent('hero_title', 'West End Civic Association');
  const description = getContent('hero_description', 'The West End Civic Association ("WECA") strives to be the model of an effective neighborhood organization and a focal point for our West End Rockville neighborhood. Our priorities are to advance and safeguard the interests and welfare of the entire community, assure positive neighborhood interactions, promote open and regular communication, maintain an orientation of service, and preserve the charitable character of the neighborhood.');
  const ctaPrimaryLabel = getContent('hero_cta_primary_label', 'Upcoming Meetings');
  const ctaPrimaryLink = getContent('hero_cta_primary_link', '#meetings');
  const ctaSecondaryLabel = getContent('hero_cta_secondary_label', 'Get Involved');
  const ctaSecondaryLink = getContent('hero_cta_secondary_link', '#contact');
  const stats = getJSON('hero_stats', defaultStats);

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={headerBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/80 to-primary/85"></div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 pb-24 sm:pb-32 max-w-7xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20 shadow-lg text-white">
              <Users className="w-4 h-4" />
              <span>{t(badge)}</span>
            </div>
          </div>
          
          <div className="text-center text-white mb-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight font-cantata">
              {t(title)}
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-base sm:text-lg lg:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: t(description) }} />
          </div>

          {nextMeeting && (
            <div className="text-center mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <a href="#meetings" className="inline-flex items-center justify-center gap-3 bg-secondary/20 backdrop-blur-md px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-secondary/40 shadow-xl hover:bg-secondary/30 transition-colors w-full sm:w-auto max-w-md">
                <Calendar className="w-6 h-6 text-secondary flex-shrink-0" />
                <span className="text-white font-semibold text-base sm:text-lg">{t("Next Meeting")}: {formatMeetingDate(nextMeeting.date)}</span>
              </a>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-14 px-4 animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 font-semibold shadow-xl hover:shadow-2xl transition-all" asChild>
              <a href={ctaPrimaryLink}>{t(ctaPrimaryLabel)}</a>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 bg-white/10 border-2 border-white/40 text-white hover:bg-white hover:text-primary backdrop-blur-md font-semibold shadow-xl" asChild>
              <a href={ctaSecondaryLink}>{t(ctaSecondaryLabel)}</a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {stats.map((stat: any, i: number) => {
              const Icon = iconMap[stat.icon] || MapPin;
              return (
                <div key={i} className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-primary mb-0.5">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">{t(stat.label)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
