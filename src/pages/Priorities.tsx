import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopAdBanner from "@/components/TopAdBanner";
import FooterAdBanner from "@/components/FooterAdBanner";
import EventsTicker from "@/components/EventsTicker";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, FileText, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const priorities = [
  {
    title: "Deer Management by the City of Rockville",
    status: "In Progress",
    statusColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    bgColor: "bg-amber-50/50 dark:bg-amber-950/20",
    icon: Clock,
    description: "In the meeting of October 9, 2025, a possible petition was discussed. A petition is being prepared by the president to present in the November meeting.",
    details: "Working with the City of Rockville to implement effective deer management strategies that protect our community while respecting wildlife. The overpopulation of deer in our neighborhood has led to increased vehicle collisions, damage to gardens and landscaping, and potential health concerns from tick-borne diseases. We are advocating for humane and effective population control measures."
  },
  {
    title: "Zoning Creation from Town Centre Master Plan 2040",
    status: "Under Review",
    statusColor: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    bgColor: "bg-blue-50/50 dark:bg-blue-950/20",
    icon: FileText,
    description: "Working with the City of Rockville on zoning updates aligned with the 2040 master plan.",
    details: "Ensuring that zoning changes reflect the community's vision for thoughtful development and preservation of our neighborhood character. WECA is actively participating in public hearings and submitting formal comments to ensure that any new zoning regulations protect the residential nature of West End while allowing for appropriate mixed-use development in designated areas."
  },
  {
    title: "Path Identification and Request (Forest to Nelson)",
    status: "Proposed",
    statusColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    bgColor: "bg-emerald-50/50 dark:bg-emerald-950/20",
    icon: CheckCircle2,
    description: "Request to make path clear and visible from Forest to Nelson for improved pedestrian safety.",
    details: "Advocating for better signage, lighting, and maintenance of pedestrian pathways to enhance safety and accessibility for all residents. This includes working with the city to formally designate the path, install proper lighting, and ensure regular maintenance to keep it accessible year-round."
  }
];

const Priorities = () => {
  const [openPriorities, setOpenPriorities] = useState<number[]>([]);

  const togglePriority = (index: number) => {
    setOpenPriorities(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <>
      <SEO 
        title="WECA Priorities | West End Civic Association"
        description="Current priorities and initiatives of the West End Civic Association, including deer management, zoning updates, and pedestrian safety improvements."
        keywords="WECA priorities, community initiatives, deer management, zoning updates, pedestrian safety, Rockville neighborhood"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <div className="pt-20">
          <TopAdBanner />
        </div>
        
        <EventsTicker />
        
        <main className="flex-grow pt-4">
          {/* Hero Section */}
          <section className="relative py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-foreground mb-4 animate-fade-in">
                  WECA Priorities
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                  Our current focus areas and initiatives to serve the West End community
                </p>
              </div>
            </div>
          </section>

          {/* Priorities Section */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto space-y-4">
                {priorities.map((priority, index) => {
                  const Icon = priority.icon;
                  const isOpen = openPriorities.includes(index);
                  
                  return (
                    <Collapsible
                      key={index}
                      open={isOpen}
                      onOpenChange={() => togglePriority(index)}
                    >
                      <div className={`rounded-xl border transition-all duration-300 ${priority.bgColor} ${isOpen ? 'shadow-lg' : 'hover:shadow-md'}`}>
                        <CollapsibleTrigger className="w-full">
                          <div className="p-6 flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1 text-left">
                              <div className="p-3 bg-background/80 rounded-lg shadow-sm">
                                <Icon className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                  <h3 className="text-xl font-semibold">{priority.title}</h3>
                                  <Badge variant="outline" className={`${priority.statusColor} px-3 py-1 text-xs font-semibold`}>
                                    {priority.status}
                                  </Badge>
                                </div>
                                <p className="text-muted-foreground text-sm">{priority.description}</p>
                              </div>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 mt-3 ${isOpen ? 'rotate-180' : ''}`} />
                          </div>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <div className="px-6 pb-6 pt-0">
                            <div className="pl-16 border-t pt-4">
                              <p className="text-muted-foreground leading-relaxed">
                                {priority.details}
                              </p>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        
        <FooterAdBanner />
        <Footer />
      </div>
    </>
  );
};

export default Priorities;
