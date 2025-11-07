import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, ClipboardList, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const GetInvolved = () => {
  const ways = [
    {
      icon: Users,
      title: "Volunteer",
      description: "Join neighborhood clean-ups, event planning, and community initiatives.",
      link: "/get-involved/volunteer",
      color: "text-primary"
    },
    {
      icon: Heart,
      title: "Donate",
      description: "Support WECA programs and community events through donations.",
      link: "/get-involved/donate",
      color: "text-secondary"
    },
    {
      icon: ClipboardList,
      title: "Take Surveys",
      description: "Share your opinions on community issues and help shape decisions.",
      link: "/get-involved/surveys",
      color: "text-accent"
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Find answers to common questions about WECA and the West End.",
      link: "/get-involved/faq",
      color: "text-muted-foreground"
    }
  ];

  return (
    <>
      <SEO
        title="Get Involved - WECA"
        description="Join the West End community. Volunteer, donate, participate in surveys, and help shape the future of our neighborhood."
        keywords="volunteer, donate, community involvement, WECA, West End, surveys, FAQ"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20">
          <Breadcrumb />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Get Involved
            </h1>
            <p className="text-lg text-muted-foreground">
              Your voice matters. Join us in shaping the future of Rockville's West End.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="flex-1 py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {ways.map((way, index) => {
                const Icon = way.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <Icon className={`w-12 h-12 ${way.color} mb-4`} />
                      <CardTitle className="text-2xl">{way.title}</CardTitle>
                      <CardDescription className="text-base">{way.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Link to={way.link} className="flex items-center gap-2">
                          Learn More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA Section */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ready to Make a Difference?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Whether you have a few hours a month or can make a larger commitment, 
                  there's a place for you in the West End community.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/about/board">Meet the Board</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default GetInvolved;
