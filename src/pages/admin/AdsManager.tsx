import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Upload, Crop, Clipboard, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";
import ImageCropper from "@/components/ImageCropper";

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url?: string;
  size: string;
  placement: string;
  is_active: boolean;
  display_order: number;
}

interface PendingImage {
  url: string;
  title: string;
  isGif: boolean;
  file?: File;
}

const PLACEMENT_SIZE_MAP: Record<string, string> = {
  'blog-sidebar': 'medium',
  'blog-post': 'medium',
  'blog-post-sidebar': 'sidebar',
  'home-sidebar': 'large',
  'top-banner': 'banner',
  'footer-banner': 'banner',
  'news-sidebar': 'medium',
  'general': 'medium',
};

const SIZE_ASPECT_MAP: Record<string, number> = {
  small: 300 / 250,
  medium: 728 / 90,
  large: 970 / 250,
  banner: 468 / 60,
  sidebar: 300 / 600,
  square: 1,
};

const SIZE_LABELS: Record<string, string> = {
  small: 'Small (300×250)',
  medium: 'Medium (728×90)',
  large: 'Large (970×250)',
  banner: 'Banner (468×60)',
  sidebar: 'Sidebar (300×600)',
  square: 'Square (250×250)',
};

const PLACEMENT_LABELS: Record<string, string> = {
  'blog-sidebar': 'Blog Sidebar',
  'blog-post': 'Blog Post',
  'blog-post-sidebar': 'Blog Post Sidebar',
  'home-sidebar': 'Home Sidebar',
  'top-banner': 'Top Banner (Rotating)',
  'footer-banner': 'Footer Banner (Rotating)',
  'news-sidebar': 'News Sidebar',
  'general': 'General',
};

const ITEMS_PER_PAGE = 25;

