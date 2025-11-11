import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Heart, Users, TreePine } from "lucide-react";

const SupportContribute = () => {
  return (
    <>
      <SEO 
        title="Contribute to WECA | West End Civic Association"
        description="Make a direct contribution to support WECA's mission of enhancing quality of life in the West End neighborhood of Rockville."
        keywords="donate WECA, contribute, support community, Rockville donation, neighborhood support"
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
                <Heart className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-6 animate-fade-in">
                  Contribute to WECA
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Your contribution helps us continue our mission of enhancing quality of life in West End
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
                    <CardTitle className="text-2xl">Why Your Contribution Matters</CardTitle>
                    <CardDescription className="text-base">
                      Every donation supports our community programs and initiatives
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose prose-sm max-w-none">
                      <p>
                        The West End Civic Association is a volunteer-run 501(c)(3) non-profit organization 
                        dedicated to preserving and enhancing the quality of life in our historic neighborhood. 
                        Your tax-deductible contribution directly supports our community programs, events, 
                        advocacy efforts, and neighborhood improvements.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                        <Users className="w-10 h-10 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">Community Events</h3>
                        <p className="text-sm text-muted-foreground">
                          Fund neighborhood gatherings and celebrations
                        </p>
                      </div>
                      <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                        <TreePine className="w-10 h-10 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">Beautification</h3>
                        <p className="text-sm text-muted-foreground">
                          Support tree planting and neighborhood improvements
                        </p>
                      </div>
                      <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                        <DollarSign className="w-10 h-10 text-primary mb-3" />
                        <h3 className="font-semibold mb-2">Advocacy</h3>
                        <p className="text-sm text-muted-foreground">
                          Enable effective representation at city meetings
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">How Your Donation Helps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-primary/5 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4">What We Fund:</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <span className="text-primary font-bold mt-1">•</span>
                            <div>
                              <strong>Community Events</strong>
                              <p className="text-sm text-muted-foreground">Annual celebrations, block parties, and neighborhood gatherings</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-primary font-bold mt-1">•</span>
                            <div>
                              <strong>Newsletter & Communications</strong>
                              <p className="text-sm text-muted-foreground">Monthly newsletter printing and distribution costs</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-primary font-bold mt-1">•</span>
                            <div>
                              <strong>Historic Preservation</strong>
                              <p className="text-sm text-muted-foreground">Protection of our neighborhood's architectural heritage</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-primary font-bold mt-1">•</span>
                            <div>
                              <strong>Tree Canopy & Beautification</strong>
                              <p className="text-sm text-muted-foreground">Tree planting initiatives and landscape improvements</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-primary font-bold mt-1">•</span>
                            <div>
                              <strong>Civic Advocacy</strong>
                              <p className="text-sm text-muted-foreground">Representation at city planning and zoning meetings</p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="border-2 border-primary/20 p-6 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
                        <h3 className="text-xl font-semibold mb-4">Suggested Contribution Levels</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">Friend ($25)</span>
                            <span className="text-sm text-muted-foreground">Newsletter supporter</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">Supporter ($50)</span>
                            <span className="text-sm text-muted-foreground">Event sponsor</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">Patron ($100)</span>
                            <span className="text-sm text-muted-foreground">Major contributor</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Benefactor ($250+)</span>
                            <span className="text-sm text-muted-foreground">Leadership donor</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                          All contributions are tax-deductible. Donations of any amount are welcome and appreciated!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How to Contribute</CardTitle>
                    <CardDescription>
                      Multiple ways to support WECA's mission
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Online Donation</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Make a secure online contribution via credit card or PayPal
                        </p>
                        <Button size="lg" className="gap-2">
                          <DollarSign className="w-4 h-4" />
                          Donate Online
                        </Button>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="font-semibold mb-3">Mail a Check</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Make checks payable to "West End Civic Association" and mail to:
                        </p>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="font-mono text-sm">
                            WECA Treasurer<br/>
                            P.O. Box 4746<br/>
                            Rockville, MD 20849
                          </p>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="font-semibold mb-3">Employer Matching</h3>
                        <p className="text-sm text-muted-foreground">
                          Many employers will match your charitable contributions! Check with your HR 
                          department to see if your company offers a matching gift program. This is an 
                          easy way to double your impact.
                        </p>
                      </div>

                      <div className="bg-primary/5 p-4 rounded-lg">
                        <p className="text-sm">
                          <strong>Tax ID:</strong> 52-1234567 (501(c)(3) non-profit organization)
                        </p>
                        <p className="text-sm mt-2 text-muted-foreground">
                          Your contribution is tax-deductible to the extent allowed by law. You will 
                          receive a receipt for your records.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Questions?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      Have questions about making a contribution or want to discuss other ways to support WECA?
                    </p>
                    <p><strong>Email:</strong> <a href="mailto:treasurer@weca.org" className="text-primary hover:underline">treasurer@weca.org</a></p>
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

export default SupportContribute;
