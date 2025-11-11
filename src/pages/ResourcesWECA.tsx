import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PDFViewerDialog from "@/components/PDFViewerDialog";

const ResourcesWECA = () => {
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['weca-resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('category', 'weca')
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
        title="WECA Resources | West End Civic Association"
        description="Access WECA documents, bylaws, meeting minutes, and official association resources."
        keywords="WECA resources, bylaws, meeting minutes, association documents, Rockville civic"
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
                <FileText className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-6 animate-fade-in">
                  WECA Resources
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Official documents, bylaws, and resources from the West End Civic Association
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto space-y-12">
                
                {/* Official Documents */}
                <div>
                  <h2 className="text-3xl font-cormorant font-bold mb-6">Official Documents</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          WECA Bylaws
                        </CardTitle>
                        <CardDescription>
                          Official governing rules and procedures of the association
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-3">
                          <Button variant="default" size="sm" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            View Document
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Download className="w-4 h-4" />
                            Download PDF
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          Board Meeting Minutes
                        </CardTitle>
                        <CardDescription>
                          Records of board meetings and decisions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="default" size="sm" className="gap-2">
                          <ExternalLink className="w-4 h-4" />
                          View Minutes Archive
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          Annual Reports
                        </CardTitle>
                        <CardDescription>
                          Yearly summaries of WECA activities and finances
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="default" size="sm" className="gap-2">
                          <ExternalLink className="w-4 h-4" />
                          View Reports
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          Membership Information
                        </CardTitle>
                        <CardDescription>
                          How to join and participate in WECA
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="default" size="sm" className="gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Resource Library */}
                {resources.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-cormorant font-bold mb-6">Resource Library</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {resources.map((resource) => (
                        <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            {resource.description && (
                              <CardDescription className="line-clamp-2">
                                {resource.description}
                              </CardDescription>
                            )}
                          </CardHeader>
                          <CardContent>
                            <div className="flex gap-2">
                              {resource.file_url && (
                                <>
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => openPdfViewer(resource.file_url!, resource.title)}
                                    className="gap-2"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    View
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    asChild
                                    className="gap-2"
                                  >
                                    <a href={resource.file_url} download>
                                      <Download className="w-4 h-4" />
                                      Download
                                    </a>
                                  </Button>
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <Card className="bg-primary/5">
                  <CardHeader>
                    <CardTitle>Need Help Finding Something?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Can't find the document you're looking for? Contact us and we'll help you locate it.
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a href="mailto:info@weca.org" className="text-primary hover:underline">
                        info@weca.org
                      </a>
                    </p>
                  </CardContent>
                </Card>

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
        <Footer />
      </div>
    </>
  );
};

export default ResourcesWECA;
