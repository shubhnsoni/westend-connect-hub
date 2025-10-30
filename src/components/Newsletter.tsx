import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive news and updates about the West End neighborhood.",
    });
    setEmail("");
  };

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-16 h-16 bg-secondary/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Stay Connected with WECA</h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Get news and information about the neighborhood and notice of WECA meetings delivered to your inbox
            </p>
          </div>

          <Card className="p-8 shadow-2xl animate-scale-in bg-primary-foreground text-foreground border-none">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 text-base"
                />
                <Button type="submit" variant="hero" size="lg" className="sm:w-auto w-full">
                  Join Newsletter
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </Card>

          <div className="mt-12 text-center animate-fade-in">
            <p className="text-primary-foreground/90 mb-4">
              WECA is a volunteer organization. We greatly appreciate and rely on contributions to facilitate the work we do.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="secondary" size="lg">
                Support WECA
              </Button>
              <span className="text-sm text-primary-foreground/80">
                Donate via Zelle: WECAoutreach@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
