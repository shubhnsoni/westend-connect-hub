import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

const BlogSidebarAds = () => {
  const { data: ads = [] } = useQuery({
    queryKey: ['blog-sidebar-ads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('placement', 'blog-sidebar')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
  });

  if (ads.length === 0) return null;

  const sizeClasses = {
    small: "h-32 w-full",
    medium: "h-48 w-full",
    large: "h-64 w-full",
    banner: "h-32 sm:h-40 w-full",
  };

  return (
    <div className="space-y-6">
      {ads.map((ad) => (
        <a
          key={ad.id}
          href={ad.link_url || '#'}
          target={ad.link_url ? "_blank" : undefined}
          rel={ad.link_url ? "noopener noreferrer" : undefined}
          className="block"
        >
          <Card className={`${sizeClasses[ad.size as keyof typeof sizeClasses]} overflow-hidden hover:shadow-lg transition-shadow cursor-pointer`}>
            <img 
              src={ad.image_url} 
              alt={ad.title} 
              className="w-full h-full object-cover"
            />
          </Card>
        </a>
      ))}
    </div>
  );
};

export default BlogSidebarAds;
