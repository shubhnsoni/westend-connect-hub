import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

const BlogPostAds = () => {
  const { data: ads = [] } = useQuery({
    queryKey: ['blog-post-ads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('placement', 'blog-post')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(2);
      
      if (error) throw error;
      return data || [];
    },
  });

  if (ads.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {ads.map((ad) => (
        <a
          key={ad.id}
          href={ad.link_url || '#'}
          target={ad.link_url ? "_blank" : undefined}
          rel={ad.link_url ? "noopener noreferrer" : undefined}
          className="block"
        >
          <Card className="h-48 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
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

export default BlogPostAds;
