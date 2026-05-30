import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import FooterAdBanner from "@/components/FooterAdBanner";
import EventsTicker from "@/components/EventsTicker";

import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Target, Users, Calendar, Mail, Globe, Building, Wallet } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { usePageContent } from "@/hooks/usePageContent";

const SupportContribute = () => {
  const { t } = useTranslation();
  const { getContent } = usePageContent("support-contribute");
  return (
    <>
      <SEO 
        title="Contribute to WECA | West End Civic Association"
        description="Make a contribution to support WECA's mission of enhancing quality of life in the West End neighborhood of Rockville."
        keywords="contribute WECA, support community, Rockville contribution, neighborhood support"
        canonicalUrl="https://westendrockvillemd.org/support/contribute"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <div className="pt-20">
          <TopAdBanner />
        </div>
        
        <EventsTicker />
        
        <main className="flex-grow pt-4">
          {/* Hero Section */}
          <section className="relative py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <Heart className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-4 animate-fade-in">
                  {t(getContent("hero_title", "Contribute to WECA"))}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  {t(getContent("hero_subtitle", "Your contribution helps us continue our mission of enhancing quality of life in West End"))}
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto space-y-6">
                



                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl">{t(getContent("why_heading", "Why Does Your Contribution Matter?"))}</CardTitle>
                    <CardDescription className="text-base">
                      {t(getContent("why_subheading", "All contributions support WECA priorities and initiatives"))}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {t(getContent("why_body", "The West End Civic Association is a volunteer-run non-profit organization dedicated to preserving and enhancing the quality of life in our historic neighborhood. Your contribution directly supports our Priorities, community outreach and events."))}
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                        <Target className="w-10 h-10 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">{t("Priorities")}</h3>
                        <p className="text-sm text-muted-foreground">
                          Advocacy for deer management, zoning, and pedestrian safety
                        </p>
                      </div>
                      <div className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                        <Users className="w-10 h-10 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">{t("Community Outreach")}</h3>
                        <p className="text-sm text-muted-foreground">
                          Newsletters, updates, and neighbor engagement programs
                        </p>
                      </div>
                      <div className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                        <Calendar className="w-10 h-10 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">{t("Events")}</h3>
                        <p className="text-sm text-muted-foreground">
                          Spring Fest, Fall Fest, happy hours, and community gatherings
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t(getContent("how_heading", "How Your Contributions Help"))}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 p-6 rounded-lg">
                      <h3 className="font-semibold mb-4">What It Funds</h3>
                      <p className="text-muted-foreground">
                        {t(getContent("how_body", "Communication is the largest part of WECA where it takes more than just effort on the part of the officers. From website hosting and domain fees, email list services charges (we use Mailchimp), bank fees, and event costs, your contribution ensures we are able to effectively communicate, survey and inform the neighbors of what's happening in the neighborhood and the city."))}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t(getContent("methods_heading", "How to Contribute"))}</CardTitle>
                    <CardDescription>
                      {t(getContent("methods_subheading", "Multiple ways to support WECA's mission"))}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                        <Wallet className="w-8 h-8 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-2">{t("Contribute via Zelle")}</h3>
                          <p className="text-muted-foreground mb-2">
                            Send your contribution directly to our account:
                          </p>
                          <p className="font-mono text-primary font-semibold">{getContent("zelle_email", "WECAoutreach@gmail.com")}</p>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="font-semibold mb-3">Mail Your Contribution</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Make checks payable to "West End Civic Association" and mail to:
                        </p>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="font-mono text-sm whitespace-pre-line">
                            {getContent("mail_address", "WECA Treasurer\nP.O. Box 4746\nRockville, MD 20849")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t(getContent("questions_heading", "Questions?"))}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      {t(getContent("questions_body", "Have questions about making a contribution or want to discuss other ways to support WECA?"))}
                    </p>
                    <p className="break-all sm:break-normal">
                      <strong>Email:</strong>{" "}
                      <a href="mailto:WECAoutreach@gmail.com" className="text-primary hover:underline">
                        WECAoutreach@gmail.com
                      </a>
                    </p>
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

export default SupportContribute;
