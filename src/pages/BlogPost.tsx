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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
              <div className="space-y-6 mb-8">
                <div 
                  className="newsletter-content prose prose-lg max-w-none dark:prose-invert
                    prose-headings:font-bold
                    prose-h1:text-3xl prose-h1:mb-4
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4
                    prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80
                    prose-strong:font-semibold
                    prose-ul:my-4 prose-ul:space-y-2 prose-ul:list-none prose-ul:pl-0
                    prose-li:text-foreground/80 prose-li:leading-relaxed prose-li:pl-0 prose-li:before:content-['•'] prose-li:before:mr-2 prose-li:before:text-primary
                    prose-blockquote:not-italic
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6
                    [&_h2]:bg-background [&_h2]:p-4 [&_h2]:rounded-xl [&_h2]:border-l-4 [&_h2]:border-primary [&_h2]:shadow-sm
                    [&_h3]:text-foreground
                    [&_p:has(strong:first-child)]:bg-primary/10 [&_p:has(strong:first-child)]:p-4 [&_p:has(strong:first-child)]:rounded-lg [&_p:has(strong:first-child)]:border-l-4 [&_p:has(strong:first-child)]:border-primary
                    [&_blockquote]:bg-accent/30 [&_blockquote]:p-6 [&_blockquote]:rounded-xl [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:shadow-sm
                    [&_ul]:bg-card [&_ul]:p-6 [&_ul]:rounded-xl [&_ul]:shadow-sm"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

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
