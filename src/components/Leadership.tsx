import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, User } from "lucide-react";

const leaders = [
  { name: "Carol Metzger-Spack", role: "President", email: "westendca.president@gmail.com", initial: "CM" },
  { name: "Darlene Pierro", role: "Vice President", email: "westendca.vp@gmail.com", initial: "DP" },
  { name: "Louise Lovell", role: "Treasurer", email: "westendca.treasurer@gmail.com", initial: "LL" },
  { name: "Kelly Kalepe", role: "Recording Secretary", email: "westendca.recordingsecretary@gmail.com", initial: "KK" },
  { name: "Duane Rollins", role: "Corresponding Secretary", email: "", initial: "DR" },
];

const Leadership = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(scroll, 20);

    return () => clearInterval(intervalId);
  }, []);

  // Duplicate leaders array for infinite scroll effect
  const duplicatedLeaders = [...leaders, ...leaders, ...leaders];

  return (
    <div id="leadership" className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
            <span className="text-primary">OUR TEAM</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Meet Our Leadership Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dedicated volunteers working to serve and strengthen our West End community
          </p>
        </div>

        {/* Auto-scrolling carousel */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedLeaders.map((leader, index) => (
              <Card 
                key={index} 
                className="flex-shrink-0 w-[380px] hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 group"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    {/* Profile Picture */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-3xl font-bold text-primary-foreground">
                          {leader.initial}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl text-foreground mb-2 leading-tight">
                        {leader.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium mb-4 uppercase tracking-wide">
                        {leader.role}
                      </p>
                      {leader.email && (
                        <a 
                          href={`mailto:${leader.email}`}
                          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group/link px-4 py-2 bg-primary/10 rounded-lg hover:bg-primary/20"
                        >
                          <Mail className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                          <span>Contact</span>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership;