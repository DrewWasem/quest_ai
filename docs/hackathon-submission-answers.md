# Hackathon Submission — Copy-Paste Answers

**Event:** Built with Opus 4.6 — Claude Code Hackathon
**Deadline:** Monday, February 16, 2026, 3:00 PM ET

---

## Field 1: Team Name

```
Awesome Wasems
```

## Field 2: Project Name

```
Quest AI
```

## Field 3: Selected Hackathon Track (Problem Statement)

```
Break the Barriers
```

**Why Track 2:** AI literacy is locked behind reading level, abstraction ability, and age. Quest AI puts it in a 7-year-old's hands through 3D comedy — no typing "prompts," no reading walls of text, just describing scenes and watching them come alive.

---

## Field 4: Project Description (100-200 words)

**Copy-paste the text below into the submission form.**

```
Quest AI is a 3D game that teaches kids (ages 7-11) descriptive thinking through play. A child types "the skeleton juggles birthday cakes while riding a unicycle" and Claude Opus 4.6 generates a scene script — spawning characters, placing props, triggering animations, and narrating the result in the browser.

Vague descriptions produce hilarious failures. Specific descriptions produce celebrations. Kids retry because they want to see what happens — not because they're told to.

The game uses a three-tier response system: instant cache (166 golden responses), live Opus 4.6 API with a vocabulary contract constraining output to 1,686 registered 3D props and 27 animated characters, and pre-written fallbacks so the demo never errors. A Mad Libs scaffold (Levels 1-3) progressively removes training wheels until kids write free-form descriptions (Levels 4-5).

Built solo in 7 days with React Three Fiber, 4,270+ CC0 GLTF models, 139 animation clips, 665 audio files, and 476 hand-crafted vignettes. The Claude Code setup includes 7 domain-expert SME subagents, 32 workflow skills, and a persistent memory tree.
```

**(~160 words)**

---

## Field 5: Public GitHub Repository

```
https://github.com/DrewWasem/kids_ai_game
```

---

## Field 6: Demo Video

```
[PLACEHOLDER — Record and upload, then paste URL here]
```

**Video tips (30% of score):**
- Open with the most impressive visual — a 3D scene animating from a kid's description
- Show FUNNY_FAIL first (comedy is the hook), then FULL_SUCCESS
- Show the village world, camera transitions, Mad Libs progression
- Mention: "Opus 4.6 generates JSON scene scripts referencing only assets that exist"
- End with stats: 7 quests, 476 vignettes, 1,686 props, 27 characters, built solo in 7 days
- Keep under 3 minutes

---

## Field 7: Thoughts and feedback on building with Opus 4.6

**Copy-paste the text below into the submission form.**

```
Opus 4.6 wasn't just the API behind the game — it was the entire development platform.

The game itself: Opus 4.6 reliably generates valid JSON scene scripts constrained to a vocabulary contract of 1,686 props and 27 characters. Smaller models hallucinate asset names; Opus doesn't. It also nails comedy calibration — making failures genuinely funnier than successes, which is the core educational mechanic.

The development process: I built 7 domain-expert AI personas (story-writer, character-director, ECE professor, prompt engineer, child-game-design specialist, 3D developer, scale tester) as isolated subagents within Claude Code. A "Conductor" workflow orchestrates them through Research → Plan → Implement → Validate pipelines. The persistent memory tree (60+ files) bridges context across sessions over 7 days.

What surprised me: Opus 4.6's instruction-following precision made it possible to create specialist agents that maintain distinct personas, enforce brand voice rules, and review content for age-appropriateness — all within the same tool. The 3d-scale-tester SME diagnosed that KayKit hex buildings were strategy-game scale (0.5 units) vs character scale (2.6 units) and prescribed the fix. The ECE professor caught 14 instances of violent language in kid-facing text.

The model's consistency at structured output generation is what makes the whole architecture possible — Claude physically cannot reference an asset that doesn't exist.
```

---

## Checklist Before Submitting

- [x] Repo is **public** on GitHub
- [ ] Demo video is **uploaded** and link works
- [x] Live demo works: https://quest-ai-smoky.vercel.app/
- [x] `npm run build` passes with 0 errors
- [ ] README has screenshots (Drew to capture)
- [x] All "Prompt Quest" references renamed to "Quest AI"
- [ ] Copy-paste each field above into the submission form
