import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const EventsTicker = () => {
  const { data: upcomingItems = [] } = useQuery({
    queryKey: ['ticker-items'],
    queryFn: async () => {
      const now = new Date().toISOString();
      
      // Get next 3 events
      const { data: events } = await supabase
        .from('events')
        .select('id, title, start_date')
        .gte('start_date', now)
        .order('start_date', { ascending: true })
        .limit(3);
      
      // Get next meeting
      const { data: meetings } = await supabase
        .from('meetings')
        .select('id, title, date')
        .gte('date', now)
        .order('date', { ascending: true })
        .limit(1);
      
      const items = [
        ...(events || []).map(e => ({
          id: e.id,
          title: e.title,
          date: e.start_date,
          type: 'event' as const
        })),
        ...(meetings || []).map(m => ({
          id: m.id,
          title: m.title,
          date: m.date,
          type: 'meeting' as const
        }))
      ];
      
      return items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 4);
    },
  });

  if (upcomingItems.length === 0) return null;

  return (
    <div className="bg-primary/5 border-b border-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-2 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm whitespace-nowrap">
            <Calendar className="w-4 h-4" />
            <span>Upcoming:</span>
          </div>
          <div className="flex items-center gap-4">
            {upcomingItems.map((item, index) => (
              <a
                key={item.id}
                href="/events"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                <span className="font-medium">{format(new Date(item.date), 'MMM d')}</span>
                <span>-</span>
                <span className="truncate max-w-[200px]">{item.title}</span>
                {index < upcomingItems.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-border" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsTicker;
