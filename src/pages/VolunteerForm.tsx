import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Users, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";
import { useTranslation } from "@/hooks/useTranslation";
import { usePageContent } from "@/hooks/usePageContent";

const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().max(1000).optional(),
});

const VolunteerForm = () => {
  const { t } = useTranslation();
  const { getContent } = usePageContent("volunteer-form");
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: opportunity, isLoading } = useQuery({
    queryKey: ["volunteer-opportunity", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("volunteer_opportunities")
        .select("*")
        .eq("slug", slug!)
        .eq("is_active", true)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = signupSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("volunteer_signups").insert({
      opportunity_id: opportunity!.id,
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.message || null,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      setSubmitted(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20" />
        <main className="flex-1 flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></main>
        <Footer />
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20" />
        <main className="flex-1 flex items-center justify-center py-16">
          <Card className="max-w-md text-center p-8">
            <h2 className="text-2xl font-bold mb-2">{t("Not Found")}</h2>
            <p className="text-muted-foreground mb-4">This volunteer opportunity is no longer available.</p>
            <Button asChild><Link to="/get-involved/volunteer">View All Opportunities</Link></Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (submitted) {
    return (
      <>
        <SEO title={`Thank You - ${opportunity.title} | WECA`} description="Thank you for volunteering." noindex />
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="pt-20" />
          <main className="flex-1 flex items-center justify-center py-16 bg-background">
            <Card className="max-w-md text-center p-8">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">{t(getContent("thank_you_heading", "Thank You!"))}</h2>
              <p className="text-muted-foreground">{t(getContent("thank_you_body", "Thanks for signing up. We'll be in touch soon."))} <strong>{opportunity.title}</strong></p>
              <Button className="mt-6" asChild><Link to="/get-involved/volunteer">Back to Opportunities</Link></Button>
            </Card>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title={`${opportunity.title} - Volunteer | WECA`} description={opportunity.description || `Sign up to volunteer for ${opportunity.title}.`} canonicalUrl={`https://westendrockvillemd.org/volunteer/${slug}`} />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20" />

        <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{opportunity.title}</h1>
            {opportunity.description && <p className="text-lg text-muted-foreground mb-4">{opportunity.description}</p>}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              {opportunity.event_date && (
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{format(new Date(opportunity.event_date), "MMMM d, yyyy")}</span>
              )}
              {opportunity.max_volunteers && (
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />Max {opportunity.max_volunteers} volunteers</span>
              )}
            </div>
          </div>
        </section>

        <main className="flex-1 py-16 bg-background">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardHeader><CardTitle>{t(getContent("form_heading", "Sign Up"))}</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t("Name")} *</Label>
                      <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">{t("Email")} *</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("Phone (optional)")}</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="message">{t("Additional Notes")}</Label>
                    <Textarea id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us anything else..." />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Submitting..." : t(getContent("submit_label", "Sign Up to Volunteer"))}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default VolunteerForm;
