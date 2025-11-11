import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, FileText } from "lucide-react";

const priorities = [
  {
    title: "Deer Management by the City of Rockville",
    status: "In Progress",
    statusColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    icon: Clock,
    description: "In the meeting of October 9, 2025, a possible petition was discussed. A petition is being prepared by the president to present in the November meeting.",
    details: "Working with the City of Rockville to implement effective deer management strategies that protect our community while respecting wildlife."
  },
  {
    title: "Zoning Creation from Town Centre Master Plan 2040",
    status: "Under Review",
    statusColor: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    icon: FileText,
    description: "Working with the City of Rockville on zoning updates aligned with the 2040 master plan.",
    details: "Ensuring that zoning changes reflect the community's vision for thoughtful development and preservation of our neighborhood character."
  },
  {
    title: "Path Identification and Request (Forest to Nelson)",
    status: "Proposed",
    statusColor: "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20",
    icon: CheckCircle2,
    description: "Request to make path clear and visible from Forest to Nelson for improved pedestrian safety.",
    details: "Advocating for better signage, lighting, and maintenance of pedestrian pathways to enhance safety and accessibility for all residents."
  }
];

const Priorities = () => {
  return (
    <>
      <SEO 
        title="WECA Priorities | West End Civic Association"
        description="Current priorities and initiatives of the West End Civic Association, including deer management, zoning updates, and pedestrian safety improvements."
        keywords="WECA priorities, community initiatives, deer management, zoning updates, pedestrian safety, Rockville neighborhood"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <TopAdBanner />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-16 sm:py-24 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-6 animate-fade-in">
                  WECA Priorities
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Our current focus areas and initiatives to serve the West End community
                </p>
              </div>
            </div>
          </section>

          {/* Priorities Section */}
          <section className="py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto space-y-8">
                {priorities.map((priority, index) => {
                  const Icon = priority.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-2xl mb-2">{priority.title}</CardTitle>
                              <CardDescription className="text-base">{priority.description}</CardDescription>
                            </div>
                          </div>
                          <Badge variant="outline" className={`${priority.statusColor} px-4 py-1.5 text-sm font-semibold`}>
                            {priority.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {priority.details}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-cormorant font-bold text-foreground mb-4">
                  Have a Priority to Suggest?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We welcome input from community members on issues that matter to you. Contact us to share your concerns and ideas.
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact WECA
                </a>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Priorities;
