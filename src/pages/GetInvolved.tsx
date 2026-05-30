import Header from "@/components/Header";
import Footer from "@/components/Footer";

import SEO from "@/components/SEO";
import ReportIssueForm from "@/components/ReportIssueForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, ClipboardList, HelpCircle, ArrowRight, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";
import { useTranslation } from "@/hooks/useTranslation";

const iconMap: Record<string, React.ComponentType<any>> = { Users, Heart, ClipboardList, HelpCircle };

const defaultWays = [
  { icon: "Users", title: "Volunteer", description: "Join neighborhood clean-ups, event planning, and community initiatives.", link: "/get-involved/volunteer" },
  { icon: "Heart", title: "Donate", description: "Support WECA programs and community events through donations.", link: "/get-involved/donate" },
  { icon: "ClipboardList", title: "Take Surveys", description: "Share your opinions on community issues and help shape decisions.", link: "/get-involved/surveys" },
  { icon: "HelpCircle", title: "FAQ", description: "Find answers to common questions about WECA and the West End.", link: "/get-involved/faq" },
];

const GetInvolved = () => {
  const { getContent, getJSON } = usePageContent("get-involved");
  const { t } = useTranslation();

  const heroTitle = getContent('hero_title', 'Get Involved');
  const heroSubtitle = getContent('hero_subtitle', "Your voice matters. Join us in shaping the future of Rockville's West End.");
  const reportTitle = getContent('report_title', 'See Something? Report It.');
  const reportDesc = getContent('report_description', 'Report zoning, safety, infrastructure, or other neighborhood issues.');
  const ways = getJSON('ways', defaultWays);
  const ctaTitle = getContent('cta_title', 'Ready to Make a Difference?');
  const ctaDesc = getContent('cta_description', "Whether you have a few hours a month or can make a larger commitment, there's a place for you in the West End community.");
  const newsletterTitle = getContent('newsletter_title', 'Stay Connected');
  const newsletterSubtitle = getContent('newsletter_subtitle', 'Subscribe to our newsletter for updates on volunteer opportunities and community events');

  return (
    <>
      <SEO
        title="Get Involved - WECA"
        description="Join the West End community. Volunteer, donate, participate in surveys, and help shape the future of our neighborhood."
        canonicalUrl="https://westendrockvillemd.org/get-involved"
        keywords="volunteer, donate, community involvement, WECA, West End, surveys, FAQ"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20" />

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{t(heroTitle)}</h1>
            <p className="text-lg text-muted-foreground">{t(heroSubtitle)}</p>
          </div>
        </section>

        <main className="flex-1 py-16 bg-background" id="main-content">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Report an Issue */}
            <Card className="mb-10 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
              <CardContent className="flex flex-col sm:flex-row items-center gap-6 py-8">
                <AlertTriangle className="w-12 h-12 text-primary flex-shrink-0" />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-bold text-foreground mb-1">{t(reportTitle)}</h2>
                  <p className="text-muted-foreground">{t(reportDesc)}</p>
                </div>
                <ReportIssueForm>
                  <Button size="lg">{t("Report an Issue")}</Button>
                </ReportIssueForm>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {ways.map((way: any, index: number) => {
                const Icon = iconMap[way.icon] || Users;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <Icon className="w-12 h-12 text-primary mb-4" />
                      <CardTitle className="text-2xl">{t(way.title)}</CardTitle>
                      <CardDescription className="text-base">{t(way.description)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Link to={way.link} className="flex items-center gap-2">
                          {t("Learn More")}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">{t(ctaTitle)}</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{t(ctaDesc)}</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" asChild><Link to="/contact">{t("Contact Us")}</Link></Button>
                  <Button size="lg" variant="outline" asChild><Link to="/about">{t("Learn More About WECA")}</Link></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Newsletter */}
        <section className="py-16 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t(newsletterTitle)}</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">{t(newsletterSubtitle)}</p>
            <Button variant="secondary" size="lg" className="rounded-full px-8 text-base shadow-lg" asChild>
              <a href="/contact">
                {t("Subscribe to Newsletter")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default GetInvolved;
