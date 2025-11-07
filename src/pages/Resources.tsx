import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Download, Newspaper, Calendar, FolderOpen, Info, ArrowRight, ExternalLink } from "lucide-react";
import NewsletterDialog from "@/components/NewsletterDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Resources = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const { data: meetings = [] } = useQuery({
    queryKey: ['resources-meetings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: resources = [] } = useQuery({
    queryKey: ['resources-documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: newsletters = [] } = useQuery({
    queryKey: ['newsletters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .contains('tags', ['Newsletter'])
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Group meetings by year
  const meetingsByYear = meetings.reduce((acc, meeting) => {
    const year = new Date(meeting.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(meeting);
    return acc;
  }, {} as Record<number, typeof meetings>);

  // Group newsletters by year
  const newslettersByYear = newsletters.reduce((acc, newsletter) => {
    const year = new Date(newsletter.published_at || newsletter.created_at).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(newsletter);
    return acc;
  }, {} as Record<number, typeof newsletters>);

  const sortedMeetingYears = Object.keys(meetingsByYear).sort((a, b) => Number(b) - Number(a));
  const sortedNewsletterYears = Object.keys(newslettersByYear).sort((a, b) => Number(b) - Number(a));

  // Group resources by category
  const resourcesByCategory = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) acc[resource.category] = [];
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, typeof resources>);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Resources | West End Civic Association"
        description="Access WECA meeting minutes, newsletters, and community resources. Stay informed about West End neighborhood updates."
      />
      <Header />
      <div className="pt-20">
        <TopAdBanner />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full text-sm font-medium mb-6">
              <FolderOpen className="w-4 h-4" />
              <span>ARCHIVES & DOCUMENTS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Resources</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Stay up-to-date with meeting minutes, newsletters, and neighborhood resources
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="space-y-16">
            {/* Two Column Layout for Minutes and Newsletters */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Meeting Minutes Section */}
              <section>
                <div className="mb-8 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-primary">MEETING MINUTES</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Meeting Minutes</h2>
                  <p className="text-muted-foreground text-lg">
                    Access minutes from our monthly meetings
                  </p>
                </div>

                {sortedMeetingYears.length > 0 ? (
                  <Accordion type="single" collapsible className="space-y-4">
                    {sortedMeetingYears.map((yearStr) => {
                      const year = Number(yearStr);
                      const yearMeetings = meetingsByYear[year];
                      return (
                        <AccordionItem key={yearStr} value={yearStr} className="border-2 rounded-2xl px-6 bg-background shadow-sm hover:shadow-md transition-shadow">
                          <AccordionTrigger className="hover:no-underline py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-primary-foreground" />
                              </div>
                              <span className="text-2xl font-bold text-foreground">{year}</span>
                              <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                                {yearMeetings.length} meetings
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 pb-4">
                              {yearMeetings.map((meeting) => (
                                <a
                                  key={meeting.id}
                                  href={meeting.minutes_url || "#"}
                                  target={meeting.minutes_url ? "_blank" : undefined}
                                  rel={meeting.minutes_url ? "noopener noreferrer" : undefined}
                                  className="flex items-center justify-between p-5 rounded-xl border-2 bg-background hover:bg-muted hover:border-primary transition-all group shadow-sm"
                                >
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-foreground text-sm line-clamp-2">{meeting.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {new Date(meeting.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </p>
                                  </div>
                                  {meeting.minutes_url ? (
                                    <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all ml-2 flex-shrink-0" />
                                  ) : (
                                    <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">Soon</span>
                                  )}
                                </a>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No meeting minutes available yet</p>
                  </Card>
                )}
              </section>

              {/* Newsletters Section */}
              <section>
                <div className="mb-8 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
                    <Newspaper className="w-4 h-4 text-primary" />
                    <span className="text-primary">NEWSLETTERS</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Newsletters</h2>
                  <p className="text-muted-foreground text-lg">
                    WECA newsletters are published twice per year
                  </p>
                </div>

                {sortedNewsletterYears.length > 0 ? (
                  <div className="space-y-6">
                    {sortedNewsletterYears.map((yearStr) => {
                      const year = Number(yearStr);
                      const yearNewsletters = newslettersByYear[year];
                      return (
                        <Card key={yearStr} className="shadow-lg border-2 rounded-2xl overflow-hidden">
                          <CardHeader className="bg-muted/30 border-b-2">
                            <CardTitle className="flex items-center gap-3 text-2xl">
                              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-primary-foreground" />
                              </div>
                              {year}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="space-y-3">
                              {yearNewsletters.map((newsletter) => (
                                <a
                                  key={newsletter.id}
                                  href={`/blog/${newsletter.slug}`}
                                  className="flex items-center justify-between p-4 rounded-xl border-2 bg-background hover:bg-muted hover:border-primary transition-all group"
                                >
                                  <div className="flex items-center gap-3">
                                    <Newspaper className="w-6 h-6 text-primary" />
                                    <div>
                                      <p className="font-bold text-sm text-foreground">{newsletter.title}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {new Date(newsletter.published_at || newsletter.created_at).toLocaleDateString('en-US', { 
                                          month: 'long', 
                                          day: 'numeric' 
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </a>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No newsletters available yet</p>
                  </Card>
                )}
              </section>
            </div>

            {/* Community Resources Section */}
            {Object.keys(resourcesByCategory).length > 0 && (
              <section>
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-primary">COMMUNITY RESOURCES</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Community Resources</h2>
                  <p className="text-muted-foreground text-lg">
                    Helpful documents and links for West End residents
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(resourcesByCategory).map(([category, categoryResources]) => (
                    <Card key={category} className="shadow-lg border-2 rounded-2xl">
                      <CardHeader className="bg-muted/30 border-b">
                        <CardTitle className="text-lg">{category}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          {categoryResources.map((resource) => (
                            <a
                              key={resource.id}
                              href={resource.file_url || resource.link_url || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                            >
                              <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 flex-1">
                                {resource.title}
                              </span>
                              {(resource.file_url || resource.link_url) && (
                                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                              )}
                            </a>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* Stay Informed CTA Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stay Informed About WECA
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Join our newsletter to stay informed about meetings and community updates
          </p>
          <Button variant="secondary" size="lg" className="rounded-full px-8 text-base shadow-lg" onClick={() => setIsNewsletterOpen(true)}>
            Join Newsletter
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <NewsletterDialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
      <Footer />
    </div>
  );
};

export default Resources;
