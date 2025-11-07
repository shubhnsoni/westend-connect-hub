import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';
import { format } from 'date-fns';

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  subscribed_at: string;
  is_active: boolean;
}

export default function NewsletterViewer() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch subscribers' });
    } else {
      setSubscribers(data || []);
    }
  };

  const exportCSV = () => {
    const csv = [
      ['Email', 'Name', 'Subscribed At', 'Active'],
      ...subscribers.map(s => [s.email, s.name || '', format(new Date(s.subscribed_at), 'yyyy-MM-dd'), s.is_active ? 'Yes' : 'No'])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
          <p className="text-muted-foreground">{subscribers.filter(s => s.is_active).length} active subscribers</p>
        </div>
        <Button onClick={exportCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscribers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {subscribers.map((sub) => (
              <div key={sub.id} className="flex justify-between items-center py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{sub.email}</p>
                  {sub.name && <p className="text-sm text-muted-foreground">{sub.name}</p>}
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(sub.subscribed_at), 'MMM dd, yyyy')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
