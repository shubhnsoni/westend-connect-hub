import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Save, FileText, Loader2, Plus, Trash2, GripVertical } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AdvertiseManager from "./AdvertiseManager";

const DEFAULT_PAGES = [
  { slug: "homepage", label: "Homepage" },
  { slug: "about", label: "About" },
  { slug: "events", label: "Events" },
  { slug: "get-involved", label: "Get Involved" },
  { slug: "news-updates", label: "News & Updates" },
  { slug: "resources", label: "Resources (overview)" },
  { slug: "resources-city-services", label: "Resources — City Services" },
  { slug: "resources-archives", label: "Resources — Archives" },
  { slug: "resources-weca", label: "Resources — WECA Documents" },
  { slug: "charter-bylaws", label: "Charter & Bylaws" },
  { slug: "faq", label: "FAQ" },
  { slug: "priorities", label: "Priorities" },
  { slug: "support", label: "Support (overview)" },
  { slug: "support-contribute", label: "Support — Contribute" },
  { slug: "support-sponsor", label: "Support — Sponsor" },
  { slug: "support-advertise", label: "Support — Advertise" },
  { slug: "media", label: "Media" },
  { slug: "membership", label: "Membership Signup" },
  { slug: "surveys", label: "Surveys & Polls" },
  { slug: "volunteer-signup", label: "Volunteer Opportunities" },
  { slug: "volunteer-form", label: "Volunteer Signup Form" },
];

interface ContentRow {
  id: string;
  page_slug: string;
  section_key: string;
  content_type: string;
  content: string;
  label: string;
  display_order: number;
  updated_at: string;
}

const PagesManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addPageDialogOpen, setAddPageDialogOpen] = useState(false);
  const [newSection, setNewSection] = useState({ section_key: "", label: "", content_type: "text", content: "" });
  const [newPage, setNewPage] = useState({ slug: "", label: "" });

  // Fetch distinct page slugs from DB + merge with defaults
  const { data: dbPages = [] } = useQuery({
    queryKey: ["page-slugs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content" as any)
        .select("page_slug")
        .order("page_slug");
      if (error) throw error;
      const slugs = [...new Set((data || []).map((r: any) => r.page_slug as string))];
      return slugs;
    },
  });

  const allPages = (() => {
    const map = new Map(DEFAULT_PAGES.map(p => [p.slug, p.label]));
    dbPages.forEach(slug => { if (!map.has(slug)) map.set(slug, slug); });
    return Array.from(map.entries())
      .map(([slug, label]) => ({ slug, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  })();

  const [selectedPage, setSelectedPage] = useState(DEFAULT_PAGES[0].slug);

  const { data: sections = [], isLoading } = useQuery({
    queryKey: ["page-content-admin", selectedPage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content" as any)
        .select("*")
        .eq("page_slug", selectedPage)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as ContentRow[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      setSavingId(id);
      const { error } = await supabase
        .from("page_content" as any)
        .update({ content, updated_by: user?.id } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-content-admin", selectedPage] });
      queryClient.invalidateQueries({ queryKey: ["page-content", selectedPage] });
      toast({ description: "Content saved" });
      setSavingId(null);
    },
    onError: (error: any) => {
      toast({ description: error.message || "Failed to save", variant: "destructive" });
      setSavingId(null);
    },
  });

  const addSectionMutation = useMutation({
    mutationFn: async (section: typeof newSection) => {
      const maxOrder = sections.reduce((max, s) => Math.max(max, s.display_order), 0);
      const { error } = await supabase
        .from("page_content" as any)
        .insert({
          page_slug: selectedPage,
          section_key: section.section_key,
          label: section.label,
          content_type: section.content_type,
          content: section.content,
          display_order: maxOrder + 1,
          updated_by: user?.id,
        } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-content-admin", selectedPage] });
      queryClient.invalidateQueries({ queryKey: ["page-content", selectedPage] });
      toast({ description: "Section added" });
      setAddDialogOpen(false);
      setNewSection({ section_key: "", label: "", content_type: "text", content: "" });
    },
    onError: (error: any) => {
      toast({ description: error.message || "Failed to add section", variant: "destructive" });
    },
  });

  const deleteSectionMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("page_content" as any)
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-content-admin", selectedPage] });
      queryClient.invalidateQueries({ queryKey: ["page-content", selectedPage] });
      toast({ description: "Section deleted" });
    },
    onError: (error: any) => {
      toast({ description: error.message || "Failed to delete", variant: "destructive" });
    },
  });

  const handleSave = (section: ContentRow) => {
    const content = editedContent[section.id] ?? section.content;
    saveMutation.mutate({ id: section.id, content });
  };

  const getEditedValue = (section: ContentRow) => editedContent[section.id] ?? section.content;

  const handleChange = (id: string, value: string) => {
    setEditedContent((prev) => ({ ...prev, [id]: value }));
  };

  const handlePageChange = (slug: string) => {
    setSelectedPage(slug);
    setEditedContent({});
  };

  const handleAddPage = () => {
    if (!newPage.slug.trim()) return;
    const slug = newPage.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    // We just switch to it — sections can be added after
    setSelectedPage(slug);
    setAddPageDialogOpen(false);
    setNewPage({ slug: "", label: "" });
    // Insert a placeholder so the page shows up in future queries
    supabase.from("page_content" as any).insert({
      page_slug: slug,
      section_key: "hero_title",
      label: newPage.label || slug,
      content_type: "text",
      content: newPage.label || slug,
      display_order: 0,
      updated_by: user?.id,
    } as any).then(() => {
      queryClient.invalidateQueries({ queryKey: ["page-slugs"] });
      queryClient.invalidateQueries({ queryKey: ["page-content-admin", slug] });
    });
    toast({ description: `Page "${newPage.label || slug}" created` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Page Content Manager</h1>
          <p className="text-muted-foreground mt-1">Add, edit, or remove content sections on any page</p>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <Label>Page:</Label>
        <Select value={selectedPage} onValueChange={handlePageChange}>
          <SelectTrigger className="w-[250px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {allPages.map((p) => (
              <SelectItem key={p.slug} value={p.slug}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={addPageDialogOpen} onOpenChange={setAddPageDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" /> New Page
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Page</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Page Slug (URL-safe identifier)</Label>
                <Input placeholder="e.g. history" value={newPage.slug} onChange={e => setNewPage(p => ({ ...p, slug: e.target.value }))} />
              </div>
              <div>
                <Label>Display Label</Label>
                <Input placeholder="e.g. History" value={newPage.label} onChange={e => setNewPage(p => ({ ...p, label: e.target.value }))} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddPage} disabled={!newPage.slug.trim()}>Create Page</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {sections.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No content sections yet. Add one below.
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {sections.map((section) => (
              <Card key={section.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground/50" />
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <CardTitle className="text-lg">{section.label}</CardTitle>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded">{section.content_type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => handleSave(section)} disabled={savingId === section.id}>
                        {savingId === section.id ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Save className="w-4 h-4 mr-1" />}
                        Save
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete "{section.label}"?</AlertDialogTitle>
                            <AlertDialogDescription>This will permanently remove this content section. The page will fall back to its default content if available.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteSectionMutation.mutate(section.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {section.content_type === "html" ? (
                    <ReactQuill value={getEditedValue(section)} onChange={(val) => handleChange(section.id, val)} theme="snow" className="bg-background" />
                  ) : section.content_type === "json" ? (
                    <Textarea value={getEditedValue(section)} onChange={(e) => handleChange(section.id, e.target.value)} rows={12} className="font-mono text-sm" />
                  ) : (
                    <Input value={getEditedValue(section)} onChange={(e) => handleChange(section.id, e.target.value)} />
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Key: {section.section_key} · Last updated: {new Date(section.updated_at).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Section */}
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full border-dashed">
                <Plus className="w-4 h-4 mr-2" /> Add Content Section
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Content Section</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Section Key (unique identifier)</Label>
                  <Input placeholder="e.g. article_12, sidebar_note" value={newSection.section_key} onChange={e => setNewSection(s => ({ ...s, section_key: e.target.value }))} />
                </div>
                <div>
                  <Label>Display Label</Label>
                  <Input placeholder="e.g. Article XII - Dissolution" value={newSection.label} onChange={e => setNewSection(s => ({ ...s, label: e.target.value }))} />
                </div>
                <div>
                  <Label>Content Type</Label>
                  <Select value={newSection.content_type} onValueChange={v => setNewSection(s => ({ ...s, content_type: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="html">HTML (Rich Text)</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="image">Image URL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Initial Content</Label>
                  <Textarea value={newSection.content} onChange={e => setNewSection(s => ({ ...s, content: e.target.value }))} rows={4} placeholder="Enter initial content..." />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => addSectionMutation.mutate(newSection)} disabled={!newSection.section_key.trim() || !newSection.label.trim() || addSectionMutation.isPending}>
                  {addSectionMutation.isPending && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
                  Add Section
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}

      {selectedPage === "support-advertise" && <AdvertiseManager />}
    </div>
  );
};

export default PagesManager;
