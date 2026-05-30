import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useTranslation } from "@/hooks/useTranslation";
import { usePageContent } from "@/hooks/usePageContent";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const Contact = () => {
  const { t } = useTranslation();
  const { getContent } = usePageContent("homepage");
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("feedback").insert({
        name: result.data.name,
        email: result.data.email,
        subject: "Contact Form Submission",
        message: result.data.message,
      });

      if (error) throw error;

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
            message: result.data.message,
            subject: 'Contact Form Submission',
          }
        }
      }).catch((err) => console.log('Notification email skipped:', err));

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
    } catch {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t(getContent("contact_heading", "Get In Touch"))}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t(getContent("contact_intro", "We're here to help and answer any questions you might have"))}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="border-2 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">Thank you!</h3>
                    <p className="text-muted-foreground mb-4">Your message has been sent. We'll get back to you soon.</p>
                    <Button variant="outline" onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="contact-name">{t("Name")}</Label>
                      <Input
                        id="contact-name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="contact-email">{t("Email")}</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="contact-message">{t("Message")}</Label>
                      <Textarea
                        id="contact-message"
                        placeholder="How can we help?"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in border-2 hover:border-primary/50">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{t("Email Us")}</CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="mailto:WECAoutreach@gmail.com"
                  className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  WECAoutreach@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in border-2 hover:border-primary/50" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{t("Mailing Address")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-cantata">West End</span> Civic Association<br />
                  P.O. Box 1052<br />
                  Rockville, MD 20849
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Card className="bg-primary/5 border-2 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Want to Get Involved?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                <span className="font-cantata">WECA</span> is a volunteer organization. We welcome neighbors who want to contribute their time, ideas, and energy to make our community even better.
              </p>
              <a 
                href="mailto:WECAoutreach@gmail.com?subject=I want to volunteer"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Volunteer With Us
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
