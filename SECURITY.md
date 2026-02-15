# Security & Privacy

## Kid Safety — By Design

Prompt Quest is built for kids ages 7-11. Every design decision prioritizes their safety.

### No Data Collection

- **No user accounts or login** — the game works without any identity
- **No personal data collected** — no names, emails, ages, or demographics
- **No cookies or tracking** — no analytics, no third-party scripts, no ads
- **No persistent storage** — nothing is saved between sessions (no localStorage, no database)

### API Key Protection

- The Claude API key is **never exposed to the browser**
- All API calls route through a **Vercel serverless proxy** (`/api/generate-scene`)
- The proxy enforces:
  - Model allowlisting (only `claude-opus-4-6`)
  - Token caps to prevent abuse
  - No user data forwarded to the API
- The game works fully offline using the built-in cache of 166 pre-computed responses — no API key needed

### Content Safety

- All kid-facing text is reviewed by an ECE Professor SME (early childhood education specialist AI persona)
- The game never uses words like "wrong," "failed," "error," or "learning"
- **No red for failure** — funny fails use yellow and orange to avoid negative associations
- Failure is always comedy, never judgment
- No violent, scary, or inappropriate content — verified via automated content audit (14 flagged terms found and replaced during development)

### Input Handling

- Player descriptions are sent to Claude's API with a constrained system prompt
- Claude can only reference assets from a fixed vocabulary contract (1,686 props, 27 characters)
- The AI cannot generate arbitrary text that displays to the child — all output is structured JSON that maps to pre-loaded 3D assets
- Invalid or unexpected API responses fall back to pre-written safe scripts

### Dependencies

- All 3D assets are open-source (CC0 or CC-BY) and bundled with the app
- No external CDNs or third-party services beyond Vercel hosting and the Claude API
- No user-generated content is stored or shared

## Reporting

If you discover a security issue, please open a GitHub issue or contact the maintainer directly.
