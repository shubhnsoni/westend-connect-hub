import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

const BlogPostAds = () => {
  const { data: ads = [] } = useQuery({
    queryKey: ['blog-post-sidebar-ads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('placement', 'blog-post-sidebar')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
  });

  if (ads.length === 0) return null;

  return (
    <div className="space-y-6 sticky top-24">
      {ads.map((ad) => (
        <a
          key={ad.id}
          href={ad.link_url || '#'}
          target={ad.link_url ? "_blank" : undefined}
          rel={ad.link_url ? "noopener noreferrer" : undefined}
          className="block"
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <img 
              src={ad.image_url} 
              alt={ad.title} 
              className="w-full h-auto object-cover"
            />
          </Card>
        </a>
      ))}
    </div>
  );
};

export default BlogPostAds;
