import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Video, Share2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Media = () => {
  const mediaTypes = [
    {
      icon: Camera,
      title: "Photo Gallery",
      description: "Browse photos from community events, neighborhood landmarks, and local celebrations.",
      link: "/media/photos",
      count: "250+ Photos"
    },
    {
      icon: Video,
      title: "Video Library",
      description: "Watch resident testimonials, interviews with community leaders, and event highlights.",
      link: "/media/videos",
      count: "15 Videos"
    },
    {
      icon: Share2,
      title: "Social Media",
      description: "Follow our social media channels for real-time updates and community engagement.",
      link: "/media/social",
      count: "Live Feeds"
    }
  ];

  return (
    <>
      <SEO
        title="Media - WECA"
        description="Explore photos, videos, and social media from the West End community. See highlights from events and connect with neighbors."
        keywords="photos, videos, social media, community gallery, WECA events, West End"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20">
          <Breadcrumb />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Media Gallery
            </h1>
            <p className="text-lg text-muted-foreground">
              Experience the West End through photos, videos, and social connections
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="flex-1 py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6">
              {mediaTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{type.title}</CardTitle>
                      <CardDescription className="text-base">{type.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">{type.count}</p>
                      <Button variant="outline" asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-full">
                        <Link to={type.link} className="flex items-center gap-2 justify-center">
                          Explore
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Share Section */}
            <Card className="mt-16 bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20">
              <CardContent className="pt-12 pb-12 text-center">
                <Share2 className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Share Your Stories
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Have photos or videos from West End events? We'd love to feature them in our gallery. 
                  Share your community moments with us!
                </p>
                <Button size="lg" asChild>
                  <Link to="/contact">Submit Media</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Media;
