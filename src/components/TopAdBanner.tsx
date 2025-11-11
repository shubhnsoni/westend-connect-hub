import AdPlacement from "@/components/AdPlacement";

const TopAdBanner = () => {
  return (
    <div className="w-full bg-muted/30 border-b border-border">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full">
          <AdPlacement size="banner" />
        </div>
      </div>
    </div>
  );
};

export default TopAdBanner;
