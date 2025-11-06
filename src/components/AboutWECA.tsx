import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutWECA = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Who We Are
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            The West End Civic Association (WECA) represents residents of Rockville's historic West End neighborhood — one of the city's most vibrant, diverse, and community-driven areas. Since 1970, WECA has worked to preserve our heritage, advocate for thoughtful development, and foster civic engagement.
          </p>
          <Button variant="default" size="lg" asChild>
            <a href="/about" className="group">
              Learn More About WECA
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutWECA;
