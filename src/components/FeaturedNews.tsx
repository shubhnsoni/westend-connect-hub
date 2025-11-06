import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import halloweenImage from "@/assets/halloween-doggie-parade.jpg";

const newsItems = [
  {
    title: "Rockville West End SpringFest 2025 – A Huge Success!",
    description: "Community members gathered for our annual SpringFest celebration with food, music, and family activities.",
    date: "October 28, 2024",
    image: halloweenImage,
    slug: "springfest-2025"
  },
  {
    title: "Meet Your New WECA Board Members",
    description: "Get to know the dedicated volunteers leading our community association into the future.",
    date: "October 15, 2024",
    image: halloweenImage,
    slug: "new-board-members"
  },
  {
    title: "How We're Preserving Rockville's Historic Character",
    description: "Learn about WECA's initiatives to maintain the unique charm and heritage of our neighborhood.",
    date: "October 1, 2024",
    image: halloweenImage,
    slug: "preserving-character"
  }
];

const FeaturedNews = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Latest from the West End
          </h2>
          <p className="text-lg text-muted-foreground">
            Stay updated with news, events, and stories from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-10">
          {newsItems.map((item, index) => (
            <a 
              key={index} 
              href={`/blog/${item.slug}`}
              className="group animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="h-full overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <a href="/blog" className="group">
              View All News
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
