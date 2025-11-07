import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  // Increment view count
  useEffect(() => {
    if (post?.id) {
      supabase
        .from('blog_posts')
        .update({ view_count: (post.view_count || 0) + 1 })
        .eq('id', post.id)
        .then();
    }
  }, [post?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20">
          <TopAdBanner />
        </div>
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/blog" replace />;
  }

  const publishDate = new Date(post.published_at || post.created_at);
  const readTime = Math.ceil(post.content.length / 1000);

  return (
    <>
      <SEO
        title={`${post.title} | WECA Blog`}
        description={post.excerpt || post.content.substring(0, 160)}
        keywords={post.tags?.join(', ')}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20">
          <TopAdBanner />
        </div>
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Back Button */}
            <Button variant="ghost" size="sm" className="mb-8" asChild>
              <a href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </a>
            </Button>

            {/* Article Header */}
            <article>
              <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {publishDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {readTime} min read
                  </span>
                  {post.view_count && post.view_count > 0 && (
                    <>
                      <span>•</span>
                      <span>{post.view_count} views</span>
                    </>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                
                {post.excerpt && (
                  <p className="text-lg text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured Image */}
              {post.featured_image_url && (
                <div className="mb-8 rounded-2xl overflow-hidden">
                  <img 
                    src={post.featured_image_url} 
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Article Content */}
              <Card className="p-6 md:p-8 mb-8">
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </Card>

              {/* Back to Blog */}
              <div className="text-center">
                <Button variant="outline" size="lg" asChild>
                  <a href="/blog">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to All Posts
                  </a>
                </Button>
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
