import { useState, useEffect } from "react";
import { X, Megaphone, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

const AnnouncementBar = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const { data: announcements = [] } = useQuery({
    queryKey: ['announcement-bar'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .or(`expires_at.is.null,expires_at.gte.${new Date().toISOString()}`)
        .order('priority', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data || [];
    },
  });

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (!isVisible || announcements.length === 0) return null;

  const current = announcements[currentIndex];

  return (
    <div className="bg-secondary text-secondary-foreground py-3 px-4 sticky top-16 z-40 shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Megaphone className="w-5 h-5 flex-shrink-0" />
          <span
            className="text-sm font-medium truncate animate-fade-in"
            key={currentIndex}
          >
            <strong>{t(current.title)}</strong> — {t(current.content)}
          </span>
          {(current as any).link_url && (
            <a
              href={(current as any).link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold bg-secondary-foreground/10 hover:bg-secondary-foreground/20 px-2 py-1 rounded transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Link
            </a>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {announcements.length > 1 && (
            <div className="flex gap-1">
              {announcements.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-secondary-foreground w-4' : 'bg-secondary-foreground/40'
                  }`}
                  aria-label={`View announcement ${idx + 1}`}
                />
              ))}
            </div>
          )}
          
          <button
            onClick={() => setIsVisible(false)}
            className="ml-2 p-1 hover:bg-secondary-foreground/10 rounded transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
