import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import Breadcrumb from "@/components/Breadcrumb";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Newspaper, Calendar, FileText, ArrowRight, Search, Tag, Clock } from "lucide-react";
import NewsletterDialog from "@/components/NewsletterDialog";
import PDFViewerDialog from "@/components/PDFViewerDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Blog = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);

  const openPdfViewer = (url: string, title: string) => {
    setSelectedPdf({ url, title });
    setPdfViewerOpen(true);
  };

  const { data: blogPosts = [] } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: recentMeetings = [] } = useQuery({
    queryKey: ['recent-meetings-blog'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .order('date', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data || [];
    },
  });

  // Get unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags || [])));

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <SEO
        title="News & Insights - WECA Blog"
        description="Stay informed with the latest newsletters, meeting updates, and community news from the West End Civic Association."
        keywords="WECA news, newsletters, community updates, meeting minutes, West End blog"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20">
          <Breadcrumb />
          <TopAdBanner />
        </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              <Newspaper className="w-4 h-4" />
              <span>Insights & Updates</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              WECA News & Insights
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay informed with the latest newsletters, meeting updates, and community news from the West End Civic Association
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Posts List */}
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="grid md:grid-cols-3 gap-0">
                      {/* Featured Image */}
                      {post.featured_image_url && (
                        <div className="md:col-span-1 relative overflow-hidden aspect-video md:aspect-square">
                          <img 
                            src={post.featured_image_url} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className={`${post.featured_image_url ? 'md:col-span-2' : 'md:col-span-3'} p-6`}>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {Math.ceil(post.content.length / 1000)} min read
                          </span>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt || post.content.substring(0, 200) + '...'}
                        </p>

                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                        >
                          Read Full Article
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No posts found matching your search.</p>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search articles..." 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {blogPosts.slice(0, 4).map((post) => (
                    <div key={post.id}>
                      <Link to={`/blog/${post.slug}`} className="group">
                        <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </Link>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Tags */}
              {allTags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Popular Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 10).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Meetings */}
              {recentMeetings.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Recent Meetings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentMeetings.map((meeting, index) => (
                      <div key={meeting.id}>
                        <button 
                          onClick={() => meeting.minutes_url ? openPdfViewer(meeting.minutes_url, meeting.title) : null}
                          className="group block text-left w-full disabled:opacity-50"
                          disabled={!meeting.minutes_url}
                        >
                          <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {meeting.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(meeting.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </button>
                        {index < recentMeetings.length - 1 && <Separator className="mt-3" />}
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                      <a href="/resources">View All Minutes</a>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Newsletter CTA */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader>
                  <Newspaper className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Stay Updated</CardTitle>
                  <CardDescription>
                    Subscribe to receive our newsletter and stay informed about community events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setIsNewsletterOpen(true)} className="w-full">
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

        <NewsletterDialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
        <PDFViewerDialog 
          open={pdfViewerOpen} 
          onOpenChange={setPdfViewerOpen}
          pdfUrl={selectedPdf?.url || null}
          title={selectedPdf?.title}
        />
        <Footer />
      </div>
    </>
  );
};

export default Blog;
