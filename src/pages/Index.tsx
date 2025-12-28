import Header from "@/components/Header";
import TopAdBanner from "@/components/TopAdBanner";
import Hero from "@/components/Hero";
import AnnouncementBar from "@/components/AnnouncementBar";
import AboutWECA from "@/components/AboutWECA";
import QuickLinks from "@/components/QuickLinks";
import FeaturedNews from "@/components/FeaturedNews";
import UpcomingEvents from "@/components/UpcomingEvents";
import Meetings from "@/components/Meetings";
import Announcements from "@/components/Announcements";
import Leadership from "@/components/Leadership";
import Footer from "@/components/Footer";
import FooterAdBanner from "@/components/FooterAdBanner";
import SectionDivider from "@/components/SectionDivider";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";

const Index = () => {
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20">
          <AnnouncementBar />
        </div>
      
      <main className="relative">
        {/* Hero - Full impact introduction */}
        <Hero />
        
        {/* Primary Actions - Immediate navigation */}
        <AnimatedSection animation="fade-up">
          <QuickLinks />
        </AnimatedSection>
        
        <SectionDivider />
        
        {/* About Section - Who we are */}
        <AnimatedSection animation="fade-up" delay={100}>
          <AboutWECA />
        </AnimatedSection>
        
        {/* Master Ad below About WECA */}
        <AnimatedSection animation="fade-in" delay={150}>
          <TopAdBanner />
        </AnimatedSection>
        
        <SectionDivider />
        
        {/* Announcements Section */}
        <AnimatedSection animation="fade-up">
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <Announcements />
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        <SectionDivider />
        
        {/* Events & Meetings - What's happening */}
        <section className="bg-muted/20 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              <AnimatedSection animation="slide-right">
                <UpcomingEvents />
              </AnimatedSection>
              <AnimatedSection animation="slide-left" delay={150}>
                <Meetings />
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        <SectionDivider />
        
        {/* Featured Content - Latest news and stories */}
        <AnimatedSection animation="fade-up">
          <FeaturedNews />
        </AnimatedSection>
        
        <SectionDivider />
        
        {/* Leadership - Meet the team */}
        <AnimatedSection animation="scale-in">
          <section className="py-16 bg-gradient-to-b from-background to-muted/30">
            <Leadership />
          </section>
        </AnimatedSection>
      </main>
      
      {/* Advertiser Ad above Footer */}
      <FooterAdBanner />
      
      <Footer />
      </div>
    </>
  );
};

export default Index;
