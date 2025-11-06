import { Card, CardContent } from "@/components/ui/card";
import { Mail, Users } from "lucide-react";

const leaders = [
  { name: "Carol Metzger-Spack", role: "President", email: "westendca.president@gmail.com" },
  { name: "Darlene Pierro", role: "Vice President", email: "westendca.vp@gmail.com" },
  { name: "Louise Lovell", role: "Treasurer", email: "westendca.treasurer@gmail.com" },
  { name: "Kelly Kalepe", role: "Recording Secretary", email: "westendca.recordingsecretary@gmail.com" },
  { name: "Duane Rollins", role: "Corresponding Secretary", email: "" },
];

const Leadership = () => {
  return (
    <div id="leadership" className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Meet Our Leadership Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated volunteers working to serve and strengthen our West End community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.map((leader, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in border-2 hover:border-primary/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-foreground mb-1 leading-tight">
                      {leader.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {leader.role}
                    </p>
                    {leader.email && (
                      <a 
                        href={`mailto:${leader.email}`}
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                      >
                        <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="truncate">Contact</span>
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
  );
};

export default Leadership;
