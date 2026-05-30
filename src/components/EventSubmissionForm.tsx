import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarPlus, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { useTranslation } from "@/hooks/useTranslation";

const eventSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(1000).optional(),
  start_date: z.string().min(1, "Date & time is required"),
  location: z.string().trim().max(300).optional(),
  contact_email: z.string().trim().email("Invalid email").max(255),
});

const EventSubmissionForm = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ title: "", description: "", start_date: "", location: "", contact_email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = eventSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('events').insert({
      title: result.data.title,
      description: result.data.description || null,
      start_date: new Date(result.data.start_date).toISOString(),
      location: result.data.location || null,
      submitted_by: null,
      created_by: '00000000-0000-0000-0000-000000000000',
      status: 'upcoming',
      submission_status: 'pending',
    });
    setLoading(false);

    if (error) {
      toast.error("Failed to submit event. Please try again.");
      return;
    }

    setSubmitted(true);
    toast.success("Event submitted for review!");
  };

  if (submitted) {
    return (
      <Card className="max-w-lg mx-auto text-center">
        <CardContent className="py-12">
          <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">{t("Event Submitted!")}</h3>
          <p className="text-muted-foreground">Your event has been submitted for admin review. It will appear on the calendar once approved.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarPlus className="w-5 h-5 text-primary" />
          Submit a Community Event
        </CardTitle>
        <CardDescription>Have an event to share? Submit it here and we'll add it to the calendar after review.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="event-title">{t("Event Title")} *</Label>
            <Input id="event-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Block Party on Main St" />
            {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
          </div>
          <div>
            <Label htmlFor="event-description">{t("Description")}</Label>
            <Textarea id="event-description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What's the event about?" rows={3} />
          </div>
          <div>
            <Label htmlFor="event-date">{t("Date & Time")} *</Label>
            <Input id="event-date" type="datetime-local" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} />
            {errors.start_date && <p className="text-sm text-destructive mt-1">{errors.start_date}</p>}
          </div>
          <div>
            <Label htmlFor="event-location">{t("Location")}</Label>
            <Input id="event-location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Venue or address" />
          </div>
          <div>
            <Label htmlFor="event-email">{t("Your Email")} *</Label>
            <Input id="event-email" type="email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} placeholder="you@example.com" />
            {errors.contact_email && <p className="text-sm text-destructive mt-1">{errors.contact_email}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Event for Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventSubmissionForm;
