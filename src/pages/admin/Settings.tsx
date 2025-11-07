import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Settings as SettingsIcon, Globe, Mail, Palette } from 'lucide-react';

export default function Settings() {
  const queryClient = useQueryClient();

  const { data: settings = {}, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      
      const settingsObj: Record<string, any> = {};
      data.forEach(setting => {
        settingsObj[setting.key] = setting.value;
      });
      return settingsObj;
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value, description }: { key: string; value: any; description?: string }) => {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key,
          value,
          description,
          updated_by: (await supabase.auth.getUser()).data.user?.id,
        }, { onConflict: 'key' });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast.success('Settings updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update settings');
    },
  });

  const handleSave = (key: string, value: any, description?: string) => {
    updateSettingMutation.mutate({ key, value, description });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Manage your website configuration</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2">
            <Mail className="h-4 w-4" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2">
            <Palette className="h-4 w-4" />
            Social Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic site information and metadata</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="site-title">Site Title</Label>
                <Input
                  id="site-title"
                  defaultValue={settings.site_title}
                  onBlur={(e) => handleSave('site_title', e.target.value, 'Main site title')}
                />
              </div>
              <div>
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  defaultValue={settings.site_description}
                  onBlur={(e) => handleSave('site_description', e.target.value, 'Site meta description')}
                />
              </div>
              <div>
                <Label htmlFor="site-keywords">Keywords</Label>
                <Input
                  id="site-keywords"
                  placeholder="civic, association, community"
                  defaultValue={settings.site_keywords}
                  onBlur={(e) => handleSave('site_keywords', e.target.value, 'SEO keywords')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Organization contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  defaultValue={settings.contact_email}
                  onBlur={(e) => handleSave('contact_email', e.target.value, 'Contact email address')}
                />
              </div>
              <div>
                <Label htmlFor="contact-phone">Phone</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  defaultValue={settings.contact_phone}
                  onBlur={(e) => handleSave('contact_phone', e.target.value, 'Contact phone number')}
                />
              </div>
              <div>
                <Label htmlFor="contact-address">Address</Label>
                <Textarea
                  id="contact-address"
                  defaultValue={settings.contact_address}
                  onBlur={(e) => handleSave('contact_address', e.target.value, 'Physical address')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Your social media presence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  placeholder="https://facebook.com/..."
                  defaultValue={settings.social_facebook}
                  onBlur={(e) => handleSave('social_facebook', e.target.value, 'Facebook page URL')}
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter/X</Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/..."
                  defaultValue={settings.social_twitter}
                  onBlur={(e) => handleSave('social_twitter', e.target.value, 'Twitter/X profile URL')}
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  placeholder="https://instagram.com/..."
                  defaultValue={settings.social_instagram}
                  onBlur={(e) => handleSave('social_instagram', e.target.value, 'Instagram profile URL')}
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/..."
                  defaultValue={settings.social_linkedin}
                  onBlur={(e) => handleSave('social_linkedin', e.target.value, 'LinkedIn page URL')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
