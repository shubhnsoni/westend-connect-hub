import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, DollarSign, Users, TrendingUp } from "lucide-react";

const SupportAdvertise = () => {
  return (
    <>
      <SEO 
        title="Advertise with WECA | West End Civic Association"
        description="Advertise with the West End Civic Association and reach our engaged community of West End residents through our newsletter and website."
        keywords="advertise WECA, community advertising, Rockville advertising, neighborhood marketing"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <div className="pt-20">
          <TopAdBanner />
        </div>
        
        <main className="flex-grow pt-8">
          {/* Hero Section */}
          <section className="relative py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <Megaphone className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-6 animate-fade-in">
                  Advertise with WECA
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Reach our engaged community of West End residents through our newsletter and website
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto space-y-8">
                
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl">Why Advertise with WECA?</CardTitle>
                    <CardDescription className="text-base">
                      Connect with a highly engaged local audience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                        <Users className="w-10 h-10 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">Active Community</h3>
                        <p className="text-sm text-muted-foreground">
                          Over 1,000 engaged residents regularly read our newsletter
                        </p>
                      </div>
                      <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                        <TrendingUp className="w-10 h-10 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">High Visibility</h3>
                        <p className="text-sm text-muted-foreground">
                          Multiple advertising placements across our website
                        </p>
                      </div>
                      <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                        <DollarSign className="w-10 h-10 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">Affordable Rates</h3>
                        <p className="text-sm text-muted-foreground">
                          Competitive pricing for local businesses and services
                        </p>
                      </div>
                    </div>

                    <div className="prose prose-sm max-w-none">
                      <h3 className="text-xl font-semibold mb-3">Advertising Opportunities</h3>
                      <ul className="space-y-2">
                        <li>Newsletter advertising (distributed to all members)</li>
                        <li>Website banner placements (homepage and key pages)</li>
                        <li>Sidebar advertisements on blog posts and news articles</li>
                        <li>Sponsored event listings and announcements</li>
                        <li>Social media promotion on our channels</li>
                      </ul>
                    </div>

                    <div className="bg-primary/5 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-3">Advertising Rates</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Newsletter Ad (Full Issue)</span>
                          <span className="text-primary font-semibold">$150</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Website Banner (Monthly)</span>
                          <span className="text-primary font-semibold">$100</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Sidebar Ad (Monthly)</span>
                          <span className="text-primary font-semibold">$75</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Package Deal (All Placements)</span>
                          <span className="text-primary font-semibold">$250/month</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <Button size="lg" className="gap-2">
                        Get Started with Advertising
                      </Button>
                      <Button size="lg" variant="outline">
                        Download Media Kit
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                    <CardDescription>
                      Ready to advertise with WECA? Get in touch to discuss your advertising needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p><strong>Email:</strong> <a href="mailto:advertising@weca.org" className="text-primary hover:underline">advertising@weca.org</a></p>
                      <p><strong>Response Time:</strong> We typically respond within 2 business days</p>
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

export default SupportAdvertise;
