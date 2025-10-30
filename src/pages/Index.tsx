import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Meetings from "@/components/Meetings";
import Announcements from "@/components/Announcements";
import Newsletter from "@/components/Newsletter";
import Leadership from "@/components/Leadership";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Meetings />
        <Announcements />
        <Newsletter />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
