/**
 * Zone Walkthrough E2E Test — Puppeteer
 *
 * Tests all 7 zones across all 3 stages using the Mad Libs vignette system.
 * Uses Vite dev-mode dynamic imports to call resolveVignette + buildVignetteScript
 * directly (no Haiku API calls), making tests deterministic.
 *
 * Stage 1: Basic slot combos (specific + random)
 * Stage 2: Modifier slots (intensity/size/urgency etc.)
 * Stage 3: Secret combos (two-slot discoveries)
 *
 * Run: node tests/zone-walkthrough.mjs
 */

import puppeteer from 'puppeteer'

const BASE_URL = 'http://localhost:5174'
const SCREENSHOT_DIR = '/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/tests/screenshots'

// ── ZONE TEST DATA ──────────────────────────────────────────────────────────

const ZONES = [
  {
    id: 'skeleton-birthday',
    label: "Skeleton's Birthday Bash",
    stage1: {
      specificTags: { FOOD: 'cake', ENTERTAINMENT: 'magic_show', VIBE: 'spooky' },
      randomTags:   { FOOD: 'soup', ENTERTAINMENT: 'games', VIBE: 'chill' },
    },
    stage2: {
      specificTags: { SIZE: 'giant', FOOD: 'cake', ENTERTAINMENT: 'magic_show', VIBE: 'spooky', MOOD: 'excited' },
    },
    stage3: {
      comboTags: { ACTIVITY1: 'magic_show', ACTIVITY2: 'fireworks', SPIRIT: 'spooky', LOCATION: 'graveyard' },
    },
  },
  {
    id: 'knight-space',
    label: 'Space Station Emergency',
    stage1: {
      specificTags: { CREW: 'ranger', TASK: 'repair', TOOL: 'solar_panel' },
      randomTags:   { CREW: 'knight', TASK: 'explore', TOOL: 'flag' },
    },
    stage2: {
      specificTags: { CREW: 'ranger', URGENCY: 'routine', TASK: 'repair', TOOL: 'solar_panel', APPROACH: 'careful' },
    },
    stage3: {
      comboTags: { TECH1: 'solar_panel', TECH2: 'laser', CRISIS: 'meteor', LOCATION: 'bridge' },
    },
  },
  {
    id: 'barbarian-school',
    label: 'Monster Recess',
    stage1: {
      specificTags: { MONSTER: 'barbarian', ACTIVITY: 'wrestling', EQUIPMENT: 'seesaw' },
      randomTags:   { MONSTER: 'caveman', ACTIVITY: 'race', EQUIPMENT: 'field' },
    },
    stage2: {
      specificTags: { ENERGY: 'sleepy', MONSTER: 'barbarian', ACTIVITY: 'tag', EQUIPMENT: 'slide', WEATHER: 'sunny' },
    },
    stage3: {
      comboTags: { GAME1: 'tag', GAME2: 'hide_seek', STYLE: 'ninja', PLAYGROUND: 'slide' },
    },
  },
  {
    id: 'skeleton-pizza',
    label: 'Pizza Pandemonium',
    stage1: {
      specificTags: { CHEF: 'skeleton', DISH: 'pizza', STYLE: 'chaotic' },
      randomTags:   { CHEF: 'clown', DISH: 'mystery', STYLE: 'sneaky' },
    },
    stage2: {
      specificTags: { CHEF: 'skeleton', AMOUNT: 'single', DISH: 'pizza', HEAT: 'cold', STYLE: 'fast' },
    },
    stage3: {
      comboTags: { TECHNIQUE1: 'grill', TECHNIQUE2: 'freeze', PRESENTATION: 'tower', DELIVERY: 'catapult' },
    },
  },
  {
    id: 'adventurers-picnic',
    label: 'Forest Mystery',
    stage1: {
      specificTags: { ADVENTURER: 'ranger', DISCOVERY: 'treasure', REACTION: 'investigate' },
      randomTags:   { ADVENTURER: 'ninja', DISCOVERY: 'creature', REACTION: 'panic' },
    },
    stage2: {
      specificTags: { TIME: 'dawn', CAUTION: 'reckless', ADVENTURER: 'ranger', DISCOVERY: 'magic_portal', REACTION: 'investigate' },
    },
    stage3: {
      comboTags: { SKILL1: 'investigate', SKILL2: 'cast_spell', TERRAIN: 'forest', WEATHER: 'foggy' },
    },
  },
  {
    id: 'dungeon-concert',
    label: 'Dungeon Escape',
    stage1: {
      specificTags: { HERO: 'rogue', ESCAPE_METHOD: 'lockpick', OBSTACLE: 'locked_door' },
      randomTags:   { HERO: 'knight', ESCAPE_METHOD: 'smash', OBSTACLE: 'darkness' },
    },
    stage2: {
      specificTags: { HERO: 'knight', STEALTH: 'loud', ESCAPE_METHOD: 'sneak', OBSTACLE: 'guard', SPEED: 'slow' },
    },
    stage3: {
      comboTags: { METHOD1: 'sneak', METHOD2: 'fight', ELEMENT: 'shadow', ROOM: 'throne_room' },
    },
  },
  {
    id: 'mage-kitchen',
    label: 'Cooking Catastrophe',
    stage1: {
      specificTags: { SPELL: 'fire_spell', APPLIANCE: 'stove', RESULT: 'explode' },
      randomTags:   { SPELL: 'levitate', APPLIANCE: 'pan', RESULT: 'dance' },
    },
    stage2: {
      specificTags: { INTENSITY: 'tiny', SPELL: 'fire_spell', APPLIANCE: 'stove', QUANTITY: 'one', RESULT: 'cook_perfectly' },
    },
    stage3: {
      comboTags: { SPELL: 'fire_spell', SPELL2: 'ice_spell', MOOD: 'wild', TARGET: 'stove' },
    },
  },
]

// ── HELPERS ─────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function ensureDir(dir) {
  const { mkdir } = await import('fs/promises')
  await mkdir(dir, { recursive: true })
}

async function screenshot(page, name) {
  await page.screenshot({ path: `${SCREENSHOT_DIR}/${name}.png`, fullPage: true })
  console.log(`    📸 ${name}.png`)
}

/**
 * Submit a Mad Libs tag combo using Vite dev dynamic imports.
 * Calls resolveVignette + buildVignetteScript directly — no Haiku API needed.
 */
async function submitMadLibsTags(page, tags, stageNumber = 1) {
  return page.evaluate(async (tagMap, stageNum) => {
    const { resolveVignette, buildVignetteScript } = await import('/src/services/vignette-resolver.ts')
    const { getQuestStage } = await import('/src/data/quest-stages.ts')

    const store = window.__gameStore
    const state = store.getState()
    const zoneId = state.currentZone
    if (!zoneId) return { error: 'Not in a zone' }

    const stage = getQuestStage(zoneId, stageNum)
    if (!stage) return { error: `No quest stage ${stageNum} for zone "${zoneId}"` }

    const vignette = resolveVignette(tagMap, stage)
    const script = buildVignetteScript(vignette, tagMap)

    // Update store
    state.setLastScript(script)
    state.setVignetteSteps(vignette.steps)

    return {
      vignetteId: vignette.id,
      promptScore: vignette.promptScore,
      tier: vignette.tier,
      narration: script.narration,
      successLevel: script.success_level,
      actionCount: script.actions?.length ?? 0,
      actionTypes: (script.actions || []).map(a => a.type),
      stepCount: vignette.steps.length,
      feedbackTitle: vignette.feedback?.title ?? '',
      hasVagueComparison: !!(vignette.vagueComparison || vignette.feedback?.vagueComparison),
    }
  }, tags, stageNumber)
}

/**
 * Check if vignetteSteps contain walk-in blocking (move actions from off-stage wings).
 */
async function checkBlockingMoves(page) {
  return page.evaluate(() => {
    const store = window.__gameStore
    const state = store.getState()
    const steps = state.vignetteSteps
    if (!steps) return { hasSteps: false, moveCount: 0, spawnCount: 0, hasWingSpawn: false }

    let moveCount = 0
    let spawnCount = 0
    let hasWingSpawn = false

    for (const step of steps) {
      for (const action of step.parallel) {
        if (action.action === 'move') moveCount++
        if (action.action === 'spawn' || action.action === 'spawn_character') {
          spawnCount++
          if (action.position === 'off-left' || action.position === 'off-right') {
            hasWingSpawn = true
          }
        }
      }
    }

    return { hasSteps: true, moveCount, spawnCount, hasWingSpawn, totalSteps: steps.length }
  })
}

