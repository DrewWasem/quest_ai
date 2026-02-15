# Movement Template Pitfalls

**Created:** 2026-02-14
**Last Updated:** 2026-02-14
**Source:** session
**Confidence:** high
**Tags:** movement-templates, bugs, anti-patterns, type-errors, vignettes

## Summary

Common mistakes when using movement templates in vignettes. These errors surfaced across 8 parallel agent rewrites and took 58 type errors to fix.

## Details

### 1. Function Signature Mismatches

| Function | Correct Signature | Common Mistake |
|----------|-------------------|----------------|
| `CHARACTER_THINK` | `(character, emoji)` — 2 args | Passing 3 args (adding text) |
| `CHARACTER_EXCLAIM` | `(character, emoji, text)` — 3 args | Passing 2 args (missing emoji) |
| `DIALOGUE` | `(char1, char1Emoji, char1Text, char2, char2Emoji, char2Text)` — 6 args | Passing 4 args (char1, char2, emoji1, emoji2) |
| `OBJECT_RAIN` | `(asset, count=8, area='wide'|'center')` | Passing position strings like 'cs-right' for area |
| `IMPACT` | `(color='white', shakeIntensity=0.5)` — position NOT accepted | Passing position as first arg |

### 2. composeBlocking vs Array Spread

`composeBlocking(...templates: VignetteStep[][])` expects each argument to be a `VignetteStep[]`.

```typescript
// WRONG — spreads individual VignetteStep items as args:
steps: composeBlocking(
  ...NARRATOR("text"),      // Each step becomes separate arg
  ...ENTER_FROM_LEFT('knight'),
)

// CORRECT — pass arrays directly (no spread):
steps: composeBlocking(
  NARRATOR("text"),          // VignetteStep[] as single arg
  ENTER_FROM_LEFT('knight'),
)

// BEST — just use plain array with spreads:
steps: [
  ...NARRATOR("text"),
  ...ENTER_FROM_LEFT('knight'),
]
```

### 3. MARK is an Object, Not a Function

```typescript
// WRONG:
MARK('stove', 'cs-center')

// CORRECT:
{ asset: 'stove', mark: MARK.CS_CENTER }
```

MARK properties: DS_FAR_LEFT, DS_LEFT, DS_CENTER, DS_RIGHT, DS_FAR_RIGHT, CS_FAR_LEFT, CS_LEFT, CS_CENTER, CS_RIGHT, CS_FAR_RIGHT, US_FAR_LEFT, US_LEFT, US_CENTER, US_RIGHT, US_FAR_RIGHT, TOP, BOTTOM.

### 4. Post-Agent Import Cleanup

After bulk agent edits, always clean unused imports:
```bash
npx tsc --noEmit 2>&1 | grep TS6133 | grep "filename" | sed "s/.*'\(.*\)'.*/\1/" | sort
```

## Related

- `frontend/src/data/movement-templates.ts` — all 40 template functions
- `frontend/src/data/blocking-templates.ts` — composeBlocking, setupProps, MARK
- `.claude/memory/patterns/movement-template-library.md` — template catalog
