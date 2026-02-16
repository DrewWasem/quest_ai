# Workflow Preferences

**Created:** 2026-02-15
**Last Updated:** 2026-02-16
**Source:** audit
**Confidence:** high
**Tags:** preferences, workflow, conventions

## Summary
Drew's preferences for Claude Code workflow, tools, and conventions.

## Development
- **Model**: Always Opus 4.6 (`claude-opus-4-6`) — hackathon requirement
- **Dev server port**: 5175
- **Build tool**: Vite (frontend only, no backend build)
- **Package manager**: npm (not pnpm, not yarn)
- **TypeScript**: strict mode, 0 errors required

## Workflow
- Use `/conductor` for non-trivial tasks (Research > Plan > Implement > Validate)
- Use SMEs for domain expertise (especially `child-game-design` and `ece-professor` for kid-facing content)
- Save context with `/remember` before session ends
- Use `/recall [topic]` to search memory at session start

## Communication
- No emojis unless requested
- Keep responses concise
- Reference file paths with line numbers (e.g., `file.tsx:42`)

## Git
- Commit prefix convention: FEAT, FIX, ENH, PERF, REFACTOR, TEST, DOC, STYLE, CHORE, WIP
- Don't commit unless explicitly asked
- Don't push unless explicitly asked

## Brand Voice
- Target age: 7-11
- Voice test: "Would a funny, encouraging older sibling say this?"
- NEVER: "prompt", "Great job!", "skills", "learning", "wrong", "failed", "error"
- Say instead: "description" or "plan"
- Failure = comedy (funnier than success)
- NEVER red for failure

## Documentation
- **Narrative voice** for storytelling docs — "look and feel", not spec dumps
- Use source docs (archive, existing docs) for content, not memory files
- Don't over-extract from memory system for user-facing documents
- Development story should read like it was told, not reported

## Related
- `.claude/memory/context/brand-brief-v2.md`
- `CLAUDE.md`
