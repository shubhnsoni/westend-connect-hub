import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { usePageContent } from "@/hooks/usePageContent";
import { useTranslation } from "@/hooks/useTranslation";

const memberSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  address: z.string().trim().max(200).optional(),
  phone: z.string().trim().max(20).optional(),
});

const interestOptions = [
  { id: "events", label: "Community Events" },
  { id: "volunteering", label: "Volunteering" },
  { id: "newsletter", label: "Newsletter" },
  { id: "advocacy", label: "Advocacy & Zoning" },
];

const MembershipSignup = () => {
  const { getContent } = usePageContent("membership");
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", address: "", phone: "" });
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleInterest = (id: string) => {
    setInterests((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = memberSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('members').insert({
      name: result.data.name,
      email: result.data.email,
      address: result.data.address || null,
      phone: result.data.phone || null,
      interests,
    });
    setLoading(false);

    if (error) {
      if (error.code === '23505') {
        toast.error("This email is already registered.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      return;
    }

    // Sync to Mailchimp (non-blocking)
    supabase.functions.invoke('mailchimp-sync', {
      body: { type: 'contact', data: { email: result.data.email, name: result.data.name } }
    }).catch((err) => console.log('Mailchimp sync skipped:', err));

    // Send notification emails (non-blocking)
    supabase.functions.invoke('send-notification-email', {
      body: {
        type: 'contact',
        data: {
          name: result.data.name,
          email: result.data.email,
          message: `New membership registration.\nAddress: ${result.data.address || 'N/A'}\nPhone: ${result.data.phone || 'N/A'}\nInterests: ${interests.join(', ') || 'None'}`,
          subject: 'New Membership Registration',
        }
      }
    }).catch((err) => console.log('Notification email skipped:', err));

    setSubmitted(true);
    toast.success("Registration submitted successfully!");
  };

  if (submitted) {
    return (
      <>
        <SEO title="Membership - WECA" description="Become a member of the West End Civic Association." noindex />
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="pt-20" />
          <main className="flex-1 flex items-center justify-center py-16 bg-background">
            <Card className="max-w-lg mx-auto text-center">
              <CardContent className="py-16">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">{getContent('success_title', 'Thank You!')}</h2>
                <p className="text-muted-foreground">{getContent('success_message', "Your membership registration has been submitted. We'll be in touch shortly.")}</p>
                <Button className="mt-6" asChild><a href="/">Back to Home</a></Button>
              </CardContent>
            </Card>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Become a Member - WECA" description="Register as a member of the West End Civic Association." canonicalUrl="https://westendrockvillemd.org/membership" />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20" />
        
        <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{getContent('hero_title', 'Become a Member')}</h1>
            <p className="text-lg text-muted-foreground">{getContent('hero_subtitle', "Join the West End Civic Association and help shape our community's future.")}</p>
          </div>
        </section>

        <main className="flex-1 py-12 bg-background">
          <div className="container mx-auto px-4 max-w-xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><UserPlus className="w-5 h-5 text-primary" /> {getContent('form_title', 'Membership Registration')}</CardTitle>
                <CardDescription>{getContent('form_subtitle', 'Fill out the form below to register as a WECA member.')}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name">{t("Full Name")} *</Label>
                    <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">{t("Email")} *</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="address">{t("Address (optional)")}</Label>
                    <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Your street address" />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("Phone (optional)")}</Label>
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <Label className="mb-3 block">{t("Interests")}</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {interestOptions.map((option) => (
                        <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox checked={interests.includes(option.id)} onCheckedChange={() => toggleInterest(option.id)} />
                          <span className="text-sm text-foreground">{t(option.label)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Submitting..." : "Register"}
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

export default MembershipSignup;
