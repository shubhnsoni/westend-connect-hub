import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Home, BookOpen, ScrollText, Heart, Shield, Handshake, Building2, ArrowRight, FileText } from "lucide-react";
import heroImage from "@/assets/hero-neighborhood.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="About West End | WECA"
        description="Discover the rich history and vibrant community of Rockville's West End neighborhood - one of the city's earliest and most diverse areas."
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-muted/30 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">ABOUT US</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              A Historic Community <br />
              Committed to <span className="text-primary">Neighborhood Excellence</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={heroImage} 
              alt="West End Neighborhood" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">700+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Acres of Community</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5,000</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Residents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1,600+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Households</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1970</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">WECA Founded</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-sm text-primary font-semibold mb-4 uppercase tracking-wide">VALUES</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              We Operate with Unwavering <span className="text-primary">Commitment</span> & Integrity
            </h2>
            <p className="text-muted-foreground">
              WECA is an all-volunteer organization dedicated to keeping neighbors informed, 
              advocating for community welfare, and fostering a welcoming neighborhood spirit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="relative border-2 hover:border-primary transition-all duration-300 group hover:shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -z-0" />
              <CardContent className="pt-8 pb-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Heart className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-3">Community-Focused</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All-volunteer, resident-led organization dedicated to neighborhood welfare and connection.
                </p>
              </CardContent>
            </Card>

            <Card className="relative border-2 hover:border-primary transition-all duration-300 group hover:shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -z-0" />
              <CardContent className="pt-8 pb-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Handshake className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-3">Collaborative</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Working together with residents, city officials, and stakeholders for community betterment.
                </p>
              </CardContent>
            </Card>

            <Card className="relative border-2 hover:border-primary transition-all duration-300 group hover:shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -z-0" />
              <CardContent className="pt-8 pb-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Shield className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-3">Heritage Preservation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Protecting and celebrating the rich historical legacy of our diverse neighborhood.
                </p>
              </CardContent>
            </Card>

            <Card className="relative border-2 hover:border-primary transition-all duration-300 group hover:shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -z-0" />
              <CardContent className="pt-8 pb-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Building2 className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-3">Thoughtful Development</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Advocating for responsible growth that respects neighborhood character and quality of life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section with Background */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-sm text-primary-foreground font-bold mb-4 uppercase tracking-wide bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 px-4 py-2 rounded-full inline-block">OUR STORY</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
              Here's How the <span className="text-secondary">West End</span> Got Started
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-primary-foreground/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-secondary font-bold">01</span>
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Home className="w-6 h-6 text-secondary-foreground" />
                  </div>
                </div>
                <CardTitle className="text-xl">The Beginning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Parts of the West End were among the areas first settled in Rockville. The Beall family settled here in the late 1770s, with their homestead built in 1815.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 md:mt-8">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-secondary font-bold">02</span>
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Users className="w-6 h-6 text-secondary-foreground" />
                  </div>
                </div>
                <CardTitle className="text-xl">Community Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The B&O Railroad arrived in 1873, spurring growth and attracting Washington residents to Rockville's healthy climate as a summer resort destination.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-secondary font-bold">03</span>
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-secondary-foreground" />
                  </div>
                </div>
                <CardTitle className="text-xl">Modern Era</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  WECA was founded in 1970 to preserve the neighborhood's heritage while advocating for thoughtful development and community welfare.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm text-primary font-semibold mb-4 uppercase tracking-wide">OUR MISSION</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                We Always Put <span className="text-primary">Our Community's</span> Interests First
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                WECA serves as the voice for West End residents, working to preserve our heritage, advocate for thoughtful development, and foster civic engagement. Our all-volunteer board works tirelessly to keep neighbors informed and connected.
              </p>
              <Button size="lg" className="group">
                Get Involved
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Since 1970, WECA has been dedicated to promoting, fostering, and protecting the interests of our community. We work to preserve the general welfare, character, and appearance of the West End while promoting cooperative activities and a friendly spirit within our neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Tabs Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-sm text-primary font-semibold mb-4 uppercase tracking-wide">HISTORY</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Explore Our <span className="text-primary">Rich Heritage</span>
            </h2>
          </div>

          <Tabs defaultValue="early" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="early">Early Settlement</TabsTrigger>
              <TabsTrigger value="black">Free Black Communities</TabsTrigger>
              <TabsTrigger value="railroad">Railroad Era</TabsTrigger>
              <TabsTrigger value="20th">20th Century</TabsTrigger>
            </TabsList>

            <TabsContent value="early">
              <Card>
                <CardContent className="pt-6 space-y-4 text-foreground leading-relaxed">
                  <p>
                    Parts of the West End were among the areas first settled in Rockville. The neighborhood encompasses part of the 1784 "Williamsburgh" tract of 200 acres surveyed by William Prather Williams that was later subdivided into 85 lots along Wood Lane, Middle Lane, Commerce Lane (Montgomery Avenue), and Jefferson Street.
                  </p>
                  <p>
                    In the late 1770s, the Beall family settled on land near what is now North Adams Street. The family homestead was built in 1815 and extended well to the north to Martins Lane. This Beall-Dawson house still exists at 103 West Montgomery Avenue. The house and grounds have been owned by the City of Rockville since 1965 and are occupied by the Montgomery County Historical Society.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="black">
              <Card>
                <CardContent className="pt-6 space-y-4 text-foreground leading-relaxed">
                  <p>
                    The West End is the home of Rockville's three original free black communities. The Bealls sold numerous small parcels of their land to freed slaves and other African American families, notably along Martins Lane and Middle Lane.
                  </p>
                  <p>
                    The north side of Martins Lane had been farmed in the 1830s by Samuel Martin, a free black person. Many descendants of these original families still reside along Martins Lane. The community is known as Haiti and contains the historic Haiti Cemetery, the earliest known cemetery for black residents of Rockville.
                  </p>
                  <p>
                    Another community was established near Great Falls Road and Maryland Avenue by three free African American women and one man who purchased contiguous properties. Notable historic properties include the Bessie Hill House (602 Great Falls Road) and the Kelley House at Maryland Avenue and Great Falls Road.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="railroad">
              <Card>
                <CardContent className="pt-6 space-y-4 text-foreground leading-relaxed">
                  <p>
                    Rockville grew slowly as a farming community until the Metropolitan Branch of the B&O Railroad arrived in 1873. The railroad provided a new gateway to Washington, DC and spurred the creation of a summer resort, attracting Washington residents to Rockville's "healthy" climate.
                  </p>
                  <p>
                    Several large houses in the West End became boarding houses and the Woodlawn Hotel (opened 1889 and later became Chestnut Lodge Hospital) was constructed on West Montgomery Avenue – one of three grand hotels in the area. The Woodlawn was Rockville's premier destination during the town's heyday as a summer resort.
                  </p>
                  <p>
                    Prompted by Rockville's growing reputation, farmland was subdivided by developers. The most ambitious was West End Park by Henry N. Copp around 1890, designed with diagonal streets, connecting circles, and large lots. The traffic circles at Mannakee Street and Beall Avenue endure from this original design.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="20th">
              <Card>
                <CardContent className="pt-6 space-y-4 text-foreground leading-relaxed">
                  <p>
                    The start of the new century through the mid-1900s brought a variety of residential styles. Bungalows, Craftsman, Colonial Revival, and Cape Cod styles were commonly constructed. The gradual development gives the West End its eclectic mix of architectural styles.
                  </p>
                  <p>
                    This patchwork development pattern and variety of architectural styles creates a unique neighborhood reflecting the evolution of small towns in America from the late 1800s into the 21st century. Large ornate Victorian houses that "provide the flavor of the historic district" stand alongside modern homes.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Neighborhood Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  <CardTitle>Geographic Overview</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Rockville's West End neighborhood comprises 700+ acres next to downtown Rockville. The area is generally bordered on the west by I-270, on the north by Nelson Street, on the east by Rockville Town Center, and on the south by Maryland Avenue.
                </p>
                <p>
                  In addition to the historic West End area, the community includes the neighborhoods of Rose Hill, Rose Hill Falls, Chestnut Lodge, Thirty Oaks, and Courthouse Walk development.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-primary" />
                  <CardTitle>Population & Housing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The West End had an estimated population of approximately 5,000 in 2018, consisting of over 1,600 households. The area remains predominantly residential with most single-unit detached homes zoned either R-60 or R-90.
                </p>
                <p>
                  There are mixes of single-unit detached houses and townhouses in Rose Hill and Rose Hill Falls, plus Courthouse Walk and Cambridge Cluster. Average household size is 3.1 persons.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quote/Testimonial Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="pt-8 pb-8">
              <div className="text-6xl text-primary-foreground/20 mb-4">"</div>
              <blockquote className="text-xl sm:text-2xl font-medium mb-6 leading-relaxed">
                Our purpose is to promote, foster and protect the interests of the West End community, preserve the general welfare and character of our neighborhood, and promote a cooperative and friendly spirit within our community.
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <ScrollText className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">WECA Charter</div>
                  <div className="text-sm text-primary-foreground/80">Est. 1970</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Charter and Bylaws Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-sm text-primary font-semibold mb-4 uppercase tracking-wide">GOVERNANCE</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Charter & <span className="text-primary">By-Laws</span>
            </h2>
            <p className="text-muted-foreground">Last updated: May 9, 2024</p>
          </div>

          <Tabs defaultValue="charter" className="w-full">
            <TabsList className="inline-flex h-auto w-full justify-center gap-4 bg-transparent p-0 mb-10">
              <TabsTrigger 
                value="charter" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-background border-2 border-border data-[state=active]:border-primary px-8 py-4 rounded-lg font-semibold text-base hover:border-primary/50 transition-all"
              >
                <ScrollText className="w-5 h-5 mr-2" />
                Charter
              </TabsTrigger>
              <TabsTrigger 
                value="bylaws"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-background border-2 border-border data-[state=active]:border-primary px-8 py-4 rounded-lg font-semibold text-base hover:border-primary/50 transition-all"
              >
                <FileText className="w-5 h-5 mr-2" />
                By-Laws
              </TabsTrigger>
            </TabsList>

            <TabsContent value="charter">
              <Card className="border-2 shadow-lg">
                <CardContent className="pt-8 pb-8 space-y-8 text-foreground">
                  <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary">
                    <p className="leading-relaxed text-base">
                      The residents of that part of the city of Rockville, Montgomery County, Maryland, known as the West End, do hereby establish and adopt this Charter pertaining to the organization and operation of a non-profit civic association which will concern itself with those problems and interests which properly are and should be the subject of the community as a whole.
                    </p>
                  </div>

                  {/* Article I - Name */}
                  <div className="bg-background p-6 rounded-lg border-2 border-border">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">I</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-3 text-foreground">Name</h4>
                        <p className="text-muted-foreground">The name of this organization shall be the West End Civic Association and shall hereinafter be referred to as the Association.</p>
                      </div>
                    </div>
                  </div>

                  {/* Article II - Membership */}
                  <div className="bg-background p-6 rounded-lg border-2 border-border">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">II</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-3 text-foreground">Membership</h4>
                        <p className="mb-4 text-muted-foreground">Membership in this Association shall include all adult residents (18 years of age and over) of the West End area of the City of Rockville, as defined by the attached map.</p>
                        
                        <div className="bg-muted/30 p-4 rounded-md">
                          <p className="font-semibold mb-2 text-foreground">Section 1. Boundaries</p>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            The geographical areas shown in the attached map encompassed by the Association are defined to include: West End Park, Beall Subdivision, Rockville Heights, Roxboro, Martins Lane Complex, Monument Triangle, Rose Hill Falls, Rose Hill, Court House Walk.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Article III - Purpose */}
                  <div className="bg-background p-6 rounded-lg border-2 border-border">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">III</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-3 text-foreground">Purpose</h4>
                        <p className="mb-3 text-muted-foreground">The purposes for which this Association is formed are:</p>
                        <ul className="space-y-2">
                          <li className="flex gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-muted-foreground">To promote, foster and protect the interests of the community known as the West End and its environs, as well as the City of Rockville as a whole.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-muted-foreground">To forward, promote and preserve the general welfare, character, and appearance of the community and to improve by any and all lawful and proper means its status and condition.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-muted-foreground">To promote cooperative activities and friendly spirit within the community.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Article IV - Nature */}
                  <div className="bg-background p-6 rounded-lg border-2 border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">IV</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-3 text-foreground">Nature</h4>
                        <p className="text-muted-foreground">The operations carried out by the Association shall NOT be for profit and no part of the assets of the organization shall inure to the benefit of any member or individual.</p>
                      </div>
                    </div>
                  </div>

                  {/* Article V - Organization */}
                  <div className="bg-background p-6 rounded-lg border-2 border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">V</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-3 text-foreground">Organization</h4>
                        <p className="mb-4 text-muted-foreground">The affairs of this Association shall be managed by an Executive Board.</p>
                        
                        <div className="space-y-3">
                          <div className="bg-muted/30 p-4 rounded-md">
                            <p className="font-semibold mb-2 text-foreground">Section 1. Membership</p>
                            <p className="text-sm text-muted-foreground">The Executive Board shall be comprised of the six elected officers of the Association, who will serve for a term of one year (June 1 to May 31), together with appointed Block Captains and appointed chairs of standing or special committees and the most current past president.</p>
                          </div>
                          
                          <div className="bg-muted/30 p-4 rounded-md">
                            <p className="font-semibold mb-2 text-foreground">Section 2. Duties</p>
                            <p className="text-sm text-muted-foreground">There shall be vested in the Executive Board a general power of supervision over the affairs of the Association.</p>
                          </div>
                          
                          <div className="bg-muted/30 p-4 rounded-md">
                            <p className="font-semibold mb-2 text-foreground">Section 3. Officers and their duties</p>
                            <p className="text-sm text-muted-foreground">The officers of this Association shall consist of a president, a vice president, a second vice president, a recording secretary, a corresponding secretary, and a treasurer.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remaining Articles Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-background p-6 rounded-lg border-2 border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">VI</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 text-foreground">Block Captains</h4>
                          <p className="text-sm text-muted-foreground">For the purposes of representation in the Association, the community shall be divided into block areas as determined by the Executive Board with each block area represented by a Block Captain.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">VII</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 text-foreground">Standing and Special Committee</h4>
                          <p className="text-sm text-muted-foreground">Standing and special committees of the Association will be established by the Executive Board as needed.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">VIII</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 text-foreground">Amendments</h4>
                          <p className="text-sm text-muted-foreground">A proposed amendment to the Charter may be submitted to the general membership by a petition signed by 25 members or by a majority vote of the Executive Board. A two-thirds vote of members present is required to adopt amendments.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">IX</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 text-foreground">Adoption of Charter</h4>
                          <p className="text-sm text-muted-foreground">This Charter shall be effective when adopted by a two-thirds vote of the members of the Association at a meeting scheduled for the adoption of the Charter.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bylaws">
              <Card className="border-2 shadow-lg">
                <CardContent className="pt-8 pb-8 space-y-8 text-foreground">
                  {/* Article I */}
                  <div className="bg-background p-6 rounded-lg border-2 border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">I</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-3 text-foreground">Membership</h4>
                        <p className="text-muted-foreground">Any resident of the Association area who is over eighteen (18) years of age is a member of the Association by virtue of residence.</p>
                      </div>
                    </div>
                  </div>

                  {/* Article II - Meetings */}
                  <div className="bg-background p-6 rounded-lg border-2 border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">II</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-4 text-foreground">Meetings</h4>
                        
                        <div className="space-y-4">
                          <div className="bg-muted/30 p-4 rounded-md">
                            <p className="font-semibold mb-2 text-foreground">Section 1. Executive Board</p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-muted-foreground">The Executive Board shall conduct regular meetings at least once each quarter of the year.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-muted-foreground">Special Executive Board meetings may be called by the President or by nine (9) members of the Executive Board.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-muted-foreground">Each member of the Executive Board present at a meeting shall be entitled to one vote. No proxy votes shall be permitted.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-muted-foreground">A quorum shall consist of at least nine (9) members of the Executive Board, at least two of whom must be elected officers.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-muted-foreground">All Executive Board meetings shall be open for general membership attendance.</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="bg-muted/30 p-4 rounded-md">
                            <p className="font-semibold mb-2 text-foreground">Section 2. General Association</p>
                            <p className="text-sm text-muted-foreground">General Meetings shall be advertised to all members of the Association and shall be held no less than twice during the period from September through May of each calendar year.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remaining Articles in Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-background p-6 rounded-lg border-2 border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">III</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 text-foreground">Voting</h4>
                          <p className="text-sm text-muted-foreground">Each member of the Association present at a duly convened meeting shall have one vote. No proxy votes will be permitted.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">IV</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 text-foreground">Election</h4>
                          <p className="text-sm mb-2 text-muted-foreground">Key election provisions:</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span className="text-muted-foreground">A nominating committee shall be appointed by the President in March.</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span className="text-muted-foreground">Officers shall be elected annually at the last meeting in May.</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span className="text-muted-foreground">Any member of the Association shall be eligible for election to any office.</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span className="text-muted-foreground">No person may serve as president for more than four (4) consecutive years.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">V</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 text-foreground">Duties of Block Captains</h4>
                          <p className="text-sm mb-2 text-muted-foreground">Block Captains are responsible for:</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span className="text-muted-foreground">Dissemination of the semi-annual WECA newsletter and other information to their assigned block area.</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span className="text-muted-foreground">Providing a channel for membership to express opinions to the Executive Board.</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span className="text-muted-foreground">When directed, seeking signatures to petitions endorsed by the Executive Board.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">VI</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 text-foreground">Association Representation</h4>
                          <p className="text-sm text-muted-foreground">No person shall represent the Association unless duly authorized by the President, the Executive Board, by the By-Laws, or by resolution of the members.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">VII</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 text-foreground">Accounts and Finance</h4>
                          <p className="text-sm text-muted-foreground">The President may authorize routine expenditures. The Executive Board may authorize expenditures for approved projects. No expenditure may exceed funds in the treasury.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">VIII</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 text-foreground">Removal from Office</h4>
                          <p className="text-sm text-muted-foreground">Any officer or member of the Executive Board may be removed by a two-thirds vote of the general membership at a meeting called for that purpose.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-border md:col-span-2">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold">IX</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 text-foreground">Amendments</h4>
                          <p className="text-sm text-muted-foreground">These By-Laws may be amended by a two-thirds vote of the members present at a meeting.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-0 overflow-hidden">
            <CardContent className="pt-12 pb-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Ready to Get <span className="text-primary-foreground/90">Involved?</span>
                  </h2>
                  <p className="text-primary-foreground/90 mb-6">
                    We're here to serve the West End community. Join us at our next meeting or reach out with questions and concerns.
                  </p>
                  <Button size="lg" variant="secondary" className="group">
                    Contact Us
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-primary-foreground/80 mb-1">Our Email</div>
                    <div className="font-semibold">info@westendrockville.org</div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/80 mb-1">Meeting Schedule</div>
                    <div className="font-semibold">Check our events page for upcoming meetings</div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/80 mb-1">Join Newsletter</div>
                    <div className="font-semibold">Stay informed about community updates</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
