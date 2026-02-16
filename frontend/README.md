# Quest AI — Frontend

React Three Fiber game client. See the [root README](../README.md) for project overview.

## Development

```bash
npm install
npm run dev       # http://localhost:5175
npm run build     # Production build (0 TS errors)
npm run preview   # Preview production build
```

## Environment

Copy `../.env.example` to `.env` and add your `VITE_ANTHROPIC_API_KEY` for live Claude API calls. The game works without an API key using the built-in response cache.
