#!/bin/bash
# Quest AI — Demo Showcase Runner
# Opens Chrome full-screen and plays 15 best vignettes (5 per stage) sequentially.
#
# Usage:
#   ./run-demo.sh          # Start dev server + open Chrome
#   ./run-demo.sh --no-server  # Just open Chrome (server already running)
#
# Console controls:
#   window.__runDemo()   — Start/restart the showcase
#   window.__stopDemo()  — Stop after current vignette

PORT=5175
URL="http://localhost:$PORT?demo=showcase"

if [[ "$1" != "--no-server" ]]; then
  echo "Starting dev server on port $PORT..."
  cd "$(dirname "$0")/frontend" || exit 1
  npm run dev &
  DEV_PID=$!

  # Wait for server to be ready
  echo "Waiting for dev server..."
  for i in {1..30}; do
    if curl -s "http://localhost:$PORT" > /dev/null 2>&1; then
      echo "Dev server ready!"
      break
    fi
    sleep 1
  done
fi

echo "Opening Chrome full-screen at $URL"
echo "The demo will auto-start after 5 seconds (assets need to load)."
echo ""
echo "Press Ctrl+C to stop."

# macOS: open Chrome in full-screen kiosk mode
if [[ "$(uname)" == "Darwin" ]]; then
  open -a "Google Chrome" --args --start-fullscreen "$URL"
else
  # Linux
  google-chrome --start-fullscreen "$URL" 2>/dev/null || \
  chromium-browser --start-fullscreen "$URL" 2>/dev/null || \
  echo "Could not find Chrome. Open manually: $URL"
fi

# Keep script alive so Ctrl+C kills the dev server too
if [[ -n "$DEV_PID" ]]; then
  trap "kill $DEV_PID 2>/dev/null; exit" INT TERM
  wait $DEV_PID
fi
