import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, CheckCircle2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

const CommunityPoll = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: poll, isLoading } = useQuery({
    queryKey: ['active-poll'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_polls')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  const hasVoted = poll ? localStorage.getItem(`poll_voted_${poll.id}`) === 'true' : false;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(hasVoted);

  const voteMutation = useMutation({
    mutationFn: async (optionIndex: number) => {
      if (!poll) return;
      const currentVotes = (poll.votes as Record<string, number>) || {};
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
      queryClient.invalidateQueries({ queryKey: ['active-poll'] });
      setShowResults(true);
      toast.success("Thank you for voting!");
    },
    onError: () => {
      toast.error("Failed to submit vote. Please try again.");
    },
  });

  if (isLoading || !poll) return null;

  const options = (poll.options as string[]) || [];
  const votes = (poll.votes as Record<string, number>) || {};
  const totalVotes = Object.values(votes).reduce((sum, v) => sum + v, 0);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium mb-4">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-primary">{t("COMMUNITY POLL")}</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground">{t(poll.question)}</h2>
          </div>

          <Card>
            <CardContent className="p-6 space-y-3">
              {options.map((option, index) => {
                const voteCount = votes[index.toString()] || 0;
                const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

                return showResults ? (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">{t(option)}</span>
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
                    <span className="text-foreground font-medium">{t(option)}</span>
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
                  {t("Submit Vote")}
                </Button>
              )}

              {showResults && (
                <p className="text-sm text-muted-foreground text-center pt-2">
                  {totalVotes} total vote{totalVotes !== 1 ? 's' : ''}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunityPoll;
