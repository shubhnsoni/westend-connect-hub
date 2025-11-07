import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import treeIcon from "@/assets/ad-logo.png";
import NewsletterDialog from "@/components/NewsletterDialog";
import { GlobalSearch } from "@/components/GlobalSearch";

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
            <a href="/events" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
              Events
            </a>
            <a href="/blog" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
              Blog
            </a>
            <a href="/resources" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
              Resources
            </a>
            {isHomePage ? (
              <Button variant="hero" size="sm" asChild className="ml-2">
                <a href="#newsletter">Join Newsletter</a>
              </Button>
            ) : (
              <Button variant="hero" size="sm" onClick={() => setIsNewsletterOpen(true)} className="ml-2">
                Join Newsletter
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
              <a href="/events" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
                Events
              </a>
              <a href="/blog" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
                Blog
              </a>
              <a href="/resources" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
                Resources
              </a>
              {isHomePage ? (
                <Button variant="hero" size="sm" asChild className="mx-4">
                  <a href="#newsletter">Join Newsletter</a>
                </Button>
              ) : (
                <Button variant="hero" size="sm" onClick={() => setIsNewsletterOpen(true)} className="mx-4">
                  Join Newsletter
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
