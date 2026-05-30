import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, FileText, Calendar, Newspaper, BookOpen, RefreshCw, Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export type ContentSourceType = 'blog' | 'newsletter' | 'event' | 'meeting';

interface SourceData {
  type: ContentSourceType;
  title: string;
  content?: string;
  description?: string;
  excerpt?: string;
  date?: string;
  location?: string;
  zoom_link?: string;
}

interface CrossContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceData: SourceData;
}

interface SelectedTarget {
  type: ContentSourceType;
  mode: 'create' | 'update';
  existingId?: string;
}

const TARGET_TYPES: { value: ContentSourceType; label: string; icon: React.ReactNode }[] = [
  { value: 'blog', label: 'Blog Post', icon: <BookOpen className="w-4 h-4" /> },
  { value: 'newsletter', label: 'Newsletter', icon: <Newspaper className="w-4 h-4" /> },
  { value: 'event', label: 'Event', icon: <Calendar className="w-4 h-4" /> },
  { value: 'meeting', label: 'Meeting', icon: <FileText className="w-4 h-4" /> },
];

const ROUTE_MAP: Record<ContentSourceType, string> = {
  blog: '/admin/blog',
  newsletter: '/admin/newsletter',
  event: '/admin/events',
  meeting: '/admin/meetings',
};

export default function CrossContentDialog({ open, onOpenChange, sourceData }: CrossContentDialogProps) {
  const [step, setStep] = useState<'choose' | 'configure'>('choose');
  const [selectedTargets, setSelectedTargets] = useState<SelectedTarget[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: existingByType = {} } = useQuery({
    queryKey: ['cross-content-existing-all', open],
    queryFn: async () => {
      const result: Record<string, { id: string; title: string }[]> = {};
      const fetchItems = async (table: 'blog_posts' | 'newsletters' | 'events' | 'meetings', orderCol: string, statusFilter?: string) => {
        let query = supabase.from(table).select('id, title').order(orderCol, { ascending: false }).limit(10);
        if (statusFilter) {
          query = query.eq('status', statusFilter);
        }
        const { data } = await query;
        return (data || []) as unknown as { id: string; title: string }[];
      };

      result.blog = await fetchItems('blog_posts', 'created_at', 'published');
      result.newsletter = await fetchItems('newsletters', 'created_at', 'published');
      result.event = await fetchItems('events', 'created_at');
      result.meeting = await fetchItems('meetings', 'date');
      return result;
    },
    enabled: open,
  });

  const availableTargets = TARGET_TYPES.filter(t => t.value !== sourceData.type);

  const toggleTarget = (type: ContentSourceType, mode: 'create' | 'update') => {
    setSelectedTargets(prev => {
      const existing = prev.find(t => t.type === type && t.mode === mode);
      if (existing) {
        return prev.filter(t => !(t.type === type && t.mode === mode));
      }
      const filtered = prev.filter(t => t.type !== type);
      return [...filtered, { type, mode }];
    });
  };

  const isSelected = (type: ContentSourceType, mode: 'create' | 'update') => {
    return selectedTargets.some(t => t.type === type && t.mode === mode);
  };

  const handleProceed = () => {
    if (selectedTargets.length === 0) return;
    const needsConfig = selectedTargets.some(t => t.mode === 'update' && !t.existingId);
    if (needsConfig) {
      setStep('configure');
    } else {
      navigateToTarget();
    }
  };

  const handleConfigDone = () => {
    const incomplete = selectedTargets.find(t => t.mode === 'update' && !t.existingId);
    if (incomplete) {
      toast({ variant: 'destructive', title: 'Selection required', description: `Please select an existing ${TARGET_TYPES.find(tt => tt.value === incomplete.type)?.label} to update.` });
      return;
    }
    navigateToTarget();
  };

  const navigateToTarget = () => {
    // Navigate to the first selected target's manager page with cross-content state
    const target = selectedTargets[0];
    if (!target) return;

    const route = ROUTE_MAP[target.type];
    
    handleClose();

    // Use setTimeout to ensure dialog closes before navigation
    setTimeout(() => {
      navigate(route, {
        state: {
          crossContent: {
            sourceData,
            mode: target.mode,
            existingId: target.existingId,
          },
        },
      });
    }, 100);

    if (selectedTargets.length > 1) {
      toast({
        title: 'Navigating to editor',
        description: `Opening ${TARGET_TYPES.find(t => t.value === target.type)?.label} editor. You can create additional content types after saving.`,
      });
    }
  };

  const handleClose = () => {
    setStep('choose');
    setSelectedTargets([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Create Related Content with AI
          </DialogTitle>
          <DialogDescription>
            Generate content based on &ldquo;{sourceData.title}&rdquo;
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Choose targets */}
        {step === 'choose' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Select what you&apos;d like to create:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableTargets.map(({ value, label, icon }) => {
                const hasExisting = (existingByType[value] || []).length > 0;
                const createSelected = isSelected(value, 'create');
                const updateSelected = isSelected(value, 'update');

                return (
                  <div key={value} className={`border rounded-lg p-4 space-y-3 transition-colors ${createSelected || updateSelected ? 'border-primary bg-primary/5' : ''}`}>
                    <div className="flex items-center gap-2 font-medium">
                      {icon}
                      {label}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={createSelected ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => toggleTarget(value, 'create')}
                      >
                        {createSelected ? <Check className="w-3 h-3 mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                        Create New
                      </Button>
                      {hasExisting && (
                        <Button
                          size="sm"
                          variant={updateSelected ? 'default' : 'outline'}
                          className="flex-1"
                          onClick={() => toggleTarget(value, 'update')}
                        >
                          {updateSelected ? <Check className="w-3 h-3 mr-1" /> : <RefreshCw className="w-3 h-3 mr-1" />}
                          Update
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" className="flex-1" onClick={handleClose}>Skip</Button>
              <Button className="flex-1" onClick={handleProceed} disabled={selectedTargets.length === 0}>
                <Sparkles className="w-4 h-4 mr-1" />
                Open Editor & Generate
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Configure update targets */}
        {step === 'configure' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Select the existing items to update:</p>
            {selectedTargets.filter(t => t.mode === 'update').map(target => {
              const items = existingByType[target.type] || [];
              const label = TARGET_TYPES.find(tt => tt.value === target.type)?.label;
              return (
                <div key={target.type} className="space-y-2">
                  <Label>{label}</Label>
                  <Select
                    value={target.existingId || ''}
                    onValueChange={(val) => {
                      setSelectedTargets(prev => prev.map(t =>
                        t.type === target.type && t.mode === 'update' ? { ...t, existingId: val } : t
                      ));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Choose a ${label}...`} />
                    </SelectTrigger>
                    <SelectContent>
                      {items.map(item => (
                        <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            })}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('choose')}>Back</Button>
              <Button onClick={handleConfigDone}>
                <Sparkles className="w-4 h-4 mr-1" />
                Open Editor & Generate
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
