/**
 * Haiku Client — thin wrapper for Claude Haiku API calls.
 *
 * Same fetch pattern as option-generator.ts but targets claude-haiku-4-5-20251001.
 * Returns string | null (null on any failure).
 */

const HAIKU_MODEL = 'claude-haiku-4-5-20251001';

/**
 * Call Claude Haiku with a system prompt and user message.
 * Returns the text response or null on any failure (timeout, network, parse).
 */
export async function callHaiku(
  systemPrompt: string,
  userMessage: string,
  maxTokens: number,
  timeoutMs: number,
): Promise<string | null> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn('[haiku-client] No API key — returning null');
    return null;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: HAIKU_MODEL,
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: userMessage }],
        system: systemPrompt,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!resp.ok) {
      console.warn(`[haiku-client] API error: ${resp.status}`);
      return null;
    }

    const data = await resp.json();
    const text = data.content?.[0]?.text ?? null;
    return text;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      console.warn(`[haiku-client] Timeout after ${timeoutMs}ms`);
    } else {
      console.warn('[haiku-client] Error:', err);
    }
    return null;
  }
}
