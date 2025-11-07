import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Trees, Users, Heart, ArrowRight } from "lucide-react";
import historicHomesImage from "@/assets/historic-homes.jpg";
import heroImage from "@/assets/hero-neighborhood.jpg";
import springfestImage from "@/assets/springfest.jpg";
import halloweenParadeImage from "@/assets/halloween-doggie-parade.jpg";

const features = [
  {
    icon: Home,
    title: "Historic Charm",
    description: "Beautiful heritage homes and architecture dating back to the 1700s",
    image: historicHomesImage
  },
  {
    icon: Trees,
    title: "Lush Parks",
    description: "Green spaces and walking trails throughout the neighborhood",
    image: heroImage
  },
  {
    icon: Users,
    title: "Walkable Streets",
    description: "Pedestrian-friendly neighborhood design connecting community",
    image: heroImage
  },
  {
    icon: Heart,
    title: "Welcoming Community",
    description: "Friendly neighbors and vibrant festivals year-round",
    image: springfestImage
  }
];

const WhyWestEnd = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
              <span className="text-primary">WHY WEST END</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Why Live in Rockville's West End?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Historic charm, walkable streets, lush parks, and a welcoming community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="relative overflow-hidden h-[320px] group hover:shadow-2xl transition-all duration-500 border-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-foreground/30" />
                  </div>

                  {/* Content Overlay */}
                  <div className="relative h-full flex flex-col justify-end p-8 text-primary-foreground">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-primary-foreground/90 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button variant="default" size="lg" className="rounded-full px-8 text-base shadow-lg" asChild>
              <a href="/about" className="group">
                Explore the Neighborhood
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWestEnd;