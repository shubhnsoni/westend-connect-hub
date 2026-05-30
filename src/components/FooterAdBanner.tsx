import AdPlacement from "@/components/AdPlacement";
import { useRotatingAds } from "@/hooks/useRotatingAds";

const FooterAdBanner = () => {
  const { allAds, currentIndex } = useRotatingAds('footer-banner');

  if (allAds.length === 0) {
    return (
      <div className="w-full bg-muted/30 border-t border-border py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <AdPlacement size="banner" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-muted/30 border-t border-border py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="relative w-full h-32 sm:h-40 overflow-hidden rounded-lg">
          {allAds.map((ad, index) => (
            <a
              key={ad.id}
              href={ad.link_url || '#'}
              target={ad.link_url ? "_blank" : undefined}
              rel={ad.link_url ? "noopener noreferrer" : undefined}
              className="absolute inset-0 transition-all duration-700 ease-in-out"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                transform: index === currentIndex ? 'scale(1)' : 'scale(1.04)',
                pointerEvents: index === currentIndex ? 'auto' : 'none',
              }}
            >
              <img src={ad.image_url} alt={ad.title} className="w-full h-full object-cover rounded-lg" />
            </a>
          ))}
          {allAds.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {allAds.map((_, i) => (
                <span key={i} className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === currentIndex ? 'bg-primary' : 'bg-white/50'}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FooterAdBanner;
