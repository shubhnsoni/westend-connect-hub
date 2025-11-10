import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";

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

const AdsManager = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdId, setCurrentAdId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;

    const { error } = await supabase
      .from("ads")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error deleting ad");
      return;
    }

    toast.success("Ad deleted successfully");
    fetchAds();
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
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsEditing(false);
    setCurrentAdId(null);
    resetForm();
  };

  const groupedAds = ads.reduce((acc, ad) => {
    if (!acc[ad.placement]) {
      acc[ad.placement] = [];
    }
    acc[ad.placement].push(ad);
    return acc;
  }, {} as Record<string, Ad[]>);

  const placementLabels: Record<string, string> = {
    'blog-sidebar': 'Blog Sidebar',
    'blog-post': 'Blog Post',
    'home-sidebar': 'Home Sidebar',
    'general': 'General',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ads Manager</h1>
          <p className="text-muted-foreground">Manage advertisement placements across the site</p>
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
                <Label htmlFor="title">Ad Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Ad Image</Label>
                <FileUpload
                  bucket="media-library"
                  onUploadComplete={(url) => setFormData({ ...formData, image_url: url })}
                  accept="image/*"
                  maxSize={5}
                />
                {formData.image_url && (
                  <div className="mt-2">
                    <img src={formData.image_url} alt="Preview" className="w-full max-h-48 object-cover rounded" />
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
                  <Label htmlFor="size">Size</Label>
                  <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (128px)</SelectItem>
                      <SelectItem value="medium">Medium (192px)</SelectItem>
                      <SelectItem value="large">Large (256px)</SelectItem>
                      <SelectItem value="banner">Banner (160px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="placement">Placement</Label>
                  <Select value={formData.placement} onValueChange={(value) => setFormData({ ...formData, placement: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog-sidebar">Blog Sidebar</SelectItem>
                      <SelectItem value="blog-post">Blog Post</SelectItem>
                      <SelectItem value="home-sidebar">Home Sidebar</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
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

      <div className="space-y-6">
        {Object.entries(groupedAds).map(([placement, placementAds]) => (
          <div key={placement}>
            <h2 className="text-xl font-semibold mb-4">{placementLabels[placement]}</h2>
            <div className="grid gap-4">
              {placementAds.map((ad) => (
                <Card key={ad.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img src={ad.image_url} alt={ad.title} className="w-32 h-32 object-cover rounded" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{ad.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Size: {ad.size} | Order: {ad.display_order}
                            </p>
                            {ad.link_url && (
                              <a href={ad.link_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                {ad.link_url}
                              </a>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded ${ad.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {ad.is_active ? 'Active' : 'Inactive'}
                            </span>
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(ad)}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(ad.id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {ads.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No ads created yet. Click "Add New Ad" to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdsManager;
