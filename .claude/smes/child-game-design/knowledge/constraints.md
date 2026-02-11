# Hard Constraints — NEVER Violate

These rules are non-negotiable. Any content that violates these fails review regardless of other qualities.

## Kid-Facing Text

- **NEVER use these words:** "prompt", "skills", "learning", "wrong", "failed", "error", "mistake", "challenge", "practice"
- **Say instead:** "description" or "plan" (not "prompt"), "try" (not "challenge")
- **NEVER use empty praise:** "Great job!", "Well done!", "Good try!", "Awesome work!"
- **NEVER use edu-jargon:** "skills", "learning objectives", "practice makes perfect"
- **NEVER use scary language:** "wrong answer", "you failed", "error occurred", "that's incorrect"
- **Narration:** Max 20 words, present tense, maximum 1 exclamation mark per narration
- **Feedback tips:** Max 2 sentences, always game-specific ("the monster" not "your prompt")
- **Reading level:** Grade 3-4 (Flesch-Kincaid). Short sentences. Common words only.
- **"You" usage:** Use rarely — describe what happens in the scene, not what the kid did

## Visual & Color

- **NEVER use red (#FF0000 or similar) for failure or negative game outcomes** — red triggers anxiety in children. Use yellow/orange for funny fails.
- **Reserve red-tones** only for system-level warnings (connection lost), never for game outcomes
- **NEVER flash elements** more than 3 times per second (photosensitive seizure risk)
- **WCAG AA contrast** (4.5:1 ratio) required for ALL text on ALL backgrounds
- **Maximum 3 accent colors per screen** — the game canvas is the color explosion, the UI stays calm
- **Glow effects, not flat fills** — interactive elements use subtle box-shadow glows, not solid colored backgrounds

## Game Design

- **Failure MUST be funnier than success** — if the funny fail isn't entertaining, redesign it
- **NEVER punish failure** — no lives, no game over, no progress loss, no negative scoring
- **NEVER use timers or countdown pressure** — no time limits, no speed requirements
- **NEVER compare kids to each other** — no leaderboards, no "your friends scored higher"
- **NEVER block progress** — every outcome (success, partial, fail) unlocks the next attempt
- **NEVER require reading to understand what happened** — animations tell the story

## Interaction

- **Touch targets: 48px minimum height** with 12px gaps between interactive elements
- **One primary action per screen** — each screen has ONE obvious thing to do
- **200ms feedback rule** — every input must produce visible feedback within 200ms
- **Spelling tolerance** — the system must handle misspellings gracefully, never penalize

## AI Transparency

- **The AI never talks directly to the child** — Claude is the invisible director, not a chatbot
- **No chat interface** — this is a game, not a conversation
- **The word "AI" never appears in kid-facing text** — kids don't need to know it's AI-powered
