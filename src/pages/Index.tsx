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
        <QuickLinks />
        
        <SectionDivider />
        
        {/* About Section - Who we are */}
        <AboutWECA />
        
        {/* Master Ad below About WECA */}
        <TopAdBanner />
        
        <SectionDivider />
        
        {/* Announcements Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <Announcements />
            </div>
          </div>
        </section>
        
        <SectionDivider />
        
        {/* Events & Meetings - What's happening */}
        <section className="bg-muted/20 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              <UpcomingEvents />
              <Meetings />
            </div>
          </div>
        </section>
        
        <SectionDivider />
        
        {/* Featured Content - Latest news and stories */}
        <FeaturedNews />
        
        <SectionDivider />
        
        {/* Leadership - Meet the team */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <Leadership />
        </section>
      </main>
      
      {/* Advertiser Ad above Footer */}
      <FooterAdBanner />
      
      <Footer />
      </div>
    </>
  );
};

export default Index;
