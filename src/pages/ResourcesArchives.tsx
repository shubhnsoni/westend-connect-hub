import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import FooterAdBanner from "@/components/FooterAdBanner";
import EventsTicker from "@/components/EventsTicker";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, FileText, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PDFViewerDialog from "@/components/PDFViewerDialog";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ResourcesArchives = () => {
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);

  const { data: meetings = [] } = useQuery({
    queryKey: ['archived-meetings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('status', 'completed')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: documents = [] } = useQuery({
    queryKey: ['archived-documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('category', 'archive')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const openPdfViewer = (url: string, title: string) => {
    setSelectedPdf({ url, title });
    setPdfViewerOpen(true);
  };

  return (
    <>
      <SEO 
        title="Documents & Archives | West End Civic Association"
        description="Browse historical documents, meeting minutes, and archived materials from WECA."
        keywords="WECA archives, historical documents, meeting archives, neighborhood history"
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
                <FolderOpen className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-4 animate-fade-in">
                  Documents & Archives
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Historical records and archived materials from the West End Civic Association
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                
                <Tabs defaultValue="meetings" className="space-y-6">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                    <TabsTrigger value="meetings">Meeting Minutes</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>

                  {/* Meeting Minutes Tab */}
                  <TabsContent value="meetings" className="space-y-4">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-cormorant font-bold mb-2">Meeting Minutes Archive</h2>
                      <p className="text-muted-foreground">
                        Access past meeting minutes and agendas
                      </p>
                    </div>

                    {meetings.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {meetings.map((meeting) => (
                          <Card key={meeting.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <Calendar className="w-4 h-4" />
                                <span>{format(new Date(meeting.date), 'MMMM d, yyyy')}</span>
                              </div>
                              <CardTitle className="text-lg">{meeting.title}</CardTitle>
                              {meeting.description && (
                                <CardDescription className="line-clamp-2">
                                  {meeting.description}
                                </CardDescription>
                              )}
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2">
                                {meeting.agenda_url && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => openPdfViewer(meeting.agenda_url!, `${meeting.title} - Agenda`)}
                                    className="gap-2"
                                  >
                                    <FileText className="w-4 h-4" />
                                    Agenda
                                  </Button>
                                )}
                                {meeting.minutes_url && (
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => openPdfViewer(meeting.minutes_url!, `${meeting.title} - Minutes`)}
                                    className="gap-2"
                                  >
                                    <FileText className="w-4 h-4" />
                                    Minutes
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
                          <FolderOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-muted-foreground">No archived meeting minutes available yet.</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  {/* Documents Tab */}
                  <TabsContent value="documents" className="space-y-4">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-cormorant font-bold mb-2">Document Archive</h2>
                      <p className="text-muted-foreground">
                        Historical documents and archived materials
                      </p>
                    </div>

                    {documents.length > 0 ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {documents.map((doc) => (
                          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <CardTitle className="text-lg flex items-start gap-2">
                                <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{doc.title}</span>
                              </CardTitle>
                              {doc.description && (
                                <CardDescription className="line-clamp-2">
                                  {doc.description}
                                </CardDescription>
                              )}
                            </CardHeader>
                            <CardContent>
                              <div className="flex gap-2">
                                {doc.file_url && (
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => openPdfViewer(doc.file_url!, doc.title)}
                                    className="gap-2"
                                  >
                                    View
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
                          <FolderOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-muted-foreground">No archived documents available yet.</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>

              </div>
            </div>
          </section>
        </main>
        
        <PDFViewerDialog
          open={pdfViewerOpen}
          onOpenChange={setPdfViewerOpen}
          pdfUrl={selectedPdf?.url || null}
          title={selectedPdf?.title}
        />
        <FooterAdBanner />
        <Footer />
      </div>
    </>
  );
};

export default ResourcesArchives;
