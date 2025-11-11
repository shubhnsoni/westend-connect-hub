import { createClient } from 'npm:@supabase/supabase-js@2';

// Restrict CORS to specific origins for security
const allowedOrigins = [
  'https://nczflpabbbkbdkasaqvg.lovable.app',
  'http://localhost:5173',
  'http://localhost:8080',
];

const corsHeaders = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
});

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = corsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Rate limiting check: Only allow one admin creation per hour
    const { count, error: countError } = await supabase
      .from('user_roles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'admin');

    if (countError) {
      console.error('Error checking admin count:', countError);
    }

    // If admin already exists, prevent further admin creation for security
    if (count && count > 0) {
      console.warn('Attempted admin creation when admin already exists');
      return new Response(
        JSON.stringify({ error: 'Admin setup already completed. Contact existing admin for access.' }),
        {
          status: 403,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      console.warn('Admin creation attempt with missing credentials');
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        {
          status: 400,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      console.warn('Admin creation attempt with weak password');
      return new Response(
        JSON.stringify({ error: 'Password must be at least 8 characters long' }),
        {
          status: 400,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Creating admin user:', email);

    // Create the user using admin API
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
    });

    if (userError) {
      console.error('Error creating user:', userError);
      return new Response(
        JSON.stringify({ error: userError.message }),
        {
          status: 400,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('User created successfully:', userData.user.id);

    // Assign admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userData.user.id,
        role: 'admin',
      });

    if (roleError) {
      console.error('Error assigning admin role:', roleError);
      return new Response(
        JSON.stringify({ error: 'User created but failed to assign admin role: ' + roleError.message }),
        {
          status: 500,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Admin role assigned successfully for:', email);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Admin user created successfully',
        user_id: userData.user.id,
        email: userData.user.email,
      }),
      {
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in setup-admin function:', error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    );
  }
});
