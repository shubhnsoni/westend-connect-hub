import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface SyncRequest {
  type: 'newsletter' | 'contact' | 'feedback';
  data: {
    email: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    message?: string;
  };
}

async function computeMD5(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('MD5', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MAILCHIMP_API_KEY = Deno.env.get('MAILCHIMP_API_KEY');
    const MAILCHIMP_AUDIENCE_ID = Deno.env.get('MAILCHIMP_AUDIENCE_ID');

    if (!MAILCHIMP_API_KEY) {
      throw new Error('MAILCHIMP_API_KEY is not configured');
    }
    if (!MAILCHIMP_AUDIENCE_ID) {
      throw new Error('MAILCHIMP_AUDIENCE_ID is not configured');
    }

    const dc = MAILCHIMP_API_KEY.split('-').pop();
    if (!dc) {
      throw new Error('Invalid Mailchimp API key format - missing data center suffix');
    }

    const { type, data }: SyncRequest = await req.json();

    if (!data?.email) {
      throw new Error('Email is required');
    }

    const subscriberHash = await computeMD5(data.email);
    const baseUrl = `https://${dc}.api.mailchimp.com/3.0`;
    const listUrl = `${baseUrl}/lists/${MAILCHIMP_AUDIENCE_ID}/members/${subscriberHash}`;

    // Determine names
    let firstName = data.firstName || '';
    let lastName = data.lastName || '';
    if (!firstName && data.name) {
      const parts = data.name.trim().split(/\s+/);
      firstName = parts[0] || '';
      lastName = parts.slice(1).join(' ') || '';
    }

    // Determine tag based on type
    const tagMap: Record<string, string> = {
      newsletter: 'Website Signup',
      contact: 'Contact Form',
      feedback: 'Feedback',
    };
    const tag = tagMap[type] || 'Website';

    // PUT to add/update member (upsert)
    const memberResponse = await fetch(listUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${btoa(`anystring:${MAILCHIMP_API_KEY}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: data.email.toLowerCase().trim(),
        status_if_new: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      }),
    });

    const memberData = await memberResponse.json();

    if (!memberResponse.ok) {
      console.error('Mailchimp member upsert failed:', memberData);
      throw new Error(`Mailchimp API error: ${memberData.detail || memberData.title || 'Unknown error'}`);
    }

    // Apply tag
    const tagsUrl = `${listUrl}/tags`;
    const tagResponse = await fetch(tagsUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`anystring:${MAILCHIMP_API_KEY}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: [{ name: tag, status: 'active' }],
      }),
    });

    if (!tagResponse.ok) {
      const tagData = await tagResponse.json();
      console.error('Mailchimp tag application failed:', tagData);
      // Don't throw - member was added successfully, tag is non-critical
    }

    return new Response(
      JSON.stringify({ success: true, status: memberData.status }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Mailchimp sync error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
