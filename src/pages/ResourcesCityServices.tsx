import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, ExternalLink, Phone, Mail, MapPin, FileText, Trash2, Droplets } from "lucide-react";

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
        
        <main className="flex-grow pt-8">
          {/* Hero Section */}
          <section className="relative py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <Building2 className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-6 animate-fade-in">
                  City of Rockville Resources
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Important city services, contacts, and resources for West End residents
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto space-y-12">
                
                {/* Quick Contacts */}
                <div>
                  <h2 className="text-3xl font-cormorant font-bold mb-6">City Contact Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
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

                {/* City Services */}
                <div>
                  <h2 className="text-3xl font-cormorant font-bold mb-6">City Services</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <Card className="hover:shadow-lg transition-shadow">
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
                        <p className="text-sm mb-3">
                          West End collection day: <strong>Thursday</strong>
                        </p>
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href="https://www.rockvillemd.gov/1207/Trash-Recycling" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            View Schedule
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Droplets className="w-5 h-5 text-primary" />
                          Water & Sewer
                        </CardTitle>
                        <CardDescription>
                          WSSC Water information
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-1"><strong>Emergency:</strong> (301) 206-4002</p>
                        <p className="text-sm mb-3"><strong>Service:</strong> (301) 206-4001</p>
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href="https://www.wsscwater.com" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            WSSC Website
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          Permits & Licenses
                        </CardTitle>
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
                        <CardTitle>Police (Non-Emergency)</CardTitle>
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
                        <CardTitle>Code Enforcement</CardTitle>
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
                        <CardTitle>Planning & Zoning</CardTitle>
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

                  </div>
                </div>

                {/* Important Links */}
                <div>
                  <h2 className="text-3xl font-cormorant font-bold mb-6">Important City Links</h2>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-between" asChild>
                          <a href="https://www.rockvillemd.gov/AgendaCenter" target="_blank" rel="noopener noreferrer">
                            City Council Meetings
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="outline" className="justify-between" asChild>
                          <a href="https://www.rockvillemd.gov/211/Planning-Commission" target="_blank" rel="noopener noreferrer">
                            Planning Commission
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="outline" className="justify-between" asChild>
                          <a href="https://www.rockvillemd.gov/FormCenter" target="_blank" rel="noopener noreferrer">
                            Online Forms & Applications
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="outline" className="justify-between" asChild>
                          <a href="https://www.rockvillemd.gov/PayBills" target="_blank" rel="noopener noreferrer">
                            Pay Bills Online
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="outline" className="justify-between" asChild>
                          <a href="https://www.rockvillemd.gov/1121/Recreation" target="_blank" rel="noopener noreferrer">
                            Parks & Recreation
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="outline" className="justify-between" asChild>
                          <a href="https://www.rockvillemd.gov/163/Building-Permits" target="_blank" rel="noopener noreferrer">
                            Building & Permits
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Emergency Information */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-2xl">Emergency Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-lg"><strong>Emergency (Police/Fire/EMS):</strong> <span className="text-primary">911</span></p>
                      <p><strong>Non-Emergency Police:</strong> (240) 314-8900</p>
                      <p><strong>Montgomery County Fire:</strong> (240) 777-2400</p>
                      <p><strong>WSSC Water Emergency:</strong> (301) 206-4002</p>
                      <p><strong>Pepco Power Outage:</strong> 1-877-737-2662</p>
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

export default ResourcesCityServices;
