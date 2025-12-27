import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import FooterAdBanner from "@/components/FooterAdBanner";
import EventsTicker from "@/components/EventsTicker";
import SidebarAds from "@/components/SidebarAds";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Mail, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsletterDialog from "@/components/NewsletterDialog";

const NewsUpdates = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const { data: updates = [], isLoading: updatesLoading } = useQuery({
    queryKey: ['blog-updates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .contains('tags', ['news', 'update'])
        .order('published_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: newsletters = [], isLoading: newslettersLoading } = useQuery({
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

  const isLoading = updatesLoading || newslettersLoading;

  return (
    <>
      <SEO 
        title="News & Newsletters | West End Civic Association"
        description="Stay informed with the latest news, updates, and newsletters from the West End Civic Association."
        keywords="West End news, community updates, WECA newsletter, Rockville news, neighborhood updates"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <div className="pt-20">
          <TopAdBanner />
        </div>
        
        <EventsTicker />
        
        <main className="flex-grow pt-4">
          {/* Hero Section */}
          <section className="relative py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-4 animate-fade-in">
                  News & Newsletters
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 animate-fade-in">
                  Stay informed with the latest updates from West End
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

          {/* Content Section */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-[1fr_300px] gap-8">
                  
                  {/* Main Content */}
                  <div>
                    <Tabs defaultValue="updates" className="space-y-6">
                      <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="updates">Updates</TabsTrigger>
                        <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
                      </TabsList>

                      {/* Updates Tab */}
                      <TabsContent value="updates" className="space-y-4">
                        {isLoading ? (
                          <div className="grid md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                              <Card key={i} className="animate-pulse">
                                <CardHeader>
                                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                                  <div className="h-3 bg-muted rounded w-1/2"></div>
                                </CardHeader>
                              </Card>
                            ))}
                          </div>
                        ) : updates.length > 0 ? (
                          <div className="grid md:grid-cols-2 gap-4">
                            {updates.map((update) => (
                              <a 
                                key={update.id}
                                href={`/blog/${update.slug}`}
                                className="group"
                              >
                                <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:border-primary/50">
                                  {update.featured_image_url && (
                                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                                      <img 
                                        src={update.featured_image_url} 
                                        alt={update.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      />
                                    </div>
                                  )}
                                  <CardHeader>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                      <Calendar className="w-4 h-4" />
                                      <span>
                                        {update.published_at ? format(new Date(update.published_at), 'MMM d, yyyy') : 'Draft'}
                                      </span>
                                      <Badge variant="secondary" className="ml-auto text-xs">Update</Badge>
                                    </div>
                                    <CardTitle className="group-hover:text-primary transition-colors text-lg">
                                      {update.title}
                                    </CardTitle>
                                    {update.excerpt && (
                                      <CardDescription className="line-clamp-2">
                                        {update.excerpt}
                                      </CardDescription>
                                    )}
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                                      Read more <ArrowRight className="w-4 h-4" />
                                    </div>
                                  </CardContent>
                                </Card>
                              </a>
                            ))}
                          </div>
                        ) : (
                          <Card>
                            <CardContent className="text-center py-12">
                              <p className="text-muted-foreground">No updates available at this time. Check back soon!</p>
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>

                      {/* Newsletters Tab */}
                      <TabsContent value="newsletters" className="space-y-4">
                        {isLoading ? (
                          <div className="grid md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                              <Card key={i} className="animate-pulse">
                                <CardHeader>
                                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                                  <div className="h-3 bg-muted rounded w-1/2"></div>
                                </CardHeader>
                              </Card>
                            ))}
                          </div>
                        ) : newsletters.length > 0 ? (
                          <div className="grid md:grid-cols-2 gap-4">
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
                                    <Badge variant="outline" className="text-xs">Newsletter</Badge>
                                  </div>
                                  <CardTitle className="group-hover:text-primary transition-colors text-lg">
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
                                        PDF
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
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Sidebar with Ads */}
                  <aside className="space-y-6">
                    <SidebarAds />
                    
                    {/* Ad Placeholder 2 */}
                    <Card className="bg-muted/30 border-dashed">
                      <CardContent className="py-8 text-center">
                        <p className="text-sm text-muted-foreground">Advertisement</p>
                      </CardContent>
                    </Card>

                    {/* Newsletter Subscribe Card */}
                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg">Stay Updated</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Get the latest news and updates delivered to your inbox.
                        </p>
                        <Button 
                          onClick={() => setIsNewsletterOpen(true)} 
                          className="w-full gap-2"
                          size="sm"
                        >
                          <Mail className="w-4 h-4" />
                          Subscribe
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Ad Placeholder 3 */}
                    <Card className="bg-muted/30 border-dashed">
                      <CardContent className="py-8 text-center">
                        <p className="text-sm text-muted-foreground">Advertisement</p>
                      </CardContent>
                    </Card>
                  </aside>

                </div>
              </div>
            </div>
          </section>
        </main>
        
        <NewsletterDialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
        <FooterAdBanner />
        <Footer />
      </div>
    </>
  );
};

export default NewsUpdates;
