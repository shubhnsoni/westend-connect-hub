import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Eye, Users } from "lucide-react";
import { format } from "date-fns";

interface Opportunity {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  event_date: string | null;
  max_volunteers: number | null;
  created_at: string;
}

interface Signup {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  custom_responses: Record<string, string>;
  created_at: string;
}

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const VolunteerManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewSignupsId, setViewSignupsId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", event_date: "", max_volunteers: "" });

  const { data: opportunities = [], isLoading } = useQuery({
    queryKey: ["volunteer-opportunities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("volunteer_opportunities")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Opportunity[];
    },
  });

  const { data: signups = [] } = useQuery({
    queryKey: ["volunteer-signups", viewSignupsId],
    queryFn: async () => {
      if (!viewSignupsId) return [];
      const { data, error } = await supabase
        .from("volunteer_signups")
        .select("*")
        .eq("opportunity_id", viewSignupsId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Signup[];
    },
    enabled: !!viewSignupsId,
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("volunteer_opportunities").insert({
        title: form.title,
        slug: slugify(form.title),
        description: form.description || null,
        event_date: form.event_date || null,
        max_volunteers: form.max_volunteers ? parseInt(form.max_volunteers) : null,
        created_by: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteer-opportunities"] });
      setForm({ title: "", description: "", event_date: "", max_volunteers: "" });
      setDialogOpen(false);
      toast({ title: "Created", description: "Volunteer opportunity created." });
    },
    onError: (err: Error) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("volunteer_opportunities").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["volunteer-opportunities"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("volunteer_opportunities").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteer-opportunities"] });
      toast({ title: "Deleted" });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Volunteer Forms</h1>
          <p className="text-muted-foreground">Create and manage volunteer opportunities.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />New Opportunity</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Volunteer Opportunity</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title *</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Spring Park Clean-Up" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Event Date (optional)</Label>
                  <Input type="datetime-local" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
                </div>
                <div>
                  <Label>Max Volunteers (optional)</Label>
                  <Input type="number" value={form.max_volunteers} onChange={(e) => setForm({ ...form, max_volunteers: e.target.value })} />
                </div>
              </div>
              <Button className="w-full" onClick={() => createMutation.mutate()} disabled={!form.title || createMutation.isPending}>
                {createMutation.isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="opportunities">
        <TabsList>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="signups" disabled={!viewSignupsId}>
            Signups {viewSignupsId && `(${signups.length})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities">
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : opportunities.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-muted-foreground">No volunteer opportunities yet. Create one above.</CardContent></Card>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Event Date</TableHead>
                    <TableHead>Max</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities.map((opp) => (
                    <TableRow key={opp.id}>
                      <TableCell className="font-medium">{opp.title}</TableCell>
                      <TableCell>{opp.event_date ? format(new Date(opp.event_date), "MMM d, yyyy") : "—"}</TableCell>
                      <TableCell>{opp.max_volunteers ?? "—"}</TableCell>
                      <TableCell>
                        <Switch checked={opp.is_active} onCheckedChange={(checked) => toggleMutation.mutate({ id: opp.id, is_active: checked })} />
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setViewSignupsId(opp.id)}>
                          <Eye className="h-4 w-4 mr-1" />Signups
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(opp.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="signups">
          {viewSignupsId && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Signups for: {opportunities.find((o) => o.id === viewSignupsId)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {signups.length === 0 ? (
                  <p className="text-muted-foreground">No signups yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {signups.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell>{s.name}</TableCell>
                          <TableCell>{s.email}</TableCell>
                          <TableCell>{s.phone || "—"}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{s.message || "—"}</TableCell>
                          <TableCell>{format(new Date(s.created_at), "MMM d, yyyy")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VolunteerManager;
