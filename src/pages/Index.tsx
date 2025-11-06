import Header from "@/components/Header";
import TopAdBanner from "@/components/TopAdBanner";
import Hero from "@/components/Hero";
import AnnouncementBar from "@/components/AnnouncementBar";
import AboutWECA from "@/components/AboutWECA";
import QuickLinks from "@/components/QuickLinks";
import FeaturedNews from "@/components/FeaturedNews";
import UpcomingEvents from "@/components/UpcomingEvents";
import WhyWestEnd from "@/components/WhyWestEnd";
import SocialFeed from "@/components/SocialFeed";
import Meetings from "@/components/Meetings";
import Announcements from "@/components/Announcements";
import Leadership from "@/components/Leadership";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TopAdBanner />
      <AnnouncementBar />
      
      <main className="relative">
        {/* Hero - Full impact introduction */}
        <Hero />
        
        {/* Primary Actions - Immediate navigation */}
        <QuickLinks />
        
        {/* About Section - Who we are */}
        <AboutWECA />
        
        {/* Timely Information - What's happening */}
        <section className="bg-muted/20 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              <UpcomingEvents />
              <div className="space-y-8">
                <Meetings />
                <Announcements />
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Content - Latest news and stories */}
        <FeaturedNews />
        
        {/* Why West End - Community showcase */}
        <WhyWestEnd />
        
        {/* Leadership - Meet the team */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <Leadership />
        </section>
        
        {/* Social Engagement */}
        <SocialFeed />
        
        {/* Contact - Get in touch */}
        <section className="py-20 bg-primary/5">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
