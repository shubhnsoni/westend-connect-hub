import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";

const leaders = [
  { name: "Ajay Khetarpal", role: "President", email: "westendcapresident@gmail.com" },
  { name: "Darlene Pierro", role: "Vice President", email: "westendca.vp@gmail.com" },
  { name: "Louise Lovell", role: "Treasurer", email: "westendca.treasurer@gmail.com" },
  { name: "Kelly Kalepe", role: "Recording Secretary", email: "westendca.recordingsecretary@gmail.com" },
  { name: "Anika Halota", role: "VP of Outreach", email: "westendoutreach@gmail.com" },
  { name: "Duane Rollins", role: "Corresponding Secretary", email: "" },
];

const Leadership = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">Your WECA Volunteers</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground">
              Meet the dedicated volunteers leading our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((leader, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{leader.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{leader.role}</p>
                  {leader.email && (
                    <a 
                      href={`mailto:${leader.email}`}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{leader.email.split('@')[0]}</span>
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
