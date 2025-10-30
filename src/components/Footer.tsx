import { Facebook, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About Column */}
            <div>
              <h3 className="text-xl font-bold mb-4">West End Civic Association</h3>
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
                    West End Civic Association<br />
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

            {/* Connect Column */}
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <div className="space-y-3">
                <a 
                  href="https://www.facebook.com/westendcivicassociation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-background/80 hover:text-background transition-colors text-sm"
                >
                  <Facebook className="w-5 h-5" />
                  Follow us on Facebook
                </a>
                <div className="pt-4">
                  <p className="text-sm font-semibold mb-2">Support WECA</p>
                  <p className="text-background/80 text-sm">
                    Zelle: wecaoutreach@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/20 pt-8 text-center">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} West End Civic Association. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
