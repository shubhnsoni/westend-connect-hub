import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Megaphone, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";

const Announcements = () => {
  const { t } = useTranslation();
  const { data: announcements = [] } = useQuery({
    queryKey: ['active-announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .or(`expires_at.is.null,expires_at.gte.${new Date().toISOString()}`)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div id="announcements" className="animate-fade-in">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Megaphone className="w-6 h-6 text-primary" />
          {t("Announcements")}
        </h3>
        <p className="text-muted-foreground">
          {t("Important community updates")}
        </p>
      </div>

      <div className="space-y-4">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <Card key={announcement.id} className="border-l-4 border-l-secondary hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{t(announcement.title)}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(announcement.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={announcement.priority === 'urgent' ? 'destructive' : 'secondary'} 
                    className="flex-shrink-0"
                  >
                    {announcement.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm">{t(announcement.content)}</p>
                {(announcement as any).link_url && (
                  <Button variant="outline" size="sm" className="mt-3" asChild>
                    <a href={(announcement as any).link_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                      {t("Open Link")}
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-2">
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">{t("No active announcements")}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Announcements;