/**
 * Run a single vignette test (resolve + validate).
 */
async function runVignetteTest(page, label, tags, stageNumber, results, opts = {}) {
  console.log(`\n  ${opts.icon || '🎯'} ${label} — ${JSON.stringify(tags)}`)

  // Clear previous vignette
  await page.evaluate(() => {
    window.__gameStore.getState().setVignetteSteps(null)
  })
  await sleep(300)

  const result = await submitMadLibsTags(page, tags, stageNumber)

  if (result.error) {
    console.log(`    ❌ Error: ${result.error}`)
    results.failed++
    return result
  }

  console.log(`    Vignette: ${result.vignetteId}`)
  console.log(`    Score: ${result.promptScore} | Tier: ${result.tier}`)
  console.log(`    Narration: "${result.narration}"`)
  console.log(`    Actions: ${result.actionCount} | Steps: ${result.stepCount}`)

  // Check vignette resolved
  if (result.vignetteId) {
    console.log(`    ✅ Vignette resolved`)
    results.passed++
  } else {
    console.log(`    ❌ No vignette resolved`)
    results.failed++
  }

  // Check actions exist
  if (result.actionCount > 0) {
    console.log(`    ✅ Has actions (${result.actionCount})`)
    results.passed++
  } else {
    console.log(`    ❌ No actions in script`)
    results.failed++
  }

  // Check steps exist
  if (result.stepCount > 0) {
    console.log(`    ✅ Has vignette steps (${result.stepCount})`)
    results.passed++
  } else {
    console.log(`    ❌ No vignette steps`)
    results.failed++
  }

  // Stage 2: check vagueComparison
  if (opts.expectVagueComparison) {
    if (result.hasVagueComparison) {
      console.log(`    ✅ Has vagueComparison`)
      results.passed++
    } else {
      console.log(`    ⚠️ Missing vagueComparison (not all S2 require it)`)
      results.warnings++
    }
  }

  // Check blocking moves
  if (opts.checkBlocking) {
    const blocking = await checkBlockingMoves(page)
    if (blocking.hasSteps) {
      console.log(`    Blocking: ${blocking.moveCount} moves, ${blocking.spawnCount} spawns`)
      if (blocking.moveCount > 0) {
        console.log(`    ✅ Has walk-in move actions`)
        results.passed++
      } else {
        console.log(`    ⚠️ No move actions (may use teleport spawns)`)
        results.warnings++
      }
    }
  }

  return result
}

// ── MAIN TEST RUNNER ────────────────────────────────────────────────────────

