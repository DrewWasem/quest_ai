# Content Review Rubric

## How to Use This Rubric

Review each dimension independently. A single FAIL in any Critical dimension = content fails review.
All dimensions are assessed per content type (story arc, system prompt, narration, feedback).

---

## Critical Dimensions (any FAIL = content fails)

### 1. Developmental Appropriateness

| Rating | Criteria |
|--------|---------|
| **PASS** | All content is concrete, visible, and actionable. No abstract reasoning required. Reading level Grade 3-4 or below. |
| **NEEDS WORK** | Mostly concrete but 1-2 elements may be slightly abstract. Can be fixed with rewording. |
| **FAIL** | Requires hypothetical reasoning, abstract concepts, or reading above Grade 4. |

### 2. Emotional Safety

| Rating | Criteria |
|--------|---------|
| **PASS** | Failure is genuinely funny. No anxiety, shame, or frustration triggers. No urgency or pressure. |
| **NEEDS WORK** | Generally safe but 1-2 elements could be misread as punishing or scary by sensitive children. |
| **FAIL** | Contains scary content, punishment for failure, social rejection, competition, or urgency. |

### 3. Brand Voice Compliance

| Rating | Criteria |
|--------|---------|
| **PASS** | Passes the "older sibling" test. No banned words. Feedback is game-specific. Narration is concrete and funny. |
| **NEEDS WORK** | Mostly good but contains 1-2 instances of banned words or slightly abstract feedback. |
| **FAIL** | Contains "prompt", empty praise ("Great job!"), edu-jargon, or addresses child about their ability. |

### 4. Content Safety

| Rating | Criteria |
|--------|---------|
| **PASS** | All content is Tier 1 (always safe) or Tier 2 (safe with care). No Tier 3 content. |
| **NEEDS WORK** | Mostly safe but 1 element borders on Tier 3 territory. Easily fixed. |
| **FAIL** | Contains Tier 3 content: real violence, fear, exclusion, death references, scary imagery. |

---

## Quality Dimensions (NEEDS WORK = content needs revision but doesn't fail)

### 5. Comedy Hierarchy

| Rating | Criteria |
|--------|---------|
| **PASS** | FUNNY_FAIL is clearly the funniest outcome. Comedy comes from situations, not mockery. Would a kid try the vague answer just to see what happens? |
| **NEEDS WORK** | FUNNY_FAIL exists but isn't funnier than success. Comedy is present but mild. |
| **FAIL** | No comedy in failure path, or humor is at the character's/child's expense. |

### 6. ZPD Calibration

| Rating | Criteria |
|--------|---------|
| **PASS** | 3 elements are discoverable through play. 7-8 year olds can get PARTIAL_SUCCESS. 9-11 can reach FULL_SUCCESS with thought. |
| **NEEDS WORK** | Challenge is slightly too easy (everyone gets FULL_SUCCESS) or too hard (most kids get FUNNY_FAIL). |
| **FAIL** | Task is impossible for 7-8 or trivial for 9-11. No growth zone. |

### 7. Learning Embedding

| Rating | Criteria |
|--------|---------|
| **PASS** | Learning objectives are fully embedded in play. Kids don't realize they're learning. Comedy teaches specificity. |
| **NEEDS WORK** | Learning is present but slightly explicit (feedback sounds slightly teacherly). |
| **FAIL** | Learning is explicit ("In this exercise you will learn...") or absent (pure entertainment, no skill development). |

### 8. Scaffolding Design

| Rating | Criteria |
|--------|---------|
| **PASS** | Appropriate scaffolding for both age bands. Hints are concrete. Progressive difficulty across tasks. |
| **NEEDS WORK** | Scaffolding exists but is slightly too abstract or doesn't differentiate age bands. |
| **FAIL** | No scaffolding, or scaffolding is abstract theory ("try to be more specific"). |

---

## Scoring Summary

| Result | Criteria |
|--------|---------|
| **PASS** | All Critical dimensions pass. No more than 2 Quality dimensions at NEEDS WORK. |
| **NEEDS WORK** | All Critical dimensions pass, but 3+ Quality dimensions need improvement. |
| **FAILS CONSTRAINTS** | Any Critical dimension fails. Content cannot ship. |

---

## Runtime Guardrail Checklist

For Claude-generated scene scripts, these lightweight checks run automatically:

| Check | Rule | Action if Violated |
|-------|------|-------------------|
| Narration length | ≤ 20 words | Truncate or flag |
| Banned words in narration | None of: wrong, failed, error, mistake, prompt, skills, learning | Flag for rewrite |
| Banned words in feedback | None of: Great job, Well done, Good try, prompt, skills, learning, challenge | Flag for rewrite |
| Action count | ≤ 6 actions | Truncate to 6 |
| FUNNY_FAIL indicators | Must have ≥1 comedy element (question-marks, funny anim, silly emote) | Flag for review |
| Success consistency | FULL_SUCCESS should have ≥3 actions, FUNNY_FAIL can have ≤3 | Flag if mismatched |
| Asset vocabulary | All actors/props in manifest | Skip unknown assets |
| No combat in non-combat | No attack animations in party/picnic tasks | Flag for review |
