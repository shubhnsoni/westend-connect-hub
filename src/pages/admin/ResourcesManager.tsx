import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { FileText, Link2, Plus, Pencil, Trash2, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/FileUpload';

interface Resource {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string | null;
  link_url: string | null;
  file_type: string | null;
  file_size: number | null;
  download_count: number;
  created_at: string;
}

export default function ResourcesManager() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentResourceId, setCurrentResourceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'city-services',
    file_url: '',
    link_url: '',
    file_type: '',
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error fetching resources', description: error.message, variant: 'destructive' });
    } else {
      setResources(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const resourceData = {
      ...formData,
      uploaded_by: user.id,
    };

    if (isEditing && currentResourceId) {
      const { error } = await supabase
        .from('resources')
        .update(resourceData)
        .eq('id', currentResourceId);

      if (error) {
        toast({ title: 'Error updating resource', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Resource updated successfully' });
        handleDialogClose();
        fetchResources();
      }
    } else {
      const { error } = await supabase
        .from('resources')
        .insert([resourceData]);

      if (error) {
        toast({ title: 'Error creating resource', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Resource created successfully' });
        handleDialogClose();
        fetchResources();
      }
    }

    setIsLoading(false);
  };

  const handleEdit = (resource: Resource) => {
    setFormData({
      title: resource.title,
      description: resource.description || '',
      category: resource.category,
      file_url: resource.file_url || '',
      link_url: resource.link_url || '',
      file_type: resource.file_type || '',
    });
    setCurrentResourceId(resource.id);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error deleting resource', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Resource deleted successfully' });
      fetchResources();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'city-services',
      file_url: '',
      link_url: '',
      file_type: '',
    });
    setCurrentResourceId(null);
    setIsEditing(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Resources</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> New Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Resource' : 'Create New Resource'}</DialogTitle>
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
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="city-services">City Services</SelectItem>
                    <SelectItem value="planning">Planning & Development</SelectItem>
                    <SelectItem value="forms">Forms & Documents</SelectItem>
                    <SelectItem value="guidelines">Guidelines</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Resource File</label>
                <FileUpload
                  bucket="resources"
                  accept="application/pdf,.doc,.docx"
                  maxSize={10}
                  currentUrl={formData.file_url}
                  onUploadComplete={(url) => setFormData({ ...formData, file_url: url })}
                  label="Upload Document"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Link URL</label>
                <Input
                  value={formData.link_url}
                  onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">File Type</label>
                <Input
                  value={formData.file_type}
                  onChange={(e) => setFormData({ ...formData, file_type: e.target.value })}
                  placeholder="PDF, DOCX, etc."
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : isEditing ? 'Update Resource' : 'Create Resource'}
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
        {resources.map((resource) => (
          <Card key={resource.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">{resource.title}</h3>
                  <span className="px-2 py-1 rounded text-xs bg-secondary">{resource.category}</span>
                </div>
                {resource.description && <p className="text-sm text-muted-foreground">{resource.description}</p>}
                <div className="flex gap-3 items-center text-sm">
                  {resource.file_url && (
                    <a href={resource.file_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      View File
                    </a>
                  )}
                  {resource.link_url && (
                    <a href={resource.link_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                      <Link2 className="h-4 w-4" />
                      External Link
                    </a>
                  )}
                  {resource.download_count > 0 && (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Download className="h-4 w-4" />
                      {resource.download_count} downloads
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(resource)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(resource.id)}>
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
