import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { Search, Loader2, CheckCircle, AlertTriangle, XCircle, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SEOReport {
  keyword_score: number;
  heading_score: number;
  content_score: number;
  readability_score: number;
  meta_score: number;
  overall_score: number;
  suggestions: string[];
}

const ScoreIndicator = ({ score, label }: { score: number; label: string }) => {
  const color = score >= 80 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600';
  const bgColor = score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500';
  const Icon = score >= 80 ? CheckCircle : score >= 50 ? AlertTriangle : XCircle;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className={`text-sm font-bold ${color}`}>{score}/100</span>
      </div>
      <Progress value={score} className={`h-2 [&>div]:${bgColor}`} />
    </div>
  );
};

export default function SEOAnalyzer() {
  const [selectedPostId, setSelectedPostId] = useState('');
  const [customContent, setCustomContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<SEOReport | null>(null);
  const [activeTab, setActiveTab] = useState('post');
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: posts = [] } = useQuery({
    queryKey: ['blog-posts-seo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, status')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const analyzeContent = async () => {
    let contentToAnalyze = '';
    let titleToAnalyze = '';

    if (activeTab === 'post' && selectedPostId) {
      const { data } = await supabase
        .from('blog_posts')
        .select('title, content, excerpt, tags')
        .eq('id', selectedPostId)
        .single();
      if (data) {
        titleToAnalyze = data.title;
        contentToAnalyze = `Title: ${data.title}\nExcerpt: ${data.excerpt || ''}\nTags: ${data.tags?.join(', ') || ''}\n\nContent:\n${data.content}`;
      }
    } else if (activeTab === 'custom' && customContent.trim()) {
      contentToAnalyze = customContent;
      titleToAnalyze = 'Custom Content';
    }

    if (!contentToAnalyze) {
      toast({ variant: 'destructive', title: 'No content', description: 'Select a blog post or paste content to analyze.' });
      return;
    }

    setIsAnalyzing(true);
    setReport(null);

    try {
      const { data, error } = await supabase.functions.invoke('admin-ai-assistant', {
        body: {
          action: 'seo-analyze',
          messages: [{ role: 'user', content: `Analyze this content for SEO:\n\n${contentToAnalyze}` }],
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setReport(data as SEOReport);
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Analysis failed', description: err.message });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          AI SEO Analyzer
        </h1>
        <p className="text-muted-foreground">Analyze your content for search engine optimization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Content to Analyze</CardTitle>
            <CardDescription>Select a blog post or paste custom content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="post" className="flex-1">Blog Post</TabsTrigger>
                <TabsTrigger value="custom" className="flex-1">Custom Content</TabsTrigger>
              </TabsList>

              <TabsContent value="post" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Select a Blog Post</Label>
                  <Select value={selectedPostId} onValueChange={setSelectedPostId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a post..." />
                    </SelectTrigger>
                    <SelectContent>
                      {posts.map((post) => (
                        <SelectItem key={post.id} value={post.id}>
                          {post.title} ({post.status})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Paste Content</Label>
                  <Textarea
                    value={customContent}
                    onChange={(e) => setCustomContent(e.target.value)}
                    rows={10}
                    placeholder="Paste your content here for SEO analysis..."
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button
              onClick={analyzeContent}
              disabled={isAnalyzing || (activeTab === 'post' ? !selectedPostId : !customContent.trim())}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze SEO
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Report</CardTitle>
            <CardDescription>
              {report ? 'Analysis complete' : 'Run an analysis to see results'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {report ? (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center p-6 rounded-xl bg-muted/50">
                  <div className={`text-5xl font-bold ${
                    report.overall_score >= 80 ? 'text-green-600' :
                    report.overall_score >= 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {report.overall_score}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Overall SEO Score</p>
                </div>

                {/* Individual Scores */}
                <div className="space-y-4">
                  <ScoreIndicator score={report.keyword_score} label="Keyword Usage" />
                  <ScoreIndicator score={report.heading_score} label="Heading Structure" />
                  <ScoreIndicator score={report.content_score} label="Content Length & Quality" />
                  <ScoreIndicator score={report.readability_score} label="Readability" />
                  <ScoreIndicator score={report.meta_score} label="Meta Tag Potential" />
                </div>

                {/* Suggestions */}
                {report.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Suggestions</h3>
                    <ul className="space-y-2">
                      {report.suggestions.map((suggestion, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>Select content and click "Analyze SEO" to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
