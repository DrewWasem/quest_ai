# Hard Constraints — NEVER Violate

## Character Roster Limits
- ONLY cast from the 28-character roster (see roster.md)
- ONLY use the 139 named animation clips
- NEVER invent characters that don't exist in the asset manifest
- NEVER assign animations that don't exist (check the clip list)
- Maximum 7 characters per task (performance limit)
- Maximum 2 hero characters per task (visible before input)

## Personality Constraints
- Characters are NEVER mean, cruel, or malicious
- Villains don't exist — even skeletons are lovable underdogs
- No character should make a child feel bad about their input
- Characters are confused/clumsy/enthusiastic/nervous — never angry or threatening
- Skeleton characters are CUTE and FUNNY, never scary or morbid
- No character should model bullying, exclusion, or aggression toward others

## Animation Constraints
- All characters share the Rig_Medium skeleton
- Skeleton-specific clips (Skeletons_*) should primarily be used for skeleton characters
- Magic clips (Ranged_Magic_*) are best for mage, witch, necromancer
- Combat clips CAN be used for comedy (barbarian "decorating" with a sword) but NEVER for actual fighting
- Tool clips (Chop, Dig, Hammer) add physical comedy
- Simulation clips (Cheering, Waving, Sit_*) are essential for social scenes

## Staging Constraints
- Hero characters ALWAYS start with Idle_A or a character-specific idle
- Heroes are placed at stage positions (left, center, right)
- No hero should be placed off-stage (off-left, off-right, off-top)
- Background actors must not obstruct the main action area (center)

## Evolution Constraints
- Evolution is ALWAYS positive (characters grow, never regress)
- Evolution changes are SUBTLE (slightly different animation, new emote option)
- Evolution NEVER locks content (a player can do tasks in any order)
- If a task references a character's past, it's a bonus — never required
- Evolution state persists in localStorage via Zustand
