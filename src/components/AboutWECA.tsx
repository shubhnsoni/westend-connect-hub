import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { useTranslation } from "@/hooks/useTranslation";

const AboutWECA = () => {
  const { getContent } = usePageContent("homepage");
  const { t } = useTranslation();

  const badge = getContent('about_badge', 'ABOUT US');
  const title = getContent('about_title', 'About WECA');
  const description = getContent('about_description', 'The West End Civic Association (WECA) is an all-volunteer, resident-led organization dedicated to keeping neighbors informed about issues that affect our area, advocating for the community\'s welfare, and fostering a welcoming, connected neighborhood spirit.');
  const ctaLabel = getContent('about_cta_label', 'Learn More About WECA');
  const ctaLink = getContent('about_cta_link', '/about');

  return (
    <section className="py-10 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-6">
            <span className="text-primary">{t(badge)}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
            <span className="font-cantata">{t(title)}</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: t(description) }} />
          <Button variant="default" size="lg" className="rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl" asChild>
            <a href={ctaLink} className="group">
              {t(ctaLabel)}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutWECA;
