import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const FeaturedNews = () => {
  const { data: blogPosts = [] } = useQuery({
    queryKey: ['featured-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
            <span className="text-primary">NEWS & UPDATES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Latest from the West End
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with news, events, and stories from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {blogPosts.map((post, index) => (
            <a 
              key={post.id} 
              href={`/blog/${post.slug}`}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="h-full overflow-hidden border-0 hover:border-primary transition-all duration-300 hover:shadow-2xl shadow-lg rounded-2xl">
                {post.featured_image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.featured_image_url} 
                      alt={post.title}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <CardHeader className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt || post.content.substring(0, 150) + '...'}
                  </CardDescription>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="rounded-full px-8 text-base shadow-lg" asChild>
            <a href="/blog" className="group">
              View All News
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;