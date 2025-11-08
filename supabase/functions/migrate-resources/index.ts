import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Resource {
  title: string;
  description: string;
  category: string;
  url: string;
  date: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get admin user for uploaded_by field
    const { data: adminUsers } = await supabase
      .from('user_roles')
      .select('user_id')
      .eq('role', 'admin')
      .limit(1);

    const uploadedBy = adminUsers?.[0]?.user_id || '00000000-0000-0000-0000-000000000000';

    // Meeting minutes data
    const meetings: Resource[] = [
      // 2025
      { title: 'May 2025 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_3bfc94369c16463e947978b129b1b2bf.pdf', date: '2025-05-08' },
      { title: 'April 2025 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_0ff2d1f1ffdd44daa6ca16760af6c3cd.pdf', date: '2025-04-10' },
      { title: 'March 2025 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_84ac650d4f3f4005bbf53faab41cefcd.pdf', date: '2025-03-13' },
      { title: 'February 2025 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_840cfcabd46548abb9fe48bc1d37dd40.pdf', date: '2025-02-13' },
      { title: 'January 2025 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_7dd0f25e22c84e68b4d3e90c47df2c30.pdf', date: '2025-01-09' },
      // 2024
      { title: 'November 2024 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_c755422b89a349578739cd015173cba5.pdf', date: '2024-11-14' },
      { title: 'October 2024 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_69795f1d05b84a718bc96253e2f7f36b.pdf', date: '2024-10-10' },
      { title: 'September 2024 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_c27e5584f18141d095daa8812d1d16a4.pdf', date: '2024-09-12' },
      { title: 'May 2024 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_17e01183f32042cbbb38e48f9d81a938.pdf', date: '2024-05-09' },
      { title: 'April 2024 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_1485cc8f1d704565be183188c5ee2b08.pdf', date: '2024-04-11' },
      { title: 'March 2024 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_b19a13d4a1a64bf49c786f6664786094.pdf', date: '2024-03-14' },
      { title: 'February 2024 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_8a9b59116e7d40b1976ee4f163106f31.pdf', date: '2024-02-08' },
      { title: 'January 2024 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_5d8a620071834e879924111081170ca7.pdf', date: '2024-01-11' },
      // 2023
      { title: 'November 2023 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_748b6462632e415b8dda6c69f0444428.pdf', date: '2023-11-09' },
      { title: 'October 2023 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_a9b788d13d4d4143b3ebddcd218ba3e8.pdf', date: '2023-10-19' },
      { title: 'September 2023 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_62777773285346dcbac54388d344388d.pdf', date: '2023-09-14' },
      { title: 'May 2023 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_f3f988417a294f57905393a314e4fd63.pdf', date: '2023-05-11' },
      { title: 'April 2023 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_6ec89a1573ad41418e8ae3f6d4bde6c1.pdf', date: '2023-04-13' },
      { title: 'March 2023 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_9be7684b381b43d881d10cded75b8f4a.pdf', date: '2023-03-09' },
      { title: 'February 2023 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_60d7007a44744f7abc75a0f61fe773a2.pdf', date: '2023-02-09' },
      { title: 'January 2023 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_c907a327f5614e5a8f179e986ebcadeb.pdf', date: '2023-01-10' },
      // 2022
      { title: 'November 2022 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_86365f0061f2474d8f6b1466713579a2.pdf', date: '2022-11-10' },
      { title: 'October 2022 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_14eaff8d0b254bba9d8cb8de85f4fe0f.pdf', date: '2022-10-13' },
      { title: 'September 2022 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_f14cc98e899042c980d3384de2a20466.pdf', date: '2022-09-08' },
      { title: 'May 2022 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_65543986ab52459c85ab7c96cc213b6b.pdf', date: '2022-05-12' },
      { title: 'April 2022 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_774236a8b4f74a7c9cdf7c66cda943ca.pdf', date: '2022-04-07' },
      { title: 'March 2022 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_18901e55aef7473b8bb59f240e5397e5.pdf', date: '2022-03-10' },
      { title: 'February 2022 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_aad799f4fd3a4d52b2ceb6221ba5499c.pdf', date: '2022-02-10' },
      { title: 'January 2022 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_2d01e20cad70480390b72c9e676a928e.pdf', date: '2022-01-13' },
      // 2021
      { title: 'November 2021 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_20c2d26984a44b51add4b2666f95d949.pdf', date: '2021-11-11' },
      { title: 'October 2021 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_6946e2b034eb45f494d1f2b34bffbe4b.pdf', date: '2021-10-14' },
      { title: 'September 2021 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_3a2758771b2748a48198bc38054e5a11.pdf', date: '2021-09-09' },
      { title: 'May 2021 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_2f407524d2274653a0352f70c51aeaab.pdf', date: '2021-05-27' },
      { title: 'April 2021 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_d181bedae6b248f2b13adeb6190d5224.pdf', date: '2021-04-22' },
      { title: 'March 2021 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_f7e306c50ea7440eb368b6ec1a87dffa.pdf', date: '2021-03-25' },
      { title: 'February 2021 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_69c5697eb27c425b95741d7d994dca87.pdf', date: '2021-02-25' },
      { title: 'January 2021 Meeting Minutes', description: 'WECA monthly meeting minutes', category: 'Meeting Minutes', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_e0ce3eecc05447e1a367628364dd8f1a.pdf', date: '2021-01-28' },
    ];

    const newsletters: Resource[] = [
      { title: 'Fall 2025 Newsletter', description: 'WECA semi-annual newsletter', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_a9f2b448de164e19a3e5539132f2985c.pdf', date: '2025-09-01' },
      { title: 'Spring 2024 Newsletter', description: 'WECA semi-annual newsletter', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_0d6bf916a63842bdb8e698b03bcab0ef.pdf', date: '2024-03-01' },
      { title: 'Fall 2024 Newsletter', description: 'WECA semi-annual newsletter', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_a028bf3049374c298cd756aa19888b7e.pdf', date: '2024-09-01' },
      { title: 'Fall 2024 Newsletter (Chinese)', description: 'WECA semi-annual newsletter in Chinese', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_ba4485def08b428c9ec8aee3ff03564b.pdf', date: '2024-09-01' },
      { title: 'Fall 2024 Newsletter (Spanish)', description: 'WECA semi-annual newsletter in Spanish', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_5ae93ae77795485dbbed5042ab1dd78e.pdf', date: '2024-09-01' },
      { title: 'Spring 2023 Newsletter', description: 'WECA semi-annual newsletter', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_5bd5b8ae08914a2ca9986fda007be5c7.pdf', date: '2023-03-01' },
      { title: 'Fall 2023 Newsletter', description: 'WECA semi-annual newsletter', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_cb743045adb3430dbdfb0df1bf837678.pdf', date: '2023-09-01' },
      { title: 'Spring 2022 Newsletter', description: 'WECA semi-annual newsletter', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_ff1c384eb298410f87b9cfdf219bf8e1.pdf', date: '2022-03-01' },
      { title: 'Fall 2022 Newsletter', description: 'WECA semi-annual newsletter', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_8e2d30ff83af4c8db97a534afdcbb4d9.pdf', date: '2022-09-01' },
      { title: 'Spring 2021 Newsletter', description: 'WECA semi-annual newsletter', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_5b98ef962f2f4f17bf0c6bd1aa0f3572.pdf', date: '2021-03-01' },
      { title: 'Fall 2021 Newsletter', description: 'WECA semi-annual newsletter', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_99827bd7c97747a5b06162fca640c524.pdf', date: '2021-09-01' },
      { title: 'Spring 2019 Newsletter', description: 'WECA semi-annual newsletter', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_09b34be944da45bb88622e6baf20a619.pdf', date: '2019-03-01' },
      { title: 'Fall 2019 Newsletter', description: 'WECA semi-annual newsletter', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_6bef93eff85a482b875c478ffc1e41bc.pdf', date: '2019-09-01' },
      { title: 'Spring 2018 Newsletter', description: 'WECA semi-annual newsletter', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_3586cf9aeaa54d49ad6b5b65c8a3df2d.pdf', date: '2018-03-01' },
      { title: 'Fall 2018 Newsletter', description: 'WECA semi-annual newsletter', category: 'Newsletter', url: 'https://www.westendrockvillemd.org/_files/ugd/d9bd4e_3586cf9aeaa54d49ad6b5b65c8a3df2d.pdf', date: '2018-09-01' },
    ];

    const allResources = [...meetings, ...newsletters];
    
    // Clear existing resources
    await supabase.from('resources').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Clear existing meetings
    await supabase.from('meetings').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const results = [];

    // Process each resource
    for (const resource of allResources) {
      try {
        // Download PDF
        const response = await fetch(resource.url);
        if (!response.ok) {
          console.error(`Failed to download ${resource.url}: ${response.statusText}`);
          results.push({ title: resource.title, status: 'failed', error: response.statusText });
          continue;
        }

        const blob = await response.blob();
        const fileName = `${resource.category.toLowerCase().replace(' ', '-')}/${resource.date}.pdf`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('meeting-documents')
          .upload(fileName, blob, {
            contentType: 'application/pdf',
            upsert: true,
          });

        if (uploadError) {
          console.error(`Failed to upload ${fileName}:`, uploadError);
          results.push({ title: resource.title, status: 'failed', error: uploadError.message });
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('meeting-documents')
          .getPublicUrl(fileName);

        // Insert into appropriate table
        if (resource.category === 'Meeting Minutes') {
          const { error: insertError } = await supabase.from('meetings').insert({
            title: resource.title,
            date: resource.date,
            minutes_url: publicUrl,
            status: 'completed',
            created_by: uploadedBy,
            description: resource.description,
          });

          if (insertError) {
            console.error(`Failed to insert meeting ${resource.title}:`, insertError);
            results.push({ title: resource.title, status: 'failed', error: insertError.message });
          } else {
            results.push({ title: resource.title, status: 'success', type: 'meeting' });
          }
        } else {
          const { error: insertError } = await supabase.from('resources').insert({
            title: resource.title,
            description: resource.description,
            category: resource.category,
            file_url: publicUrl,
            file_type: 'application/pdf',
            uploaded_by: uploadedBy,
          });

          if (insertError) {
            console.error(`Failed to insert resource ${resource.title}:`, insertError);
            results.push({ title: resource.title, status: 'failed', error: insertError.message });
          } else {
            results.push({ title: resource.title, status: 'success', type: 'resource' });
          }
        }
      } catch (error) {
        console.error(`Error processing ${resource.title}:`, error);
        results.push({ title: resource.title, status: 'failed', error: String(error) });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Migration completed',
        results,
        summary: {
          total: results.length,
          succeeded: results.filter(r => r.status === 'success').length,
          failed: results.filter(r => r.status === 'failed').length,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Migration error:', error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
