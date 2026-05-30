import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Save, ArrowUp, ArrowDown } from 'lucide-react';

interface Tier {
  id: string;
  tier_key: string;
  name: string;
  price_amount: string;
  price_period: string;
  badge_text: string | null;
  icon_key: string;
  accent: string;
  benefits: string[];
  cta_label: string;
  cta_url: string;
  display_order: number;
  is_active: boolean;
}

interface Benefit { icon: string; title: string; body: string; }

const PAGE_SLUG = 'support-advertise';
const TEXT_KEYS: { key: string; label: string; type: 'text' | 'textarea' }[] = [
  { key: 'hero_title', label: 'Hero Title', type: 'text' },
  { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea' },
  { key: 'why_title', label: 'Why Advertise — Title', type: 'text' },
  { key: 'why_description', label: 'Why Advertise — Description', type: 'text' },
  { key: 'contact_title', label: 'Contact Card — Title', type: 'text' },
  { key: 'contact_description', label: 'Contact Card — Description', type: 'textarea' },
  { key: 'contact_email', label: 'Contact Email', type: 'text' },
  { key: 'contact_response_time', label: 'Contact Response Time', type: 'text' },
];

export default function AdvertiseManager() {
  const { toast } = useToast();
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: pc }, { data: t }] = await Promise.all([
      supabase.from('page_content' as any).select('*').eq('page_slug', PAGE_SLUG),
      (supabase.from as any)('advertising_tiers').select('*').order('display_order'),
    ]);
    const map: Record<string, string> = {};
    (pc || []).forEach((r: any) => { map[r.section_key] = r.content; });
    setTexts(map);
    try { setBenefits(JSON.parse(map.why_benefits || '[]')); } catch { setBenefits([]); }
    setTiers((t || []) as Tier[]);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const upsertContent = async (section_key: string, content: string, content_type: 'text' | 'json', label: string, display_order: number) => {
    const { data: existing } = await supabase.from('page_content' as any).select('id').eq('page_slug', PAGE_SLUG).eq('section_key', section_key).maybeSingle();
    if ((existing as any)?.id) {
      return supabase.from('page_content' as any).update({ content, content_type, label }).eq('id', (existing as any).id);
    }
    return supabase.from('page_content' as any).insert({ page_slug: PAGE_SLUG, section_key, content, content_type, label, display_order });
  };

  const saveTexts = async () => {
    for (let i = 0; i < TEXT_KEYS.length; i++) {
      const k = TEXT_KEYS[i];
      const { error } = await upsertContent(k.key, texts[k.key] || '', 'text', k.label, i + 1);
      if (error) return toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    }
    toast({ title: 'Text content saved' });
  };

  const saveBenefits = async () => {
    const { error } = await upsertContent('why_benefits', JSON.stringify(benefits), 'json', 'Why Advertise Benefits', 5);
    if (error) return toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    toast({ title: 'Benefits saved' });
  };

  const addBenefit = () => setBenefits([...benefits, { icon: 'users', title: '', body: '' }]);
  const removeBenefit = (i: number) => setBenefits(benefits.filter((_, idx) => idx !== i));
  const updateBenefit = (i: number, k: keyof Benefit, v: string) => {
    setBenefits(benefits.map((b, idx) => idx === i ? { ...b, [k]: v } : b));
  };

  const saveTier = async (tier: Tier) => {
    const { id, ...rest } = tier;
    const { error } = await (supabase.from as any)('advertising_tiers').update(rest).eq('id', id);
    if (error) return toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    toast({ title: `${tier.name} saved` });
    fetchAll();
  };

  const deleteTier = async (id: string) => {
    if (!confirm('Delete this tier?')) return;
    const { error } = await (supabase.from as any)('advertising_tiers').delete().eq('id', id);
    if (error) return toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    fetchAll();
  };

  const addTier = async () => {
    const key = `tier-${Date.now()}`;
    const { error } = await (supabase.from as any)('advertising_tiers').insert({
      tier_key: key, name: 'New Tier', price_amount: '$0', price_period: '/year',
      icon_key: 'award', accent: 'slate', benefits: [], cta_label: 'Get Started',
      cta_url: 'mailto:WECAoutreach@gmail.com', display_order: tiers.length + 1,
    });
    if (error) return toast({ title: 'Create failed', description: error.message, variant: 'destructive' });
    fetchAll();
  };

  const updateTier = (id: string, patch: Partial<Tier>) => {
    setTiers(tiers.map(t => t.id === id ? { ...t, ...patch } : t));
  };

  const moveTier = async (id: string, dir: -1 | 1) => {
    const idx = tiers.findIndex(t => t.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= tiers.length) return;
    const a = tiers[idx], b = tiers[swap];
    await (supabase.from as any)('advertising_tiers').update({ display_order: b.display_order }).eq('id', a.id);
    await (supabase.from as any)('advertising_tiers').update({ display_order: a.display_order }).eq('id', b.id);
    fetchAll();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-6">

      <Card>
        <CardHeader><CardTitle>Page Text</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {TEXT_KEYS.map(k => (
            <div key={k.key}>
              <Label>{k.label}</Label>
              {k.type === 'textarea' ? (
                <Textarea value={texts[k.key] || ''} onChange={e => setTexts({ ...texts, [k.key]: e.target.value })} />
              ) : (
                <Input value={texts[k.key] || ''} onChange={e => setTexts({ ...texts, [k.key]: e.target.value })} />
              )}
            </div>
          ))}
          <Button onClick={saveTexts}><Save className="w-4 h-4 mr-2" />Save Text</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>"Why Advertise" Benefit Blocks</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {benefits.map((b, i) => (
            <div key={i} className="border p-4 rounded-lg space-y-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label>Icon</Label>
                  <Select value={b.icon} onValueChange={v => updateBenefit(i, 'icon', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="users">Users</SelectItem>
                      <SelectItem value="trending-up">Trending Up</SelectItem>
                      <SelectItem value="megaphone">Megaphone</SelectItem>
                      <SelectItem value="crown">Crown</SelectItem>
                      <SelectItem value="medal">Medal</SelectItem>
                      <SelectItem value="award">Award</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="destructive" size="icon" onClick={() => removeBenefit(i)} className="self-end"><Trash2 className="w-4 h-4" /></Button>
              </div>
              <div><Label>Title</Label><Input value={b.title} onChange={e => updateBenefit(i, 'title', e.target.value)} /></div>
              <div><Label>Body</Label><Textarea value={b.body} onChange={e => updateBenefit(i, 'body', e.target.value)} /></div>
            </div>
          ))}
          <div className="flex gap-2">
            <Button variant="outline" onClick={addBenefit}><Plus className="w-4 h-4 mr-2" />Add Benefit</Button>
            <Button onClick={saveBenefits}><Save className="w-4 h-4 mr-2" />Save Benefits</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Pricing Tiers</CardTitle>
          <Button onClick={addTier}><Plus className="w-4 h-4 mr-2" />Add Tier</Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {tiers.map((tier, idx) => (
            <div key={tier.id} className="border p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{tier.name}</h3>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => moveTier(tier.id, -1)} disabled={idx === 0}><ArrowUp className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => moveTier(tier.id, 1)} disabled={idx === tiers.length - 1}><ArrowDown className="w-4 h-4" /></Button>
                  <Button size="icon" variant="destructive" onClick={() => deleteTier(tier.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Name</Label><Input value={tier.name} onChange={e => updateTier(tier.id, { name: e.target.value })} /></div>
                <div><Label>Badge (optional)</Label><Input value={tier.badge_text || ''} onChange={e => updateTier(tier.id, { badge_text: e.target.value || null })} /></div>
                <div><Label>Price</Label><Input value={tier.price_amount} onChange={e => updateTier(tier.id, { price_amount: e.target.value })} /></div>
                <div><Label>Period</Label><Input value={tier.price_period} onChange={e => updateTier(tier.id, { price_period: e.target.value })} /></div>
                <div>
                  <Label>Icon</Label>
                  <Select value={tier.icon_key} onValueChange={v => updateTier(tier.id, { icon_key: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crown">Crown</SelectItem>
                      <SelectItem value="medal">Medal</SelectItem>
                      <SelectItem value="award">Award</SelectItem>
                      <SelectItem value="megaphone">Megaphone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Accent Color</Label>
                  <Select value={tier.accent} onValueChange={v => updateTier(tier.id, { accent: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary (highlighted)</SelectItem>
                      <SelectItem value="amber">Amber/Gold</SelectItem>
                      <SelectItem value="slate">Slate/Silver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>CTA Label</Label><Input value={tier.cta_label} onChange={e => updateTier(tier.id, { cta_label: e.target.value })} /></div>
                <div><Label>CTA URL</Label><Input value={tier.cta_url} onChange={e => updateTier(tier.id, { cta_url: e.target.value })} /></div>
              </div>
              <div>
                <Label>Benefits (one per line)</Label>
                <Textarea
                  rows={6}
                  value={tier.benefits.join('\n')}
                  onChange={e => updateTier(tier.id, { benefits: e.target.value.split('\n').filter(Boolean) })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={tier.is_active} onCheckedChange={v => updateTier(tier.id, { is_active: v })} />
                <Label>Active</Label>
              </div>
              <Button onClick={() => saveTier(tier)}><Save className="w-4 h-4 mr-2" />Save Tier</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
