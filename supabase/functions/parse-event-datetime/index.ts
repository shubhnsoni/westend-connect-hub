import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAIProvider } from "../_shared/ai-provider.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { description } = await req.json();
    const provider = getAIProvider();

    const today = new Date().toISOString().slice(0, 10);

    const response = await fetch(provider.endpoint, {
      method: "POST",
      headers: {
        Authorization: provider.authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: provider.defaultModel,
        messages: [
          {
            role: "system",
            content: `You are a date/time extraction assistant. Today's date is ${today}. Extract event date, time, and location from text. If a year is not mentioned, assume the next upcoming occurrence. For relative references like "next Thursday", calculate the actual date. Return results using the provided tool.`,
          },
          { role: "user", content: description },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_datetime",
              description: "Extract date, time, and location from event description text",
              parameters: {
                type: "object",
                properties: {
                  start_date: { type: "string", description: "Start date in YYYY-MM-DD format, or empty if not found" },
                  start_time: { type: "string", description: "Start time in HH:MM (24h) format, or empty if not found" },
                  end_date: { type: "string", description: "End date in YYYY-MM-DD format, or empty if not found" },
                  end_time: { type: "string", description: "End time in HH:MM (24h) format, or empty if not found" },
                  location: { type: "string", description: "Location/venue if mentioned, or empty" },
                  title: { type: "string", description: "Extracted event title if discernible, or empty" },
                },
                required: ["start_date", "start_time", "end_date", "end_time", "location", "title"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "extract_datetime" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No extraction result");

    const extracted = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(extracted), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("parse-event-datetime error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
