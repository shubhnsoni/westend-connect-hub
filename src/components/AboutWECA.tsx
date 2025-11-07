import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutWECA = () => {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-6">
            <span className="text-primary">ABOUT US</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
            Who We Are
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
            The West End Civic Association (WECA) represents residents of Rockville's historic West End neighborhood — one of the city's most vibrant, diverse, and community-driven areas. Since 1970, WECA has worked to preserve our heritage, advocate for thoughtful development, and foster civic engagement.
          </p>
          <Button variant="default" size="lg" className="rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl" asChild>
            <a href="/about" className="group">
              Learn More About WECA
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutWECA;
