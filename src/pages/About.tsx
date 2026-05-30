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
import { usePageContent } from "@/hooks/usePageContent";
import DOMPurify from "dompurify";
import { useTranslation } from "@/hooks/useTranslation";

const iconMap: Record<string, React.ComponentType<any>> = { Heart, Handshake, Shield, Building2, Home, Trees, Users, MapPin };

const About = () => {
  const { getContent, getJSON } = usePageContent("about");
  const { t } = useTranslation();

  const heroBadge = getContent('hero_badge', 'ABOUT US');
  const heroTitle = getContent('hero_title', 'A Historic Community <br />Committed to <span class="text-primary">Neighborhood Excellence</span>');

  const defaultStats = [
    { value: "700+", label: "Acres of Community" },
    { value: "5,000", label: "Residents" },
    { value: "1,600+", label: "Households" },
    { value: "1970", label: "Formed" },
  ];
  const stats = getJSON('stats', defaultStats);

  const valuesBadge = getContent('values_badge', 'VALUES');
  const valuesTitle = getContent('values_title', 'Principled <span class="text-primary">Commitment</span>');
  const valuesDesc = getContent('values_description', 'WECA is an all-volunteer organization dedicated to keeping neighbors informed, advocating for community welfare, and fostering a welcoming neighborhood spirit.');
  const defaultValuesCards = [
    { icon: "Heart", title: "Community-Focused", description: "All-volunteer, resident-led organization dedicated to neighborhood welfare and connection." },
    { icon: "Handshake", title: "Collaborative", description: "Working together with residents and the city for community betterment." },
    { icon: "Shield", title: "Heritage Preservation", description: "Protecting and celebrating the rich historical legacy of our diverse neighborhood." },
    { icon: "Building2", title: "Thoughtful Development", description: "Advocating for responsible growth that respects neighborhood character and quality of life." },
  ];
  const valuesCards = getJSON('values_cards', defaultValuesCards);

  const historyBadge = getContent('history_badge', 'OUR STORY');
  const historyTitle = getContent('history_title', 'The History of <span class="text-secondary">West End</span>');
  const historyEarly = getContent('history_early', '<p>Parts of the West End were among the areas first settled in Rockville...</p>');
  const historyBlack = getContent('history_black', '<p>The West End is the home of Rockville\'s three original free black communities...</p>');
  const historyRailroad = getContent('history_railroad', '<p>Rockville grew slowly as a farming community until the Metropolitan Branch of the B&O Railroad arrived in 1873...</p>');
  const history20th = getContent('history_20th', '<p>The start of the new century through the mid-1900s brought a variety of residential styles...</p>');

  const whyBadge = getContent('why_badge', 'WHY WEST END');
  const whyTitle = getContent('why_title', 'Why West End?');
  const whyDesc = getContent('why_description', 'Our neighborhood blends historic charm with vibrant residential areas, including West End Park, Rose Hill, Rose Hill Falls, Chestnut Lodge, Thirty Oaks, Courthouse Walk, and other enclaves.');
  const defaultWhyCards = [
    { icon: "Home", title: "Historic Charm", description: "Beautiful heritage homes and architecture dating back to the 1700s" },
    { icon: "Trees", title: "Lush Parks", description: "Green spaces and walking trails throughout the neighborhood" },
    { icon: "Users", title: "Walkable Streets", description: "Pedestrian-friendly neighborhood design connecting community" },
    { icon: "Heart", title: "Welcoming Community", description: "Friendly neighbors and vibrant festivals year-round" },
  ];
  const whyCards = getJSON('why_cards', defaultWhyCards);
  const whyImages = [historicHomesImage, heroImage, heroImage, springfestImage];

  const missionBadge = getContent('mission_badge', 'OUR MISSION');
  const missionTitle = getContent('mission_title', 'Community <span class="text-primary">First</span>');
  const missionDesc = getContent('mission_description', '<p>WECA serves as the voice for West End residents, working to preserve our heritage, advocate for thoughtful development, and foster civic engagement. Our all-volunteer board works tirelessly to keep neighbors informed and connected.</p>');
  const missionSidebar = getContent('mission_sidebar', '<p>Since 1970, WECA has been dedicated to promoting, fostering, and protecting the interests of our community. We work to preserve the general welfare, character, and appearance of the West End while promoting cooperative activities and a friendly spirit within our neighborhood.</p>');

  const officersBadge = getContent('officers_badge', 'LEADERSHIP');
  const officersTitle = getContent('officers_title', 'Meet the <span class="text-primary">Officers</span>');
  const defaultOfficers = [
    { name: "Ajay Khetarpal", role: "President", email: "westendcapresident@gmail.com", bio: "Leading WECA with a vision for community engagement and thoughtful development." },
    { name: "Darlene Pierro", role: "Vice President", email: "westendca.vp@gmail.com", bio: "Fostering community connections and organizing events that bring neighbors together." },
    { name: "Louise Lovell", role: "Treasurer", email: "westendca.treasurer@gmail.com", bio: "Managing WECA's finances with transparency and care." },
    { name: "Duane Rollins", role: "Corresponding Secretary", email: "", bio: "Managing external communications and keeping the community informed." },
    { name: "Kelly Kalepe", role: "Recording Secretary", email: "westendca.recordingsecretary@gmail.com", bio: "Documenting WECA meetings and maintaining accurate records." },
  ];
  const officers = getJSON('officers', defaultOfficers);

  const geoOverview = getContent('geo_overview', '<p>Rockville\'s West End neighborhood comprises 700+ acres next to downtown Rockville...</p>');
  const popOverview = getContent('pop_overview', '<p>The West End had an estimated population of approximately 5,000 in 2018...</p>');

  const ctaTitle = getContent('cta_title', 'Ready to Get <span class="text-primary-foreground/90">Involved?</span>');
  const ctaDesc = getContent('cta_description', "We're here to serve the West End community. Join us at our next meeting or reach out with questions and concerns.");
  const ctaEmail = getContent('cta_email', 'WECAoutreach@gmail.com');

  const safe = (html: string) => DOMPurify.sanitize(html);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="About West End | WECA"
        description="Discover the rich history and vibrant community of Rockville's West End neighborhood - one of the city's earliest and most diverse areas."
        canonicalUrl="https://westendrockvillemd.org/about"
      />
      <Header />
      
      <div className="pt-20">
        <EventsTicker />
      </div>

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <img src={heroImage} alt="West End Neighborhood" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />
        <div className="absolute inset-0 flex items-end pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-left max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/90 border border-border rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{t(heroBadge)}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-background" dangerouslySetInnerHTML={{ __html: safe(heroTitle) }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s: any, i: number) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{t(s.value)}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">{t(s.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-sm text-primary font-semibold mb-4 uppercase tracking-wide">{t(valuesBadge)}</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: safe(valuesTitle) }} />
            <p className="text-muted-foreground">{t(valuesDesc)}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesCards.map((card: any, i: number) => {
              const Icon = iconMap[card.icon] || Heart;
              return (
                <Card key={i} className="relative border-2 hover:border-primary transition-all duration-300 group hover:shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -z-0" />
                  <CardContent className="pt-8 pb-6 relative z-10">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-lg mb-3">{t(card.title)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(card.description)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-sm text-primary-foreground font-bold mb-4 uppercase tracking-wide bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 px-4 py-2 rounded-full inline-block">{historyBadge}</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6" dangerouslySetInnerHTML={{ __html: safe(historyTitle) }} />
          </div>
          <Tabs defaultValue="early" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-primary-foreground/10">
              <TabsTrigger value="early" className="text-primary-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">{t("Early Settlement")}</TabsTrigger>
              <TabsTrigger value="black" className="text-primary-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">{t("Free Black Communities")}</TabsTrigger>
              <TabsTrigger value="railroad" className="text-primary-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">{t("Railroad Era")}</TabsTrigger>
              <TabsTrigger value="20th" className="text-primary-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">{t("20th Century")}</TabsTrigger>
            </TabsList>
            <TabsContent value="early">
              <Card className="bg-primary-foreground/95 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="pt-6 space-y-4 text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: safe(historyEarly) }} />
              </Card>
            </TabsContent>
            <TabsContent value="black">
              <Card className="bg-primary-foreground/95 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="pt-6 space-y-4 text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: safe(historyBlack) }} />
              </Card>
            </TabsContent>
            <TabsContent value="railroad">
              <Card className="bg-primary-foreground/95 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="pt-6 space-y-4 text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: safe(historyRailroad) }} />
              </Card>
            </TabsContent>
            <TabsContent value="20th">
              <Card className="bg-primary-foreground/95 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="pt-6 space-y-4 text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: safe(history20th) }} />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why West End */}
      <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
              <span className="text-primary">{t(whyBadge)}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t(whyTitle)}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t(whyDesc)}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyCards.map((card: any, i: number) => {
              const Icon = iconMap[card.icon] || Home;
              return (
                <Card key={i} className="relative overflow-hidden h-[280px] group hover:shadow-2xl transition-all duration-500 border-0">
                  <img src={whyImages[i] || heroImage} alt={card.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-foreground/30" />
                  <div className="relative h-full flex flex-col justify-end p-6 text-primary-foreground">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-primary-foreground/90 text-sm">{card.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm text-primary font-semibold mb-4 uppercase tracking-wide">{t(missionBadge)}</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: safe(missionTitle) }} />
              <div className="text-muted-foreground mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: safe(missionDesc) }} />
              <Button size="lg" className="group" asChild>
                <a href="/support/contribute">
                  {t("Get Involved")}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: safe(missionSidebar) }} />
            </div>
          </div>
        </div>
      </section>

      {/* Officers */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-sm text-primary font-semibold mb-4 uppercase tracking-wide">{t(officersBadge)}</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: safe(officersTitle) }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officers.slice(0, 3).map((officer: any, i: number) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <UserCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{t(officer.name)}</CardTitle>
                      <p className="text-sm text-primary font-semibold">{t(officer.role)}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{t(officer.bio)}</p>
                  {officer.email && (
                    <a href={`mailto:${officer.email}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <Mail className="w-4 h-4" /> Contact
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          {officers.length > 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-[calc(66.666%+0.75rem)] lg:mx-auto">
              {officers.slice(3).map((officer: any, i: number) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <UserCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{officer.name}</CardTitle>
                        <p className="text-sm text-primary font-semibold">{officer.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{officer.bio}</p>
                    {officer.email && (
                      <a href={`mailto:${officer.email}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                        <Mail className="w-4 h-4" /> Contact
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: safe(geoOverview) }} />
            </Card>
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-primary" />
                  <CardTitle>Population & Housing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: safe(popOverview) }} />
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-0 overflow-hidden">
            <CardContent className="pt-12 pb-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: safe(ctaTitle) }} />
                  <p className="text-primary-foreground/90 mb-6">{ctaDesc}</p>
                  <Button size="lg" variant="secondary" className="group" asChild>
                    <a href={`mailto:${ctaEmail}`}>
                      Contact Us
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-primary-foreground/80 mb-1">Our Email</div>
                    <div className="font-semibold">{ctaEmail}</div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/80 mb-1">Meeting Schedule</div>
                    <div className="font-semibold">
                      <a href="/events" className="hover:underline">Check our events page</a> for upcoming meetings
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/80 mb-1">{t("Get Involved")}</div>
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
