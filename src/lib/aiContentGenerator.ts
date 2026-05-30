import { supabase } from '@/integrations/supabase/client';

export type ContentSourceType = 'blog' | 'newsletter' | 'event' | 'meeting';

interface SourceData {
  type: ContentSourceType;
  title: string;
  content?: string;
  description?: string;
  excerpt?: string;
  date?: string;
  location?: string;
  zoom_link?: string;
}

const TARGET_LABELS: Record<ContentSourceType, string> = {
  blog: 'Blog Post',
  newsletter: 'Newsletter',
  event: 'Event',
  meeting: 'Meeting',
};

const ACTION_MAP: Record<ContentSourceType, string> = {
  blog: 'blog',
  newsletter: 'blog',
  event: 'event',
  meeting: 'general',
};

function buildPrompt(sourceData: SourceData, targetType: ContentSourceType): string {
  const sourceDesc = sourceData.content || sourceData.description || sourceData.excerpt || '';
  const dateInfo = sourceData.date ? `\nDate: ${sourceData.date}` : '';
  const locationInfo = sourceData.location ? `\nLocation: ${sourceData.location}` : '';
  const targetLabel = TARGET_LABELS[targetType];

  return `Based on this ${sourceData.type} content, create a ${targetLabel}:

Title: ${sourceData.title}${dateInfo}${locationInfo}
Content: ${sourceDesc}

Please generate:
1. A compelling title
2. A brief excerpt/summary (1-2 sentences, no HTML)
3. Full content appropriate for a ${targetLabel}, formatted in HTML (use <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em> tags). Do NOT use markdown formatting. Output clean HTML only.

IMPORTANT: You MUST format your response EXACTLY like this, with each label on its own line:

TITLE: [your title here]
EXCERPT: [your excerpt here]
CONTENT: [your HTML content here]

Do NOT skip the TITLE: or EXCERPT: labels. Do NOT start with HTML directly.`;
}

export async function generateAIContent(
  sourceData: SourceData,
  targetType: ContentSourceType,
  onProgress?: (partial: { title: string; content: string; excerpt: string }) => void,
): Promise<{ title: string; content: string; excerpt: string }> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-ai-assistant`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
        'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
      body: JSON.stringify({
        action: ACTION_MAP[targetType],
        messages: [{ role: 'user', content: buildPrompt(sourceData, targetType) }],
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || `Request failed with status ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let fullText = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
      let line = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 1);
      if (line.endsWith('\r')) line = line.slice(0, -1);
      if (!line.startsWith('data: ')) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === '[DONE]') continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {
          fullText += content;
          // Send progress updates
          if (onProgress) {
            const { title, excerpt, content: parsedContent } = parseAIResponse(fullText, '');
            onProgress({ title, excerpt, content: parsedContent });
          }
        }
      } catch { /* skip partial */ }
    }
  }

  if (!fullText || fullText.trim().length === 0) {
    throw new Error('AI returned empty content. Please try again.');
  }

  return parseAIResponse(fullText, sourceData.title);
}

function parseAIResponse(fullText: string, fallbackTitle: string): { title: string; excerpt: string; content: string } {
  // Try structured markers first
  const titleMatch = fullText.match(/TITLE:\s*(.+?)(?:\n|EXCERPT:|CONTENT:)/s);
  const excerptMatch = fullText.match(/EXCERPT:\s*(.+?)(?:\n|CONTENT:)/s);
  const contentMatch = fullText.match(/CONTENT:\s*([\s\S]+)/);

  let title = titleMatch?.[1]?.trim() || '';
  let excerpt = excerptMatch?.[1]?.trim() || '';
  let content = contentMatch?.[1]?.trim() || '';

  // If no structured markers found, try to extract from raw HTML
  if (!title && !content) {
    // AI might have output raw HTML — extract title from first h1/h2 or first bold text
    const h1Match = fullText.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const h2Match = fullText.match(/<h2[^>]*>(.*?)<\/h2>/i);
    const boldMatch = fullText.match(/^(?:<p>)?\s*<strong>(.*?)<\/strong>/i);
    const firstLine = fullText.split('\n').find(l => l.trim().length > 0)?.replace(/<[^>]*>/g, '').trim();

    title = (h1Match?.[1] || h2Match?.[1] || boldMatch?.[1] || firstLine || '').replace(/<[^>]*>/g, '').trim();
    content = fullText.trim();
  }

  // Generate excerpt from content if not provided
  if (!excerpt && content) {
    const textOnly = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    excerpt = textOnly.length > 160 ? textOnly.substring(0, 157) + '...' : textOnly;
  }

  return {
    title: title || fallbackTitle,
    excerpt,
    content: content || fullText,
  };
}
