import { Facebook, Mail, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "You've been added to our newsletter.",
    });
    setEmail("");
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Support WECA CTA */}
      <div className="border-b border-background/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="bg-gradient-to-r from-primary to-primary/80 border-none">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-primary-foreground" />
                <h2 className="text-3xl font-cormorant font-bold text-primary-foreground font-cantata">
                  Support WECA
                </h2>
              </div>
              <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                Help us continue serving the West End community through events, advocacy, and preservation efforts.
              </p>
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 mb-6 max-w-md mx-auto">
                <p className="text-sm text-primary-foreground/80 mb-2">Contribute via Zelle:</p>
                <p className="text-xl sm:text-2xl font-bold text-primary-foreground break-all sm:break-normal">wecaoutreach@gmail.com</p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <a href="/support#advertise">Advertise with Us</a>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <a href="/support#sponsor">Sponsor an Event</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-background/10">
                  <a href="/support">Learn More</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* About Column */}
              <div>
                <h3 className="text-xl font-bold mb-4 font-cantata">West End Civic Association</h3>
                <p className="text-background/80 text-sm leading-relaxed">
                  An all-volunteer, resident-led organization dedicated to keeping neighbors informed 
                  and fostering a welcoming, connected neighborhood spirit.
                </p>
              </div>

              {/* Contact Column */}
              <div>
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-background/80">
                      <span className="font-cantata">West End</span> Civic Association<br />
                      P.O. Box 1052<br />
                      Rockville, MD 20849
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <a href="mailto:WECAoutreach@gmail.com" className="text-background/80 hover:text-background transition-colors">
                      WECAoutreach@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links Column */}
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/events" className="text-background/80 hover:text-background transition-colors">
                      Events
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="text-background/80 hover:text-background transition-colors">
                      News
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-background/80 hover:text-background transition-colors">
                      Get Involved
                    </a>
                  </li>
                  <li>
                    <a href="/resources" className="text-background/80 hover:text-background transition-colors">
                      Resources
                    </a>
                  </li>
                  <li>
                    <a href="/support/contribute" className="text-background/80 hover:text-background transition-colors">
                      Contribute
                    </a>
                  </li>
                </ul>
              </div>

              {/* Stay Updated Column */}
              <div>
                <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                <p className="text-background/80 text-sm mb-4">
                  Join our mailing list to receive updates on events, city planning, and community initiatives.
                </p>
                <form onSubmit={handleSubmit} className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background/10 border-background/30 text-background placeholder:text-background/50"
                  />
                  <Button type="submit" variant="secondary" className="w-full">
                    Subscribe
                  </Button>
                </form>
                <a href="/resources#newsletters" className="text-xs text-background/60 hover:text-background/80 transition-colors mt-2 inline-block">
                  View past newsletters →
                </a>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-background/20 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-background/60 text-sm">
                  © {new Date().getFullYear()} <span className="font-cantata">West End</span> Civic Association. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.facebook.com/westendcivicassociation" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-background/60 hover:text-background transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
