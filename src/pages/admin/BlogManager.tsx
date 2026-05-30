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
import { Pencil, Trash2, Plus, Eye, Edit3, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import CrossContentDialog, { type ContentSourceType } from '@/components/admin/CrossContentDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { generateAIContent } from '@/lib/aiContentGenerator';
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

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
}

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
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

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [crossContentOpen, setCrossContentOpen] = useState(false);
  const [crossContentSource, setCrossContentSource] = useState<{ type: ContentSourceType; title: string; content?: string; excerpt?: string } | null>(null);
  const [activeTab, setActiveTab] = useState('write');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedLayoutStyle, setSelectedLayoutStyle] = useState('modern-cards');
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image_url: '',
    status: 'draft',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    featured_image_alt: '',
  });

  const [isSEOGenerating, setIsSEOGenerating] = useState(false);
  const [isAltGenerating, setIsAltGenerating] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle cross-content navigation state
  useEffect(() => {
    const crossContent = (location.state as any)?.crossContent;
    if (crossContent) {
      // Clear the state to prevent re-triggering
      navigate(location.pathname, { replace: true, state: {} });

      const { sourceData, mode, existingId } = crossContent;

      if (mode === 'update' && existingId) {
        // Load existing post and open edit dialog
        const loadAndEdit = async () => {
          const { data } = await supabase.from('blog_posts').select('*').eq('id', existingId).single();
          if (data) {
            setEditingPost(data);
            setFormData({
              title: data.title,
              slug: data.slug,
              excerpt: data.excerpt || '',
              content: data.content,
              featured_image_url: data.featured_image_url || '',
              status: data.status,
              seo_title: (data as any).seo_title || '',
              seo_description: (data as any).seo_description || '',
              seo_keywords: (data as any).seo_keywords || '',
              featured_image_alt: (data as any).featured_image_alt || '',
            });
          }
          setIsDialogOpen(true);
          triggerAIGeneration(sourceData);
        };
        loadAndEdit();
      } else {
        // Open create dialog
        resetForm();
        setIsDialogOpen(true);
        triggerAIGeneration(sourceData);
      }
    }
  }, [location.state]);

  const triggerAIGeneration = async (sourceData: any) => {
    setIsAIGenerating(true);
    try {
      const result = await generateAIContent(sourceData, 'blog', (partial) => {
        if (partial.title) {
          setFormData(prev => ({
            ...prev,
            title: partial.title,
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
        ...prev,
        title: result.title,
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

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch blog posts',
      });
    } else {
      setPosts(data || []);
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
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleApplyTemplate = () => {
    const template = getTemplateById(selectedTemplate);
    if (template) {
      setFormData(prev => ({
        ...prev,
        content: template.structure
      }));
      setActiveTab('write');
      toast({
        title: 'Template Applied',
        description: `"${template.name}" template has been applied. Edit the placeholders with your content.`,
      });
    }
  };

  const generateExcerptFromContent = (content: string): string => {
    // Strip HTML tags and get first 160 characters
    const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (textContent.length <= 160) return textContent;
    return textContent.substring(0, 157) + '...';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    // Auto-generate excerpt if empty
    const finalExcerpt = formData.excerpt || generateExcerptFromContent(formData.content);

    try {
      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            ...formData,
            excerpt: finalExcerpt,
            published_at: formData.status === 'published' ? new Date().toISOString() : null,
          })
          .eq('id', editingPost.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Blog post updated successfully',
        });
        setCrossContentSource({ type: 'blog', title: formData.title, content: formData.content, excerpt: formData.excerpt });
        setCrossContentOpen(true);
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([{
            ...formData,
            excerpt: finalExcerpt,
            author_id: user.id,
            published_at: formData.status === 'published' ? new Date().toISOString() : null,
          }]);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Blog post created successfully',
        });
        setCrossContentSource({ type: 'blog', title: formData.title, content: formData.content, excerpt: formData.excerpt });
        setCrossContentOpen(true);
      }

      setIsDialogOpen(false);
      resetForm();
      fetchPosts();
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

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      featured_image_url: post.featured_image_url || '',
      status: post.status,
      seo_title: (post as any).seo_title || '',
      seo_description: (post as any).seo_description || '',
      seo_keywords: (post as any).seo_keywords || '',
      featured_image_alt: (post as any).featured_image_alt || '',
    });
    setActiveTab('write');
    setSelectedTemplate('');
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete blog post',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Blog post deleted successfully',
      });
      fetchPosts();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image_url: '',
      status: 'draft',
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      featured_image_alt: '',
    });
    setEditingPost(null);
    setActiveTab('write');
    setSelectedTemplate('');
    setSelectedLayoutStyle('modern-cards');
  };

  const handleGenerateSEO = async () => {
    if (!formData.title && !formData.content) {
      toast({ variant: 'destructive', title: 'No content', description: 'Add a title and content first.' });
      return;
    }
    setIsSEOGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-ai-assistant', {
        body: {
          action: 'seo',
          messages: [{ role: 'user', content: `Title: ${formData.title}\n\nContent:\n${formData.content.replace(/<[^>]*>/g, ' ').substring(0, 3000)}` }],
        },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setFormData(prev => ({
        ...prev,
        seo_title: data.seo_title || prev.seo_title,
        seo_description: data.seo_description || prev.seo_description,
        seo_keywords: data.seo_keywords || prev.seo_keywords,
      }));
      toast({ title: 'SEO Generated', description: 'Review the generated SEO metadata below.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'SEO Generation Failed', description: err.message });
    } finally {
      setIsSEOGenerating(false);
    }
  };

  const handleGenerateAltText = async () => {
    if (!formData.featured_image_url) {
      toast({ variant: 'destructive', title: 'No image', description: 'Upload a featured image first.' });
      return;
    }
    setIsAltGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-ai-assistant', {
        body: {
          action: 'alt-text',
          messages: [{ role: 'user', content: `Generate alt text for this image: ${formData.featured_image_url}\n\nContext: This is a featured image for a blog post titled "${formData.title}"` }],
        },
      });
      if (error) throw error;
      // For alt-text, the response comes as streamed text - parse it
      const text = typeof data === 'string' ? data : data?.raw || '';
      if (text) {
        setFormData(prev => ({ ...prev, featured_image_alt: text.trim() }));
        toast({ title: 'Alt Text Generated', description: 'Review the generated alt text below.' });
      }
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Alt Text Generation Failed', description: err.message });
    } finally {
      setIsAltGenerating(false);
    }
  };

  const handleNewPost = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    setIsDialogOpen(open);
  };

  const wordCount = formData.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button onClick={handleNewPost}>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
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
                    placeholder="Enter post title..."
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
                      <span className="text-xs text-muted-foreground">
                        {wordCount} words
                      </span>
                    </div>
                    <div className="blog-editor-wrapper">
                      <ReactQuill
                        theme="snow"
                        value={formData.content}
                        onChange={(content) => setFormData({ ...formData, content })}
                        modules={quillModules}
                        formats={quillFormats}
                        className="bg-background min-h-[300px]"
                        placeholder="Start writing your post..."
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="mt-4 space-y-6">
                  {/* Layout Style Selector - Always visible at top */}
                  <LayoutStyleSelector
                    selectedStyle={selectedLayoutStyle}
                    onSelectStyle={setSelectedLayoutStyle}
                  />

                  {/* Live Preview with selected layout style */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-foreground">Live Preview</h3>
                    <StyledPreview
                      title={formData.title || ''}
                      content={DOMPurify.sanitize(formData.content)}
                      layoutStyle={selectedLayoutStyle}
                    />
                  </div>

                  {/* Content Templates - Collapsible at bottom */}
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
                  placeholder="Brief summary of the post..."
                />
              </div>

              {/* AI SEO Section */}
              <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    SEO Metadata
                  </Label>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleGenerateSEO}
                    disabled={isSEOGenerating}
                  >
                    {isSEOGenerating ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Sparkles className="mr-1 h-3 w-3" />}
                    {isSEOGenerating ? 'Generating...' : 'Generate SEO'}
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="seo_title" className="text-xs">
                      SEO Title <span className="text-muted-foreground">({formData.seo_title.length}/60)</span>
                    </Label>
                    <Input
                      id="seo_title"
                      value={formData.seo_title}
                      onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                      placeholder="Optimized page title for search engines..."
                      maxLength={60}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="seo_description" className="text-xs">
                      Meta Description <span className="text-muted-foreground">({formData.seo_description.length}/160)</span>
                    </Label>
                    <Textarea
                      id="seo_description"
                      value={formData.seo_description}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                      rows={2}
                      placeholder="Compelling description for search results..."
                      maxLength={160}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="seo_keywords" className="text-xs">Keywords</Label>
                    <Input
                      id="seo_keywords"
                      value={formData.seo_keywords}
                      onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                      placeholder="keyword1, keyword2, keyword3..."
                    />
                  </div>
                </div>
              </div>

              {/* Featured Image and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FileUpload
                    bucket="blog-images"
                    accept="image/*"
                    maxSize={5}
                    currentUrl={formData.featured_image_url}
                    onUploadComplete={(url) => setFormData({ ...formData, featured_image_url: url })}
                    label="Featured Image"
                  />
                  {formData.featured_image_url && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="featured_image_alt" className="text-xs">Image Alt Text</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={handleGenerateAltText}
                          disabled={isAltGenerating}
                        >
                          {isAltGenerating ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <ImageIcon className="mr-1 h-3 w-3" />}
                          {isAltGenerating ? 'Generating...' : 'AI Generate'}
                        </Button>
                      </div>
                      <Input
                        id="featured_image_alt"
                        value={formData.featured_image_alt}
                        onChange={(e) => setFormData({ ...formData, featured_image_alt: e.target.value })}
                        placeholder="Describe the image for accessibility..."
                      />
                    </div>
                  )}
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
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingPost ? 'Update Post' : 'Create Post'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts List */}
      <div className="grid gap-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No blog posts yet. Click "New Post" to create your first post.
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <div className="flex gap-2 items-center">
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        post.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        post.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {post.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(post)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {post.excerpt && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </CardContent>
              )}
            </Card>
          ))
        )}
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
