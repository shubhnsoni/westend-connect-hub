import { Button } from "@/components/ui/button";
import { Home, Trees, Users, Heart, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Home,
    title: "Historic Charm",
    description: "Beautiful heritage homes and architecture"
  },
  {
    icon: Trees,
    title: "Lush Parks",
    description: "Green spaces and walking trails throughout"
  },
  {
    icon: Users,
    title: "Walkable Streets",
    description: "Pedestrian-friendly neighborhood design"
  },
  {
    icon: Heart,
    title: "Welcoming Community",
    description: "Friendly neighbors and vibrant festivals"
  }
];

const WhyWestEnd = () => {
  return (
    <section className="py-16 bg-primary/5 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Live in Rockville's West End?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Historic charm, walkable streets, lush parks, and a welcoming community — the West End blends tradition with progress. From heritage homes to vibrant festivals, there's always something that makes you feel at home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button variant="default" size="lg" asChild>
              <a href="/about" className="group">
                Explore the Neighborhood
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWestEnd;
