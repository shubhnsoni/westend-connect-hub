import { Menu, ChevronDown, Info, Calendar, Target, HandHeart, Newspaper, FolderOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import wecaLogo from "@/assets/weca-logo.png";

import NewsletterDialog from "@/components/NewsletterDialog";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
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
  const { t } = useTranslation();
  const isHomePage = location.pathname === "/";

  const isActive = (path: string, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path: string, exact = false) =>
    `flex items-center gap-1 px-2 py-2 text-xs xl:text-sm font-medium transition-colors rounded-md ${
      isActive(path, exact)
        ? "text-primary bg-primary/10 font-semibold"
        : "text-foreground hover:text-primary hover:bg-muted"
    }`;

  const mobileNavClass = (path: string, exact = false) =>
    `block py-1.5 text-sm transition-colors ${
      isActive(path, exact)
        ? "text-primary font-semibold"
        : "text-foreground hover:text-primary"
    }`;

  const mobileTopNavClass = (path: string, exact = false) =>
    `block py-2 text-base font-semibold transition-colors ${
      isActive(path, exact)
        ? "text-primary"
        : "text-foreground hover:text-primary"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex items-center justify-between h-16">
          {/* Logo Section */}
          <a href="/" className="flex items-center flex-shrink-0">
            <img src={wecaLogo} alt="WECA Logo" className="h-10 sm:h-14 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <GlobalSearch />
            <a href="/about" className={navLinkClass("/about")}>
              <Info className="w-3.5 h-3.5" />
              {t("About")}
            </a>
            <a href="/priorities" className={`${navLinkClass("/priorities")} font-cantata`}>
              <Target className="w-3.5 h-3.5" />
              {t("WECA Priorities")}
            </a>
            <a href="/events" className={navLinkClass("/events")}>
              <Calendar className="w-3.5 h-3.5" />
              {t("Events")}
            </a>

            {/* Get Involved Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={navLinkClass("/get-involved")}>
                <HandHeart className="w-3.5 h-3.5" />
                {t("Get Involved")} <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border z-[60]">
                <DropdownMenuItem asChild>
                  <a href="/get-involved" className="cursor-pointer">{t("Overview")}</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/get-involved/volunteer" className="cursor-pointer">{t("Volunteer")}</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/get-involved/faq" className="cursor-pointer">{t("FAQ")}</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* News Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={navLinkClass("/news")}>
                <Newspaper className="w-3.5 h-3.5" />
                {t("News")} <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border z-[60]">
                <DropdownMenuItem asChild>
                  <a href="/news/updates" className="cursor-pointer">{t("Updates")}</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/news/newsletters" className="cursor-pointer">{t("Newsletters")}</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={navLinkClass("/resources")}>
                <FolderOpen className="w-3.5 h-3.5" />
                {t("Resources")} <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border z-[60]">
                <DropdownMenuItem asChild>
                  <a href="/resources/weca" className="cursor-pointer"><span className="font-cantata">WECA</span> {t("Resources")}</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/resources/archives" className="cursor-pointer">{t("Documents and Archives")}</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/resources/city-services" className="cursor-pointer">{t("City of Rockville Resources")}</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Support WECA Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`${navLinkClass("/support")} font-cantata`}>
                <Heart className="w-3.5 h-3.5" />
                {t("Support WECA")} <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border z-[60]">
                <DropdownMenuItem asChild>
                  <a href="/support/advertise" className="cursor-pointer">{t("Advertise with us")}</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/support/sponsor" className="cursor-pointer">{t("Sponsor an event")}</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/support/contribute" className="cursor-pointer">{t("Contribute to")} <span className="font-cantata">WECA</span></a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <LanguageSwitcher />

            {isHomePage ? (
              <Button variant="hero" size="sm" asChild className="ml-2">
                <a href="#newsletter">{t("Stay Connected")}</a>
              </Button>
            ) : (
              <Button variant="hero" size="sm" onClick={() => setIsNewsletterOpen(true)} className="ml-2">
                {t("Stay Connected")}
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

        {/* Mobile Full-Screen Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-md animate-fade-in overflow-y-auto">
            <nav className="container mx-auto px-6 py-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("Menu")}</p>
                <LanguageSwitcher />
              </div>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {/* Column 1 */}
                <div className="space-y-6">
                  {/* About & Priorities */}
                  <div className="space-y-1">
                    <a href="/about" onClick={() => setIsMenuOpen(false)} className={mobileTopNavClass("/about")}>
                      {t("About")}
                    </a>
                    <a href="/priorities" onClick={() => setIsMenuOpen(false)} className={`${mobileTopNavClass("/priorities")} font-cantata`}>
                      {t("WECA Priorities")}
                    </a>
                    <a href="/events" onClick={() => setIsMenuOpen(false)} className={mobileTopNavClass("/events")}>
                      {t("Events")}
                    </a>
                  </div>

                  {/* Get Involved Tree */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t("Get Involved")}</p>
                    <div className="border-l-2 border-primary/20 pl-4 space-y-1">
                      <a href="/get-involved" onClick={() => setIsMenuOpen(false)} className={mobileNavClass("/get-involved", true)}>{t("Overview")}</a>
                      <a href="/get-involved/volunteer" onClick={() => setIsMenuOpen(false)} className={mobileNavClass("/get-involved/volunteer")}>{t("Volunteer")}</a>
                      <a href="/get-involved/faq" onClick={() => setIsMenuOpen(false)} className={mobileNavClass("/get-involved/faq")}>{t("FAQ")}</a>
                    </div>
                  </div>

                  {/* News Tree */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t("News")}</p>
                    <div className="border-l-2 border-primary/20 pl-4 space-y-1">
                      <a href="/news/updates" onClick={() => setIsMenuOpen(false)} className={mobileNavClass("/news/updates")}>{t("Updates")}</a>
                      <a href="/news/newsletters" onClick={() => setIsMenuOpen(false)} className={mobileNavClass("/news/newsletters")}>{t("Newsletters")}</a>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                  {/* Resources Tree */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t("Resources")}</p>
                    <div className="border-l-2 border-primary/20 pl-4 space-y-1">
                      <a href="/resources/weca" onClick={() => setIsMenuOpen(false)} className={mobileNavClass("/resources/weca")}><span className="font-cantata">WECA</span> {t("Resources")}</a>
                      <a href="/resources/archives" onClick={() => setIsMenuOpen(false)} className={mobileNavClass("/resources/archives")}>{t("Documents & Archives")}</a>
                      <a href="/resources/city-services" onClick={() => setIsMenuOpen(false)} className={mobileNavClass("/resources/city-services")}>{t("City Resources")}</a>
                    </div>
                  </div>

                  {/* Support WECA Tree */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 font-cantata">{t("Support WECA")}</p>
                    <div className="border-l-2 border-primary/40 pl-4 space-y-1">
                      <a href="/support/advertise" onClick={() => setIsMenuOpen(false)} className={mobileNavClass("/support/advertise")}>{t("Advertise")}</a>
                      <a href="/support/sponsor" onClick={() => setIsMenuOpen(false)} className={mobileNavClass("/support/sponsor")}>{t("Sponsor")}</a>
                      <a href="/support/contribute" onClick={() => setIsMenuOpen(false)} className={mobileNavClass("/support/contribute")}>{t("Contribute")}</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA at bottom */}
              <div className="mt-8 pt-6 border-t border-border">
                {isHomePage ? (
                  <Button variant="hero" size="default" asChild className="w-full" onClick={() => setIsMenuOpen(false)}>
                    <a href="#newsletter">{t("Stay Connected")}</a>
                  </Button>
                ) : (
                  <Button variant="hero" size="default" onClick={() => { setIsNewsletterOpen(true); setIsMenuOpen(false); }} className="w-full">
                    {t("Stay Connected")}
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      <NewsletterDialog open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
    </header>
  );
};

export default Header;
