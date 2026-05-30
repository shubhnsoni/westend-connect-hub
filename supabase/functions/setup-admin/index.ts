import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

async function findUserIdByEmail(supabase: any, email: string): Promise<string | null> {
  // Admin API doesn't provide a direct get-by-email.
  // We'll scan users in small pages (good enough for initial setup).
  const perPage = 200;
  for (let page = 1; page <= 10; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;

    const match = data.users.find((u: any) => (u.email ?? '').toLowerCase() === email.toLowerCase());
    if (match?.id) return match.id;

    if (data.users.length < perPage) break;
  }
  return null;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // If an admin already exists, prevent further setup calls.
    const { count, error: countError } = await supabase
      .from('user_roles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'admin');

    if (countError) {
      console.error('Error checking admin count:', countError);
    }

    if (count && count > 0) {
      return new Response(
        JSON.stringify({ error: 'Admin setup already completed. Contact existing admin for access.' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (typeof password !== 'string' || password.length < 8) {
      return new Response(JSON.stringify({ error: 'Password must be at least 8 characters long' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Setup admin request for:', email);

    // 1) Create user OR update existing user's password
    let userId: string | null = null;

    const { data: created, error: createErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createErr) {
      // If user exists, reset password
      const code = (createErr as any)?.code;
      const message = (createErr as any)?.message ?? '';
      if (code === 'email_exists' || /already been registered/i.test(message)) {
        userId = await findUserIdByEmail(supabase, email);
        if (!userId) {
          return new Response(JSON.stringify({ error: 'User exists but could not be found for password reset.' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const { error: updateErr } = await supabase.auth.admin.updateUserById(userId, {
          password,
          email_confirm: true,
        });

        if (updateErr) {
          console.error('Error resetting password:', updateErr);
          return new Response(JSON.stringify({ error: 'Failed to reset password: ' + updateErr.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        console.log('Existing user password reset:', userId);
      } else {
        console.error('Error creating user:', createErr);
        return new Response(JSON.stringify({ error: createErr.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      userId = created?.user?.id ?? null;
      console.log('User created:', userId);
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Failed to determine user id.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2) Ensure profile exists (user_roles has FK to profiles)
    const { error: profileErr } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        email,
        full_name: null,
        updated_at: new Date().toISOString(),
      });

    if (profileErr) {
      console.error('Error ensuring profile:', profileErr);
      return new Response(JSON.stringify({ error: 'Failed to create profile: ' + profileErr.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 3) Assign admin role (idempotent)
    const { data: existingRole, error: roleSelectErr } = await supabase
      .from('user_roles')
      .select('id')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleSelectErr) {
      console.error('Error checking existing role:', roleSelectErr);
      return new Response(JSON.stringify({ error: 'Failed to verify role assignment.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!existingRole) {
      const { error: roleInsertErr } = await supabase.from('user_roles').insert({
        user_id: userId,
        role: 'admin',
      });

      if (roleInsertErr) {
        console.error('Error assigning admin role:', roleInsertErr);
        return new Response(JSON.stringify({ error: 'Failed to assign admin role: ' + roleInsertErr.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Admin user ready',
        user_id: userId,
        email,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in setup-admin function:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
