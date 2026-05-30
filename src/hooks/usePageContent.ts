import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface PageContentRow {
  id: string;
  page_slug: string;
  section_key: string;
  content_type: string;
  content: string;
  label: string;
  display_order: number;
  updated_at: string;
}

export function usePageContent(pageSlug: string) {
  const { data: contentRows = [], isLoading } = useQuery({
    queryKey: ['page-content', pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_content' as any)
        .select('*')
        .eq('page_slug', pageSlug)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as PageContentRow[];
    },
  });

  const contentMap = new Map(contentRows.map(r => [r.section_key, r]));

  const getContent = (sectionKey: string, fallback: string = ''): string => {
    const row = contentMap.get(sectionKey);
    return row ? row.content : fallback;
  };

  const getJSON = <T = any>(sectionKey: string, fallback: T): T => {
    const row = contentMap.get(sectionKey);
    if (!row) return fallback;
    try {
      return JSON.parse(row.content) as T;
    } catch {
      return fallback;
    }
  };

  const hasContent = (sectionKey: string): boolean => contentMap.has(sectionKey);

  return { getContent, getJSON, hasContent, isLoading, contentRows };
}
