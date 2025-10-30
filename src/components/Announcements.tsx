import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, TrendingUp } from "lucide-react";

const Announcements = () => {
  return (
    <section id="announcements" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">Announcements</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground">Stay informed about what's happening in the West End</p>
          </div>

          <div className="space-y-6">
            {/* Featured Announcement */}
            <Card className="overflow-hidden shadow-lg border-2 border-primary/30 animate-fade-in">
              <div className="bg-primary/5 p-6 border-l-4 border-primary">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3">Listening Session Highlights</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Thanks to everyone who packed our Listening Session (25+ neighbors!). Keep the momentum going: 
                      take our quick survey and choose the top 3 priorities for WECA.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="hero" size="sm">
                        Take the Survey
                      </Button>
                      <span className="text-sm text-muted-foreground self-center">
                        Deadline: October 6th, 2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* General Notice */}
            <Card className="p-6 shadow-md border border-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Meeting Location Change</h3>
                  <p className="text-muted-foreground">
                    Please note: Our monthly meetings have moved to Rockville Memorial Library. 
                    See the meeting section above for details.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
