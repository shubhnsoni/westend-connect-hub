import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Users, MessageSquare, Mail, Bell } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    blogPosts: 0,
    events: 0,
    meetings: 0,
    feedback: 0,
    subscribers: 0,
    announcements: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
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
    </div>
  );
}
