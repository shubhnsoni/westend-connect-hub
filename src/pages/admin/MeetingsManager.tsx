import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, FileText, Plus, Pencil, Trash2, Sparkles, Zap, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/FileUpload';
import CrossContentDialog, { type ContentSourceType } from '@/components/admin/CrossContentDialog';
import { generateAIContent } from '@/lib/aiContentGenerator';

import { addMonths, setDate, getDay, startOfMonth, format } from 'date-fns';

interface Meeting {
  id: string;
  title: string;
  date: string;
  location: string | null;
  description: string | null;
  status: string;
  agenda_url: string | null;
  minutes_url: string | null;
  zoom_link: string | null;
  created_at: string;
}

export default function MeetingsManager() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMeetingId, setCurrentMeetingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [crossContentOpen, setCrossContentOpen] = useState(false);
  const [crossContentSource, setCrossContentSource] = useState<{ type: ContentSourceType; title: string; description?: string; date?: string; location?: string; zoom_link?: string } | null>(null);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigateTo = useNavigate();

  const [isParsing, setIsParsing] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    status: 'upcoming',
    agenda_url: '',
    minutes_url: '',
    zoom_link: '',
    meeting_id: '',
    passcode: '',
  });

  const getNextSecondThursday = () => {
    const now = new Date();
    let candidate = startOfMonth(now.getMonth() >= 5 && now.getMonth() <= 7 ? addMonths(now, (8 - now.getMonth())) : now);
    // Skip June (5), July (6), August (7)
    const skipMonths = [5, 6, 7];
    while (skipMonths.includes(candidate.getMonth())) {
      candidate = addMonths(candidate, 1);
      candidate = startOfMonth(candidate);
    }
    // Find the 2nd Thursday
    let firstDay = startOfMonth(candidate);
    let dayOfWeek = getDay(firstDay);
    let firstThursday = dayOfWeek <= 4 ? setDate(firstDay, 1 + (4 - dayOfWeek)) : setDate(firstDay, 1 + (11 - dayOfWeek));
    let secondThursday = setDate(firstThursday, firstThursday.getDate() + 7);
    if (secondThursday <= now) {
      candidate = addMonths(candidate, 1);
      while (skipMonths.includes(candidate.getMonth())) {
        candidate = addMonths(candidate, 1);
      }
      firstDay = startOfMonth(candidate);
      dayOfWeek = getDay(firstDay);
      firstThursday = dayOfWeek <= 4 ? setDate(firstDay, 1 + (4 - dayOfWeek)) : setDate(firstDay, 1 + (11 - dayOfWeek));
      secondThursday = setDate(firstThursday, firstThursday.getDate() + 7);
    }
    return format(secondThursday, 'yyyy-MM-dd');
  };

  const format24To12 = (time24: string) => {
    const [hourString, minuteString = '00'] = time24.split(':');
    const hours = Number(hourString);
    const minutes = Number(minuteString);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) return time24;

    const period = hours >= 12 ? 'PM' : 'AM';
    const twelveHour = hours % 12 || 12;
    return `${twelveHour}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  const normalizeTimeForStorage = (timeInput: string) => {
    const raw = timeInput.trim();
    if (!raw) return null;

    const amPmMatch = raw.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
    if (amPmMatch) {
      let hours = Number(amPmMatch[1]);
      const minutes = Number(amPmMatch[2] ?? '00');
      const period = amPmMatch[3].toUpperCase();

      if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return null;

      if (period === 'AM') {
        hours = hours === 12 ? 0 : hours;
      } else {
        hours = hours === 12 ? 12 : hours + 12;
      }

      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    const twentyFourMatch = raw.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
    if (twentyFourMatch) {
      return `${twentyFourMatch[1].padStart(2, '0')}:${twentyFourMatch[2]}`;
    }

    return null;
  };

  const getTimeSelectorParts = (timeInput: string) => {
    const amPmMatch = timeInput.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (amPmMatch) {
      return {
        hour: String(Number(amPmMatch[1])),
        minute: amPmMatch[2],
        period: amPmMatch[3].toUpperCase() as 'AM' | 'PM',
      };
    }

    const normalized = normalizeTimeForStorage(timeInput);
    if (normalized) {
      const [hoursStr, minutesStr] = normalized.split(':');
      const hours24 = Number(hoursStr);
      const period = hours24 >= 12 ? 'PM' : 'AM';
      const hour = String(hours24 % 12 || 12);
      return { hour, minute: minutesStr, period: period as 'AM' | 'PM' };
    }

    return { hour: '7', minute: '00', period: 'PM' as const };
  };

  const handleTimePartChange = (part: 'hour' | 'minute' | 'period', value: string) => {
    setFormData((prev) => {
      const current = getTimeSelectorParts(prev.time);
      const next = { ...current, [part]: value };
      return { ...prev, time: `${next.hour}:${next.minute} ${next.period}` };
    });
  };

  const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minuteOptions = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const handlePreset = (preset: string) => {
    if (preset === 'monthly-meeting') {
      setFormData(prev => ({
        ...prev,
        title: 'WECA Monthly Meeting',
        date: getNextSecondThursday(),
        time: '7:00 PM',
        location: 'Rockville Memorial Library',
        description: 'Regular monthly meeting of the West End Citizens Association.',
        status: 'upcoming',
      }));
    }
  };

  const handleAIExtract = async () => {
    if (!formData.description.trim()) {
      toast({ title: 'Enter a description first', variant: 'destructive' });
      return;
    }
    setIsParsing(true);
    try {
      const { data, error } = await supabase.functions.invoke('parse-event-datetime', {
        body: { description: formData.description },
      });
      if (error) throw error;
      if (data) {
        setFormData(prev => ({
          ...prev,
          ...(data.start_date && { date: data.start_date }),
          ...(data.start_time && { time: format24To12(data.start_time) }),
          ...(data.location && { location: data.location }),
          ...(data.title && !prev.title && { title: data.title }),
        }));
        toast({ title: 'Fields auto-filled from description' });
      }
    } catch (e: any) {
      toast({ title: 'Extraction failed', description: e.message, variant: 'destructive' });
    } finally {
      setIsParsing(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  // Handle cross-content navigation state
  useEffect(() => {
    const crossContent = (location.state as any)?.crossContent;
    if (crossContent) {
      navigateTo(location.pathname, { replace: true, state: {} });
      const { sourceData, mode, existingId } = crossContent;

      if (mode === 'update' && existingId) {
        const loadAndEdit = async () => {
          const { data } = await supabase.from('meetings').select('*').eq('id', existingId).single();
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
      const result = await generateAIContent(sourceData, 'meeting', (partial) => {
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

  const handleSubmit = async (e: React.FormEvent, statusOverride?: string) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsLoading(false);
      return;
    }

    const normalizedTime = normalizeTimeForStorage(formData.time);
    if (formData.time && !normalizedTime) {
      toast({
        title: 'Invalid time format',
        description: 'Please use AM/PM format like 7:00 PM.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    const { time, zoom_link, meeting_id, passcode, ...rest } = formData;
    const dateWithTime = `${formData.date}T${normalizedTime ?? '00:00'}:00`;
    const finalStatus = statusOverride || formData.status;
    const meetingData = {
      ...rest,
      status: finalStatus,
      date: dateWithTime,
      created_by: user.id,
      zoom_link: zoom_link || null,
      meeting_id: meeting_id || null,
      passcode: passcode || null,
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
        setCrossContentSource({ type: 'meeting', title: formData.title, description: formData.description, date: dateWithTime, location: formData.location, zoom_link: formData.zoom_link });
        setCrossContentOpen(true);
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
        setCrossContentSource({ type: 'meeting', title: formData.title, description: formData.description, date: dateWithTime, location: formData.location, zoom_link: formData.zoom_link });
        setCrossContentOpen(true);
        handleDialogClose();
        fetchMeetings();
      }
    }

    setIsLoading(false);
  };

  const handleEdit = (meeting: Meeting) => {
    const dateStr = meeting.date.split('T')[0];
    const time24 = meeting.date.includes('T') ? meeting.date.slice(11, 16) : '';
    const timeStr = time24 ? format24To12(time24) : '';
    setFormData({
      title: meeting.title,
      date: dateStr,
      time: timeStr,
      location: meeting.location || '',
      description: meeting.description || '',
      status: meeting.status,
      agenda_url: meeting.agenda_url || '',
      minutes_url: meeting.minutes_url || '',
      zoom_link: meeting.zoom_link || '',
      meeting_id: (meeting as any).meeting_id || '',
      passcode: (meeting as any).passcode || '',
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
      time: '',
      location: '',
      description: '',
      status: 'upcoming',
      agenda_url: '',
      minutes_url: '',
      zoom_link: '',
      meeting_id: '',
      passcode: '',
    });
    setCurrentMeetingId(null);
    setIsEditing(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const selectedTime = getTimeSelectorParts(formData.time);

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
            <form onSubmit={handleSubmit} className="space-y-4 relative">
              {isAIGenerating && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3 rounded-lg">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-sm font-medium text-muted-foreground">AI is generating content...</p>
                </div>
              )}
              {/* Quick-fill presets */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Presets:
                </span>
                <Button type="button" variant="outline" size="sm" onClick={() => handlePreset('monthly-meeting')}>
                  Monthly Meeting (2nd Thu)
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="text-sm font-medium">Time</label>
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                    <Select value={selectedTime.hour} onValueChange={(value) => handleTimePartChange('hour', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent className="z-[70] bg-popover">
                        {hourOptions.map((hour) => (
                          <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedTime.minute} onValueChange={(value) => handleTimePartChange('minute', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Min" />
                      </SelectTrigger>
                      <SelectContent className="z-[70] bg-popover">
                        {minuteOptions.map((minute) => (
                          <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="grid grid-cols-2 gap-1">
                      <Button
                        type="button"
                        size="sm"
                        variant={selectedTime.period === 'AM' ? 'default' : 'outline'}
                        onClick={() => handleTimePartChange('period', 'AM')}
                      >
                        AM
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant={selectedTime.period === 'PM' ? 'default' : 'outline'}
                        onClick={() => handleTimePartChange('period', 'PM')}
                      >
                        PM
                      </Button>
                    </div>
                  </div>
                </div>
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
                <label className="text-sm font-medium">Zoom Link</label>
                <Input
                  value={formData.zoom_link}
                  onChange={(e) => setFormData({ ...formData, zoom_link: e.target.value })}
                  placeholder="https://us02web.zoom.us/j/..."
                  type="url"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Meeting ID</label>
                  <Input
                    value={formData.meeting_id}
                    onChange={(e) => setFormData({ ...formData, meeting_id: e.target.value })}
                    placeholder="123 456 7890"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Passcode</label>
                  <Input
                    value={formData.passcode}
                    onChange={(e) => setFormData({ ...formData, passcode: e.target.value })}
                    placeholder="abc123"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  placeholder="e.g. Board meeting on March 13 at 7pm at Rockville Memorial Library"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-1 text-xs"
                  onClick={handleAIExtract}
                  disabled={isParsing || !formData.description.trim()}
                >
                  {isParsing ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Sparkles className="mr-1 h-3 w-3" />}
                  Extract date & time from description
                </Button>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                   <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Agenda</label>
                <FileUpload
                  bucket="meeting-documents"
                  accept="application/pdf"
                  maxSize={10}
                  currentUrl={formData.agenda_url}
                  onUploadComplete={(url) => setFormData({ ...formData, agenda_url: url })}
                  label="Upload Agenda"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Minutes</label>
                <FileUpload
                  bucket="meeting-documents"
                  accept="application/pdf"
                  maxSize={10}
                  currentUrl={formData.minutes_url}
                  onUploadComplete={(url) => setFormData({ ...formData, minutes_url: url })}
                  label="Upload Minutes"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isLoading}
                  onClick={(e) => handleSubmit(e as unknown as React.FormEvent, 'draft')}
                >
                  Save as Draft
                </Button>
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
                    {(() => {
                      const [dp, tp] = meeting.date.split('T');
                      const [y, m, d] = dp.split('-').map(Number);
                      const [h = 0, mi = 0] = (tp || '').split(':').map(Number);
                      return new Date(y, m - 1, d, h, mi).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
                    })()}
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
                  {meeting.zoom_link && (
                    <a href={meeting.zoom_link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                      📹 Zoom Link
                    </a>
                  )}
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
