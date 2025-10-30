import AdPlacement from "@/components/AdPlacement";

const SidebarAds = () => {
  return (
    <aside className="hidden lg:block lg:col-span-1 space-y-8 sticky top-24">
      <AdPlacement size="large" />
      <AdPlacement size="medium" />
    </aside>
  );
};

export default SidebarAds;
