import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Feedback {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function FeedbackViewer() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch feedback' });
    } else {
      setFeedback(data || []);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('feedback')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to update status' });
    } else {
      fetchFeedback();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Feedback</h1>
        <p className="text-muted-foreground">View and manage community feedback</p>
      </div>

      <div className="grid gap-4">
        {feedback.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.subject}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    From: {item.name} ({item.email}) • {format(new Date(item.created_at), 'MMM dd, yyyy')}
                  </p>
                </div>
                <Select value={item.status} onValueChange={(value) => updateStatus(item.id, value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{item.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
