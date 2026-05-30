import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAIProvider } from "../_shared/ai-provider.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { texts, targetLang } = await req.json();

    if (!texts || !Array.isArray(texts) || texts.length === 0 || texts.length > 50) {
      return new Response(
        JSON.stringify({ error: "texts must be an array of 1-50 strings" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!targetLang || !["es", "zh"].includes(targetLang)) {
      return new Response(
        JSON.stringify({ error: "targetLang must be 'es' or 'zh'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const provider = getAIProvider();

    const langName = targetLang === "es" ? "Spanish" : "Simplified Chinese (Mandarin)";

    const numberedTexts = texts.map((t: string, i: number) => `${i + 1}. ${t}`).join("\n");

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
            content: `You are a professional UI translator. Translate texts to ${langName}. Rules:
- Return ONLY a JSON array of translated strings in the same order
- Preserve ALL HTML tags exactly as they appear — do not add, remove, or modify any tags
- Do NOT translate these proper nouns: "WECA", "West End Civic Association", "Rockville", "Zoom"
- Keep numbers, dates, emails, URLs, and Meeting IDs unchanged
- For short UI labels (1-3 words), keep translations equally short and direct
- Be natural and fluent, not word-for-word literal
- For Chinese: avoid unnecessary filler words or suffixes; keep labels concise`,
          },
          {
            role: "user",
            content: `Translate these ${texts.length} texts to ${langName}. Return a JSON array of strings:\n\n${numberedTexts}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_translations",
              description: "Return the translated texts as a JSON array",
              parameters: {
                type: "object",
                properties: {
                  translations: {
                    type: "array",
                    items: { type: "string" },
                    description: "Array of translated strings in the same order as input",
                  },
                },
                required: ["translations"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_translations" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Translation credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI translation failed");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No tool call returned from AI");
    }

    const parsed = JSON.parse(toolCall.function.arguments);
    const translations = parsed.translations;

    if (!Array.isArray(translations) || translations.length !== texts.length) {
      throw new Error("Translation count mismatch");
    }

    return new Response(
      JSON.stringify({ translations }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("translate error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
