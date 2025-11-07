import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Download, Newspaper, Calendar, FolderOpen, Info, ArrowRight } from "lucide-react";
import NewsletterDialog from "@/components/NewsletterDialog";

const Resources = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const meetingMinutes: Record<number, string[]> = {
    2025: ["May 8", "April 10", "March 13", "February 13", "January 9"],
    2024: ["November 14", "October 10", "September 12", "May 9", "April 11", "March 14"],
    2023: ["November 09", "October 19", "September 14", "May 11", "April 13", "March 9", "February 9", "January 10"],
    2022: ["November 10", "October 13", "September 8", "May 12", "April 7", "March 10", "February 10", "January 13"],
    2021: ["November 11", "October 14", "September 9", "May 27", "April 22", "March 25", "February 25", "January 28"],
  };

  const newsletters: Record<number, string[]> = {
    2025: ["Spring", "Fall"],
    2024: ["Spring", "Fall", "CN", "ES"],
    2023: ["Spring", "Fall"],
    2022: ["Spring", "Fall"],
    2021: ["Spring", "Fall"],
  };
  
  // Get years in reverse order (most recent first)
  const sortedMeetingYears = Object.keys(meetingMinutes).sort((a, b) => Number(b) - Number(a));
  const sortedNewsletterYears = Object.keys(newsletters).sort((a, b) => Number(b) - Number(a));

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
              Stay up-to-date with meeting minutes, newsletters, and neighborhood news
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="space-y-16">
            {/* Work in Progress Notice */}
            <Card className="border-primary/20 bg-primary/5 rounded-2xl shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <p className="text-foreground text-lg">
                    We're working on populating recent resources! Check back soon for the latest updates.
                  </p>
                </div>
              </CardContent>
            </Card>

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
                    Access minutes from our monthly meetings. Click on a year to view available meeting dates.
                  </p>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {sortedMeetingYears.map((yearStr) => {
                    const year = Number(yearStr);
                    const dates = meetingMinutes[year];
                    return (
                    <AccordionItem key={yearStr} value={yearStr} className="border-2 rounded-2xl px-6 bg-background shadow-sm hover:shadow-md transition-shadow">
                      <AccordionTrigger className="hover:no-underline py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <span className="text-2xl font-bold text-foreground">{year}</span>
                          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            {dates.length} meetings
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 pb-4">
                          {dates.map((date) => (
                            <a
                              key={date}
                              href="#"
                              className="flex items-center justify-between p-5 rounded-xl border-2 bg-background hover:bg-muted hover:border-primary transition-all group shadow-sm"
                            >
                              <span className="font-semibold text-foreground">{date}</span>
                              <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
                            </a>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                  })}
                </Accordion>
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
                    WECA newsletters are published twice per year: (1) Spring, prior to the spring general membership meeting and annual election of officers; (2) Fall, prior to the fall general membership meeting.
                  </p>
                </div>

                <div className="space-y-6">
                  {sortedNewsletterYears.map((yearStr) => {
                    const year = Number(yearStr);
                    const issues = newsletters[year];
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
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {issues.map((issue) => (
                            <a
                              key={issue}
                              href="#"
                              className="flex flex-col items-center justify-center p-6 rounded-xl border-2 bg-background hover:bg-muted hover:border-primary transition-all group shadow-sm"
                            >
                              <Newspaper className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                              <span className="font-bold text-sm text-foreground">{issue}</span>
                            </a>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Stay Informed CTA Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Know about upcoming meetings and neighborhood news
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Join our newsletter to stay informed about WECA events and community updates
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
