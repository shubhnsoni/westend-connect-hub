import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import springfestImage from "@/assets/springfest.jpg";
import boardMembersImage from "@/assets/board-members.jpg";
import historicHomesImage from "@/assets/historic-homes.jpg";

const newsItems = [
  {
    title: "Rockville West End SpringFest 2025 – A Huge Success!",
    description: "Community members gathered for our annual SpringFest celebration with food, music, and family activities.",
    date: "October 28, 2024",
    image: springfestImage,
    slug: "springfest-2025"
  },
  {
    title: "Meet Your New WECA Board Members",
    description: "Get to know the dedicated volunteers leading our community association into the future.",
    date: "October 15, 2024",
    image: boardMembersImage,
    slug: "new-board-members"
  },
  {
    title: "How We're Preserving Rockville's Historic Character",
    description: "Learn about WECA's initiatives to maintain the unique charm and heritage of our neighborhood.",
    date: "October 1, 2024",
    image: historicHomesImage,
    slug: "preserving-character"
  }
];

const FeaturedNews = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
            <span className="text-primary">NEWS & UPDATES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Latest from the West End
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with news, events, and stories from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {newsItems.map((item, index) => (
            <a 
              key={index} 
              href={`/blog/${item.slug}`}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="h-full overflow-hidden border-0 hover:border-primary transition-all duration-300 hover:shadow-2xl shadow-lg rounded-2xl">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="rounded-full px-8 text-base shadow-lg" asChild>
            <a href="/blog" className="group">
              View All News
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;