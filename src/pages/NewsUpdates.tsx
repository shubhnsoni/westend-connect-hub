import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const NewsUpdates = () => {
  const { data: updates = [], isLoading } = useQuery({
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

  return (
    <>
      <SEO 
        title="Community Updates | West End Civic Association"
        description="Stay informed with the latest news and updates from the West End Civic Association and Rockville community."
        keywords="West End news, community updates, Rockville news, neighborhood updates, WECA news"
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
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-6 animate-fade-in">
                  Community Updates
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Stay informed with the latest news and announcements from West End
                </p>
              </div>
            </div>
          </section>

          {/* Updates Grid */}
          <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                {isLoading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
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
                ) : updates.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            </div>
                            <CardTitle className="group-hover:text-primary transition-colors">
                              {update.title}
                            </CardTitle>
                            {update.excerpt && (
                              <CardDescription className="line-clamp-2">
                                {update.excerpt}
                              </CardDescription>
                            )}
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2 flex-wrap">
                              {update.tags?.slice(0, 3).map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 text-primary text-sm mt-4 font-medium group-hover:gap-3 transition-all">
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
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NewsUpdates;
