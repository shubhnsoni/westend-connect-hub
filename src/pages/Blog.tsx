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
import halloweenImage from "@/assets/halloween-doggie-parade.jpg";

const Blog = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Newsletter posts (main blog content)
  const newsletterPosts = [
    { id: "october-2025-update", title: "WECA October 2025 Update", date: "2025-10-15", category: "Newsletter", description: "Meeting recap, Woodley Gardens Pool update, King Farm Master Plan proposal, and important community announcements.", link: "/blog/october-2025-update", image: halloweenImage, author: "WECA Board", readTime: "5 min read" },
    { id: "spring-2025", title: "Spring 2025 Newsletter", date: "2025-04-01", category: "Newsletter", description: "Latest updates on community events, spring general membership meeting details, and annual election of officers information.", image: halloweenImage, author: "WECA Board", readTime: "4 min read" },
    { id: "fall-2024", title: "Fall 2024 Newsletter", date: "2024-10-01", category: "Newsletter", description: "Fall community updates, meeting schedules, and important announcements for West End residents.", image: halloweenImage, author: "WECA Board", readTime: "6 min read" },
    { id: "cn-2024", title: "Community News 2024", date: "2024-08-01", category: "Community News", description: "Special edition covering important community developments and neighborhood initiatives.", image: halloweenImage, author: "WECA Communications", readTime: "7 min read" },
    { id: "es-2024", title: "Special Edition 2024", date: "2024-06-01", category: "Special Edition", description: "In-depth coverage of West End community projects and future planning initiatives.", image: halloweenImage, author: "WECA Board", readTime: "10 min read" },
    { id: "spring-2024", title: "Spring 2024 Newsletter", date: "2024-04-01", category: "Newsletter", description: "Spring updates including meeting information and community engagement opportunities.", image: halloweenImage, author: "WECA Board", readTime: "5 min read" },
    { id: "fall-2023", title: "Fall 2023 Newsletter", date: "2023-10-01", category: "Newsletter", description: "Fall season updates and preparations for upcoming community meetings.", image: halloweenImage, author: "WECA Board", readTime: "4 min read" },
    { id: "spring-2023", title: "Spring 2023 Newsletter", date: "2023-04-01", category: "Newsletter", description: "Spring meeting announcements and officer election information for the community.", image: halloweenImage, author: "WECA Board", readTime: "5 min read" },
    { id: "fall-2022", title: "Fall 2022 Newsletter", date: "2022-10-01", category: "Newsletter", description: "Community updates and fall meeting schedule for West End residents.", image: halloweenImage, author: "WECA Board", readTime: "4 min read" },
    { id: "spring-2022", title: "Spring 2022 Newsletter", date: "2022-04-01", category: "Newsletter", description: "Spring updates and annual meeting information for the West End community.", image: halloweenImage, author: "WECA Board", readTime: "6 min read" },
  ];

  // Categories
  const categories = [
    { name: "All Posts", count: newsletterPosts.length },
    { name: "Newsletter", count: newsletterPosts.filter(p => p.category === "Newsletter").length },
    { name: "Community News", count: newsletterPosts.filter(p => p.category === "Community News").length },
    { name: "Special Edition", count: newsletterPosts.filter(p => p.category === "Special Edition").length },
    { name: "Meeting Minutes", count: 12 },
  ];

  // Tags
  const tags = ["Community Events", "Development", "Parks", "Safety", "Meetings", "Planning", "Volunteer", "History"];

  // Recent meeting updates
  const recentMeetings = [
    { date: "May 8, 2025", title: "May 2025 General Meeting" },
    { date: "April 10, 2025", title: "April 2025 Meeting" },
    { date: "March 13, 2025", title: "March 2025 Meeting" },
    { date: "February 13, 2025", title: "February 2025 Meeting" },
  ];

  // Filter posts
  const filteredPosts = newsletterPosts.filter(post => {
    const matchesCategory = !selectedCategory || selectedCategory === "All Posts" || post.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
        <Breadcrumb />
        <TopAdBanner />

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
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Featured Image */}
                    <div className="md:col-span-1 relative overflow-hidden aspect-video md:aspect-square">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        {post.category}
                      </Badge>
                    </div>
                    
                    {/* Content */}
                    <div className="md:col-span-2 p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                        <span>By {post.author}</span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.description}
                      </p>
                      
                      {post.link ? (
                        <Link
                          to={post.link}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                        >
                          Read Full Article
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {/* Pagination */}
              <div className="flex justify-center gap-2 pt-8">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
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

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        selectedCategory === cat.name || (!selectedCategory && cat.name === "All Posts")
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <span className="font-medium">{cat.name}</span>
                      <Badge variant={selectedCategory === cat.name || (!selectedCategory && cat.name === "All Posts") ? "secondary" : "outline"} className="text-xs">
                        {cat.count}
                      </Badge>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {newsletterPosts.slice(0, 4).map((post) => (
                    <div key={post.id}>
                      <Link to={post.link || "#"} className="group">
                        <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </Link>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Popular Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
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

              {/* Recent Meetings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Recent Meetings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentMeetings.map((meeting, index) => (
                    <div key={index}>
                      <a href="/resources" className="group block">
                        <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {meeting.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {meeting.date}
                        </p>
                      </a>
                      {index < recentMeetings.length - 1 && <Separator className="mt-3" />}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                    <a href="/resources">View All Minutes</a>
                  </Button>
                </CardContent>
              </Card>

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
        <Footer />
      </div>
    </>
  );
};

export default Blog;
