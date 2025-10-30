import AdPlacement from "@/components/AdPlacement";

const TopAdBanner = () => {
  return (
    <div className="bg-muted/30 border-b border-border py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlacement size="banner" />
      </div>
    </div>
  );
};

export default TopAdBanner;
