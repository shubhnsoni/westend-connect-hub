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
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <a href="/" className="flex items-center gap-3">
            <img 
              src={treeIcon} 
              alt="WECA Logo" 
              className="h-14 w-14 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-cormorant font-bold text-primary leading-none">
                west end
              </span>
              <span className="text-xs sm:text-sm font-sans font-semibold text-primary uppercase tracking-widest leading-none mt-0.5">
                civic association
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <GlobalSearch />
            <a href="/about" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
              About
            </a>
            <a href="/priorities" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
              WECA Priorities
            </a>
            <a href="/events" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
              Events
            </a>
            
            {/* News Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
                News <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border">
                <DropdownMenuItem asChild>
                  <a href="/blog?filter=updates" className="cursor-pointer">Updates</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/blog?filter=newsletter" className="cursor-pointer">Newsletter</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
                Resources <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border">
                <DropdownMenuItem asChild>
                  <a href="/resources#weca" className="cursor-pointer">WECA Resources</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/resources#archives" className="cursor-pointer">Documents and Archives</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/resources#city" className="cursor-pointer">City of Rockville Resources</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Support WECA Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
                Support WECA <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border">
                <DropdownMenuItem asChild>
                  <a href="/support#advertise" className="cursor-pointer">Advertise with us</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/support#sponsor" className="cursor-pointer">Sponsor an event</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/support#contribute" className="cursor-pointer">Contribute to WECA</a>
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
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <a href="/about" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
                About
              </a>
              <a href="/priorities" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
                WECA Priorities
              </a>
              <a href="/events" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
                Events
              </a>
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">News</p>
                <div className="pl-4 space-y-2">
                  <a href="/blog?filter=updates" className="block py-1.5 text-sm text-foreground hover:text-primary transition-colors">
                    Updates
                  </a>
                  <a href="/blog?filter=newsletter" className="block py-1.5 text-sm text-foreground hover:text-primary transition-colors">
                    Newsletter
                  </a>
                </div>
              </div>
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Resources</p>
                <div className="pl-4 space-y-2">
                  <a href="/resources#weca" className="block py-1.5 text-sm text-foreground hover:text-primary transition-colors">
                    WECA Resources
                  </a>
                  <a href="/resources#archives" className="block py-1.5 text-sm text-foreground hover:text-primary transition-colors">
                    Documents and Archives
                  </a>
                  <a href="/resources#city" className="block py-1.5 text-sm text-foreground hover:text-primary transition-colors">
                    City of Rockville Resources
                  </a>
                </div>
              </div>
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Support WECA</p>
                <div className="pl-4 space-y-2">
                  <a href="/support#advertise" className="block py-1.5 text-sm text-foreground hover:text-primary transition-colors">
                    Advertise with us
                  </a>
                  <a href="/support#sponsor" className="block py-1.5 text-sm text-foreground hover:text-primary transition-colors">
                    Sponsor an event
                  </a>
                  <a href="/support#contribute" className="block py-1.5 text-sm text-foreground hover:text-primary transition-colors">
                    Contribute to WECA
                  </a>
                </div>
              </div>
              {isHomePage ? (
                <Button variant="hero" size="sm" asChild className="mx-4">
                  <a href="#newsletter">Stay Connected</a>
                </Button>
              ) : (
                <Button variant="hero" size="sm" onClick={() => setIsNewsletterOpen(true)} className="mx-4">
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