async function runTests() {
  await ensureDir(SCREENSHOT_DIR)

  console.log('🚀 Launching browser...')
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 900 },
    args: ['--no-sandbox'],
  })

  const page = await browser.newPage()

  // Collect console errors
  const consoleErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text())
    }
  })

  console.log('📡 Navigating to app...')
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 })

  // Wait for loading screen to disappear and 3D models to load
  console.log('⏳ Waiting for game to load...')
  await sleep(6000)

  // --- Dismiss TitleScreen ---
  console.log('🎬 Dismissing TitleScreen...')
  try {
    await page.waitForSelector('button', { timeout: 5000 })
    const clicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'))
      const playBtn = buttons.find(b => b.textContent?.includes('Play') || b.textContent?.includes('PLAY') || b.textContent?.includes('Start'))
      if (playBtn) {
        playBtn.click()
        return true
      }
      document.body.click()
      return false
    })
    console.log(clicked ? '  ✅ Clicked Play button' : '  ⚠️ No Play button found, clicked body')
  } catch {
    console.log('  ⚠️ No TitleScreen detected, continuing...')
  }

  // Skip cinematic intro
  await sleep(2000)
  await page.evaluate(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) canvas.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    else document.body.click()
  })
  await sleep(3000)

  await screenshot(page, '00-village-loaded')

  // Verify store is available
  const storeAvailable = await page.evaluate(() => !!window.__gameStore)
  if (!storeAvailable) {
    console.error('❌ __gameStore not available on window. Is this dev mode?')
    await browser.close()
    process.exit(1)
  }
  console.log('✅ Game store accessible\n')

  const results = { passed: 0, failed: 0, warnings: 0 }

  for (let i = 0; i < ZONES.length; i++) {
    const zone = ZONES[i]
    const zoneNum = String(i + 1).padStart(2, '0')
    console.log(`\n${'='.repeat(60)}`)
    console.log(`🏰 Zone ${i + 1}/7: ${zone.label} (${zone.id})`)
    console.log(`${'='.repeat(60)}`)

    // --- Enter zone ---
    console.log('\n  📥 Entering zone...')
    await page.evaluate((zoneId) => {
      window.__gameStore.getState().enterZone(zoneId)
    }, zone.id)

    await sleep(3000)
    await screenshot(page, `${zoneNum}-${zone.id}-entered`)

    // Verify we're in the zone
    const inZone = await page.evaluate(
      (zoneId) => window.__gameStore.getState().currentZone === zoneId,
      zone.id,
    )
    console.log(`    In zone: ${inZone ? '✅' : '❌'}`)
    if (inZone) results.passed++
    else results.failed++

    // ── STAGE 1: Specific tags ──
    console.log(`\n  ── Stage 1 ──`)
    await runVignetteTest(
      page, 'S1 Specific', zone.stage1.specificTags, 1, results,
      { icon: '🎯', checkBlocking: true },
    )
    await sleep(2000)
    await screenshot(page, `${zoneNum}-${zone.id}-s1-specific`)

    // Stage 1: Random tags
    await runVignetteTest(
      page, 'S1 Random', zone.stage1.randomTags, 1, results,
      { icon: '🎲' },
    )
    await sleep(2000)
    await screenshot(page, `${zoneNum}-${zone.id}-s1-random`)

    // ── STAGE 2: Modifier tags ──
    console.log(`\n  ── Stage 2 ──`)
    await runVignetteTest(
      page, 'S2 Modifiers', zone.stage2.specificTags, 2, results,
      { icon: '⚡', expectVagueComparison: true },
    )
    await sleep(2000)
    await screenshot(page, `${zoneNum}-${zone.id}-s2-modifiers`)

    // ── STAGE 3: Secret combos ──
    console.log(`\n  ── Stage 3 ──`)
    await runVignetteTest(
      page, 'S3 Combo', zone.stage3.comboTags, 3, results,
      { icon: '🔮' },
    )
    await sleep(2000)
    await screenshot(page, `${zoneNum}-${zone.id}-s3-combo`)

    // --- Exit zone ---
    console.log('\n  📤 Exiting zone...')
    await page.evaluate(() => {
      window.__gameStore.getState().exitZone()
    })
    await sleep(2000)

    // Verify back in village
    const backInVillage = await page.evaluate(
      () => window.__gameStore.getState().currentZone === null,
    )
    console.log(`    Back in village: ${backInVillage ? '✅' : '❌'}`)
    if (backInVillage) results.passed++
    else results.failed++

    console.log('')
  }

  // --- FINAL REPORT ---
  console.log(`\n${'='.repeat(60)}`)
  console.log('📊 FINAL RESULTS')
  console.log(`${'='.repeat(60)}`)
  console.log(`  ✅ Passed:   ${results.passed}`)
  console.log(`  ❌ Failed:   ${results.failed}`)
  console.log(`  ⚠️  Warnings: ${results.warnings}`)
  console.log(`  Total tests: ${results.passed + results.failed + results.warnings}`)

  // Console errors
  if (consoleErrors.length > 0) {
    console.log(`\n  🔴 Console errors (${consoleErrors.length}):`)
    consoleErrors.slice(0, 20).forEach((e) => console.log(`    - ${e.slice(0, 120)}`))
  } else {
    console.log('  🟢 No console errors')
  }

  console.log(`\n  📸 Screenshots saved to: ${SCREENSHOT_DIR}`)

  await browser.close()
  console.log('\n🏁 Done!')
  process.exit(results.failed > 0 ? 1 : 0)
}

runTests().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
