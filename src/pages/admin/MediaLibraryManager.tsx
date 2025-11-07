import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Image, Plus, Pencil, Trash2, FileType } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FileUpload } from '@/components/FileUpload';

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

export default function MediaLibraryManager() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMediaId, setCurrentMediaId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    filename: '',
    file_url: '',
    file_type: '',
    file_size: 0,
    alt_text: '',
    tags: '',
  });

  useEffect(() => {
    fetchMedia();
  }, []);

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
      const { error } = await supabase
        .from('media_library')
        .update(mediaData)
        .eq('id', currentMediaId);

      if (error) {
        toast({ title: 'Error updating media', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Media updated successfully' });
        handleDialogClose();
        fetchMedia();
      }
    } else {
      const { error } = await supabase
        .from('media_library')
        .insert([mediaData]);

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
      tags: item.tags.join(', '),
    });
    setCurrentMediaId(item.id);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;

    const { error } = await supabase
      .from('media_library')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error deleting media', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Media deleted successfully' });
      fetchMedia();
    }
  };

  const resetForm = () => {
    setFormData({
      filename: '',
      file_url: '',
      file_type: '',
      file_size: 0,
      alt_text: '',
      tags: '',
    });
    setCurrentMediaId(null);
    setIsEditing(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

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
                <Input
                  value={formData.filename}
                  onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
                  required
                />
              </div>
              <FileUpload
                bucket="media-library"
                accept="image/*,video/*"
                maxSize={20}
                currentUrl={formData.file_url}
                onUploadComplete={(url) => setFormData({ ...formData, file_url: url })}
                label="Upload Media File"
              />
              <div>
                <label className="text-sm font-medium">File Type</label>
                <Input
                  value={formData.file_type}
                  onChange={(e) => setFormData({ ...formData, file_type: e.target.value })}
                  placeholder="image/jpeg, video/mp4, etc."
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">File Size (bytes)</label>
                <Input
                  type="number"
                  value={formData.file_size}
                  onChange={(e) => setFormData({ ...formData, file_size: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Alt Text</label>
                <Input
                  value={formData.alt_text}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  placeholder="Descriptive text for accessibility"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="event, photo, 2024"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : isEditing ? 'Update Media' : 'Add Media'}
                </Button>
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative flex items-center justify-center">
              {item.file_type.startsWith('image/') ? (
                <img
                  src={item.file_url}
                  alt={item.alt_text || item.filename}
                  className="w-full h-full object-cover"
                />
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
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(item)}>
                  <Pencil className="h-3 w-3 mr-1" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
