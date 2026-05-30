import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import AdPlacement from "@/components/AdPlacement";

const SidebarAds = () => {
  const { data: ads = [] } = useQuery({
    queryKey: ['home-sidebar-ads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('placement', 'home-sidebar')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(4);

      if (error) throw error;
      return data || [];
    },
  });

  if (ads.length === 0) {
    return (
      <aside className="hidden lg:block lg:col-span-1 space-y-8 sticky top-24">
        <AdPlacement size="large" />
        <AdPlacement size="medium" />
      </aside>
    );
  }

  const sizeClasses: Record<string, string> = {
    small: "h-32 w-full",
    medium: "h-48 w-full",
    large: "h-64 w-full",
    banner: "h-32 sm:h-40 w-full",
    sidebar: "h-[600px] w-full",
    square: "h-[250px] w-full",
  };

  return (
    <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24">
      {ads.map((ad) => (
        <a
          key={ad.id}
          href={ad.link_url || '#'}
          target={ad.link_url ? "_blank" : undefined}
          rel={ad.link_url ? "noopener noreferrer" : undefined}
          className="block"
        >
          <Card className={`${sizeClasses[ad.size] || sizeClasses.medium} overflow-hidden hover:shadow-lg transition-shadow cursor-pointer`}>
            <img src={ad.image_url} alt={ad.title} className="w-full h-full object-cover" />
          </Card>
        </a>
      ))}
    </aside>
  );
};

export default SidebarAds;
