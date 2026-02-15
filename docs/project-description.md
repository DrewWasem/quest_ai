# Project Description (for submission form)

**Copy-paste the text below into the hackathon submission form.**

---

Prompt Quest is an AI-powered 3D game that teaches kids (ages 7-11) descriptive thinking through play. Instead of typing into a chatbot, kids describe scenes and watch them come alive in a medieval village world with 28 animated characters and thousands of 3D props.

**The problem.** Existing AI tools for kids are text-in, text-out — boring and abstract. Kids learn by doing, not by reading feedback about their "prompts."

**The solution.** In Prompt Quest, a kid might type "the skeleton tries to juggle three birthday cakes while riding a unicycle" and Claude Opus 4.6 generates a scene script — spawning characters, placing props, triggering animations, and writing a funny narration. The 3D scene plays out in the browser with real audio and particle effects.

**How Claude is used.** Every player description goes through a three-tier response system: (1) instant cache lookup against 166 pre-computed golden responses, (2) live Opus 4.6 API call with a vocabulary-contract system prompt that constrains output to valid assets, (3) pre-written fallback scripts so the demo never shows an error. Claude generates JSON scene scripts with spawn, move, animate, emote, and react actions — each referencing only the 2,186 registered 3D models and 28 animated characters. The AI literally cannot hallucinate an asset that doesn't exist.

**Comedy-first design.** Failure is always funnier than success. When a kid's description is vague, the skeleton drops all three cakes and slips on frosting. This makes kids want to try again with more specific descriptions — teaching descriptive precision without ever saying the word "learning."

**Technical scope.** Built solo in 7 days: React Three Fiber for 3D rendering, 4,270+ GLTF models (KayKit, Kenney, Tiny Treats — all CC0), 139 skeletal animation clips, 665 OGG audio files with synthesized fallbacks, 421 hand-crafted vignettes with 53 choreography templates, Zustand state management, persistent hex-tile village world with 8 quest zones and camera-fly transitions, a Mad Libs progression system (5 difficulty levels per quest), and a serverless API proxy to keep keys server-side. A sandbox "Creative Playground" zone unlocks after completing 3 quests — all characters, all props, no wrong answers.

The Claude Code orchestration setup includes 7 domain-expert SME subagents (story-writer, character-director, ECE professor, prompt-writer, child-game-design, 3D-game-dev, 3D-scale-tester), 32 workflow skills, a persistent memory tree, and custom hooks for type-checking and context management. Built entirely with Claude Code and Opus 4.6.
