import { Card } from "@/components/ui/card";
import { Home, FileText, Map } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">About the West End</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              One of Rockville's earliest neighborhoods, spanning more than 700 acres and home to roughly 5,000 residents
            </p>
          </div>

          <div className="prose prose-lg max-w-4xl mx-auto mb-12 text-foreground">
            <p className="text-center leading-relaxed">
              The West End is bounded by Rockville Town Center, I-270, and Maryland Avenue. The community blends historic charm 
              with vibrant residential areas, including West End Park, Rose Hill, Rose Hill Falls, Chestnut Lodge, Thirty Oaks, 
              Courthouse Walk, and other enclaves.
            </p>
            <p className="text-center leading-relaxed mt-4">
              The West End Civic Association (WECA) is an all-volunteer, resident-led organization dedicated to keeping neighbors 
              informed about issues that affect our area, advocating for the community's welfare, and fostering a welcoming, 
              connected neighborhood spirit.
            </p>
          </div>

          {/* Quick Links Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-border group cursor-pointer animate-fade-in">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Charter & By-Laws</h3>
                <p className="text-muted-foreground text-sm mb-4">Learn about WECA's structure and governance</p>
                <a href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Read More →
                </a>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-border group cursor-pointer animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">West End History</h3>
                <p className="text-muted-foreground text-sm mb-4">Discover the rich history of our neighborhood</p>
                <a href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Explore History →
                </a>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-border group cursor-pointer animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Map className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Map & Boundaries</h3>
                <p className="text-muted-foreground text-sm mb-4">View detailed maps of the West End area</p>
                <a href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  View Map →
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
