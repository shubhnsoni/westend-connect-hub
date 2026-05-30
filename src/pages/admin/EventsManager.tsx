import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Sparkles, CalendarClock, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileUpload } from '@/components/FileUpload';
import { format, nextDay, setHours, setMinutes } from 'date-fns';
import CrossContentDialog, { type ContentSourceType } from '@/components/admin/CrossContentDialog';
import { generateAIContent } from '@/lib/aiContentGenerator';

interface Event {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  location: string | null;
  image_url: string | null;
  registration_url: string | null;
  max_attendees: number | null;
  current_attendees: number;
  status: string;
  created_at: string;
}

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [crossContentOpen, setCrossContentOpen] = useState(false);
  const [crossContentSource, setCrossContentSource] = useState<{ type: ContentSourceType; title: string; description?: string; date?: string; location?: string; zoom_link?: string } | null>(null);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    start_time: '12:00',
    end_date: '',
    end_time: '',
    location: '',
    image_url: '',
    registration_url: '',
    max_attendees: '',
    status: 'upcoming',
    zoom_link: '',
    seo_title: '',
    seo_description: '',
  });

  const [isSEOGenerating, setIsSEOGenerating] = useState(false);

  const [pendingEvents, setPendingEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
    fetchPendingSubmissions();
  }, []);

  // Handle cross-content navigation state
  useEffect(() => {
    const crossContent = (location.state as any)?.crossContent;
    if (crossContent) {
      navigateTo(location.pathname, { replace: true, state: {} });
      const { sourceData, mode, existingId } = crossContent;

      if (mode === 'update' && existingId) {
        const loadAndEdit = async () => {
          const { data } = await supabase.from('events').select('*').eq('id', existingId).single();
          if (data) {
            handleEdit(data);
          }
          setIsDialogOpen(true);
          triggerAIGeneration(sourceData);
        };
        loadAndEdit();
      } else {
        resetForm();
        setIsDialogOpen(true);
        triggerAIGeneration(sourceData);
      }
    }
  }, [location.state]);

  const triggerAIGeneration = async (sourceData: any) => {
    setIsAIGenerating(true);
    try {
      const result = await generateAIContent(sourceData, 'event', (partial) => {
        if (partial.title) {
          setFormData(prev => ({ ...prev, title: partial.title }));
        }
        if (partial.content) {
          setFormData(prev => ({ ...prev, description: partial.content }));
        }
      });
      setFormData(prev => ({ ...prev, title: result.title, description: result.content }));
      toast({ title: 'AI Content Generated', description: 'Review and edit the generated content, then save.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'AI Generation Failed', description: err.message });
    } finally {
      setIsAIGenerating(false);
    }
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .in('submission_status', ['approved'])
      .order('start_date', { ascending: false });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch events',
      });
    } else {
      setEvents(data || []);
    }
  };

  const fetchPendingSubmissions = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('submission_status', 'pending')
      .order('created_at', { ascending: false });

    if (!error) {
      setPendingEvents(data || []);
    }
  };

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from('events')
      .update({ submission_status: 'approved' })
      .eq('id', id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to approve event' });
    } else {
      toast({ title: 'Approved', description: 'Event is now visible on the calendar' });
      fetchPendingSubmissions();
      fetchEvents();
    }
  };

  const handleDecline = async (id: string) => {
    if (!confirm('Decline this submission? It will be deleted.')) return;
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to decline event' });
    } else {
      toast({ title: 'Declined', description: 'Submission has been removed' });
      fetchPendingSubmissions();
    }
  };

  const handleSubmit = async (e: React.FormEvent, statusOverride?: string) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      const startDateTime = formData.start_date + (formData.start_time ? 'T' + formData.start_time + ':00' : 'T00:00:00');
      const endDateTime = formData.end_date ? formData.end_date + (formData.end_time ? 'T' + formData.end_time + ':00' : 'T23:59:00') : null;

      const eventData: any = {
        title: formData.title,
        description: formData.description || null,
        start_date: startDateTime,
        end_date: endDateTime,
        location: formData.location || null,
        image_url: formData.image_url || null,
        registration_url: formData.registration_url || null,
        max_attendees: formData.max_attendees ? parseInt(formData.max_attendees) : null,
        status: statusOverride || formData.status,
        created_by: user.id,
        zoom_link: formData.zoom_link || null,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
      };

      if (editingEvent) {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Event updated successfully',
        });
        setCrossContentSource({ type: 'event', title: formData.title, description: formData.description, date: startDateTime, location: formData.location, zoom_link: formData.zoom_link });
        setCrossContentOpen(true);
      } else {
        const { error } = await supabase
          .from('events')
          .insert([eventData]);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Event created successfully',
        });
        setCrossContentSource({ type: 'event', title: formData.title, description: formData.description, date: startDateTime, location: formData.location, zoom_link: formData.zoom_link });
        setCrossContentOpen(true);
      }

      setIsDialogOpen(false);
      resetForm();
      fetchEvents();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      start_date: event.start_date ? event.start_date.slice(0, 10) : '',
      start_time: event.start_date ? event.start_date.slice(11, 16) || '12:00' : '12:00',
      end_date: event.end_date ? event.end_date.slice(0, 10) : '',
      end_time: event.end_date ? event.end_date.slice(11, 16) || '' : '',
      location: event.location || '',
      image_url: event.image_url || '',
      registration_url: event.registration_url || '',
      max_attendees: event.max_attendees?.toString() || '',
      status: event.status,
      zoom_link: (event as any).zoom_link || '',
      seo_title: (event as any).seo_title || '',
      seo_description: (event as any).seo_description || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete event',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Event deleted successfully',
      });
      fetchEvents();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      start_date: '',
      start_time: '12:00',
      end_date: '',
      end_time: '',
      location: '',
      image_url: '',
      registration_url: '',
      max_attendees: '',
      status: 'upcoming',
      zoom_link: '',
      seo_title: '',
      seo_description: '',
    });
    setEditingEvent(null);
  };

  const handleGenerateEventSEO = async () => {
    if (!formData.title && !formData.description) {
      toast({ variant: 'destructive', title: 'No content', description: 'Add a title and description first.' });
      return;
    }
    setIsSEOGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-ai-assistant', {
        body: {
          action: 'seo',
          messages: [{ role: 'user', content: `Event Title: ${formData.title}\nLocation: ${formData.location}\nDate: ${formData.start_date}\n\nDescription:\n${formData.description}` }],
        },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setFormData(prev => ({
        ...prev,
        seo_title: data.seo_title || prev.seo_title,
        seo_description: data.seo_description || prev.seo_description,
      }));
      toast({ title: 'SEO Generated', description: 'Review the generated SEO metadata.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'SEO Generation Failed', description: err.message });
    } finally {
      setIsSEOGenerating(false);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    setIsDialogOpen(open);
  };

  const handleNewEvent = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const [isExtracting, setIsExtracting] = useState(false);

  const handleExtractDateTime = async () => {
    if (!formData.description.trim()) {
      toast({ variant: 'destructive', title: 'No description', description: 'Enter a description first to extract date/time.' });
      return;
    }
    setIsExtracting(true);
    try {
      const { data, error } = await supabase.functions.invoke('parse-event-datetime', {
        body: { description: formData.description },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);

      const updates: Partial<typeof formData> = {};
      if (data.start_date) updates.start_date = data.start_date;
      if (data.start_time) updates.start_time = data.start_time;
      if (data.end_date) updates.end_date = data.end_date;
      if (data.end_time) updates.end_time = data.end_time;
      if (data.location && !formData.location) updates.location = data.location;
      if (data.title && !formData.title) updates.title = data.title;

      setFormData(prev => ({ ...prev, ...updates }));
      toast({ title: 'Extracted!', description: 'Date, time & location filled from description.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Extraction failed', description: err.message });
    } finally {
      setIsExtracting(false);
    }
  };

  // Get the next 2nd Thursday of a month for WECA meetings
  const getNextSecondThursday = () => {
    const now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();
    // Skip June, July, August (meetings are Sep-May)
    const skipMonths = [5, 6, 7];
    for (let i = 0; i < 12; i++) {
      if (skipMonths.includes(month)) {
        month++;
        if (month > 11) { month = 0; year++; }
        continue;
      }
      const firstDay = new Date(year, month, 1);
      const dayOfWeek = firstDay.getDay();
      const firstThursday = dayOfWeek <= 4 ? 1 + (4 - dayOfWeek) : 1 + (11 - dayOfWeek);
      const secondThursday = firstThursday + 7;
      const candidate = new Date(year, month, secondThursday);
      if (candidate > now) {
        return format(candidate, 'yyyy-MM-dd');
      }
      month++;
      if (month > 11) { month = 0; year++; }
    }
    return '';
  };

  const PRESETS = [
    {
      label: '📅 Monthly Meeting',
      apply: () => setFormData(prev => ({
        ...prev,
        title: prev.title || 'WECA Monthly Meeting',
        start_date: getNextSecondThursday(),
        start_time: '19:00',
        end_time: '21:00',
        location: prev.location || 'Rockville Memorial Library',
        description: prev.description || 'Regular monthly meeting of the West End Civic Association. Open to all residents.',
      })),
    },
    {
      label: '🌸 Spring Fest',
      apply: () => setFormData(prev => ({
        ...prev,
        title: prev.title || 'Spring Fest',
        start_time: '10:00',
        end_time: '14:00',
        description: prev.description || 'Annual Spring Fest celebrating the season with activities for all ages.',
      })),
    },
    {
      label: '🎃 Halloween Doggie Parade',
      apply: () => setFormData(prev => ({
        ...prev,
        title: prev.title || 'Halloween Doggie Parade',
        start_time: '11:00',
        end_time: '13:00',
        description: prev.description || 'Dress up your furry friends and join the annual Halloween Doggie Parade!',
      })),
    },
    {
      label: '🍂 Fall Fest',
      apply: () => setFormData(prev => ({
        ...prev,
        title: prev.title || 'Fall Fest',
        start_time: '10:00',
        end_time: '14:00',
        description: prev.description || 'Annual Fall Fest with seasonal activities and community gathering.',
      })),
    },
    {
      label: '🎄 Holiday Toy & Book Drive',
      apply: () => setFormData(prev => ({
        ...prev,
        title: prev.title || 'Holiday Toy & Book Drive',
        start_time: '09:00',
        end_time: '15:00',
        description: prev.description || 'Donate toys and books for families in our community this holiday season.',
      })),
    },
    {
      label: '🧹 Community Clean-Up Day',
      apply: () => setFormData(prev => ({
        ...prev,
        title: prev.title || 'Community Clean-Up Day',
        start_time: '08:00',
        end_time: '12:00',
        description: prev.description || 'Join your neighbors to beautify our West End community!',
      })),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground">Manage community events</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button onClick={handleNewEvent}>
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 relative">
              {isAIGenerating && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3 rounded-lg">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-sm font-medium text-muted-foreground">AI is generating content...</p>
                </div>
              )}
              {/* Quick-fill Presets */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Quick Fill Presets</Label>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <Button
                      key={preset.label}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={preset.apply}
                    >
                      <CalendarClock className="mr-1 h-3 w-3" />
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mt-1"
                  onClick={handleExtractDateTime}
                  disabled={isExtracting || !formData.description.trim()}
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  {isExtracting ? 'Extracting...' : 'Extract date & time from description'}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start_time">Start Time</Label>
                  <Input
                    id="start_time"
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date (Optional)</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_time">End Time (Optional)</Label>
                  <Input
                    id="end_time"
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="123 Main St, Rockville, MD"
                />
              </div>

              <FileUpload
                bucket="event-images"
                accept="image/*"
                maxSize={5}
                currentUrl={formData.image_url}
                onUploadComplete={(url) => setFormData({ ...formData, image_url: url })}
                label="Event Image"
              />

              <div className="space-y-2">
                <Label htmlFor="zoom_link">Zoom Link</Label>
                <Input
                  id="zoom_link"
                  value={formData.zoom_link}
                  onChange={(e) => setFormData({ ...formData, zoom_link: e.target.value })}
                  placeholder="https://us02web.zoom.us/j/..."
                  type="url"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registration_url">Registration URL</Label>
                <Input
                  id="registration_url"
                  value={formData.registration_url}
                  onChange={(e) => setFormData({ ...formData, registration_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max_attendees">Max Attendees</Label>
                <Input
                  id="max_attendees"
                  type="number"
                  value={formData.max_attendees}
                  onChange={(e) => setFormData({ ...formData, max_attendees: e.target.value })}
                  placeholder="Leave empty for unlimited"
                />
              </div>

              {/* AI SEO Section */}
              <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    SEO Metadata
                  </Label>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleGenerateEventSEO}
                    disabled={isSEOGenerating}
                  >
                    {isSEOGenerating ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Sparkles className="mr-1 h-3 w-3" />}
                    {isSEOGenerating ? 'Generating...' : 'Generate SEO'}
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="event_seo_title" className="text-xs">
                      SEO Title <span className="text-muted-foreground">({formData.seo_title.length}/60)</span>
                    </Label>
                    <Input
                      id="event_seo_title"
                      value={formData.seo_title}
                      onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                      placeholder="Optimized title for search engines..."
                      maxLength={60}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="event_seo_description" className="text-xs">
                      Meta Description <span className="text-muted-foreground">({formData.seo_description.length}/160)</span>
                    </Label>
                    <Textarea
                      id="event_seo_description"
                      value={formData.seo_description}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                      rows={2}
                      placeholder="Compelling description for search results..."
                      maxLength={160}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isLoading}
                  onClick={(e) => handleSubmit(e as unknown as React.FormEvent, 'draft')}
                >
                  Save as Draft
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingEvent ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="events">
        <TabsList>
          <TabsTrigger value="events">All Events</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending Submissions
            {pendingEvents.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 min-w-[20px] px-1.5 text-xs">
                {pendingEvents.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-4">
          <div className="grid gap-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{event.title}</CardTitle>
                      <div className="flex gap-2 mt-2 text-sm text-muted-foreground flex-wrap">
                        <span>{format(new Date(event.start_date), 'MMM dd, yyyy')}</span>
                        {event.location && <span>• {event.location}</span>}
                        <span className={`px-2 py-1 text-xs rounded ${
                          event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                          event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                          event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(event)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(event.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {event.description && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
            {events.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No events yet.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <div className="grid gap-4">
            {pendingEvents.map((event) => (
              <Card key={event.id} className="border-amber-200 bg-amber-50/30">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-amber-600" />
                        <Badge variant="outline" className="text-amber-700 border-amber-300 bg-amber-100">
                          Pending Review
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <div className="flex gap-2 mt-2 text-sm text-muted-foreground flex-wrap">
                        <span>{format(new Date(event.start_date), 'MMM dd, yyyy h:mm a')}</span>
                        {event.location && <span>• {event.location}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Submitted {format(new Date(event.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleApprove(event.id)}
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDecline(event.id)}
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Decline
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {event.description && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
            {pendingEvents.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No pending submissions to review.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {crossContentSource && (
        <CrossContentDialog
          open={crossContentOpen}
          onOpenChange={setCrossContentOpen}
          sourceData={crossContentSource}
        />
      )}
    </div>
  );
}