const AdsManager = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdId, setCurrentAdId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [bulkImages, setBulkImages] = useState<PendingImage[]>([]);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const { user } = useAuth();

  // Cropper state
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperImageSrc, setCropperImageSrc] = useState("");
  const [cropperTargetIndex, setCropperTargetIndex] = useState<number | null>(null);
  const [cropperFile, setCropperFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    link_url: "",
    size: "medium",
    placement: "blog-sidebar",
    is_active: true,
    display_order: 0,
  });

  useEffect(() => {
    fetchAds();
  }, []);

  // Ctrl+V paste handler scoped to dialog open
  useEffect(() => {
    if (!isDialogOpen) return;
    const handler = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            processFiles([file]);
          }
          break;
        }
      }
    };
    document.addEventListener("paste", handler);
    return () => document.removeEventListener("paste", handler);
  }, [isDialogOpen, formData.size]);

  const fetchAds = async () => {
    const { data, error } = await supabase
      .from("ads")
      .select("*")
      .order("placement", { ascending: true })
      .order("display_order", { ascending: true });

    if (error) {
      toast.error("Error fetching ads");
      return;
    }
    setAds(data || []);
  };

  const isGifFile = (file: File) => file.type === "image/gif";

  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const uploadBlob = async (blob: Blob, originalName: string): Promise<string> => {
    const ext = originalName.split('.').pop() || 'png';
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('media-library').upload(fileName, blob);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('media-library').getPublicUrl(fileName);
    return publicUrl;
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from('media-library').upload(fileName, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('media-library').getPublicUrl(fileName);
    return publicUrl;
  };

  const processFiles = useCallback(async (files: File[]) => {
    setIsBulkUploading(true);
    const uploaded: PendingImage[] = [];

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit, skipped`);
        continue;
      }

      const gif = isGifFile(file);
      if (gif) {
        // GIFs skip cropping, upload directly
        try {
          const url = await uploadFile(file);
          const title = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          uploaded.push({ url, title, isGif: true });
        } catch (err) {
          console.error(`Failed to upload ${file.name}:`, err);
          toast.error(`Failed to upload ${file.name}`);
        }
      } else {
        // Non-GIF: show cropper for first file, queue rest
        try {
          const dataUrl = await fileToDataUrl(file);
          const title = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          // Upload directly and allow cropping from preview
          const url = await uploadFile(file);
          uploaded.push({ url, title, isGif: false, file });
        } catch (err) {
          console.error(`Failed to process ${file.name}:`, err);
          toast.error(`Failed to process ${file.name}`);
        }
      }
    }

    setBulkImages(prev => [...prev, ...uploaded]);
    setIsBulkUploading(false);
    if (uploaded.length > 0) toast.success(`${uploaded.length} image(s) uploaded`);
  }, []);

  const handleBulkFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    await processFiles(Array.from(files));
    // Reset input so same files can be re-selected
    event.target.value = '';
  };

  const removeBulkImage = (index: number) => {
    setBulkImages(prev => prev.filter((_, i) => i !== index));
  };

  const openCropperForBulk = async (index: number) => {
    const img = bulkImages[index];
    if (img.isGif) {
      toast.info("GIFs cannot be cropped (animation would be lost)");
      return;
    }
    setCropperImageSrc(img.url);
    setCropperTargetIndex(index);
    setCropperFile(null);
    setCropperOpen(true);
  };

  const openCropperForEdit = () => {
    if (!formData.image_url) return;
    setCropperImageSrc(formData.image_url);
    setCropperTargetIndex(null);
    setCropperFile(null);
    setCropperOpen(true);
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    setCropperOpen(false);
    try {
      const url = await uploadBlob(croppedBlob, "cropped.png");
      if (cropperTargetIndex !== null) {
        // Update bulk image
        setBulkImages(prev => prev.map((img, i) =>
          i === cropperTargetIndex ? { ...img, url } : img
        ));
      } else {
        // Update form data (editing mode)
        setFormData(prev => ({ ...prev, image_url: url }));
      }
      toast.success("Image cropped successfully");
    } catch (err) {
      console.error("Failed to upload cropped image:", err);
      toast.error("Failed to save cropped image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing && currentAdId) {
        const { error } = await supabase
          .from("ads")
          .update(formData)
          .eq("id", currentAdId);
        if (error) throw error;
        toast.success("Ad updated successfully");
      } else if (bulkImages.length > 0) {
        if (!user?.id) throw new Error("Not authenticated");
        const adsToInsert = bulkImages.map((img, i) => ({
          title: img.title || formData.title || `Ad ${i + 1}`,
          image_url: img.url,
          link_url: formData.link_url || null,
          size: formData.size,
          placement: formData.placement,
          is_active: formData.is_active,
          display_order: formData.display_order + i,
          created_by: user.id,
        }));
        const { error } = await supabase.from("ads").insert(adsToInsert);
        if (error) throw error;
        toast.success(`${adsToInsert.length} ad(s) created successfully`);
      } else {
        const { error } = await supabase
          .from("ads")
          .insert([{ ...formData, created_by: user?.id }]);
        if (error) throw error;
        toast.success("Ad created successfully");
      }
      fetchAds();
      handleDialogClose();
    } catch (error) {
      console.error("Error saving ad:", error);
      toast.error("Error saving ad");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (ad: Ad) => {
    setFormData({
      title: ad.title,
      image_url: ad.image_url,
      link_url: ad.link_url || "",
      size: ad.size,
      placement: ad.placement,
      is_active: ad.is_active,
      display_order: ad.display_order,
    });
    setCurrentAdId(ad.id);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const deleteAdsViaBackend = async (ids: string[]) => {
    const { data, error } = await supabase.functions.invoke("banner-manager", {
      body: { action: "delete_ads", ids },
    });

    if (error) {
      throw error;
    }

    if (!data?.success) {
      throw new Error(data?.error || "Delete request failed");
    }

    return data;
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;
    setIsDeleting(true);
    try {
      await deleteAdsViaBackend([id]);
      toast.success("Ad deleted successfully");
      setAds(prev => prev.filter(ad => ad.id !== id));
      setSelectedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
    } catch (err: any) {
      console.error("Delete error:", err);
      toast.error(`Delete failed: ${err.message || 'Network or blocker issue'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} selected ad(s)?`)) return;
    setIsDeleting(true);
    try {
      const idsToDelete = Array.from(selectedIds);
      await deleteAdsViaBackend(idsToDelete);
      toast.success(`${idsToDelete.length} ad(s) deleted`);
      setAds(prev => prev.filter(ad => !selectedIds.has(ad.id)));
      setSelectedIds(new Set());
    } catch (err: any) {
      console.error("Bulk delete error:", err);
      toast.error(`Delete failed: ${err.message || 'Network or blocker issue'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === ads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(ads.map(a => a.id)));
    }
  };

  const toggleSelectGroup = (groupAds: Ad[]) => {
    const allSelected = groupAds.every(a => selectedIds.has(a.id));
    setSelectedIds(prev => {
      const n = new Set(prev);
      groupAds.forEach(a => allSelected ? n.delete(a.id) : n.add(a.id));
      return n;
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      image_url: "",
      link_url: "",
      size: "medium",
      placement: "blog-sidebar",
      is_active: true,
      display_order: 0,
    });
    setBulkImages([]);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsEditing(false);
    setCurrentAdId(null);
    resetForm();
  };

  const totalPages = Math.ceil(ads.length / ITEMS_PER_PAGE);
  const paginatedAds = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return ads.slice(start, start + ITEMS_PER_PAGE);
  }, [ads, currentPage]);

  // Group paginated ads by placement
  const groupedPaginatedAds = useMemo(() => {
    const groups: { placement: string; ads: typeof paginatedAds }[] = [];
    let currentPlacement = '';
    for (const ad of paginatedAds) {
      if (ad.placement !== currentPlacement) {
        currentPlacement = ad.placement;
        groups.push({ placement: ad.placement, ads: [ad] });
      } else {
        groups[groups.length - 1].ads.push(ad);
      }
    }
    return groups;
  }, [paginatedAds]);

  // Reset page when ads change
  useEffect(() => {
    if (currentPage > Math.ceil(ads.length / ITEMS_PER_PAGE) && ads.length > 0) {
      setCurrentPage(1);
    }
  }, [ads.length, currentPage]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ads Manager</h1>
          <p className="text-muted-foreground">Manage advertisement placements across the site ({ads.length} total)</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Ad
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Ad" : "Create New Ad"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">
                  Ad Title {bulkImages.length > 0 && <span className="text-xs text-muted-foreground">(used as prefix for bulk uploads)</span>}
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required={bulkImages.length === 0 && !formData.image_url}
                />
              </div>

              <div>
                <Label>Ad Image(s)</Label>
                <div className="flex items-center gap-2 mb-2">
                  <Clipboard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Tip: Press Ctrl+V to paste an image from clipboard</span>
                </div>

                {!isEditing && (
                  <div className="mb-3">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleBulkFileUpload}
                        disabled={isBulkUploading}
                        className="hidden"
                        id="bulk-ad-upload"
                      />
                      <label htmlFor="bulk-ad-upload" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="h-10 w-10 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {isBulkUploading ? 'Uploading...' : 'Click to upload images including GIFs (Max 5MB each)'}
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {isEditing && (
                  <>
                    <FileUpload
                      bucket="media-library"
                      onUploadComplete={(url) => setFormData({ ...formData, image_url: url })}
                      accept="image/*"
                      maxSize={5}
                    />
                    {formData.image_url && (
                      <div className="mt-2 relative group">
                        <img src={formData.image_url} alt="Preview" className="w-full max-h-48 object-cover rounded" />
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={openCropperForEdit}
                        >
                          <Crop className="w-3 h-3 mr-1" />
                          Crop
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {/* Bulk upload previews */}
                {bulkImages.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{bulkImages.length} image(s) ready</p>
                    <div className="grid grid-cols-3 gap-2">
                      {bulkImages.map((img, i) => (
                        <div key={i} className="relative group">
                          <img src={img.url} alt={img.title} className="w-full h-24 object-cover rounded border" />
                          <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!img.isGif && (
                              <button
                                type="button"
                                onClick={() => openCropperForBulk(i)}
                                className="bg-secondary text-secondary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                title="Crop"
                              >
                                <Crop className="w-3 h-3" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => removeBulkImage(i)}
                              className="bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <p className="text-xs text-muted-foreground truncate flex-1">{img.title}</p>
                            {img.isGif && <span className="text-[10px] bg-accent text-accent-foreground px-1 rounded">GIF</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="link_url">Link URL (optional)</Label>
                <Input
                  id="link_url"
                  type="url"
                  value={formData.link_url}
                  onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="placement">Placement</Label>
                  <Select value={formData.placement} onValueChange={(value) => {
                    setFormData({ ...formData, placement: value, size: PLACEMENT_SIZE_MAP[value] || 'medium' });
                  }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PLACEMENT_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                    <p className="text-xs text-muted-foreground mt-1">
                      Top/Footer banners auto-rotate when multiple ads are added.
                    </p>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="size">Size (auto-selected)</Label>
                  <Input
                    value={SIZE_LABELS[formData.size] || formData.size}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Saving..." : isEditing ? "Update Ad" : "Create Ad"}
                </Button>
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-4 p-3 bg-muted rounded-lg border border-border">
          <span className="text-sm font-medium">{selectedIds.size} selected</span>
          <Button variant="destructive" size="sm" onClick={handleBulkDelete} disabled={isDeleting}>
            <Trash2 className="w-4 h-4 mr-1" />
            {isDeleting ? 'Deleting...' : `Delete ${selectedIds.size}`}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>
            Clear selection
          </Button>
        </div>
      )}

      {/* Compact table view */}
      {ads.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={ads.length > 0 && selectedIds.size === ads.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-center">Order</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead className="text-right w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedPaginatedAds.map((group) => (
                  <React.Fragment key={`group-${group.placement}`}>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableCell className="py-2">
                        <Checkbox
                          checked={group.ads.every(a => selectedIds.has(a.id))}
                          onCheckedChange={() => toggleSelectGroup(group.ads)}
                        />
                      </TableCell>
                      <TableCell colSpan={7} className="py-2 px-4">
                        <span className="text-sm font-semibold text-foreground">
                          {PLACEMENT_LABELS[group.placement] || group.placement}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">({group.ads.length} ad{group.ads.length !== 1 ? 's' : ''})</span>
                      </TableCell>
                    </TableRow>
                    {group.ads.map((ad) => (
                    <TableRow key={ad.id} className={`group ${selectedIds.has(ad.id) ? 'bg-primary/5' : ''}`}>
                      <TableCell className="py-2">
                        <Checkbox
                          checked={selectedIds.has(ad.id)}
                          onCheckedChange={() => toggleSelect(ad.id)}
                        />
                      </TableCell>
                      <TableCell className="py-2">
                        <img src={ad.image_url} alt={ad.title} className="w-12 h-12 object-cover rounded border border-border" />
                      </TableCell>
                      <TableCell className="font-medium text-sm max-w-[180px] truncate">{ad.title}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{SIZE_LABELS[ad.size] || ad.size}</TableCell>
                      <TableCell className="text-center text-sm">{ad.display_order}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={ad.is_active ? "default" : "secondary"} className="text-xs">
                          {ad.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[150px]">
                        {ad.link_url ? (
                          <a href={ad.link_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1 truncate">
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            <span className="truncate">{new URL(ad.link_url).hostname}</span>
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(ad)}>
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(ad.id)} disabled={isDeleting}>
                            <Trash2 className="w-3.5 h-3.5 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No ads created yet. Click "Add New Ad" to get started.</p>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, ads.length)} of {ads.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Image Cropper Dialog */}
      <ImageCropper
        open={cropperOpen}
        imageSrc={cropperImageSrc}
        aspectRatio={SIZE_ASPECT_MAP[formData.size]}
        onCropComplete={handleCropComplete}
        onCancel={() => setCropperOpen(false)}
      />
    </div>
  );
};

export default AdsManager;
