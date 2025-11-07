import { Button } from "@/components/ui/button";
import { MapPin, Users, Heart, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-neighborhood.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Professional Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="West End Neighborhood" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/85"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 pb-24 sm:pb-32 max-w-7xl">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20 shadow-lg text-white">
              <Users className="w-4 h-4" />
              <span>Serving 5,000+ Residents Since 1970</span>
            </div>
          </div>
          
          {/* Headline */}
          <div className="text-center text-white mb-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Preserving the Heritage.<br />Shaping the Future.
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-base sm:text-lg lg:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light">
              The West End Civic Association (WECA) is dedicated to celebrating our history, empowering our residents, and building a stronger, more connected neighborhood for all.
            </p>
          </div>

          {/* Meeting Badge */}
          <div className="text-center mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="inline-flex flex-col sm:flex-row items-center gap-2.5 bg-secondary/20 backdrop-blur-md px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-secondary/40 shadow-xl">
              <Calendar className="w-5 h-5 text-secondary flex-shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base text-center">Next Meeting: Thursday, October 9th @ 7 PM</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-14 px-4 animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <Button 
              variant="secondary" 
              size="lg" 
              className="w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 font-semibold shadow-xl hover:shadow-2xl transition-all" 
              asChild
            >
              <a href="#meetings">Upcoming Meetings</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 bg-white/10 border-2 border-white/40 text-white hover:bg-white hover:text-primary backdrop-blur-md font-semibold shadow-xl" 
              asChild
            >
              <a href="#about">Join WECA</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 bg-white/10 border-2 border-white/40 text-white hover:bg-white hover:text-primary backdrop-blur-md font-semibold shadow-xl" 
              asChild
            >
              <a href="#contact">Get Involved</a>
            </Button>
          </div>

          {/* Quick Stats - More Professional */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">700+</div>
              <div className="text-sm text-muted-foreground font-medium">Acres</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">1,600+</div>
              <div className="text-sm text-muted-foreground font-medium">Households</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground font-medium">Volunteer-Led</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
