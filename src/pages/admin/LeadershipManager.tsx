import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Save, ArrowUp, ArrowDown } from 'lucide-react';

interface Leader {
  name: string;
  role: string;
  email: string;
  initial: string;
  bio: string;
}

const PAGE_SLUG = 'homepage';
const TEXT_KEYS: { key: string; label: string; type: 'text' | 'textarea'; fallback: string; order: number }[] = [
  { key: 'leadership_badge', label: 'Section Badge', type: 'text', fallback: 'OUR TEAM', order: 1 },
  { key: 'leadership_title', label: 'Section Title', type: 'text', fallback: 'Meet Our Leadership Team', order: 2 },
  { key: 'leadership_subtitle', label: 'Section Subtitle', type: 'textarea', fallback: 'Dedicated volunteers working to serve and strengthen our West End community', order: 3 },
];

export default function LeadershipManager() {
  const { toast } = useToast();
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const { data } = await supabase.from('page_content' as any).select('*').eq('page_slug', PAGE_SLUG);
    const map: Record<string, string> = {};
    (data || []).forEach((r: any) => { map[r.section_key] = r.content; });
    const t: Record<string, string> = {};
    TEXT_KEYS.forEach(k => { t[k.key] = map[k.key] ?? k.fallback; });
    setTexts(t);
    try { setLeaders(JSON.parse(map.leadership_members || '[]')); } catch { setLeaders([]); }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const upsert = async (section_key: string, content: string, content_type: 'text' | 'json', label: string, display_order: number) => {
    const { data: existing } = await supabase.from('page_content' as any).select('id').eq('page_slug', PAGE_SLUG).eq('section_key', section_key).maybeSingle();
    if ((existing as any)?.id) {
      return supabase.from('page_content' as any).update({ content, content_type, label }).eq('id', (existing as any).id);
    }
    return supabase.from('page_content' as any).insert({ page_slug: PAGE_SLUG, section_key, content, content_type, label, display_order });
  };

  const saveTexts = async () => {
    for (const k of TEXT_KEYS) {
      const { error } = await upsert(k.key, texts[k.key] || '', 'text', k.label, k.order);
      if (error) return toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    }
    toast({ title: 'Section text saved' });
  };

  const saveLeaders = async () => {
    const { error } = await upsert('leadership_members', JSON.stringify(leaders), 'json', 'Leadership Members', 10);
    if (error) return toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    toast({ title: 'Leaders saved' });
  };

  const addLeader = () => setLeaders([...leaders, { name: '', role: '', email: '', initial: '', bio: '' }]);
  const removeLeader = (i: number) => setLeaders(leaders.filter((_, idx) => idx !== i));
  const updateLeader = (i: number, k: keyof Leader, v: string) => setLeaders(leaders.map((l, idx) => idx === i ? { ...l, [k]: v } : l));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= leaders.length) return;
    const arr = [...leaders];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setLeaders(arr);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold">Leadership Section</h1>
        <p className="text-muted-foreground">Manage the "Meet Our Leadership Team" section on the homepage</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Section Text</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {TEXT_KEYS.map(k => (
            <div key={k.key}>
              <Label>{k.label}</Label>
              {k.type === 'textarea'
                ? <Textarea value={texts[k.key] || ''} onChange={e => setTexts({ ...texts, [k.key]: e.target.value })} />
                : <Input value={texts[k.key] || ''} onChange={e => setTexts({ ...texts, [k.key]: e.target.value })} />}
            </div>
          ))}
          <Button onClick={saveTexts}><Save className="w-4 h-4 mr-2" />Save Text</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Leaders ({leaders.length})</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" onClick={addLeader}><Plus className="w-4 h-4 mr-2" />Add Leader</Button>
            <Button onClick={saveLeaders}><Save className="w-4 h-4 mr-2" />Save All</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {leaders.map((leader, i) => (
            <div key={i} className="border p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{leader.name || `Leader #${i + 1}`}</h3>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => move(i, 1)} disabled={i === leaders.length - 1}><ArrowDown className="w-4 h-4" /></Button>
                  <Button size="icon" variant="destructive" onClick={() => removeLeader(i)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Name</Label><Input value={leader.name} onChange={e => updateLeader(i, 'name', e.target.value)} /></div>
                <div><Label>Role</Label><Input value={leader.role} onChange={e => updateLeader(i, 'role', e.target.value)} /></div>
                <div><Label>Initials (e.g. AK)</Label><Input value={leader.initial} onChange={e => updateLeader(i, 'initial', e.target.value)} maxLength={3} /></div>
                <div><Label>Email</Label><Input type="email" value={leader.email} onChange={e => updateLeader(i, 'email', e.target.value)} /></div>
              </div>
              <div><Label>Bio</Label><Textarea rows={3} value={leader.bio} onChange={e => updateLeader(i, 'bio', e.target.value)} /></div>
            </div>
          ))}
          {leaders.length > 0 && (
            <Button onClick={saveLeaders} className="w-full"><Save className="w-4 h-4 mr-2" />Save All Leaders</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
