import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface EmailRequest {
  type: 'feedback' | 'newsletter' | 'contact';
  data: {
    name: string;
    email: string;
    message?: string;
    subject?: string;
    firstName?: string;
    lastName?: string;
  };
}

interface NotificationSettings {
  feedback_user_confirmation: boolean;
  feedback_admin_notification: boolean;
  newsletter_user_welcome: boolean;
  newsletter_admin_notification: boolean;
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

async function getNotificationSettings(supabaseUrl: string, supabaseKey: string): Promise<NotificationSettings> {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'notification_settings')
      .maybeSingle();

    if (error || !data?.value) {
      return defaultSettings;
    }

    return { ...defaultSettings, ...(data.value as Partial<NotificationSettings>) };
  } catch {
    return defaultSettings;
  }
}

const getEmailTemplates = (type: string, data: EmailRequest['data'], adminEmail: string) => {
  switch (type) {
    case 'feedback':
      return {
        userSubject: 'Thank you for your feedback - WECA',
        userHtml: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2d5a27;">Thank You for Your Feedback!</h2>
            <p>Dear ${data.name},</p>
            <p>We've received your feedback and appreciate you taking the time to share your thoughts with us.</p>
            <p>A member of our team will review your message and get back to you if a response is needed.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #666; font-size: 12px;">
              West End Civic Association<br />
              P.O. Box 1052, Rockville, MD 20849<br />
              <a href="mailto:${adminEmail}">${adminEmail}</a>
            </p>
          </div>
        `,
        adminSubject: `New Feedback Submission from ${data.name}`,
        adminHtml: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2d5a27;">New Feedback Received</h2>
            <p><strong>From:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject || 'Website Feedback'}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.message}</p>
          </div>
        `,
      };
    
    case 'newsletter':
      return {
        userSubject: 'Welcome to the WECA Newsletter!',
        userHtml: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2d5a27;">Welcome to WECA!</h2>
            <p>Dear ${data.firstName || data.name},</p>
            <p>Thank you for subscribing to the West End Civic Association newsletter!</p>
            <p>You'll now receive updates about:</p>
            <ul>
              <li>Community events and gatherings</li>
              <li>WECA meetings and announcements</li>
              <li>Local news and updates</li>
              <li>Volunteer opportunities</li>
            </ul>
            <p>We're excited to have you as part of our community!</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #666; font-size: 12px;">
              West End Civic Association<br />
              P.O. Box 1052, Rockville, MD 20849<br />
              <a href="mailto:${adminEmail}">${adminEmail}</a>
            </p>
          </div>
        `,
        adminSubject: `New Newsletter Subscriber: ${data.name}`,
        adminHtml: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2d5a27;">New Newsletter Subscriber</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
          </div>
        `,
      };
    
    case 'contact':
      return {
        userSubject: 'We received your message - WECA',
        userHtml: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2d5a27;">Thank You for Contacting Us!</h2>
            <p>Dear ${data.name},</p>
            <p>We've received your message and will get back to you as soon as possible.</p>
            <p>If your inquiry is urgent, feel free to reach us directly at <a href="mailto:${adminEmail}">${adminEmail}</a>.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #666; font-size: 12px;">
              West End Civic Association<br />
              P.O. Box 1052, Rockville, MD 20849
            </p>
          </div>
        `,
        adminSubject: `New Contact Form Submission from ${data.name}`,
        adminHtml: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2d5a27;">New Contact Form Submission</h2>
            <p><strong>From:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject || 'General Inquiry'}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.message}</p>
          </div>
        `,
      };
    
    default:
      throw new Error('Invalid email type');
  }
};

function getSettingsKeys(type: string): { userKey: keyof NotificationSettings; adminKey: keyof NotificationSettings } {
  switch (type) {
    case 'feedback':
      return { userKey: 'feedback_user_confirmation', adminKey: 'feedback_admin_notification' };
    case 'newsletter':
      return { userKey: 'newsletter_user_welcome', adminKey: 'newsletter_admin_notification' };
    case 'contact':
      return { userKey: 'contact_user_confirmation', adminKey: 'contact_admin_notification' };
    default:
      return { userKey: 'feedback_user_confirmation', adminKey: 'feedback_admin_notification' };
  }
}

async function sendEmailViaResend(
  apiKey: string,
  to: string,
  subject: string,
  html: string,
  fromName: string = 'WECA'
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${fromName} <onboarding@resend.dev>`,
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Failed to send email' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const adminEmail = Deno.env.get('GMAIL_USER') || 'WECAoutreach@gmail.com';
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!resendApiKey) {
      console.log('Resend API key not configured - skipping email send');
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Email service not configured',
        skipped: true 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { type, data }: EmailRequest = await req.json();

    if (!type || !data || !data.email || !data.name) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch notification settings from database
    const settings = await getNotificationSettings(supabaseUrl!, supabaseKey!);
    const settingsKeys = getSettingsKeys(type);

    const shouldSendUserEmail = settings[settingsKeys.userKey];
    const shouldSendAdminEmail = settings[settingsKeys.adminKey];

    console.log(`Notification settings for ${type}:`, { 
      sendToUser: shouldSendUserEmail, 
      sendToAdmin: shouldSendAdminEmail 
    });

    // If both are disabled, skip sending
    if (!shouldSendUserEmail && !shouldSendAdminEmail) {
      console.log(`All ${type} notifications are disabled - skipping`);
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Notifications disabled for this type',
        skipped: true 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const templates = getEmailTemplates(type, data, adminEmail);
    let userResult: { success: boolean; error?: string } = { success: false, error: 'Disabled' };
    let adminResult: { success: boolean; error?: string } = { success: false, error: 'Disabled' };

    // Send confirmation email to user (if enabled)
    if (shouldSendUserEmail) {
      userResult = await sendEmailViaResend(
        resendApiKey,
        data.email,
        templates.userSubject,
        templates.userHtml,
        'West End Civic Association'
      );

      if (!userResult.success) {
        console.error('Failed to send user email:', userResult.error);
      } else {
        console.log(`User confirmation email sent to ${data.email}`);
      }
    } else {
      console.log('User email disabled - skipping');
    }

    // Send notification email to admin (if enabled)
    if (shouldSendAdminEmail) {
      adminResult = await sendEmailViaResend(
        resendApiKey,
        adminEmail,
        templates.adminSubject,
        templates.adminHtml,
        'WECA Website'
      );

      if (!adminResult.success) {
        console.error('Failed to send admin email:', adminResult.error);
      } else {
        console.log(`Admin notification email sent for ${type}`);
      }
    } else {
      console.log('Admin email disabled - skipping');
    }

    // Return success if at least one enabled email was sent
    const anyEnabled = shouldSendUserEmail || shouldSendAdminEmail;
    const anySent = (shouldSendUserEmail && userResult.success) || (shouldSendAdminEmail && adminResult.success);

    if (anySent || !anyEnabled) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Emails processed successfully',
          userEmailSent: shouldSendUserEmail && userResult.success,
          adminEmailSent: shouldSendAdminEmail && adminResult.success,
          userEmailEnabled: shouldSendUserEmail,
          adminEmailEnabled: shouldSendAdminEmail
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    throw new Error('Failed to send any enabled emails');
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
