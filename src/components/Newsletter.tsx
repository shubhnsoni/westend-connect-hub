import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import NewsletterDialog from "@/components/NewsletterDialog";
import { useTranslation } from "@/hooks/useTranslation";
import { usePageContent } from "@/hooks/usePageContent";

const Newsletter = () => {
  const { t } = useTranslation();
  const { getContent } = usePageContent("homepage");
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-16 h-16 bg-secondary/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-4xl font-bold mb-4">{t(getContent("newsletter_heading", "Stay Connected"))}</h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              {t(getContent("newsletter_intro", "Get news and information about the neighborhood and notice of WECA meetings delivered to your inbox"))}
            </p>
          </div>

          <Card className="p-8 shadow-2xl animate-scale-in bg-primary-foreground text-foreground border-none">
            <div className="text-center space-y-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full sm:w-auto px-12"
                onClick={() => setIsNewsletterOpen(true)}
              >
                Join Newsletter
              </Button>
              <p className="text-sm text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </Card>
          
          <NewsletterDialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
