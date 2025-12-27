import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FooterAdBanner from "@/components/FooterAdBanner";
import EventsTicker from "@/components/EventsTicker";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Home, BookOpen, Heart, Shield, Handshake, Building2, ArrowRight, Mail, UserCircle, Trees } from "lucide-react";
import heroImage from "@/assets/hero-neighborhood.jpg";
import historicHomesImage from "@/assets/historic-homes.jpg";
import springfestImage from "@/assets/springfest.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="About West End | WECA"
        description="Discover the rich history and vibrant community of Rockville's West End neighborhood - one of the city's earliest and most diverse areas."
      />
      <Header />
      
      {/* Events Ticker */}
      <div className="pt-20">
        <EventsTicker />
      </div>

      {/* Hero Section with Overlay */}
      <section className="relative h-[500px] overflow-hidden">
        <img 
          src={heroImage} 
          alt="West End Neighborhood" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />
        <div className="absolute inset-0 flex items-end pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-left max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/90 border border-border rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">ABOUT US</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-background">
                A Historic Community <br />
                Committed to <span className="text-primary">Neighborhood Excellence</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
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
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Formed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-sm text-primary font-semibold mb-4 uppercase tracking-wide">VALUES</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Principled <span className="text-primary">Commitment</span>
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
                  Working together with residents and the city for community betterment.
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

      {/* Our Story Section (includes History) */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-sm text-primary-foreground font-bold mb-4 uppercase tracking-wide bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 px-4 py-2 rounded-full inline-block">OUR STORY</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
              The History of <span className="text-secondary">West End</span>
            </h2>
          </div>

          <Tabs defaultValue="early" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-primary-foreground/10">
              <TabsTrigger value="early" className="text-primary-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">Early Settlement</TabsTrigger>
              <TabsTrigger value="black" className="text-primary-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">Free Black Communities</TabsTrigger>
              <TabsTrigger value="railroad" className="text-primary-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">Railroad Era</TabsTrigger>
              <TabsTrigger value="20th" className="text-primary-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">20th Century</TabsTrigger>
            </TabsList>

            <TabsContent value="early">
              <Card className="bg-primary-foreground/95 backdrop-blur-sm border-0 shadow-xl">
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
              <Card className="bg-primary-foreground/95 backdrop-blur-sm border-0 shadow-xl">
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
              <Card className="bg-primary-foreground/95 backdrop-blur-sm border-0 shadow-xl">
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
              <Card className="bg-primary-foreground/95 backdrop-blur-sm border-0 shadow-xl">
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

      {/* Why West End Section */}
      <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
              <span className="text-primary">WHY WEST END</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why West End?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our neighborhood blends historic charm with vibrant residential areas, including West End Park, Rose Hill, Rose Hill Falls, Chestnut Lodge, Thirty Oaks, Courthouse Walk, and other enclaves.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="relative overflow-hidden h-[280px] group hover:shadow-2xl transition-all duration-500 border-0">
              <img src={historicHomesImage} alt="Historic Charm" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-foreground/30" />
              <div className="relative h-full flex flex-col justify-end p-6 text-primary-foreground">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-3">
                  <Home className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Historic Charm</h3>
                <p className="text-primary-foreground/90 text-sm">Beautiful heritage homes and architecture dating back to the 1700s</p>
              </div>
            </Card>

            <Card className="relative overflow-hidden h-[280px] group hover:shadow-2xl transition-all duration-500 border-0">
              <img src={heroImage} alt="Lush Parks" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-foreground/30" />
              <div className="relative h-full flex flex-col justify-end p-6 text-primary-foreground">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-3">
                  <Trees className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Lush Parks</h3>
                <p className="text-primary-foreground/90 text-sm">Green spaces and walking trails throughout the neighborhood</p>
              </div>
            </Card>

            <Card className="relative overflow-hidden h-[280px] group hover:shadow-2xl transition-all duration-500 border-0">
              <img src={heroImage} alt="Walkable Streets" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-foreground/30" />
              <div className="relative h-full flex flex-col justify-end p-6 text-primary-foreground">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Walkable Streets</h3>
                <p className="text-primary-foreground/90 text-sm">Pedestrian-friendly neighborhood design connecting community</p>
              </div>
            </Card>

            <Card className="relative overflow-hidden h-[280px] group hover:shadow-2xl transition-all duration-500 border-0">
              <img src={springfestImage} alt="Welcoming Community" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-foreground/30" />
              <div className="relative h-full flex flex-col justify-end p-6 text-primary-foreground">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Welcoming Community</h3>
                <p className="text-primary-foreground/90 text-sm">Friendly neighbors and vibrant festivals year-round</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm text-primary font-semibold mb-4 uppercase tracking-wide">OUR MISSION</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Community <span className="text-primary">First</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                WECA serves as the voice for West End residents, working to preserve our heritage, advocate for thoughtful development, and foster civic engagement. Our all-volunteer board works tirelessly to keep neighbors informed and connected.
              </p>
              <Button size="lg" className="group" asChild>
                <a href="/support/contribute">
                  Get Involved
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
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

      {/* Meet the Officers Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-sm text-primary font-semibold mb-4 uppercase tracking-wide">LEADERSHIP</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Meet the <span className="text-primary">Officers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* President */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <UserCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">Ajay Khetarpal</CardTitle>
                    <p className="text-sm text-primary font-semibold">President</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Leading WECA with a vision for community engagement and thoughtful development. Committed to preserving the West End's heritage while advocating for residents' interests.
                </p>
                <a href="mailto:westendcapresident@gmail.com" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </CardContent>
            </Card>

            {/* Vice President */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <UserCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">Darlene Pierro</CardTitle>
                    <p className="text-sm text-primary font-semibold">Vice President</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Fostering community connections and organizing events that bring neighbors together. Passionate about maintaining the West End's welcoming spirit.
                </p>
                <a href="mailto:westendca.vp@gmail.com" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </CardContent>
            </Card>

            {/* Treasurer */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <UserCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">Louise Lovell</CardTitle>
                    <p className="text-sm text-primary font-semibold">Treasurer</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Managing WECA's finances with transparency and care. Ensuring resources are used effectively for community benefit.
                </p>
                <a href="mailto:westendca.treasurer@gmail.com" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </CardContent>
            </Card>

            {/* Corresponding Secretary */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <UserCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">Duane Rollins</CardTitle>
                    <p className="text-sm text-primary font-semibold">Corresponding Secretary</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Managing external communications and keeping the community informed about important updates and opportunities.
                </p>
              </CardContent>
            </Card>

            {/* Recording Secretary */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <UserCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">Kelly Kalepe</CardTitle>
                    <p className="text-sm text-primary font-semibold">Recording Secretary</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Documenting WECA meetings and maintaining accurate records of our community's decisions and discussions.
                </p>
                <a href="mailto:westendca.recordingsecretary@gmail.com" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </CardContent>
            </Card>

            {/* 2nd VP Outreach - Seeking */}
            <Card className="hover:shadow-lg transition-shadow border-2 border-dashed border-primary/50 bg-primary/5">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <UserCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">Open Position</CardTitle>
                    <p className="text-sm text-primary font-semibold">2nd VP Outreach</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  We're looking for a dedicated volunteer to serve as 2nd VP of Outreach. Help us expand community engagement and connection.
                </p>
                <Button asChild size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <a href="mailto:WECAoutreach@gmail.com?subject=Interest in 2nd VP Outreach Position">
                    Express Interest
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Neighborhood Overview */}
      <section className="py-16 bg-background">
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

      {/* CTA Section */}
      <section className="py-16 bg-background">
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
                  <Button size="lg" variant="secondary" className="group" asChild>
                    <a href="mailto:WECAoutreach@gmail.com">
                      Contact Us
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-primary-foreground/80 mb-1">Our Email</div>
                    <div className="font-semibold">WECAoutreach@gmail.com</div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/80 mb-1">Meeting Schedule</div>
                    <div className="font-semibold">
                      <a href="/events" className="hover:underline">Check our events page</a> for upcoming meetings
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/80 mb-1">Get Involved</div>
                    <div className="font-semibold">
                      <a href="/support/contribute" className="hover:underline">Contribute to WECA</a> | <a href="/priorities" className="hover:underline">View Priorities</a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <FooterAdBanner />
      <Footer />
    </div>
  );
};

export default About;
