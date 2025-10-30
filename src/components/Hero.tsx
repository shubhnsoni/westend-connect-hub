import { Button } from "@/components/ui/button";
import { MapPin, Users, Heart, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-neighborhood.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="West End Neighborhood" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-secondary/50"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center text-primary-foreground mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 border border-secondary/30 shadow-lg">
              <Users className="w-4 h-4" />
              <span>Serving 5,000+ Residents Since 1970</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Welcome to the<br />
              <span className="text-secondary font-cormorant">West End</span>
            </h1>
            
            <p className="text-xl sm:text-2xl mb-8 text-primary-foreground/95 max-w-3xl mx-auto leading-relaxed">
              Building a connected, informed, and thriving community in Rockville's historic West End neighborhood
            </p>

            <div className="inline-flex items-center gap-2 text-lg font-medium mb-10 bg-primary-foreground/10 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-foreground/20">
              <Calendar className="w-5 h-5 text-secondary" />
              <span>Next Meeting: Thursday, October 9th @ 7 PM</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in">
            <Button variant="secondary" size="lg" className="text-base px-8" asChild>
              <a href="#meetings">View Meeting Details</a>
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary backdrop-blur-sm" asChild>
              <a href="#newsletter">Join Our Newsletter</a>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-scale-in">
            <div className="bg-primary-foreground/10 backdrop-blur-md rounded-xl p-8 border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300 shadow-xl">
              <MapPin className="w-10 h-10 mx-auto mb-4 text-secondary" />
              <div className="text-4xl font-bold mb-2">700+</div>
              <div className="text-sm text-primary-foreground/90 font-medium">Acres of Community</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-md rounded-xl p-8 border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300 shadow-xl">
              <Users className="w-10 h-10 mx-auto mb-4 text-secondary" />
              <div className="text-4xl font-bold mb-2">1,600+</div>
              <div className="text-sm text-primary-foreground/90 font-medium">Active Households</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-md rounded-xl p-8 border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300 shadow-xl">
              <Heart className="w-10 h-10 mx-auto mb-4 text-secondary" />
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm text-primary-foreground/90 font-medium">Volunteer-Led</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
