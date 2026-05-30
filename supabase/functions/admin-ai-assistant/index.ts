import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";
import { getAIProvider } from "../_shared/ai-provider.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - No authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: hasAdminRole, error: roleError } = await supabaseClient.rpc("has_role", {
      _user_id: user.id,
      _role: "admin",
    });

    if (roleError || !hasAdminRole) {
      return new Response(
        JSON.stringify({ error: "Forbidden - Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`AI Assistant request from admin user: ${user.email}`);

    const { messages, action } = await req.json();
    const provider = getAIProvider();

    const systemPrompts: Record<string, string> = {
      blog: "You are an expert blog writer for a civic association. Generate engaging, professional blog content about community events, neighborhood updates, and civic matters. Format responses with proper headings, paragraphs, and HTML if needed.",
      event: "You are an event planner for a civic association. Generate detailed event descriptions with all necessary information: date, time, location, purpose, and call-to-action. Be informative and engaging.",
      announcement: "You are a community announcements writer. Create clear, concise announcements about important community matters. Be direct and informative.",
      general: "You are a helpful assistant for civic association administrators. Help create content for newsletters, events, announcements, and blog posts. Provide well-structured, professional content.",
      seo: `You are an SEO expert specializing in local community and civic organization websites. Given a piece of content (title + body), generate optimized SEO metadata. You MUST call the generate_seo_metadata tool with your results. Rules:
- seo_title: max 60 characters, include primary keyword, make it compelling
- seo_description: max 160 characters, include a call-to-action or key benefit
- seo_keywords: 5-8 comma-separated keywords relevant to the content and local community SEO`,
      "seo-analyze": `You are an SEO auditor for a civic association website. Analyze the provided content and return a detailed SEO report. You MUST call the seo_analysis_report tool with your results. Evaluate:
1. keyword_score (0-100): Are relevant keywords present and well-distributed?
2. heading_score (0-100): Are H1/H2/H3 tags used properly?
3. content_score (0-100): Is the content length adequate (aim for 300+ words)?
4. readability_score (0-100): Is the content clear and accessible?
5. meta_score (0-100): Does it have good title/description potential?
6. suggestions: Array of specific, actionable improvement suggestions (3-6 items)
7. overall_score (0-100): Weighted average of all scores`,
      "alt-text": "You are an accessibility and SEO expert. Given an image URL, generate a descriptive alt text that is both accessible for screen readers and SEO-friendly. Keep it under 125 characters. Be specific and descriptive about what the image shows. Do NOT start with 'Image of' or 'Picture of'.",
    };

    const systemPrompt = systemPrompts[action] || systemPrompts.general;

    // Build request body
    const requestBody: any = {
      model: provider.defaultModel,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    };

    // Use tool calling for structured output actions
    if (action === "seo") {
      requestBody.tools = [
        {
          type: "function",
          function: {
            name: "generate_seo_metadata",
            description: "Return optimized SEO metadata for the given content",
            parameters: {
              type: "object",
              properties: {
                seo_title: { type: "string", description: "SEO-optimized title, max 60 characters" },
                seo_description: { type: "string", description: "SEO meta description, max 160 characters" },
                seo_keywords: { type: "string", description: "Comma-separated keywords" },
              },
              required: ["seo_title", "seo_description", "seo_keywords"],
              additionalProperties: false,
            },
          },
        },
      ];
      requestBody.tool_choice = { type: "function", function: { name: "generate_seo_metadata" } };
    } else if (action === "seo-analyze") {
      requestBody.tools = [
        {
          type: "function",
          function: {
            name: "seo_analysis_report",
            description: "Return a structured SEO analysis report",
            parameters: {
              type: "object",
              properties: {
                keyword_score: { type: "number" },
                heading_score: { type: "number" },
                content_score: { type: "number" },
                readability_score: { type: "number" },
                meta_score: { type: "number" },
                overall_score: { type: "number" },
                suggestions: { type: "array", items: { type: "string" } },
              },
              required: ["keyword_score", "heading_score", "content_score", "readability_score", "meta_score", "overall_score", "suggestions"],
              additionalProperties: false,
            },
          },
        },
      ];
      requestBody.tool_choice = { type: "function", function: { name: "seo_analysis_report" } };
    } else {
      // Streaming for non-structured actions
      requestBody.stream = true;
    }

    const response = await fetch(provider.endpoint, {
      method: "POST",
      headers: {
        Authorization: provider.authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required: AI provider credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // For tool-calling actions, parse the response and extract tool call arguments
    if (action === "seo" || action === "seo-analyze") {
      const data = await response.json();
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (toolCall) {
        const args = JSON.parse(toolCall.function.arguments);
        return new Response(JSON.stringify(args), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Fallback: try to parse content as JSON
      const content = data.choices?.[0]?.message?.content;
      return new Response(JSON.stringify({ raw: content }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Streaming response for other actions
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Admin AI assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
