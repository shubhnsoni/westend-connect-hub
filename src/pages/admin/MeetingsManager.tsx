import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, FileText, Plus, Pencil, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Meeting {
  id: string;
  title: string;
  date: string;
  location: string | null;
  description: string | null;
  status: string;
  agenda_url: string | null;
  minutes_url: string | null;
  created_at: string;
}

export default function MeetingsManager() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMeetingId, setCurrentMeetingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    status: 'upcoming',
    agenda_url: '',
    minutes_url: '',
  });

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      toast({ title: 'Error fetching meetings', description: error.message, variant: 'destructive' });
    } else {
      setMeetings(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const meetingData = {
      ...formData,
      created_by: user.id,
    };

    if (isEditing && currentMeetingId) {
      const { error } = await supabase
        .from('meetings')
        .update(meetingData)
        .eq('id', currentMeetingId);

      if (error) {
        toast({ title: 'Error updating meeting', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Meeting updated successfully' });
        handleDialogClose();
        fetchMeetings();
      }
    } else {
      const { error } = await supabase
        .from('meetings')
        .insert([meetingData]);

      if (error) {
        toast({ title: 'Error creating meeting', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Meeting created successfully' });
        handleDialogClose();
        fetchMeetings();
      }
    }

    setIsLoading(false);
  };

  const handleEdit = (meeting: Meeting) => {
    setFormData({
      title: meeting.title,
      date: meeting.date.split('T')[0],
      location: meeting.location || '',
      description: meeting.description || '',
      status: meeting.status,
      agenda_url: meeting.agenda_url || '',
      minutes_url: meeting.minutes_url || '',
    });
    setCurrentMeetingId(meeting.id);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this meeting?')) return;

    const { error } = await supabase
      .from('meetings')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error deleting meeting', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Meeting deleted successfully' });
      fetchMeetings();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      status: 'upcoming',
      agenda_url: '',
      minutes_url: '',
    });
    setCurrentMeetingId(null);
    setIsEditing(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meetings</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> New Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Meeting' : 'Create New Meeting'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Meeting location"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Agenda URL</label>
                <Input
                  value={formData.agenda_url}
                  onChange={(e) => setFormData({ ...formData, agenda_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Minutes URL</label>
                <Input
                  value={formData.minutes_url}
                  onChange={(e) => setFormData({ ...formData, minutes_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : isEditing ? 'Update Meeting' : 'Create Meeting'}
                </Button>
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {meetings.map((meeting) => (
          <Card key={meeting.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-semibold">{meeting.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(meeting.date).toLocaleDateString()}
                  </div>
                  {meeting.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {meeting.location}
                    </div>
                  )}
                  <span className="px-2 py-1 rounded-full text-xs bg-secondary">{meeting.status}</span>
                </div>
                {meeting.description && <p className="text-sm">{meeting.description}</p>}
                <div className="flex gap-3">
                  {meeting.agenda_url && (
                    <a href={meeting.agenda_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Agenda
                    </a>
                  )}
                  {meeting.minutes_url && (
                    <a href={meeting.minutes_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Minutes
                    </a>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(meeting)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(meeting.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
