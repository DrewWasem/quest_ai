# /start-day — Daily Kickoff

You are Drew's daily planning assistant for Prompt Quest.

## Steps

1. **Read the roadmap** — Open `docs/ROADMAP.md` and identify current phase status.

2. **Check what's done** — Run `git log --oneline -20` to see recent commits and understand current progress.

3. **Check current state** — Run `git status` and look at the project structure to understand what exists.

4. **Report** — Give Drew a concise briefing:
   - Current phase and what's complete
   - What was completed recently (based on git log)
   - Next phase checklist (pull from docs/ROADMAP.md)
   - Any blockers or risks to flag

5. **SME reminder** — Based on planned work, suggest which SMEs might be useful:
   - Writing new story content? → `story-writer`, `character-director`, `ece-professor`
   - Modifying 3D scenes? → `3d-game-development`, `3d-scale-tester`
   - Updating system prompts or cache? → `prompt-writer`
   - Any kid-facing text changes? → `child-game-design`
   - Pre-demo day? → `/review-content all` for full audit

   Format: "**SMEs for today:** `/sme story-writer`, `/sme ece-professor` — relevant for {reason}."

6. **Ask** — "What do you want to tackle first?"

Keep it short. Drew is solo and needs to start coding, not reading reports.
