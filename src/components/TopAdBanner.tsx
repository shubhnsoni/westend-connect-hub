import AdPlacement from "@/components/AdPlacement";

const TopAdBanner = () => {
  return (
    <div className="w-full bg-muted/30 border-b border-border py-6 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <AdPlacement size="banner" />
      </div>
    </div>
  );
};

export default TopAdBanner;
