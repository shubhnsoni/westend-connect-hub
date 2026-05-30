import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import TopAdBanner from "@/components/TopAdBanner";
import Footer from "@/components/Footer";
import FooterAdBanner from "@/components/FooterAdBanner";
import AdPlacement from "@/components/AdPlacement";
import NewsSidebarAds from "@/components/NewsSidebarAds";
import SEO from "@/components/SEO";
import PDFViewerDialog from "@/components/PDFViewerDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Mail, Newspaper, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import NewsletterDialog from "@/components/NewsletterDialog";
import FallbackThumbnail from "@/components/FallbackThumbnail";
import { usePageContent } from "@/hooks/usePageContent";
import { useTranslation } from "@/hooks/useTranslation";

const POSTS_PER_PAGE = 10;

const NewsUpdates = () => {
  const location = useLocation();
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { getContent } = usePageContent("news-updates");
  const { t } = useTranslation();

  const heroTitle = getContent('hero_title', 'News & Newsletters');
  const heroSubtitle = getContent('hero_subtitle', 'Stay informed with the latest updates from West End');
  const newslettersTitle = getContent('newsletters_title', 'Newsletter Archive');
  const newslettersSubtitle = getContent('newsletters_subtitle', 'WECA newsletters published twice per year: Spring and Fall');
  const sidebarTitle = getContent('sidebar_title', 'Stay Updated');
  const sidebarDesc = getContent('sidebar_description', 'Get the latest news and updates delivered to your inbox.');

  const defaultTab = location.pathname === '/news/newsletters' ? 'newsletters' : 'updates';

  const { data: updates = [], isLoading: updatesLoading } = useQuery({
    queryKey: ['blog-posts-all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts').select('*').eq('status', 'published')
        .order('published_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const { data: newsletters = [], isLoading: newslettersLoading } = useQuery({
    queryKey: ['newsletters-resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources').select('*').eq('category', 'newsletter')
        .order('title', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const newslettersByYear = useMemo(() => {
    const grouped: Record<string, typeof newsletters> = {};
    newsletters.forEach((newsletter) => {
      const yearMatch = newsletter.title.match(/\d{4}/);
      const year = yearMatch ? yearMatch[0] : 'Other';
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(newsletter);
    });
    return Object.entries(grouped).sort((a, b) => parseInt(b[0]) - parseInt(a[0]));
  }, [newsletters]);

  const openPdfViewer = (url: string, title: string) => {
    setSelectedPdf({ url, title });
    setPdfViewerOpen(true);
  };

  const isLoading = updatesLoading || newslettersLoading;

  const totalPages = Math.ceil(updates.length / POSTS_PER_PAGE);
  const paginatedUpdates = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return updates.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [updates, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO 
        title="News & Newsletters | West End Civic Association"
        description="Stay informed with the latest news, updates, and newsletters from the West End Civic Association."
        canonicalUrl="https://westendrockvillemd.org/news/updates"
        keywords="West End news, community updates, WECA newsletter, Rockville news, neighborhood updates"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="pt-20" />
        
        <main className="flex-grow">
          {/* Hero */}
          <section className="relative py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-4 animate-fade-in">
                  {t(heroTitle)}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 animate-fade-in">
                  {t(heroSubtitle)}
                </p>
                <Button size="lg" onClick={() => setIsNewsletterOpen(true)} className="gap-2">
                  <Mail className="w-4 h-4" />
                  {t("Subscribe to Newsletter")}
                </Button>
              </div>
            </div>
          </section>

          {/* Top Ad Banner */}
          <TopAdBanner />

          {/* Content */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-[1fr_300px] gap-8">
                  
                  <div>
                    <Tabs defaultValue={defaultTab} className="space-y-6">
                      <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="updates">{t("Updates")}</TabsTrigger>
                        <TabsTrigger value="newsletters">{t("Newsletters")}</TabsTrigger>
                      </TabsList>

                      {/* Updates Tab */}
                      <TabsContent value="updates" className="space-y-4">
                        {isLoading ? (
                          <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                              <Card key={i} className="animate-pulse">
                                <div className="flex flex-col md:flex-row">
                                  <div className="w-full md:w-48 h-32 bg-muted rounded-t-lg md:rounded-l-lg md:rounded-tr-none"></div>
                                  <div className="flex-1 p-4">
                                    <div className="h-4 bg-muted rounded w-1/4 mb-3"></div>
                                    <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-muted rounded w-full"></div>
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        ) : updates.length > 0 ? (
                          <>
                            <div className="space-y-4">
                              {paginatedUpdates.map((update) => (
                                <a key={update.id} href={`/blog/${update.slug}`} className="group block">
                                  <Card className="hover:shadow-lg transition-all duration-300 group-hover:border-primary/50 overflow-hidden">
                                    <div className="flex flex-col md:flex-row">
                                      <div className="w-full md:w-40 lg:w-44 aspect-square md:aspect-square overflow-hidden flex-shrink-0 bg-muted">
                                        {update.featured_image_url ? (
                                          <img src={update.featured_image_url} alt={update.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                                        ) : (
                                          <FallbackThumbnail title={update.title} className="w-full h-full" />
                                        )}
                                      </div>
                                      <div className="flex-1 p-4 md:p-5 flex flex-col justify-between">
                                        <div>
                                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{update.published_at ? format(new Date(update.published_at), 'MMM d, yyyy') : 'Draft'}</span>
                                            <Badge variant="secondary" className="ml-auto text-xs">Update</Badge>
                                          </div>
                                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors mb-2 line-clamp-2">{t(update.title)}</h3>
                                          {update.excerpt && <p className="text-muted-foreground text-sm line-clamp-2">{t(update.excerpt)}</p>}
                                        </div>
                                        <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all mt-3">
                                          {t("Read more")} <ArrowRight className="w-4 h-4" />
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                </a>
                              ))}
                            </div>

                            {totalPages > 1 && (
                              <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t">
                                <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="gap-1">
                                  <ChevronLeft className="w-4 h-4" /> Previous
                                </Button>
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => goToPage(page)} className="w-9 h-9 p-0">{page}</Button>
                                  ))}
                                </div>
                                <Button variant="outline" size="sm" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="gap-1">
                                  Next <ChevronRight className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                            <p className="text-center text-sm text-muted-foreground mt-4">
                              Showing {((currentPage - 1) * POSTS_PER_PAGE) + 1}-{Math.min(currentPage * POSTS_PER_PAGE, updates.length)} of {updates.length} updates
                            </p>
                          </>
                        ) : (
                          <Card>
                            <CardContent className="text-center py-12">
                              <Newspaper className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                              <p className="text-muted-foreground">No updates available at this time. Check back soon!</p>
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>

                      {/* Newsletters Tab */}
                      <TabsContent value="newsletters" className="space-y-4">
                        <div className="text-center mb-6">
                          <h2 className="text-2xl font-cormorant font-bold mb-2">{t(newslettersTitle)}</h2>
                          <p className="text-muted-foreground">{t(newslettersSubtitle)}</p>
                        </div>

                        {isLoading ? (
                          <div className="grid md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                              <Card key={i} className="animate-pulse">
                                <CardHeader><div className="h-4 bg-muted rounded w-3/4 mb-2"></div><div className="h-3 bg-muted rounded w-1/2"></div></CardHeader>
                              </Card>
                            ))}
                          </div>
                        ) : newslettersByYear.length > 0 ? (
                          <Accordion type="multiple" defaultValue={[newslettersByYear[0]?.[0]]} className="space-y-4">
                            {newslettersByYear.map(([year, yearNewsletters]) => (
                              <AccordionItem key={year} value={year} className="border rounded-lg px-4 bg-card">
                                <AccordionTrigger className="text-xl font-bold hover:no-underline">
                                  <div className="flex items-center gap-3">
                                    <Newspaper className="w-5 h-5 text-primary" />
                                    <span>{year}</span>
                                    <span className="text-sm font-normal text-muted-foreground">({yearNewsletters.length} newsletter{yearNewsletters.length > 1 ? 's' : ''})</span>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                                    {yearNewsletters.map((newsletter) => (
                                      <Card key={newsletter.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader className="pb-3">
                                          <CardTitle className="text-base flex items-center gap-2">
                                            <Newspaper className="w-4 h-4 text-primary" />
                                            {newsletter.title}
                                          </CardTitle>
                                          {newsletter.description && <CardDescription className="line-clamp-2">{newsletter.description}</CardDescription>}
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                          {newsletter.link_url && (
                                            <Button variant="default" size="sm" onClick={() => openPdfViewer(newsletter.link_url!, newsletter.title)} className="gap-2">
                                              <FileText className="w-4 h-4" /> {t("View Newsletter")}
                                            </Button>
                                          )}
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        ) : (
                          <Card>
                            <CardContent className="text-center py-12">
                              <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                              <p className="text-muted-foreground mb-4">No newsletters available yet. Subscribe to receive our newsletter!</p>
                              <Button onClick={() => setIsNewsletterOpen(true)} className="gap-2">
                                <Mail className="w-4 h-4" /> Subscribe Now
                              </Button>
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Sidebar */}
                  <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
                    <NewsSidebarAds />
                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg">{t(sidebarTitle)}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{t(sidebarDesc)}</p>
                        <Button onClick={() => setIsNewsletterOpen(true)} className="w-full gap-2" size="sm">
                          <Mail className="w-4 h-4" /> Subscribe
                        </Button>
                      </CardContent>
                    </Card>
                  </aside>

                </div>
              </div>
            </div>
          </section>
        </main>
        
        <PDFViewerDialog open={pdfViewerOpen} onOpenChange={setPdfViewerOpen} pdfUrl={selectedPdf?.url || null} title={selectedPdf?.title} />
        <NewsletterDialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
        <FooterAdBanner />
        <Footer />
      </div>
    </>
  );
};

export default NewsUpdates;
