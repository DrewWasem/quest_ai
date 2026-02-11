# Heuristics — Pattern-Matched Judgment

These are "when you see X, usually do Y" rules. They're strong defaults, not absolute constraints.

## Narration Writing

- **When narrating a success:** Describe the scene outcome in present tense. Focus on what the characters DO, not what the kid typed. "The monster catches the giant cake and does a happy dance!" not "Your description worked perfectly!"
- **When narrating a funny fail:** Make it visual and absurd. The comedy comes from the GAP between what was intended and what happened. "The robot walks straight into the river. Pizza's soggy. Robot starts doing the robot dance." — deadpan delivery is funnier than exclamation marks.
- **When writing a feedback tip:** Point to what was MISSING from the scene, framed as the character's confusion. "The monster didn't know what kind of cake to eat! Next time, try describing the flavor." — the monster is confused, not the kid.
- **When introducing a task:** Set up the absurd situation. End with an implicit question. "A skeleton has never had a birthday before. It doesn't know what candles are. What could possibly go wrong?" — the scenario sells itself.

## Tone Calibration

- **If it sounds like a teacher:** Rewrite. Replace instructional language with observational language. "You should try being more specific" → "The knight didn't know which direction to fly!"
- **If it sounds like a children's TV host:** Rewrite. Remove false enthusiasm. "WOW! That was AMAZING!" → "The mage accidentally turned the kitchen into a bakery."
- **If it's longer than 2 sentences for feedback:** Cut it. Kids won't read a paragraph. One observation + one suggestion. That's it.
- **If the exclamation marks exceed 1 per text block:** Remove extras. Enthusiasm comes from content, not punctuation.

## UI Review

- **If a button is smaller than 48px tall:** Flag it. Kids' fingers are imprecise.
- **If body text is below 16px:** Flag it. 7-11 year olds need larger text than adults.
- **If line-height is below 1.6:** Flag it. Tight line spacing causes reading fatigue in developing readers.
- **If a text block exceeds 65 characters per line:** Flag it. Kids lose their place on long lines.
- **If there are more than 2 actions available at once:** Flag it. Kids get overwhelmed by choice. One primary action per screen.

## Color Review

- **If red appears in a game outcome context:** Fail. Red = anxiety for kids. Use yellow for comedy, orange for "try again."
- **If more than 3 accent colors on one screen:** Flag. Visual noise. The game canvas gets the color explosion — the UI stays calm.
- **If a success state doesn't use green (#22C55E):** Suggest consistency. Success = green across the whole product.
- **If a funny fail state uses anything other than yellow/orange:** Suggest yellow (#FBBF24) for comedy, orange (#FF8C42) for "try again."

## Scene Script Review

- **If a scene script has more than 6 actions:** Suggest trimming. Attention spans are 8-10 minutes — each action takes 1-2 seconds. 6 actions = ~10 seconds of animation, which is the sweet spot.
- **If a funny fail narration isn't actually funny:** Flag it. The fail must be comedic, not just "it didn't work." Ask: would a kid laugh at this? Would they show a friend?
- **If feedback references "your prompt" or "your input":** Rewrite. Reference the game world instead. The monster, the robot, the scene — not the child's text.

## Accessibility Quick-Check

- **If an interaction requires hover:** Flag. Touch devices don't have hover. Hover can be an enhancement, never a requirement.
- **If meaning is communicated only by color:** Flag. 8% of boys have color vision deficiency. Use color + shape + text.
- **If audio is required to understand what happened:** Flag. Game must be fully playable muted. Narration text must always be visible.
- **If an animation has no reduced-motion alternative:** Flag. prefers-reduced-motion must be respected.
