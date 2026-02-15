import type { SceneScript } from '../types/scene-script';

const DIRECT_API_URL = 'https://api.anthropic.com/v1/messages';
const PROXY_API_URL = '/api/claude';
const TIMEOUT_MS = 15000;

// Use serverless proxy in production, direct API in dev (with VITE_ key)
const useProxy = !import.meta.env.VITE_ANTHROPIC_API_KEY;

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeResponse {
  content: Array<{ type: string; text: string }>;
}

export async function callClaude(
  systemPrompt: string,
  userMessage: string,
  options?: { model?: string; maxTokens?: number; timeoutMs?: number },
): Promise<string> {
  const controller = new AbortController();
  const effectiveTimeout = options?.timeoutMs ?? TIMEOUT_MS;
  const timeout = setTimeout(() => controller.abort(), effectiveTimeout);

  const body = JSON.stringify({
    model: options?.model ?? 'claude-opus-4-6',
    max_tokens: options?.maxTokens ?? 1500,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }] as ClaudeMessage[],
  });

  try {
    let response: Response;

    if (useProxy) {
      // Production: use Vercel serverless proxy (API key stays server-side)
      response = await fetch(PROXY_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: controller.signal,
      });
    } else {
      // Dev: call Anthropic directly with client-side key
      response = await fetch(DIRECT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body,
        signal: controller.signal,
      });
    }

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Claude API error ${response.status}: ${error}`);
    }

    const data: ClaudeResponse = await response.json();
    return data.content[0].text;
  } finally {
    clearTimeout(timeout);
  }
}

export function parseSceneScript(raw: string): SceneScript {
  // Strip markdown code fences if Claude wraps the JSON
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  const parsed = JSON.parse(cleaned);

  // Validate required fields
  if (!parsed.success_level || !parsed.actions || !Array.isArray(parsed.actions)) {
    throw new Error('Invalid scene script: missing required fields');
  }

  // Extract prompt_analysis if present (sandbox mode)
  const script: SceneScript = {
    success_level: parsed.success_level,
    narration: parsed.narration || '',
    actions: parsed.actions,
    prompt_feedback: parsed.prompt_feedback || '',
    guide_hint: parsed.guide_hint,
    prompt_analysis: parsed.prompt_analysis,
  };

  // Preserve missing_elements if present (fallback compatibility)
  if (parsed.missing_elements) {
    script.missing_elements = parsed.missing_elements;
  }

  return script;
}
