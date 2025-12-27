import AdPlacement from "@/components/AdPlacement";

const FooterAdBanner = () => {
  return (
    <div className="w-full bg-muted/30 border-t border-border py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <AdPlacement size="banner" />
      </div>
    </div>
  );
};

export default FooterAdBanner;
