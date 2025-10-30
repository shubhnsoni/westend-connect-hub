import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SidebarAds from "@/components/SidebarAds";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Download, Newspaper, Calendar, FolderOpen, Info } from "lucide-react";
import NewsletterDialog from "@/components/NewsletterDialog";

const Resources = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const meetingMinutes = {
    2025: ["May 8", "April 10", "March 13", "February 13", "January 9"],
    2024: ["November 14", "October 10", "September 12", "May 9", "April 11", "March 14"],
    2023: ["November 09", "October 19", "September 14", "May 11", "April 13", "March 9", "February 9", "January 10"],
    2022: ["November 10", "October 13", "September 8", "May 12", "April 7", "March 10", "February 10", "January 13"],
    2021: ["November 11", "October 14", "September 9", "May 27", "April 22", "March 25", "February 25", "January 28"],
  };

  const newsletters = {
    2025: ["Spring", "Fall"],
    2024: ["Spring", "Fall", "CN", "ES"],
    2023: ["Spring", "Fall"],
    2022: ["Spring", "Fall"],
    2021: ["Spring", "Fall"],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TopAdBanner />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20 shadow-lg mb-6">
              <FolderOpen className="w-4 h-4" />
              <span>Meeting Minutes & Newsletters</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Resources</h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Stay up-to-date with meeting minutes, newsletters, and neighborhood news
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-3 space-y-12">
              {/* Work in Progress Notice */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-foreground">
                      We're working on populating recent resources! Check back soon for the latest updates.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Meeting Minutes Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">Meeting Minutes</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Access minutes from our monthly meetings. Click on a year to view available meeting dates.
                </p>

                <Accordion type="single" collapsible className="space-y-4">
                  {Object.entries(meetingMinutes).map(([year, dates]) => (
                    <AccordionItem key={year} value={year} className="border rounded-lg px-6">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="text-xl font-semibold">{year}</span>
                          <span className="text-sm text-muted-foreground">({dates.length} meetings)</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-4">
                          {dates.map((date) => (
                            <a
                              key={date}
                              href="#"
                              className="flex items-center justify-between p-4 rounded-md border bg-card hover:bg-muted transition-colors group"
                            >
                              <span className="font-medium text-foreground">{date}</span>
                              <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </a>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* Newsletters Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Newspaper className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">Newsletters</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  WECA newsletters are published twice per year: (1) Spring, prior to the spring general membership meeting and annual election of officers; (2) Fall, prior to the fall general membership meeting.
                </p>

                <div className="space-y-6">
                  {Object.entries(newsletters).map(([year, issues]) => (
                    <Card key={year}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          {year}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {issues.map((issue) => (
                            <a
                              key={issue}
                              href="#"
                              className="flex flex-col items-center justify-center p-4 rounded-md border bg-card hover:bg-muted transition-colors group"
                            >
                              <Newspaper className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                              <span className="font-medium text-sm text-foreground">{issue}</span>
                            </a>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar Ads */}
            <SidebarAds />
          </div>
        </div>
      </main>

      {/* Stay Informed CTA Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Know about upcoming meetings and neighborhood news
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Join our newsletter to stay informed about WECA events and community updates
          </p>
          <Button variant="secondary" size="lg" onClick={() => setIsNewsletterOpen(true)}>
            Join Newsletter
          </Button>
        </div>
      </section>

      <NewsletterDialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
      <Footer />
    </div>
  );
};

export default Resources;
