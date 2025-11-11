import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Mail, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import NewsletterDialog from "@/components/NewsletterDialog";

const NewsNewsletters = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const { data: newsletters = [], isLoading } = useQuery({
    queryKey: ['blog-newsletters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .contains('tags', ['newsletter'])
        .order('published_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <>
      <SEO 
        title="Newsletters | West End Civic Association"
        description="Read past issues of the WECA newsletter and subscribe to receive future editions delivered to your inbox."
        keywords="WECA newsletter, community newsletter, Rockville newsletter, neighborhood news"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <div className="pt-20">
          <TopAdBanner />
        </div>
        
        <main className="flex-grow pt-8">
          {/* Hero Section */}
          <section className="relative py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <Mail className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-6 animate-fade-in">
                  WECA Newsletters
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
                  Monthly updates from the West End Civic Association delivered to your inbox
                </p>
                <Button 
                  size="lg" 
                  onClick={() => setIsNewsletterOpen(true)}
                  className="gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </section>

          {/* Past Newsletters */}
          <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-cormorant font-bold mb-8">Past Issues</h2>
                
                {isLoading ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader>
                          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </CardHeader>
                        <CardContent>
                          <div className="h-3 bg-muted rounded mb-2"></div>
                          <div className="h-3 bg-muted rounded w-5/6"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : newsletters.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {newsletters.map((newsletter) => (
                      <Card key={newsletter.id} className="hover:shadow-lg transition-all duration-300 group">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {newsletter.published_at ? format(new Date(newsletter.published_at), 'MMMM yyyy') : 'Draft'}
                              </span>
                            </div>
                            <Badge variant="secondary">Newsletter</Badge>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {newsletter.title}
                          </CardTitle>
                          {newsletter.excerpt && (
                            <CardDescription className="line-clamp-2">
                              {newsletter.excerpt}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-3">
                            <Button asChild variant="default" size="sm" className="gap-2">
                              <a href={`/blog/${newsletter.slug}`}>
                                Read Online <ArrowRight className="w-4 h-4" />
                              </a>
                            </Button>
                            {newsletter.featured_image_url && (
                              <Button variant="outline" size="sm" className="gap-2">
                                <Download className="w-4 h-4" />
                                Download PDF
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">
                        No past newsletters available yet. Subscribe to receive our monthly newsletter!
                      </p>
                      <Button onClick={() => setIsNewsletterOpen(true)} className="gap-2">
                        <Mail className="w-4 h-4" />
                        Subscribe Now
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </section>

          {/* About Newsletter Section */}
          <section className="py-12 sm:py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">About Our Newsletter</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      The WECA newsletter is published monthly and delivered directly to your inbox. 
                      Each issue includes:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Upcoming community events and meetings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Updates on neighborhood development and city planning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Stories from residents and local businesses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Important announcements and civic updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Historical features about our neighborhood</span>
                      </li>
                    </ul>
                    <div className="pt-4">
                      <Button onClick={() => setIsNewsletterOpen(true)} className="gap-2">
                        <Mail className="w-4 h-4" />
                        Subscribe to Newsletter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        
        <NewsletterDialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
        <Footer />
      </div>
    </>
  );
};

export default NewsNewsletters;
