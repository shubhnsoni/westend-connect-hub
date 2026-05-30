import { Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const SocialFeed = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            From Around the Neighborhood
          </h2>
          <p className="text-lg text-muted-foreground">
            Follow us on social media for real-time updates and community photos
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border-2 rounded-lg p-4 sm:p-8 text-center">
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <a 
                  href="https://www.facebook.com/groups/westendca/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Facebook className="mr-2 w-5 h-5 group-hover:text-primary transition-colors" />
                  Follow on Facebook
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Instagram className="mr-2 w-5 h-5 group-hover:text-primary transition-colors" />
                  Follow on Instagram
                </a>
              </Button>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Stay connected with your neighbors, share photos, and get instant updates on community events and important announcements.
            </p>

            {/* Facebook Page Plugin Embed */}
            <div className="flex justify-center">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fwestendcivicassociation&tabs=timeline&width=500&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="500"
                height="400"
                style={{ border: 'none', overflow: 'hidden', maxWidth: '100%' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="WECA Facebook Feed"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;
