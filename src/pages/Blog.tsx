import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SidebarAds from "@/components/SidebarAds";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Calendar, FileText, ArrowRight } from "lucide-react";
import NewsletterDialog from "@/components/NewsletterDialog";

const Blog = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  // Newsletter posts (main blog content)
  const newsletterPosts = [
    { id: "spring-2025", title: "Spring 2025 Newsletter", date: "2025-04-01", category: "Newsletter", description: "Latest updates on community events, spring general membership meeting details, and annual election of officers information." },
    { id: "fall-2024", title: "Fall 2024 Newsletter", date: "2024-10-01", category: "Newsletter", description: "Fall community updates, meeting schedules, and important announcements for West End residents." },
    { id: "cn-2024", title: "Community News 2024", date: "2024-08-01", category: "Community News", description: "Special edition covering important community developments and neighborhood initiatives." },
    { id: "es-2024", title: "Special Edition 2024", date: "2024-06-01", category: "Special Edition", description: "In-depth coverage of West End community projects and future planning initiatives." },
    { id: "spring-2024", title: "Spring 2024 Newsletter", date: "2024-04-01", category: "Newsletter", description: "Spring updates including meeting information and community engagement opportunities." },
    { id: "fall-2023", title: "Fall 2023 Newsletter", date: "2023-10-01", category: "Newsletter", description: "Fall season updates and preparations for upcoming community meetings." },
    { id: "spring-2023", title: "Spring 2023 Newsletter", date: "2023-04-01", category: "Newsletter", description: "Spring meeting announcements and officer election information for the community." },
    { id: "fall-2022", title: "Fall 2022 Newsletter", date: "2022-10-01", category: "Newsletter", description: "Community updates and fall meeting schedule for West End residents." },
    { id: "spring-2022", title: "Spring 2022 Newsletter", date: "2022-04-01", category: "Newsletter", description: "Spring updates and annual meeting information for the West End community." },
  ];

  // Recent meeting updates
  const recentMeetings = [
    { date: "May 8, 2025", title: "May 2025 General Meeting" },
    { date: "April 10, 2025", title: "April 2025 Meeting" },
    { date: "March 13, 2025", title: "March 2025 Meeting" },
    { date: "February 13, 2025", title: "February 2025 Meeting" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TopAdBanner />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20 shadow-lg mb-6">
              <Newspaper className="w-4 h-4" />
              <span>News & Updates</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">WECA Blog</h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Stay informed with the latest newsletters, meeting updates, and community news from the West End Civic Association
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
              {/* Featured Posts Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-foreground">Latest Posts</h2>
                  <Badge variant="secondary" className="text-sm">
                    {newsletterPosts.length} Articles
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {newsletterPosts.map((post) => (
                    <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Recent Meeting Updates */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">Recent Meeting Updates</h2>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {recentMeetings.map((meeting, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted transition-colors group cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {meeting.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {meeting.date}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Button variant="outline" asChild>
                        <a href="/resources">View All Meeting Minutes</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Sidebar */}
            <SidebarAds />
          </div>
        </div>
      </main>

      {/* Newsletter CTA Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Never Miss an Update
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Subscribe to receive our newsletter and stay informed about community events and news
          </p>
          <Button variant="secondary" size="lg" onClick={() => setIsNewsletterOpen(true)}>
            Subscribe Now
          </Button>
        </div>
      </section>

      <NewsletterDialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
      <Footer />
    </div>
  );
};

export default Blog;
