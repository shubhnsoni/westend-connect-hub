import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Download, Plus, Pencil, Trash2, Eye, Edit3, Loader2 } from 'lucide-react';
import CrossContentDialog, { type ContentSourceType } from '@/components/admin/CrossContentDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUpload } from '@/components/FileUpload';
import {
  LayoutStyleSelector,
  ContentTemplateDrawer,
  StyledPreview,
  getTemplateById
} from '@/components/admin/BlogTemplates';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { format } from 'date-fns';
import { generateAIContent } from '@/lib/aiContentGenerator';

interface Newsletter {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  layout_style: string;
  status: string;
  published_at: string | null;
  created_at: string;
}

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  subscribed_at: string;
  is_active: boolean;
}

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['blockquote', 'link', 'image'],
    [{ 'align': [] }],
    ['clean']
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'blockquote', 'link', 'image',
  'align'
];

export default function NewsletterViewer() {
  const [mainTab, setMainTab] = useState('newsletters');
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState<Newsletter | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [crossContentOpen, setCrossContentOpen] = useState(false);
  const [crossContentSource, setCrossContentSource] = useState<{ type: ContentSourceType; title: string; content?: string } | null>(null);
  const [activeTab, setActiveTab] = useState('write');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedLayoutStyle, setSelectedLayoutStyle] = useState('classic');
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image_url: '',
    layout_style: 'classic',
    status: 'draft',
  });

  useEffect(() => {
    fetchNewsletters();
    fetchSubscribers();
  }, []);

  // Handle cross-content navigation state
  useEffect(() => {
    const crossContent = (location.state as any)?.crossContent;
    if (crossContent) {
      navigateTo(location.pathname, { replace: true, state: {} });
      const { sourceData, mode, existingId } = crossContent;

      if (mode === 'update' && existingId) {
        const loadAndEdit = async () => {
          const { data } = await supabase.from('newsletters').select('*').eq('id', existingId).single();
          if (data) {
            setEditingNewsletter(data);
            setFormData({
              title: data.title, slug: data.slug, excerpt: data.excerpt || '',
              content: data.content, featured_image_url: data.featured_image_url || '',
              layout_style: data.layout_style, status: data.status,
            });
            setSelectedLayoutStyle(data.layout_style);
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
      const result = await generateAIContent(sourceData, 'newsletter', (partial) => {
        if (partial.title) {
          setFormData(prev => ({
            ...prev, title: partial.title,
            slug: partial.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim(),
          }));
        }
        if (partial.excerpt) {
          setFormData(prev => ({ ...prev, excerpt: partial.excerpt }));
        }
        if (partial.content) {
          setFormData(prev => ({ ...prev, content: partial.content }));
        }
      });
      setFormData(prev => ({
        ...prev, title: result.title,
        slug: result.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim(),
        excerpt: result.excerpt || prev.excerpt,
        content: result.content,
      }));
      toast({ title: 'AI Content Generated', description: 'Review and edit the generated content, then save.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'AI Generation Failed', description: err.message });
    } finally {
      setIsAIGenerating(false);
    }
  };

  const fetchNewsletters = async () => {
    const { data, error } = await supabase
      .from('newsletters')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch newsletters' });
    } else {
      setNewsletters(data || []);
    }
  };

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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

  const handleApplyTemplate = () => {
    const template = getTemplateById(selectedTemplate);
    if (template) {
      setFormData(prev => ({ ...prev, content: template.structure }));
      setActiveTab('write');
      toast({ title: 'Template Applied', description: `"${template.name}" template has been applied.` });
    }
  };

  const generateExcerptFromContent = (content: string): string => {
    const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (textContent.length <= 160) return textContent;
    return textContent.substring(0, 157) + '...';
  };

  const handleSubmit = async (e: React.FormEvent, statusOverride?: string) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);

    const saveData = { ...formData, status: statusOverride || formData.status };
    const finalExcerpt = saveData.excerpt || generateExcerptFromContent(saveData.content);

    try {
      if (editingNewsletter) {
        const { error } = await supabase
          .from('newsletters')
          .update({
            ...saveData,
            excerpt: finalExcerpt,
            published_at: saveData.status === 'published' ? new Date().toISOString() : null,
          })
          .eq('id', editingNewsletter.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Newsletter updated successfully' });
        setCrossContentSource({ type: 'newsletter', title: saveData.title, content: saveData.content });
        setCrossContentOpen(true);
      } else {
        const { error } = await supabase
          .from('newsletters')
          .insert([{
            ...saveData,
            excerpt: finalExcerpt,
            author_id: user.id,
            published_at: saveData.status === 'published' ? new Date().toISOString() : null,
          }]);
        if (error) throw error;
        toast({ title: 'Success', description: 'Newsletter created successfully' });
        setCrossContentSource({ type: 'newsletter', title: saveData.title, content: saveData.content });
        setCrossContentOpen(true);
      }

      setIsDialogOpen(false);
      resetForm();
      fetchNewsletters();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (newsletter: Newsletter) => {
    setEditingNewsletter(newsletter);
    setFormData({
      title: newsletter.title,
      slug: newsletter.slug,
      excerpt: newsletter.excerpt || '',
      content: newsletter.content,
      featured_image_url: newsletter.featured_image_url || '',
      layout_style: newsletter.layout_style,
      status: newsletter.status,
    });
    setSelectedLayoutStyle(newsletter.layout_style);
    setActiveTab('write');
    setSelectedTemplate('');
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this newsletter?')) return;
    const { error } = await supabase.from('newsletters').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete newsletter' });
    } else {
      toast({ title: 'Success', description: 'Newsletter deleted successfully' });
      fetchNewsletters();
    }
  };

  const resetForm = () => {
    setFormData({ title: '', slug: '', excerpt: '', content: '', featured_image_url: '', layout_style: 'classic', status: 'draft' });
    setEditingNewsletter(null);
    setActiveTab('write');
    setSelectedTemplate('');
    setSelectedLayoutStyle('classic');
  };

  const handleNewNewsletter = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) resetForm();
    setIsDialogOpen(open);
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

  const wordCount = formData.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Newsletters</h1>
          <p className="text-muted-foreground">Create, edit, and manage newsletters</p>
        </div>
      </div>

      <Tabs value={mainTab} onValueChange={setMainTab}>
        <TabsList>
          <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
          <TabsTrigger value="subscribers">
            Subscribers ({subscribers.filter(s => s.is_active).length})
          </TabsTrigger>
        </TabsList>

        {/* ====== NEWSLETTERS TAB ====== */}
        <TabsContent value="newsletters" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
              <DialogTrigger asChild>
                <Button onClick={handleNewNewsletter}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Newsletter
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingNewsletter ? 'Edit Newsletter' : 'Create New Newsletter'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title and Slug */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter newsletter title..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="url-friendly-slug"
                        required
                      />
                    </div>
                  </div>

                  {/* Tabs for Write / Preview & Style */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="write" className="gap-2">
                        <Edit3 className="h-4 w-4" />
                        Write
                      </TabsTrigger>
                      <TabsTrigger value="preview" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Preview & Style
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="write" className="mt-4 space-y-4 relative">
                      {isAIGenerating && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3 rounded-lg">
                          <Loader2 className="w-8 h-8 animate-spin text-primary" />
                          <p className="text-sm font-medium text-muted-foreground">AI is generating content...</p>
                        </div>
                      )}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Content</Label>
                          <span className="text-xs text-muted-foreground">{wordCount} words</span>
                        </div>
                        <div className="blog-editor-wrapper">
                          <ReactQuill
                            theme="snow"
                            value={formData.content}
                            onChange={(content) => setFormData({ ...formData, content })}
                            modules={quillModules}
                            formats={quillFormats}
                            className="bg-background min-h-[300px]"
                            placeholder="Start writing your newsletter..."
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="preview" className="mt-4 space-y-6">
                      <LayoutStyleSelector
                        selectedStyle={selectedLayoutStyle}
                        onSelectStyle={(style) => {
                          setSelectedLayoutStyle(style);
                          setFormData(prev => ({ ...prev, layout_style: style }));
                        }}
                      />

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-foreground">Live Preview</h3>
                        <StyledPreview
                          title={formData.title || ''}
                          content={DOMPurify.sanitize(formData.content)}
                          layoutStyle={selectedLayoutStyle}
                        />
                      </div>

                      <ContentTemplateDrawer
                        selectedTemplate={selectedTemplate}
                        onSelectTemplate={setSelectedTemplate}
                        onApplyTemplate={handleApplyTemplate}
                        hasContent={!!formData.content.replace(/<[^>]*>/g, '').trim()}
                      />
                    </TabsContent>
                  </Tabs>

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">
                      Excerpt <span className="text-muted-foreground text-xs">(optional - auto-generated if empty)</span>
                    </Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={2}
                      placeholder="Brief summary of the newsletter..."
                    />
                  </div>

                  {/* Featured Image and Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FileUpload
                      bucket="blog-images"
                      accept="image/*"
                      maxSize={5}
                      currentUrl={formData.featured_image_url}
                      onUploadComplete={(url) => setFormData({ ...formData, featured_image_url: url })}
                      label="Cover Image"
                    />
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
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-4 border-t">
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
                      {isLoading ? 'Saving...' : editingNewsletter ? 'Update Newsletter' : 'Create Newsletter'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Newsletters List */}
          <div className="grid gap-4">
            {newsletters.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No newsletters yet. Click "New Newsletter" to create your first one.
                </CardContent>
              </Card>
            ) : (
              newsletters.map((nl) => (
                <Card key={nl.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{nl.title}</CardTitle>
                        <div className="flex gap-2 items-center">
                          <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            nl.status === 'published'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {nl.status}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(nl.created_at).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-muted-foreground capitalize">
                            Style: {nl.layout_style}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(nl)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(nl.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {nl.excerpt && (
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">{nl.excerpt}</p>
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* ====== SUBSCRIBERS TAB ====== */}
        <TabsContent value="subscribers" className="space-y-4">
          <div className="flex justify-end">
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
