import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumb on homepage
  if (pathnames.length === 0) return null;

  const breadcrumbNameMap: Record<string, string> = {
    about: "About",
    neighborhood: "Neighborhood",
    weca: "WECA",
    board: "Board",
    events: "Events",
    calendar: "Calendar",
    upcoming: "Upcoming",
    minutes: "Minutes",
    blog: "News",
    newsletters: "Newsletters",
    resources: "Resources",
    "city-services": "City Services",
    planning: "Planning & Zoning",
    forms: "Forms",
    "get-involved": "Get Involved",
    volunteer: "Volunteer",
    donate: "Donate",
    surveys: "Surveys",
    faq: "FAQ",
    media: "Media",
    photos: "Photos",
    videos: "Videos",
    social: "Social",
    contact: "Contact",
    issue: "Report Issue",
    search: "Search",
  };

  return (
    <nav aria-label="Breadcrumb" className="bg-muted/30 border-b">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const displayName = breadcrumbNameMap[name] || name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

            return (
              <li key={routeTo} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />
                {isLast ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
