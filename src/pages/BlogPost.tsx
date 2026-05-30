import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import BlogPostAds from "@/components/BlogPostAds";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DOMPurify from "dompurify";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/useTranslation";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

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
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground font-source">{t("Loading article...")}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/news/updates" replace />;
  }

  const publishDate = new Date(post.published_at || post.created_at);
  const readTime = Math.ceil(post.content.length / 1000);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt || '',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "West End Civic Association" },
    publisher: { "@type": "Organization", name: "West End Civic Association" },
    ...(post.featured_image_url ? { image: post.featured_image_url } : {}),
  };

  return (
    <>
      <SEO
        title={(post as any).seo_title || `${post.title} | WECA`}
        description={(post as any).seo_description || post.excerpt || post.content.substring(0, 160)}
        keywords={(post as any).seo_keywords || post.tags?.join(', ')}
        canonicalUrl={`https://westendrockvillemd.org/blog/${slug}`}
        ogType="article"
        ogImage={post.featured_image_url || undefined}
        publishedTime={post.published_at || post.created_at}
        modifiedTime={post.updated_at}
        jsonLd={articleSchema}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="pt-20">
          <TopAdBanner />
        </div>
        <main className="flex-grow">
          <div className="container mx-auto px-4 max-w-7xl py-8">
            {/* Back Button */}
            <Button variant="ghost" size="sm" className="mb-6" asChild>
              <a href="/news/updates">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("Back to News & Updates")}
              </a>
            </Button>

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pb-16">
              {/* Main Article Content */}
              <div className="lg:col-span-2">
                <article className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
                  <div className="p-6 md:p-8 lg:p-10">
                    {/* Article Header */}
                    <header className="mb-8">
                      {/* Meta info */}
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-5 font-source flex-wrap">
                        <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
                          <Calendar className="h-3.5 w-3.5" />
                          {publishDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
                          <Clock className="h-3.5 w-3.5" />
                          {readTime} {t("min read")}
                        </span>
                        {post.view_count && post.view_count > 0 && (
                          <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
                            <Eye className="h-3.5 w-3.5" />
                            {post.view_count.toLocaleString()} {t("views")}
                          </span>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="ml-auto h-8 px-3"
                          onClick={handleShare}
                        >
                          <Share2 className="h-4 w-4 mr-1.5" />
                          {t("Share")}
                        </Button>
                      </div>
                      
                      {/* Title */}
                      <h1 className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-5">
                        {t(post.title)}
                      </h1>
                      
                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-lg md:text-xl text-muted-foreground font-source font-light leading-relaxed">
                          {t(post.excerpt)}
                        </p>
                      )}

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-5">
                          {post.tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="outline"
                              className="font-source text-xs font-medium px-3 py-1 hover:bg-primary/10 cursor-pointer transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </header>

                    <Separator className="mb-8" />

                    {/* Article Content */}
                    <div 
                      className="article-content font-lora text-foreground/90 leading-relaxed
                        [&_h2]:font-cormorant [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-5 [&_h2]:pb-3 [&_h2]:border-b [&_h2]:border-border/50
                        [&_h3]:font-cormorant [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-4
                        [&_h4]:font-source [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mt-6 [&_h4]:mb-3
                        [&_p]:text-base [&_p]:md:text-lg [&_p]:leading-[1.8] [&_p]:mb-5 [&_p]:text-foreground/80
                        [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-primary/30 hover:[&_a]:decoration-primary [&_a]:transition-colors
                        [&_strong]:text-foreground [&_strong]:font-semibold
                        [&_em]:italic [&_em]:text-foreground/90
                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-2
                        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-2
                        [&_li]:text-base [&_li]:md:text-lg [&_li]:leading-[1.7] [&_li]:text-foreground/80
                        [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-6 [&_blockquote]:bg-muted/30 [&_blockquote]:rounded-r-lg [&_blockquote]:italic
                        [&_img]:rounded-xl [&_img]:shadow-md [&_img]:my-6 [&_img]:w-full [&_img]:h-auto
                        [&_hr]:my-8 [&_hr]:border-border/50
                        [&_.event-box]:bg-primary/5 [&_.event-box]:border [&_.event-box]:border-primary/20 [&_.event-box]:p-5 [&_.event-box]:md:p-6 [&_.event-box]:rounded-xl [&_.event-box]:my-6 [&_.event-box]:shadow-sm
                        [&_.event-box_p]:mb-2 [&_.event-box_p:last-child]:mb-0
                        [&_.warning-box]:bg-amber-50 [&_.warning-box]:dark:bg-amber-950/30 [&_.warning-box]:border [&_.warning-box]:border-amber-200 [&_.warning-box]:dark:border-amber-800 [&_.warning-box]:p-5 [&_.warning-box]:md:p-6 [&_.warning-box]:rounded-xl [&_.warning-box]:my-6
                        [&_.lead]:text-lg [&_.lead]:md:text-xl [&_.lead]:font-source [&_.lead]:font-light [&_.lead]:text-foreground/70"
                      dangerouslySetInnerHTML={{ 
                        __html: DOMPurify.sanitize(post.content, {
                          ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'div', 'span', 'hr'],
                          ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel', 'style'],
                          ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
                        })
                      }}
                    />

                    <Separator className="my-8" />

                    {/* Footer */}
                    <footer className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <Button variant="outline" size="lg" className="font-source" asChild>
                        <a href="/news/updates">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          {t("Back to All Updates")}
                        </a>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="lg" 
                        className="font-source"
                        onClick={handleShare}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        {t("Share Article")}
                      </Button>
                    </footer>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
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
