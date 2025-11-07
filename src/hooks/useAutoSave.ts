import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AutoSaveOptions {
  delay?: number;
  tableName: string;
  id?: string;
  data: Record<string, any>;
  enabled?: boolean;
}

export function useAutoSave({
  delay = 3000,
  tableName,
  id,
  data,
  enabled = true,
}: AutoSaveOptions) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveRef = useRef<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!enabled || !id) return;

    const dataString = JSON.stringify(data);
    
    // Skip if data hasn't changed
    if (dataString === lastSaveRef.current) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      try {
        const { error } = await supabase
          .from(tableName as any)
          .update(data)
          .eq('id', id);

        if (error) throw error;

        lastSaveRef.current = dataString;
        toast({ description: 'Auto-saved', duration: 1000 });
      } catch (error: any) {
        console.error('Auto-save error:', error);
        toast({ description: 'Auto-save failed', variant: 'destructive' });
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, enabled, id, tableName, toast]);
}
