import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Bell, Mail, MessageSquare, Users, Send, Shield } from 'lucide-react';
import type { Json } from '@/integrations/supabase/types';

interface NotificationSettings {
  // Feedback emails
  feedback_user_confirmation: boolean;
  feedback_admin_notification: boolean;
  // Newsletter emails
  newsletter_user_welcome: boolean;
  newsletter_admin_notification: boolean;
  // Contact form emails
  contact_user_confirmation: boolean;
  contact_admin_notification: boolean;
}

const defaultSettings: NotificationSettings = {
  feedback_user_confirmation: true,
  feedback_admin_notification: true,
  newsletter_user_welcome: true,
  newsletter_admin_notification: true,
  contact_user_confirmation: true,
  contact_admin_notification: true,
};

export default function NotificationSettings() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['notification-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'notification_settings')
        .maybeSingle();

      if (error) throw error;
      if (data?.value && typeof data.value === 'object' && !Array.isArray(data.value)) {
        return { ...defaultSettings, ...(data.value as Record<string, boolean>) } as NotificationSettings;
      }
      return defaultSettings;
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: NotificationSettings) => {
      const userId = (await supabase.auth.getUser()).data.user?.id;
      
      // Convert to Json compatible type
      const jsonValue: Json = {
        feedback_user_confirmation: newSettings.feedback_user_confirmation,
        feedback_admin_notification: newSettings.feedback_admin_notification,
        newsletter_user_welcome: newSettings.newsletter_user_welcome,
        newsletter_admin_notification: newSettings.newsletter_admin_notification,
        contact_user_confirmation: newSettings.contact_user_confirmation,
        contact_admin_notification: newSettings.contact_admin_notification,
      };
      
      // Check if setting exists
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('key', 'notification_settings')
        .maybeSingle();

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('site_settings')
          .update({
            value: jsonValue,
            updated_by: userId,
          })
          .eq('key', 'notification_settings');
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('site_settings')
          .insert([{
            key: 'notification_settings',
            value: jsonValue,
            description: 'Email notification toggle settings',
            updated_by: userId,
          }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-settings'] });
      toast.success('Notification settings updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update settings');
    },
  });

  const handleToggle = (key: keyof NotificationSettings) => {
    if (!settings) return;
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    updateSettingsMutation.mutate(newSettings);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading notification settings...</div>;
  }

  const currentSettings = settings || defaultSettings;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bell className="h-8 w-8" />
          Notification Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Control which email notifications are sent automatically
        </p>
      </div>

      {/* Quick Status Overview */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${currentSettings.feedback_user_confirmation || currentSettings.feedback_admin_notification ? 'bg-green-500' : 'bg-muted-foreground'}`} />
              <span className="text-sm">Feedback Emails</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${currentSettings.newsletter_user_welcome || currentSettings.newsletter_admin_notification ? 'bg-green-500' : 'bg-muted-foreground'}`} />
              <span className="text-sm">Newsletter Emails</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${currentSettings.contact_user_confirmation || currentSettings.contact_admin_notification ? 'bg-green-500' : 'bg-muted-foreground'}`} />
              <span className="text-sm">Contact Emails</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Feedback Submissions
          </CardTitle>
          <CardDescription>
            Emails sent when someone submits feedback through the website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="feedback-user" className="flex items-center gap-2">
                <Send className="h-4 w-4 text-muted-foreground" />
                User Confirmation Email
              </Label>
              <p className="text-sm text-muted-foreground">
                Send a "thank you" confirmation to the person who submitted feedback
              </p>
            </div>
            <Switch
              id="feedback-user"
              checked={currentSettings.feedback_user_confirmation}
              onCheckedChange={() => handleToggle('feedback_user_confirmation')}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="feedback-admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                Admin Notification
                <Badge variant="secondary" className="text-xs">Recommended</Badge>
              </Label>
              <p className="text-sm text-muted-foreground">
                Notify admin when new feedback is received
              </p>
            </div>
            <Switch
              id="feedback-admin"
              checked={currentSettings.feedback_admin_notification}
              onCheckedChange={() => handleToggle('feedback_admin_notification')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Newsletter Signups
          </CardTitle>
          <CardDescription>
            Emails sent when someone subscribes to the newsletter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="newsletter-user" className="flex items-center gap-2">
                <Send className="h-4 w-4 text-muted-foreground" />
                Welcome Email
                <Badge variant="secondary" className="text-xs">Recommended</Badge>
              </Label>
              <p className="text-sm text-muted-foreground">
                Send a welcome email to new subscribers
              </p>
            </div>
            <Switch
              id="newsletter-user"
              checked={currentSettings.newsletter_user_welcome}
              onCheckedChange={() => handleToggle('newsletter_user_welcome')}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="newsletter-admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                Admin Notification
              </Label>
              <p className="text-sm text-muted-foreground">
                Notify admin when someone subscribes
              </p>
            </div>
            <Switch
              id="newsletter-admin"
              checked={currentSettings.newsletter_admin_notification}
              onCheckedChange={() => handleToggle('newsletter_admin_notification')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Form Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Contact Form
          </CardTitle>
          <CardDescription>
            Emails sent when someone uses the contact form
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="contact-user" className="flex items-center gap-2">
                <Send className="h-4 w-4 text-muted-foreground" />
                User Confirmation Email
              </Label>
              <p className="text-sm text-muted-foreground">
                Send confirmation that their message was received
              </p>
            </div>
            <Switch
              id="contact-user"
              checked={currentSettings.contact_user_confirmation}
              onCheckedChange={() => handleToggle('contact_user_confirmation')}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="contact-admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                Admin Notification
                <Badge variant="secondary" className="text-xs">Recommended</Badge>
              </Label>
              <p className="text-sm text-muted-foreground">
                Notify admin when a contact message is received
              </p>
            </div>
            <Switch
              id="contact-admin"
              checked={currentSettings.contact_admin_notification}
              onCheckedChange={() => handleToggle('contact_admin_notification')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Mail className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Email Service Required
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                These notifications require the RESEND_API_KEY to be configured. 
                Toggles will be saved but emails won't send until the API key is set up.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
