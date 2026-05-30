import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import FooterAdBanner from "@/components/FooterAdBanner";
import EventsTicker from "@/components/EventsTicker";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, Users, TrendingUp, Crown, Medal, Award } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { usePageContent } from "@/hooks/usePageContent";

const ICONS: Record<string, any> = {
  users: Users,
  "trending-up": TrendingUp,
  megaphone: Megaphone,
  crown: Crown,
  medal: Medal,
  award: Award,
};

const ACCENT: Record<string, { card: string; icon: string; price: string; bullet: string; badge?: string; variant?: "default" | "outline" }> = {
  primary: {
    card: "border-2 border-primary/30 bg-gradient-to-b from-primary/5 to-background",
    icon: "text-primary",
    price: "text-primary",
    bullet: "text-primary",
    badge: "bg-primary text-primary-foreground",
    variant: "default",
  },
  amber: {
    card: "border-2 border-amber-500/30 bg-gradient-to-b from-amber-50/50 to-background dark:from-amber-950/20",
    icon: "text-amber-500",
    price: "text-amber-600 dark:text-amber-400",
    bullet: "text-amber-500",
    variant: "outline",
  },
  slate: {
    card: "border-2 border-slate-400/30 bg-gradient-to-b from-slate-50/50 to-background dark:from-slate-950/20",
    icon: "text-slate-500",
    price: "text-slate-600 dark:text-slate-400",
    bullet: "text-slate-500",
    variant: "outline",
  },
};

interface Tier {
  id: string;
  name: string;
  price_amount: string;
  price_period: string;
  badge_text: string | null;
  icon_key: string;
  accent: string;
  benefits: string[];
  cta_label: string;
  cta_url: string;
}

const SupportAdvertise = () => {
  const { t } = useTranslation();
  const { getContent, getJSON } = usePageContent("support-advertise");

  const { data: tiers = [] } = useQuery({
    queryKey: ["advertising_tiers"],
    queryFn: async () => {
      const { data, error } = await (supabase.from as any)("advertising_tiers")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data || []) as Tier[];
    },
  });

  const heroTitle = getContent("hero_title", "Advertise with WECA");
  const heroSubtitle = getContent("hero_subtitle", "Reach our engaged community of West End residents through our newsletter and website");
  const whyTitle = getContent("why_title", "Why Advertise with WECA?");
  const whyDescription = getContent("why_description", "Connect with a highly engaged local audience");
  const whyBenefits = getJSON<{ icon: string; title: string; body: string }[]>("why_benefits", []);
  const contactTitle = getContent("contact_title", "Contact Us");
  const contactDescription = getContent("contact_description", "Ready to advertise with WECA? Get in touch to discuss your advertising needs");
  const contactEmail = getContent("contact_email", "WECAoutreach@gmail.com");
  const contactResponseTime = getContent("contact_response_time", "We typically respond within 2 business days");

  return (
    <>
      <SEO
        title="Advertise with WECA | West End Civic Association"
        description="Advertise with the West End Civic Association and reach our engaged community of West End residents through our newsletter and website."
        keywords="advertise WECA, community advertising, Rockville advertising, neighborhood marketing"
        canonicalUrl="https://westendrockvillemd.org/support/advertise"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <div className="pt-20">
          <TopAdBanner />
        </div>

        <EventsTicker />

        <main className="flex-grow pt-4">
          <section className="relative py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <Megaphone className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-4 animate-fade-in">
                  {t(heroTitle)}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  {t(heroSubtitle)}
                </p>
              </div>
            </div>
          </section>

          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto space-y-6">

                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl">{t(whyTitle)}</CardTitle>
                    <CardDescription className="text-base">{t(whyDescription)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {whyBenefits.map((b, i) => {
                        const Icon = ICONS[b.icon] || Users;
                        return (
                          <div key={i} className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                            <Icon className="w-10 h-10 text-primary mb-3" />
                            <h3 className="font-semibold mb-2">{t(b.title)}</h3>
                            <p className="text-sm text-muted-foreground">{t(b.body)}</p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                  {tiers.map((tier) => {
                    const Icon = ICONS[tier.icon_key] || Award;
                    const a = ACCENT[tier.accent] || ACCENT.slate;
                    return (
                      <Card key={tier.id} className={`relative ${a.card} hover:shadow-xl transition-all duration-300`}>
                        {tier.badge_text && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className={`${a.badge} px-4 py-1 rounded-full text-sm font-semibold`}>{t(tier.badge_text)}</span>
                          </div>
                        )}
                        <CardHeader className={`text-center ${tier.badge_text ? "pt-8" : ""}`}>
                          <Icon className={`w-12 h-12 mx-auto mb-2 ${a.icon}`} />
                          <CardTitle className="text-2xl">{t(tier.name)}</CardTitle>
                          <div className={`text-3xl font-bold ${a.price}`}>
                            {tier.price_amount}
                            <span className="text-base font-normal text-muted-foreground">{tier.price_period}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3 text-sm">
                            {tier.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className={`${a.bullet} mt-0.5`}>✓</span>
                                <span>{t(benefit)}</span>
                              </li>
                            ))}
                          </ul>
                          <Button className="w-full mt-6" size="lg" variant={a.variant} asChild>
                            <a href={tier.cta_url}>{t(tier.cta_label)}</a>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>{t(contactTitle)}</CardTitle>
                    <CardDescription>{t(contactDescription)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="break-all sm:break-normal">
                        <strong>{t("Email")}:</strong>{" "}
                        <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                          {contactEmail}
                        </a>
                      </p>
                      <p><strong>{t("Response Time")}:</strong> {t(contactResponseTime)}</p>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </section>
        </main>

        <FooterAdBanner />
        <Footer />
      </div>
    </>
  );
};

export default SupportAdvertise;
