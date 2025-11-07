import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Search, FileText, Calendar, Users, File } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface SearchResult {
  type: 'blog' | 'event' | 'meeting' | 'resource';
  id: string;
  title: string;
  excerpt?: string;
  date?: string;
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchContent = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsSearching(true);

      try {
        const searchTerm = `%${query}%`;

        const [blogResults, eventResults, meetingResults, resourceResults] = await Promise.all([
          supabase
            .from('blog_posts')
            .select('id, title, excerpt, published_at')
            .eq('status', 'published')
            .or(`title.ilike.${searchTerm},excerpt.ilike.${searchTerm}`)
            .limit(5),
          supabase
            .from('events')
            .select('id, title, description, start_date')
            .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
            .limit(5),
          supabase
            .from('meetings')
            .select('id, title, description, date')
            .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
            .limit(5),
          supabase
            .from('resources')
            .select('id, title, description')
            .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
            .limit(5),
        ]);

        const allResults: SearchResult[] = [
          ...(blogResults.data || []).map((post) => ({
            type: 'blog' as const,
            id: post.id,
            title: post.title,
            excerpt: post.excerpt || undefined,
            date: post.published_at || undefined,
          })),
          ...(eventResults.data || []).map((event) => ({
            type: 'event' as const,
            id: event.id,
            title: event.title,
            excerpt: event.description || undefined,
            date: event.start_date,
          })),
          ...(meetingResults.data || []).map((meeting) => ({
            type: 'meeting' as const,
            id: meeting.id,
            title: meeting.title,
            excerpt: meeting.description || undefined,
            date: meeting.date,
          })),
          ...(resourceResults.data || []).map((resource) => ({
            type: 'resource' as const,
            id: resource.id,
            title: resource.title,
            excerpt: resource.description || undefined,
          })),
        ];

        setResults(allResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(searchContent, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    setOpen(false);
    setQuery('');
    
    switch (result.type) {
      case 'blog':
        navigate(`/blog/${result.id}`);
        break;
      case 'event':
        navigate('/events');
        break;
      case 'meeting':
        navigate('/events');
        break;
      case 'resource':
        navigate('/resources');
        break;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return <FileText className="h-4 w-4" />;
      case 'event':
        return <Calendar className="h-4 w-4" />;
      case 'meeting':
        return <Users className="h-4 w-4" />;
      case 'resource':
        return <File className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search blog posts, events, meetings, resources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          
          {isSearching && (
            <p className="text-sm text-muted-foreground">Searching...</p>
          )}
          
          {!isSearching && query.length >= 2 && results.length === 0 && (
            <p className="text-sm text-muted-foreground">No results found</p>
          )}
          
          {results.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((result) => (
                <Card
                  key={`${result.type}-${result.id}`}
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleResultClick(result)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getIcon(result.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium truncate">{result.title}</h4>
                          <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary rounded">
                            {result.type}
                          </span>
                        </div>
                        {result.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {result.excerpt}
                          </p>
                        )}
                        {result.date && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(result.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
