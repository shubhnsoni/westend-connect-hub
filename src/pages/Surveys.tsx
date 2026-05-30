import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, ArrowRight, BarChart3, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import { usePageContent } from "@/hooks/usePageContent";

interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: Record<string, number>;
  is_active: boolean;
  created_at: string;
}

const PollCard = ({ poll }: { poll: Poll }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const hasVoted = localStorage.getItem(`poll_voted_${poll.id}`) === 'true';
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(hasVoted);

  const voteMutation = useMutation({
    mutationFn: async (optionIndex: number) => {
      const currentVotes = poll.votes || {};
      const key = optionIndex.toString();
      const updatedVotes = { ...currentVotes, [key]: (currentVotes[key] || 0) + 1 };

      const { error } = await supabase
        .from('community_polls')
        .update({ votes: updatedVotes })
        .eq('id', poll.id);

      if (error) throw error;
      localStorage.setItem(`poll_voted_${poll.id}`, 'true');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-polls'] });
      setShowResults(true);
      toast.success("Thank you for voting!");
    },
    onError: () => {
      toast.error("Failed to submit vote. Please try again.");
    },
  });

  const options = poll.options || [];
  const votes = poll.votes || {};
  const totalVotes = Object.values(votes).reduce((sum, v) => sum + v, 0);

  return (
    <Card className="overflow-hidden">
      <div className="bg-primary/5 border-b border-primary/10 px-6 py-4">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-primary uppercase tracking-wide">Community Poll</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">{poll.question}</h3>
      </div>
      <CardContent className="p-6 space-y-3">
        {options.map((option, index) => {
          const voteCount = votes[index.toString()] || 0;
          const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

          return showResults ? (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">{option}</span>
                <span className="text-muted-foreground">{percentage}% ({voteCount})</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ) : (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedOption === index
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <span className="text-foreground font-medium">{option}</span>
            </button>
          );
        })}

        {!showResults && (
          <Button
            className="w-full mt-4"
            disabled={selectedOption === null || voteMutation.isPending}
            onClick={() => selectedOption !== null && voteMutation.mutate(selectedOption)}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Submit Vote
          </Button>
        )}

        {showResults && (
          <p className="text-sm text-muted-foreground text-center pt-2">
            {totalVotes} total vote{totalVotes !== 1 ? 's' : ''}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const Surveys = () => {
  const { t } = useTranslation();
  const { getContent } = usePageContent("surveys");
  const { data: polls, isLoading } = useQuery({
    queryKey: ['all-polls'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_polls')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map((p: any) => ({
        ...p,
        options: p.options as string[],
        votes: p.votes as Record<string, number>,
      })) as Poll[];
    },
  });

  return (
    <>
      <SEO
        title="Community Surveys & Polls - WECA"
        description="Share your opinions on community issues and help shape decisions for the West End neighborhood."
        canonicalUrl="https://westendrockvillemd.org/get-involved/surveys"
        keywords="surveys, polls, community feedback, WECA, West End"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20" />

        <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <ClipboardList className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {t(getContent("hero_title", "Community Surveys & Polls"))}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t(getContent("hero_subtitle", "Your voice matters! Share your opinions on community issues and help shape decisions for the West End."))}
            </p>
          </div>
        </section>

        <main className="flex-1 py-16 bg-background" id="main-content">
          <div className="container mx-auto px-4 max-w-3xl space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">{t(getContent("polls_heading", "Active Polls"))}</h2>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2].map(i => (
                    <Card key={i} className="h-48 animate-pulse bg-muted/50" />
                  ))}
                </div>
              ) : polls && polls.length > 0 ? (
                <div className="space-y-6">
                  {polls.map((poll) => (
                    <PollCard key={poll.id} poll={poll} />
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <BarChart3 className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">{t(getContent("empty_polls", "No active polls right now. Check back soon!"))}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="pt-8 pb-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-3">{t(getContent("cta_heading", "Want to Share More?"))}</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  {t(getContent("cta_body", "Have ideas or concerns beyond our current polls? We'd love to hear from you directly."))}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button asChild>
                    <Link to="/contact">
                      Send Us Feedback
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/get-involved">{t("Back to Get Involved")}</Link>
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

export default Surveys;
