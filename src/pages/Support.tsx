import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Gift, Megaphone } from "lucide-react";

const Support = () => {
  return (
    <>
      <SEO 
        title="Support WECA | West End Civic Association"
        description="Support the West End Civic Association through advertising, event sponsorship, or direct contributions. Help us continue serving our community."
        keywords="support WECA, advertise, sponsor event, donate, community support, Rockville neighborhood"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <TopAdBanner />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-16 sm:py-24 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-6 animate-fade-in">
                  Support WECA
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Help us continue serving the West End community through advertising, sponsorship, or direct contributions
                </p>
              </div>
            </div>
          </section>

          {/* Advertise Section */}
          <section id="advertise" className="py-16 sm:py-20 scroll-mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Megaphone className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl mb-2">Advertise with Us</CardTitle>
                        <CardDescription className="text-base">
                          Reach our engaged community of West End residents
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      The West End Civic Association website connects you with thousands of engaged residents in one of Rockville's most vibrant neighborhoods. Our advertising opportunities include banner ads, sidebar placements, and featured listings in our newsletter.
                    </p>
                    
                    <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                      <h3 className="font-semibold text-lg">Available Ad Sizes:</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• <strong>Banner (728x90px)</strong> - Top of page placement</li>
                        <li>• <strong>Medium Rectangle (300x250px)</strong> - Sidebar placement</li>
                        <li>• <strong>Half Page (300x600px)</strong> - Premium sidebar</li>
                        <li>• <strong>Billboard (970x250px)</strong> - Featured placement</li>
                      </ul>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        For pricing and availability, contact our team:
                      </p>
                      <Button asChild size="lg">
                        <a href="mailto:wecaoutreach@gmail.com?subject=Advertising Inquiry">
                          Get Advertising Information
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Sponsor Section */}
          <section id="sponsor" className="py-16 sm:py-20 bg-muted/30 scroll-mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Gift className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl mb-2">Sponsor an Event</CardTitle>
                        <CardDescription className="text-base">
                          Support community gatherings and build local connections
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      WECA hosts numerous community events throughout the year, from neighborhood picnics to educational seminars. Event sponsorship is a wonderful way to show your support for the West End while gaining visibility among local residents.
                    </p>
                    
                    <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                      <h3 className="font-semibold text-lg">Sponsorship Benefits:</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Logo placement on event materials and signage</li>
                        <li>• Recognition in our newsletter and social media</li>
                        <li>• Display table or booth at the event</li>
                        <li>• Speaking opportunity at select events</li>
                        <li>• Community goodwill and brand visibility</li>
                      </ul>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        Interested in sponsoring an upcoming event?
                      </p>
                      <Button asChild size="lg">
                        <a href="mailto:wecaoutreach@gmail.com?subject=Event Sponsorship Inquiry">
                          Become an Event Sponsor
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Contribute Section */}
          <section id="contribute" className="py-16 sm:py-20 scroll-mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <DollarSign className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl mb-2">Contribute to WECA</CardTitle>
                        <CardDescription className="text-base">
                          Your donation helps us serve the community better
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Your financial support helps WECA advocate for residents, organize community events, maintain our digital presence, and preserve the character of our historic neighborhood. Every contribution makes a difference.
                    </p>
                    
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-lg border border-primary/20">
                      <h3 className="font-semibold text-xl mb-4 text-center">Make a Contribution via Zelle</h3>
                      <div className="text-center space-y-2">
                        <p className="text-muted-foreground">Send your donation to:</p>
                        <p className="text-2xl font-bold text-primary">wecaoutreach@gmail.com</p>
                        <p className="text-sm text-muted-foreground mt-4">
                          Zelle is a fast, safe, and easy way to send money directly from your bank account
                        </p>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                      <h3 className="font-semibold text-lg">Your Impact:</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Support community events and programs</li>
                        <li>• Fund advocacy efforts on behalf of residents</li>
                        <li>• Maintain our website and communication tools</li>
                        <li>• Preserve our neighborhood's heritage and character</li>
                        <li>• Enable community improvement initiatives</li>
                      </ul>
                    </div>

                    <div className="text-center pt-4">
                      <p className="text-lg font-semibold text-foreground">
                        Thank you for supporting the West End community!
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Questions? Email us at <a href="mailto:wecaoutreach@gmail.com" className="text-primary hover:underline">wecaoutreach@gmail.com</a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Support;
