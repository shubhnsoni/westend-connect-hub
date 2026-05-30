// Shared AI provider resolver.
// Picks the first configured provider in order: OpenAI → Gemini → Lovable AI Gateway.
// This lets the project migrate off Lovable AI by just adding OPENAI_API_KEY or
// GEMINI_API_KEY as a secret — no code changes required at cutover.

export type AIProvider = {
  name: "openai" | "gemini" | "lovable";
  endpoint: string;
  authHeader: string;
  defaultModel: string;
};

export function getAIProvider(): AIProvider {
  const openaiKey = Deno.env.get("OPENAI_API_KEY");
  const geminiKey = Deno.env.get("GEMINI_API_KEY");
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");

  if (openaiKey) {
    return {
      name: "openai",
      endpoint: "https://api.openai.com/v1/chat/completions",
      authHeader: `Bearer ${openaiKey}`,
      defaultModel: "gpt-4o-mini",
    };
  }

  if (geminiKey) {
    // Gemini exposes an OpenAI-compatible /chat/completions endpoint
    // that accepts the same tools / tool_choice JSON shape.
    return {
      name: "gemini",
      endpoint: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      authHeader: `Bearer ${geminiKey}`,
      defaultModel: "gemini-2.5-flash",
    };
  }

  if (lovableKey) {
    return {
      name: "lovable",
      endpoint: "https://ai.gateway.lovable.dev/v1/chat/completions",
      authHeader: `Bearer ${lovableKey}`,
      defaultModel: "google/gemini-3-flash-preview",
    };
  }

  throw new Error(
    "No AI provider configured. Set OPENAI_API_KEY, GEMINI_API_KEY, or LOVABLE_API_KEY."
  );
}
