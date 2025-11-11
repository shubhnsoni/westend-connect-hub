import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import BlogPostAds from "@/components/BlogPostAds";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DOMPurify from "dompurify";

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
          <div className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Back Button */}
            <Button variant="ghost" size="sm" className="mb-8" asChild>
              <a href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </a>
            </Button>

            {/* Two-Column Layout: Article + Sidebar Ads */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Article Content - 2/3 width on large screens */}
              <div className="lg:col-span-2">
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

                  {/* Article Content with Newsletter Styling */}
                  <div className="space-y-4 mb-8">
                    <div
                      className="prose prose-sm sm:prose-base md:prose-lg max-w-none
                        text-foreground
                        prose-headings:text-foreground prose-headings:font-semibold prose-headings:mb-4
                        prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mb-6 prose-h1:bg-gradient-to-r prose-h1:from-primary prose-h1:to-primary/70 prose-h1:bg-clip-text prose-h1:text-transparent
                        prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-6 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b-2 prose-h2:border-primary/20
                        prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-4 prose-h3:mb-3
                        prose-p:text-base prose-p:md:text-lg prose-p:leading-relaxed prose-p:mb-4 prose-p:text-muted-foreground
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-foreground prose-strong:font-semibold
                        prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4 prose-ul:text-muted-foreground prose-ul:space-y-2
                        prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4 prose-ol:text-muted-foreground prose-ol:space-y-2
                        prose-li:text-base prose-li:md:text-lg
                        prose-code:bg-accent prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-foreground
                        prose-pre:bg-accent prose-pre:p-4 prose-pre:md:p-6 prose-pre:rounded-lg prose-pre:md:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-lg prose-pre:my-4
                        prose-blockquote:text-muted-foreground prose-blockquote:italic
                        prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:md:pl-6
                        prose-img:rounded-lg prose-img:md:rounded-xl prose-img:shadow-lg prose-img:my-4 prose-img:w-full prose-img:h-auto prose-img:max-w-full prose-img:object-contain
                        [&_h2]:shadow-sm [&_h2]:text-foreground
                        [&_h3]:text-foreground
                        [&_blockquote]:bg-accent/20 [&_blockquote]:dark:bg-accent/30 [&_blockquote]:p-4 [&_blockquote]:md:p-6 [&_blockquote]:rounded-lg [&_blockquote]:md:rounded-xl [&_blockquote]:border-accent [&_blockquote]:shadow-sm [&_blockquote]:my-4
                        [&_div:has(>h2)]:mb-4
                        [&_p>strong:first-child]:block [&_p>strong:first-child]:bg-secondary/30 [&_p>strong:first-child]:dark:bg-secondary/20 [&_p>strong:first-child]:px-3 [&_p>strong:first-child]:py-2 [&_p>strong:first-child]:md:px-4 [&_p>strong:first-child]:md:py-3 [&_p>strong:first-child]:rounded-lg [&_p>strong:first-child]:mb-2 [&_p>strong:first-child]:text-base [&_p>strong:first-child]:md:text-lg
                        [&_.event-box]:bg-accent/20 [&_.event-box]:dark:bg-accent/30 [&_.event-box]:p-4 [&_.event-box]:md:p-6 [&_.event-box]:rounded-xl [&_.event-box]:border-l-4 [&_.event-box]:border-accent [&_.event-box]:shadow-md [&_.event-box]:my-4
                        [&_.warning-box]:bg-orange-100 [&_.warning-box]:dark:bg-orange-900/20 [&_.warning-box]:p-4 [&_.warning-box]:md:p-6 [&_.warning-box]:rounded-xl [&_.warning-box]:border-l-4 [&_.warning-box]:border-orange-500 [&_.warning-box]:shadow-md [&_.warning-box]:my-4
                        [&_table]:overflow-x-auto [&_table]:block [&_table]:w-full"
                      dangerouslySetInnerHTML={{ 
                        __html: DOMPurify.sanitize(post.content, {
                          ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'div', 'span'],
                          ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel'],
                          ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
                        })
                      }}
                    />
                  </div>

                  {/* Back to Blog */}
                  <div className="text-center mt-8">
                    <Button variant="outline" size="lg" asChild>
                      <a href="/blog">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to All Posts
                      </a>
                    </Button>
                  </div>
                </article>
              </div>

              {/* Sidebar Ads - 1/3 width on large screens */}
              <div className="lg:col-span-1">
                <BlogPostAds />
              </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
