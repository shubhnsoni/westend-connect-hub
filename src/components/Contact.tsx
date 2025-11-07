import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import FeedbackDialog from "@/components/FeedbackDialog";

const Contact = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  return (
    <div id="contact" className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            We're here to help and answer any questions you might have
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email */}
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in border-2 hover:border-primary/50">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Send us a message anytime
              </p>
              <a 
                href="mailto:WECAoutreach@gmail.com"
                className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                WECAoutreach@gmail.com
              </a>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in border-2 hover:border-primary/50" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Mailing Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                West End Civic Association<br />
                P.O. Box 1052<br />
                Rockville, MD 20849
              </p>
            </CardContent>
          </Card>

          {/* Feedback */}
          <Card className="hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in border-2 hover:border-primary/50" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Share your ideas and concerns
              </p>
              <button 
                onClick={() => setIsFeedbackOpen(true)}
                className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                Submit Feedback →
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Card className="bg-primary/5 border-2 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Want to Get Involved?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                WECA is an all-volunteer organization. We welcome neighbors who want to contribute 
                their time, ideas, and energy to make our community even better.
              </p>
              <a 
                href="mailto:WECAoutreach@gmail.com?subject=I want to volunteer"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Volunteer With Us
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <FeedbackDialog 
        open={isFeedbackOpen} 
        onOpenChange={setIsFeedbackOpen} 
      />
    </div>
  );
};

export default Contact;
