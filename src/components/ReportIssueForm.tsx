import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useTranslation } from "@/hooks/useTranslation";

const issueSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional(),
  category: z.string().min(1, "Select a category"),
  location: z.string().trim().min(1, "Location is required").max(200),
  description: z.string().trim().min(10, "Please provide more detail").max(2000),
});

const categories = ["Zoning", "Safety", "Infrastructure", "Noise", "Parking", "Other"];

interface ReportIssueFormProps {
  children: React.ReactNode;
}

const ReportIssueForm = ({ children }: ReportIssueFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", category: "", location: "", description: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = issueSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("feedback").insert({
      name: form.name,
      email: form.email,
      subject: `Issue Report: ${form.category}`,
      message: `Category: ${form.category}\nLocation: ${form.location}\nPhone: ${form.phone || "N/A"}\n\n${form.description}`,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      // Sync to Mailchimp (non-blocking)
      supabase.functions.invoke('mailchimp-sync', {
        body: { type: 'feedback', data: { email: form.email, name: form.name } }
      }).catch((err) => console.log('Mailchimp sync skipped:', err));

      // Send notification emails (non-blocking)
      supabase.functions.invoke('send-notification-email', {
        body: {
          type: 'feedback',
          data: {
            name: form.name,
            email: form.email,
            message: `Category: ${form.category}\nLocation: ${form.location}\n\n${form.description}`,
            subject: `Issue Report: ${form.category}`,
          }
        }
      }).catch((err) => console.log('Notification email skipped:', err));

      setSubmitted(true);
    }
  };

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", category: "", location: "", description: "" });
      setErrors({});
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{t("Issue Reported")}</h3>
            <p className="text-muted-foreground mb-4">Thank you. We'll review your report and follow up.</p>
            <Button onClick={() => handleOpenChange(false)}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Report a Neighborhood Issue
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ri-name">{t("Name")} *</Label>
                  <Input id="ri-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="ri-email">{t("Email")} *</Label>
                  <Input id="ri-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ri-phone">{t("Phone (optional)")}</Label>
                  <Input id="ri-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <Label>{t("Category")} *</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-destructive mt-1">{errors.category}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="ri-location">{t("Location / Address")} *</Label>
                <Input id="ri-location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g., 100 block of West Montgomery Ave" />
                {errors.location && <p className="text-sm text-destructive mt-1">{errors.location}</p>}
              </div>
              <div>
                <Label htmlFor="ri-desc">{t("Description")} *</Label>
                <Textarea id="ri-desc" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the issue in detail..." />
                {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Report"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportIssueForm;
