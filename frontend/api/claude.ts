/**
 * Vercel Serverless Function — Claude API Proxy
 *
 * Keeps the Anthropic API key server-side. The frontend calls /api/claude
 * instead of hitting api.anthropic.com directly.
 *
 * Safety: only allows models the game actually uses, caps max_tokens,
 * and limits message size to prevent abuse.
 *
 * Environment variable: ANTHROPIC_API_KEY (set in Vercel dashboard)
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

// Only models the game uses — prevents someone from running expensive prompts
const ALLOWED_MODELS = [
  'claude-sonnet-4-5-20250929',  // Level 5 scene generation
  'claude-haiku-4-5-20251001',   // Level 4 text parsing
];

const MAX_TOKENS_CAP = 1500;
const MAX_MESSAGE_LENGTH = 2000; // kid descriptions are short
const MAX_SYSTEM_PROMPT_LENGTH = 15000; // system prompts are ~5-10K

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  try {
    const { model, max_tokens, system, messages } = req.body;

    if (!model || !messages) {
      return res.status(400).json({ error: 'Missing required fields: model, messages' });
    }

    // Model allowlist — reject anything the game doesn't use
    if (!ALLOWED_MODELS.includes(model)) {
      return res.status(400).json({ error: `Model not allowed: ${model}` });
    }

    // Cap max_tokens to prevent expensive requests
    const clampedTokens = Math.min(max_tokens ?? MAX_TOKENS_CAP, MAX_TOKENS_CAP);

    // Validate message size — kid descriptions are short
    if (!Array.isArray(messages) || messages.length > 3) {
      return res.status(400).json({ error: 'Invalid messages' });
    }
    for (const msg of messages) {
      if (typeof msg.content === 'string' && msg.content.length > MAX_MESSAGE_LENGTH) {
        return res.status(400).json({ error: 'Message too long' });
      }
    }

    // Validate system prompt size
    if (system && typeof system === 'string' && system.length > MAX_SYSTEM_PROMPT_LENGTH) {
      return res.status(400).json({ error: 'System prompt too long' });
    }

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: clampedTokens,
        system,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
}
