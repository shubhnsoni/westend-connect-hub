import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import FooterAdBanner from "@/components/FooterAdBanner";
import EventsTicker from "@/components/EventsTicker";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, Users, TrendingUp, Crown, Medal, Award } from "lucide-react";

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
        
        <EventsTicker />
        
        <main className="flex-grow pt-4">
          {/* Hero Section */}
          <section className="relative py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <Megaphone className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-4 animate-fade-in">
                  Advertise with WECA
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Reach our engaged community of West End residents through our newsletter and website
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto space-y-6">
                
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl">Why Advertise with WECA?</CardTitle>
                    <CardDescription className="text-base">
                      Connect with a highly engaged local audience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
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
                        <Megaphone className="w-10 h-10 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">Local Reach</h3>
                        <p className="text-sm text-muted-foreground">
                          Direct connection to West End neighborhood residents
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Advertising Tiers */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Platinum Tier */}
                  <Card className="relative border-2 border-primary/30 bg-gradient-to-b from-primary/5 to-background hover:shadow-xl transition-all duration-300">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">Best Value</span>
                    </div>
                    <CardHeader className="text-center pt-8">
                      <Crown className="w-12 h-12 mx-auto mb-2 text-primary" />
                      <CardTitle className="text-2xl">Platinum</CardTitle>
                      <div className="text-3xl font-bold text-primary">$650<span className="text-base font-normal text-muted-foreground">/year</span></div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>Website top of page banner ad</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>Newsletter & updates top banner ad</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>1 Sidebar ad in newsletter (No advertising in update emails)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>Meet a local business owner 5 min presentation in 2 General meetings</span>
                        </li>
                      </ul>
                      <Button className="w-full mt-6" size="lg">
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Gold Tier */}
                  <Card className="border-2 border-amber-500/30 bg-gradient-to-b from-amber-50/50 to-background dark:from-amber-950/20 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="text-center">
                      <Medal className="w-12 h-12 mx-auto mb-2 text-amber-500" />
                      <CardTitle className="text-2xl">Gold</CardTitle>
                      <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">$550<span className="text-base font-normal text-muted-foreground">/year</span></div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">✓</span>
                          <span>Website footer of page banner ad</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">✓</span>
                          <span>Newsletter & updates footer banner ad</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">✓</span>
                          <span>1 Sidebar ad in newsletter (No advertising in update emails)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">✓</span>
                          <span>Meet a local business owner 5 min presentation in one monthly meeting</span>
                        </li>
                      </ul>
                      <Button className="w-full mt-6" variant="outline" size="lg">
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Silver Tier */}
                  <Card className="border-2 border-slate-400/30 bg-gradient-to-b from-slate-50/50 to-background dark:from-slate-950/20 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="text-center">
                      <Award className="w-12 h-12 mx-auto mb-2 text-slate-500" />
                      <CardTitle className="text-2xl">Silver</CardTitle>
                      <div className="text-3xl font-bold text-slate-600 dark:text-slate-400">$350<span className="text-base font-normal text-muted-foreground">/year</span></div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-slate-500 mt-0.5">✓</span>
                          <span>1 Sidebar ad in newsletter (No advertising in update emails)</span>
                        </li>
                      </ul>
                      <Button className="w-full mt-6" variant="outline" size="lg">
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                    <CardDescription>
                      Ready to advertise with WECA? Get in touch to discuss your advertising needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p><strong>Email:</strong> <a href="mailto:WECAoutreach@gmail.com" className="text-primary hover:underline">WECAoutreach@gmail.com</a></p>
                      <p><strong>Response Time:</strong> We typically respond within 2 business days</p>
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
