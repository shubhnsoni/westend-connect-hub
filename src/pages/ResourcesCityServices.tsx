import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import FooterAdBanner from "@/components/FooterAdBanner";
import EventsTicker from "@/components/EventsTicker";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, ExternalLink, Phone, MapPin, Trash2, Droplets } from "lucide-react";

const ResourcesCityServices = () => {
  return (
    <>
      <SEO 
        title="City of Rockville Resources | West End Civic Association"
        description="Access important City of Rockville services, contacts, and resources for West End residents."
        keywords="Rockville city services, city resources, Rockville government, city contacts, municipal services"
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
                <Building2 className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-4 animate-fade-in">
                  City of Rockville Resources
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Important city services, contacts, and resources for West End residents
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Quick Contacts */}
                <div>
                  <h2 className="text-2xl font-cormorant font-bold mb-4">City Contact Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Phone className="w-5 h-5 text-primary" />
                          City Hall Main Line
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-2"><strong>Phone:</strong> (240) 314-5000</p>
                        <p className="text-sm text-muted-foreground">
                          Monday - Friday: 8:30 AM - 5:00 PM
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          City Hall Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-1">111 Maryland Avenue</p>
                        <p className="mb-2">Rockville, MD 20850</p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a href="https://maps.google.com/?q=111+Maryland+Avenue+Rockville+MD" target="_blank" rel="noopener noreferrer">
                            Get Directions →
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Essential Services */}
                <div>
                  <h2 className="text-2xl font-cormorant font-bold mb-4">Essential Services</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    
                    <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Trash2 className="w-5 h-5 text-primary" />
                          Trash & Recycling
                        </CardTitle>
                        <CardDescription>
                          Collection schedules and guidelines
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg font-semibold text-primary mb-3">
                          Collection Day: Tuesday
                        </p>
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href="https://www.rockvillemd.gov/1207/Trash-Recycling" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            View Schedule
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Droplets className="w-5 h-5 text-blue-500" />
                          Water & Sewer
                        </CardTitle>
                        <CardDescription>
                          Service providers for West End
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="font-semibold">City of Rockville</p>
                          <p className="text-sm text-muted-foreground">Serves most of Rockville with water from the Potomac.</p>
                        </div>
                        <div>
                          <p className="font-semibold">WSSC Water</p>
                          <p className="text-sm text-muted-foreground">Serves some neighborhoods; check the Water Service Provider Map on the city's website to verify your provider.</p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href="https://www.wsscwater.com" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            WSSC Website
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                  </div>
                </div>

                {/* Other City Services */}
                <div>
                  <h2 className="text-2xl font-cormorant font-bold mb-4">Other City Services</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">Permits & Licenses</CardTitle>
                        <CardDescription>
                          Building permits and applications
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href="https://www.rockvillemd.gov/163/Building-Permits" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            Apply Online
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">Police (Non-Emergency)</CardTitle>
                        <CardDescription>
                          Rockville City Police
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-3"><strong>Phone:</strong> (240) 314-8900</p>
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href="https://www.rockvillemd.gov/178/Police" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            More Info
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">Code Enforcement</CardTitle>
                        <CardDescription>
                          Report violations and concerns
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-3"><strong>Phone:</strong> (240) 314-8210</p>
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href="https://www.rockvillemd.gov/FormCenter/Code-Enforcement-10/Code-Enforcement-Complaint-Form-56" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            File Complaint
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">Planning & Zoning</CardTitle>
                        <CardDescription>
                          Development and zoning information
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-3"><strong>Phone:</strong> (240) 314-8200</p>
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href="https://www.rockvillemd.gov/154/Planning-Zoning" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            Learn More
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">Parks & Recreation</CardTitle>
                        <CardDescription>
                          Community programs and facilities
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href="https://www.rockvillemd.gov/1121/Recreation" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            Explore
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">Online Forms</CardTitle>
                        <CardDescription>
                          City applications and forms
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href="https://www.rockvillemd.gov/FormCenter" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            View Forms
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                  </div>
                </div>

                {/* Emergency Information */}
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardHeader>
                    <CardTitle className="text-2xl">Emergency Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-lg"><strong>Emergency (Police/Fire/EMS):</strong> <span className="text-destructive font-bold">911</span></p>
                        <p><strong>Non-Emergency Police:</strong> (240) 314-8900</p>
                        <p><strong>Montgomery County Fire:</strong> (240) 777-2400</p>
                      </div>
                      <div>
                        <p><strong>WSSC Water Emergency:</strong> (301) 206-4002</p>
                        <p><strong>Pepco Power Outage:</strong> 1-877-737-2662</p>
                      </div>
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

export default ResourcesCityServices;
