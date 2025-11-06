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
    <div className="min-h-screen">
      <Header />
      <TopAdBanner />
      <AnnouncementBar />
      <main>
        <Hero />
        <AboutWECA />
        <QuickLinks />
        <FeaturedNews />
        <UpcomingEvents />
        <WhyWestEnd />
        <Meetings />
        <Announcements />
        <SocialFeed />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
