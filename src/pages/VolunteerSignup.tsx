import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { useTranslation } from "@/hooks/useTranslation";
import { usePageContent } from "@/hooks/usePageContent";

const VolunteerSignup = () => {
  const { t } = useTranslation();
  const { getContent } = usePageContent("volunteer-signup");
  const { data: opportunities = [], isLoading } = useQuery({
    queryKey: ["volunteer-opportunities-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("volunteer_opportunities")
        .select("*")
        .eq("is_active", true)
        .order("event_date", { ascending: true, nullsFirst: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <SEO title="Volunteer Opportunities - WECA" description="Browse and sign up for volunteer opportunities with the West End Civic Association." keywords="volunteer, WECA, community, West End" canonicalUrl="https://westendrockvillemd.org/get-involved/volunteer" />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20" />

        <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{t(getContent("hero_title", "Volunteer Opportunities"))}</h1>
            <p className="text-lg text-muted-foreground">{t(getContent("hero_subtitle", "Find ways to get involved and make a difference in our community."))}</p>
          </div>
        </section>

        <main className="flex-1 py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            {isLoading ? (
              <p className="text-center text-muted-foreground">Loading opportunities...</p>
            ) : opportunities.length === 0 ? (
              <Card className="text-center p-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">{t(getContent("empty_heading", "No Opportunities Right Now"))}</h2>
                <p className="text-muted-foreground">{t(getContent("empty_body", "Check back soon for new volunteer opportunities!"))}</p>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {opportunities.map((opp) => (
                  <Card key={opp.id} className="flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl">{opp.title}</CardTitle>
                        <Badge variant="secondary">{t("Open")}</Badge>
                      </div>
                      {opp.event_date && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(opp.event_date), "MMMM d, yyyy")}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {opp.description && <p className="text-muted-foreground mb-4 flex-1">{opp.description}</p>}
                      {opp.max_volunteers && (
                        <p className="text-sm text-muted-foreground mb-4">Max {opp.max_volunteers} volunteers</p>
                      )}
                      <Button asChild className="w-full">
                        <Link to={`/get-involved/volunteer/${opp.slug}`}>
                          Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default VolunteerSignup;
