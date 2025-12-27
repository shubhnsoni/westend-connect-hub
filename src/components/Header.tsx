import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import treeIcon from "@/assets/ad-logo.png";
import NewsletterDialog from "@/components/NewsletterDialog";
import { GlobalSearch } from "@/components/GlobalSearch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <a href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <img 
              src={treeIcon} 
              alt="WECA Logo" 
              className="h-10 w-10 sm:h-14 sm:w-14 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl md:text-3xl font-cormorant font-bold text-primary leading-none font-cantata">
                west end
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm font-sans font-semibold text-primary uppercase tracking-wide sm:tracking-widest leading-none mt-0.5">
                civic association
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <GlobalSearch />
            <a href="/about" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
              About
            </a>
            <a href="/priorities" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted font-cantata">
              WECA Priorities
            </a>
            <a href="/events" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
              Events
            </a>
            
            {/* News Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
                News <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border z-[60]">
                <DropdownMenuItem asChild>
                  <a href="/news/updates" className="cursor-pointer">Updates</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/news/newsletters" className="cursor-pointer">Newsletters</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
                Resources <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border z-[60]">
                <DropdownMenuItem asChild>
                  <a href="/resources/weca" className="cursor-pointer"><span className="font-cantata">WECA</span> Resources</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/resources/archives" className="cursor-pointer">Documents and Archives</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/resources/city-services" className="cursor-pointer">City of Rockville Resources</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Support WECA Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted font-cantata">
                Support WECA <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border z-[60]">
                <DropdownMenuItem asChild>
                  <a href="/support/advertise" className="cursor-pointer">Advertise with us</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/support/sponsor" className="cursor-pointer">Sponsor an event</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/support/contribute" className="cursor-pointer">Contribute to <span className="font-cantata">WECA</span></a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isHomePage ? (
              <Button variant="hero" size="sm" asChild className="ml-2">
                <a href="#newsletter">Stay Connected</a>
              </Button>
            ) : (
              <Button variant="hero" size="sm" onClick={() => setIsNewsletterOpen(true)} className="ml-2">
                Stay Connected
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors flex-shrink-0"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in max-h-[calc(100vh-5rem)] overflow-y-auto">
            <nav className="flex flex-col space-y-3 px-2">
              {/* Simple Links */}
              <a href="/about" className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary bg-muted/50 rounded-lg border border-border/50 transition-colors">
                About
              </a>
              <a href="/priorities" className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary bg-muted/50 rounded-lg border border-border/50 transition-colors font-cantata">
                WECA Priorities
              </a>
              <a href="/events" className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary bg-muted/50 rounded-lg border border-border/50 transition-colors">
                Events
              </a>
              
              {/* News Section */}
              <div className="bg-muted/50 rounded-lg border border-border/50 overflow-hidden">
                <div className="flex items-center">
                  <p className="px-4 py-3 text-sm font-semibold text-foreground flex-shrink-0">News</p>
                  <div className="h-6 w-px bg-border"></div>
                  <div className="flex-1 flex">
                    <a href="/news/updates" className="flex-1 px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-muted/80 transition-colors text-center">
                      Updates
                    </a>
                    <div className="w-px bg-border/50"></div>
                    <a href="/news/newsletters" className="flex-1 px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-muted/80 transition-colors text-center">
                      Newsletters
                    </a>
                  </div>
                </div>
              </div>

              {/* Resources Section */}
              <div className="bg-muted/50 rounded-lg border border-border/50 overflow-hidden">
                <div className="flex items-start">
                  <p className="px-4 py-3 text-sm font-semibold text-foreground flex-shrink-0 border-r border-border">Resources</p>
                  <div className="flex-1 flex flex-col divide-y divide-border/50">
                    <a href="/resources/weca" className="px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-muted/80 transition-colors">
                      <span className="font-cantata">WECA</span> Resources
                    </a>
                    <a href="/resources/archives" className="px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-muted/80 transition-colors">
                      Documents & Archives
                    </a>
                    <a href="/resources/city-services" className="px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-muted/80 transition-colors">
                      City Resources
                    </a>
                  </div>
                </div>
              </div>

              {/* Support WECA Section */}
              <div className="bg-primary/5 rounded-lg border border-primary/20 overflow-hidden">
                <div className="flex items-start">
                  <p className="px-4 py-3 text-sm font-semibold text-primary flex-shrink-0 border-r border-primary/20 font-cantata">Support WECA</p>
                  <div className="flex-1 flex flex-col divide-y divide-primary/10">
                    <a href="/support/advertise" className="px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      Advertise
                    </a>
                    <a href="/support/sponsor" className="px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      Sponsor
                    </a>
                    <a href="/support/contribute" className="px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      Contribute
                    </a>
                  </div>
                </div>
              </div>

              {isHomePage ? (
                <Button variant="hero" size="sm" asChild className="mx-2">
                  <a href="#newsletter">Stay Connected</a>
                </Button>
              ) : (
                <Button variant="hero" size="sm" onClick={() => setIsNewsletterOpen(true)} className="mx-2">
                  Stay Connected
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>

      <NewsletterDialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
    </header>
  );
};

export default Header;
