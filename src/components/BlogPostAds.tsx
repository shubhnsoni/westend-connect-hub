import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Tag, FileText } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";


const BlogPostAds = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch ads
  const { data: ads = [] } = useQuery({
    queryKey: ['blog-post-sidebar-ads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('placement', 'blog-post-sidebar')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(2);
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch recent posts
  const { data: recentPosts = [] } = useQuery({
    queryKey: ['recent-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch recent meetings (posts with meeting-minutes tag)
  const { data: recentMeetings = [] } = useQuery({
    queryKey: ['recent-meeting-minutes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, published_at')
        .eq('status', 'published')
        .contains('tags', ['meeting-minutes'])
        .order('published_at', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data || [];
    },
  });

  // Get all unique tags from posts
  const { data: allTags = [] } = useQuery({
    queryKey: ['all-blog-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('tags')
        .eq('status', 'published');
      
      if (error) throw error;
      
      // Flatten and count tags
      const tagCounts: Record<string, number> = {};
      data?.forEach(post => {
        post.tags?.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });
      
      // Sort by count and return top tags
      return Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([tag]) => tag);
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/news/updates?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="space-y-6 sticky top-24">
      {/* Ad Placement */}
      {ads.length > 0 ? (
        ads.map((ad) => (
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
        ))
      ) : (
        <Card className="text-center py-8 border-dashed border-2">
          <CardContent className="pt-4">
            <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-12 h-12 text-primary" fill="currentColor">
                <path d="M50 10c-15 0-28 12-28 28 0 8 3 15 8 20l20 32 20-32c5-5 8-12 8-20 0-16-13-28-28-28zm0 38c-6 0-10-4-10-10s4-10 10-10 10 4 10 10-4 10-10 10z"/>
                <path d="M35 75h30v8H35z" opacity="0.5"/>
              </svg>
            </div>
            <h3 className="font-semibold text-foreground mb-1 tracking-wide">PLACE YOUR AD HERE</h3>
            <p className="text-sm text-muted-foreground">Contact WECA for advertising opportunities</p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <a href="/support/advertise">Learn More</a>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </form>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Recent Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {recentPosts.map((post, index) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`block py-3 hover:text-primary transition-colors ${
                  index !== recentPosts.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <h4 className="font-medium text-sm leading-snug mb-1 line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {post.published_at 
                      ? format(new Date(post.published_at), 'MMM d, yyyy')
                      : 'Draft'}
                  </span>
                </div>
              </a>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Popular Tags */}
      {allTags.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Popular Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => navigate(`/news/updates?tag=${encodeURIComponent(tag)}`)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Meetings */}
      {recentMeetings.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Recent Meetings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {recentMeetings.map((meeting, index) => (
              <a
                key={meeting.id}
                href={`/blog/${meeting.slug}`}
                className={`block py-3 hover:text-primary transition-colors ${
                  index !== recentMeetings.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <h4 className="font-medium text-sm leading-snug mb-1 line-clamp-2">
                  {meeting.title.replace('WECA ', '').replace(' Meeting Minutes', '')}
                </h4>
                <div className="text-xs text-muted-foreground">
                  {meeting.published_at 
                    ? format(new Date(meeting.published_at), 'MMMM d, yyyy')
                    : 'Draft'}
                </div>
              </a>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <a href="/news/updates?tag=meeting-minutes">View All Minutes</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlogPostAds;
