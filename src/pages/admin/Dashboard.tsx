import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Users, MessageSquare, Mail, Bell, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatsLoadingSkeleton } from '@/components/LoadingSkeleton';

export default function Dashboard() {
  const [stats, setStats] = useState({
    blogPosts: 0,
    events: 0,
    meetings: 0,
    feedback: 0,
    subscribers: 0,
    announcements: 0,
  });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [blogCount, eventsCount, meetingsCount, feedbackCount, subscribersCount, announcementsCount] = await Promise.all([
          supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
          supabase.from('events').select('*', { count: 'exact', head: true }),
          supabase.from('meetings').select('*', { count: 'exact', head: true }),
          supabase.from('feedback').select('*', { count: 'exact', head: true }),
          supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
          supabase.from('announcements').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          blogPosts: blogCount.count || 0,
          events: eventsCount.count || 0,
          meetings: meetingsCount.count || 0,
          feedback: feedbackCount.count || 0,
          subscribers: subscribersCount.count || 0,
          announcements: announcementsCount.count || 0,
        });

        // Fetch blog views over time for chart
        const { data: viewData } = await supabase
          .from('blog_posts')
          .select('published_at, view_count')
          .eq('status', 'published')
          .order('published_at', { ascending: true })
          .limit(10);

        if (viewData) {
          const chartDataFormatted = viewData.map(post => ({
            date: new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            views: post.view_count || 0,
          }));
          setChartData(chartDataFormatted);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('dashboard-stats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, fetchStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, fetchStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'meetings' }, fetchStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'feedback' }, fetchStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'newsletter_subscribers' }, fetchStats)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, fetchStats)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const statCards = [
    { title: 'Blog Posts', value: stats.blogPosts, icon: FileText, color: 'text-blue-600' },
    { title: 'Events', value: stats.events, icon: Calendar, color: 'text-green-600' },
    { title: 'Meetings', value: stats.meetings, icon: Users, color: 'text-purple-600' },
    { title: 'Feedback', value: stats.feedback, icon: MessageSquare, color: 'text-orange-600' },
    { title: 'Subscribers', value: stats.subscribers, icon: Mail, color: 'text-pink-600' },
    { title: 'Announcements', value: stats.announcements, icon: Bell, color: 'text-yellow-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your WECA website</p>
      </div>

      {loading ? (
        <StatsLoadingSkeleton />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {statCards.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {chartData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Blog Post Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
