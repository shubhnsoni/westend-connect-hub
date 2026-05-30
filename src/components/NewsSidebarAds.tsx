import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import AdPlacement from "@/components/AdPlacement";

const NewsSidebarAds = () => {
  const { data: ads = [] } = useQuery({
    queryKey: ['news-sidebar-ads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('placement', 'news-sidebar')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(3);

      if (error) throw error;
      return data || [];
    },
  });

  if (ads.length === 0) {
    return <AdPlacement size="large" />;
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
    <div className="space-y-4">
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
    </div>
  );
};

export default NewsSidebarAds;
