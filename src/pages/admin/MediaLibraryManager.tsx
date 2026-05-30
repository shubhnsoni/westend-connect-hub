import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Image, Plus, Pencil, Trash2, FileType, FileText, Video, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FileUpload } from '@/components/FileUpload';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import BulkMinutesUpload from '@/components/admin/BulkMinutesUpload';

interface MediaItem {
  id: string;
  filename: string;
  file_url: string;
  file_type: string;
  file_size: number;
  alt_text: string | null;
  tags: string[];
  created_at: string;
}

type FilterType = 'all' | 'images' | 'videos' | 'documents';

function MediaGrid({ items, onEdit, onDelete, formatFileSize }: {
  items: MediaItem[];
  onEdit: (item: MediaItem) => void;
  onDelete: (id: string) => void;
  formatFileSize: (bytes: number) => string;
}) {
  if (items.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No media files found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="aspect-video bg-muted relative flex items-center justify-center">
            {item.file_type.startsWith('image/') ? (
              <img src={item.file_url} alt={item.alt_text || item.filename} className="w-full h-full object-cover" />
            ) : item.file_type.startsWith('video/') ? (
              <Video className="h-12 w-12 text-muted-foreground" />
            ) : item.file_type === 'application/pdf' ? (
              <FileText className="h-12 w-12 text-muted-foreground" />
            ) : (
              <FileType className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-semibold truncate" title={item.filename}>{item.filename}</h3>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{item.file_type}</span>
              <span>{formatFileSize(item.file_size)}</span>
            </div>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(item)}>
                <Pencil className="h-3 w-3 mr-1" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function MediaLibraryManager() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMediaId, setCurrentMediaId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [bulkOpen, setBulkOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    filename: '',
    file_url: '',
    file_type: '',
    file_size: 0,
    alt_text: '',
    tags: '',
  });

  useEffect(() => { fetchMedia(); }, []);

  const fetchMedia = async () => {
    const { data, error } = await supabase
      .from('media_library')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Error fetching media', description: error.message, variant: 'destructive' });
    } else {
      setMedia(data || []);
    }
  };

  const filteredMedia = media.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'images') return item.file_type.startsWith('image/');
    if (activeFilter === 'videos') return item.file_type.startsWith('video/');
    if (activeFilter === 'documents') return item.file_type === 'application/pdf' || item.file_type.includes('document');
    return true;
  });

  const counts = {
    all: media.length,
    images: media.filter(m => m.file_type.startsWith('image/')).length,
    videos: media.filter(m => m.file_type.startsWith('video/')).length,
    documents: media.filter(m => m.file_type === 'application/pdf' || m.file_type.includes('document')).length,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const mediaData = {
      filename: formData.filename,
      file_url: formData.file_url,
      file_type: formData.file_type,
      file_size: formData.file_size,
      alt_text: formData.alt_text || null,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      uploaded_by: user.id,
    };

    if (isEditing && currentMediaId) {
      const { error } = await supabase.from('media_library').update(mediaData).eq('id', currentMediaId);
      if (error) {
        toast({ title: 'Error updating media', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Media updated successfully' });
        handleDialogClose();
        fetchMedia();
      }
    } else {
      const { error } = await supabase.from('media_library').insert([mediaData]);
      if (error) {
        toast({ title: 'Error creating media', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Media created successfully' });
        handleDialogClose();
        fetchMedia();
      }
    }
    setIsLoading(false);
  };

  const handleEdit = (item: MediaItem) => {
    setFormData({
      filename: item.filename,
      file_url: item.file_url,
      file_type: item.file_type,
      file_size: item.file_size,
      alt_text: item.alt_text || '',
      tags: item.tags?.join(', ') || '',
    });
    setCurrentMediaId(item.id);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    const { error } = await supabase.from('media_library').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error deleting media', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Media deleted successfully' });
      fetchMedia();
    }
  };

  const resetForm = () => {
    setFormData({ filename: '', file_url: '', file_type: '', file_size: 0, alt_text: '', tags: '' });
    setCurrentMediaId(null);
    setIsEditing(false);
  };

  const handleDialogClose = () => { setIsDialogOpen(false); resetForm(); };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Media' : 'Add New Media'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Filename</label>
                <Input value={formData.filename} onChange={(e) => setFormData({ ...formData, filename: e.target.value })} required />
              </div>
              <FileUpload
                bucket="media-library"
                accept="image/*,video/*,application/pdf"
                maxSize={20}
                currentUrl={formData.file_url}
                onUploadComplete={(url) => setFormData({ ...formData, file_url: url })}
                label="Upload Media File"
              />
              <div>
                <label className="text-sm font-medium">File Type</label>
                <Input value={formData.file_type} onChange={(e) => setFormData({ ...formData, file_type: e.target.value })} placeholder="image/jpeg, video/mp4, application/pdf" required />
              </div>
              <div>
                <label className="text-sm font-medium">File Size (bytes)</label>
                <Input type="number" value={formData.file_size} onChange={(e) => setFormData({ ...formData, file_size: parseInt(e.target.value) })} required />
              </div>
              <div>
                <label className="text-sm font-medium">Alt Text</label>
                <Input value={formData.alt_text} onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })} placeholder="Descriptive text for accessibility" />
              </div>
              <div>
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="event, photo, 2024" />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : isEditing ? 'Update Media' : 'Add Media'}
                </Button>
                <Button type="button" variant="outline" onClick={handleDialogClose}>Cancel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Bulk ZIP Upload */}
      <Collapsible open={bulkOpen} onOpenChange={setBulkOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Bulk ZIP Upload (Meeting Minutes)
            <Filter className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <BulkMinutesUpload onComplete={fetchMedia} />
        </CollapsibleContent>
      </Collapsible>

      {/* Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as FilterType)}>
        <TabsList>
          <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          <TabsTrigger value="images">
            <Image className="h-3 w-3 mr-1" /> Images ({counts.images})
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="h-3 w-3 mr-1" /> Videos ({counts.videos})
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-3 w-3 mr-1" /> Documents ({counts.documents})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <MediaGrid items={filteredMedia} onEdit={handleEdit} onDelete={handleDelete} formatFileSize={formatFileSize} />
    </div>
  );
}
