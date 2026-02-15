/**
 * Vercel Serverless Function — Claude API Proxy
 *
 * Keeps the Anthropic API key server-side. The frontend calls /api/claude
 * instead of hitting api.anthropic.com directly.
 *
 * Environment variable: ANTHROPIC_API_KEY (set in Vercel dashboard)
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

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

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: max_tokens ?? 1500,
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
