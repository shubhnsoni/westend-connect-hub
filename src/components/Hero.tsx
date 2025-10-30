import { Button } from "@/components/ui/button";
import { MapPin, Users, Heart } from "lucide-react";
import heroImage from "@/assets/hero-neighborhood.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="West End Neighborhood" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-secondary/60"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <div className="animate-fade-in-up mb-8">
            <div className="inline-block px-6 py-2 bg-secondary/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-secondary/30">
              Serving 5,000+ Residents Since 1970
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              West End<br />
              <span className="text-secondary">Civic Association</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Building a connected, informed, and thriving community in Rockville's historic West End
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
            <Button variant="secondary" size="lg" asChild>
              <a href="#meetings">Next Meeting: Oct 9th</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary backdrop-blur-sm">
              <a href="#newsletter">Join Our Newsletter</a>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-scale-in">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-secondary" />
              <div className="text-3xl font-bold mb-1">700+</div>
              <div className="text-sm text-primary-foreground/80">Acres</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <Users className="w-8 h-8 mx-auto mb-3 text-secondary" />
              <div className="text-3xl font-bold mb-1">1,600+</div>
              <div className="text-sm text-primary-foreground/80">Households</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <Heart className="w-8 h-8 mx-auto mb-3 text-secondary" />
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm text-primary-foreground/80">Volunteer-Led</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
