/**
 * Zone Walkthrough E2E Test — Puppeteer
 *
 * Tests all 7 zones with both vague (FUNNY_FAIL) and specific (FULL_SUCCESS) prompts.
 * Checks: zone entry, player visibility, character placement, prompt submission, narration display.
 *
 * Run: node tests/zone-walkthrough.mjs
 */

import puppeteer from 'puppeteer'

const BASE_URL = 'http://localhost:5174'
const SCREENSHOT_DIR = '/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/tests/screenshots'

const ZONES = [
  {
    id: 'skeleton-birthday',
    label: "Skeleton's Birthday Bash",
    vaguePrompt: 'do stuff',
    specificPrompt: 'The skeleton warrior blows out candles on a giant cake while the clown juggles presents and the mage shoots fireworks',
  },
  {
    id: 'knight-space',
    label: 'Space Station Emergency',
    vaguePrompt: 'fix things',
    specificPrompt: 'The space ranger repairs the solar panel while the robot carries cargo to the base module and the engineer activates the dome shield',
  },
  {
    id: 'barbarian-school',
    label: 'Monster Recess',
    vaguePrompt: 'play around',
    specificPrompt: 'The barbarian pushes the ninja on the swing while the clown slides down the slide and the robot spins the merry go round really fast',
  },
  {
    id: 'skeleton-pizza',
    label: 'Pizza Pandemonium',
    vaguePrompt: 'make food',
    specificPrompt: 'The skeleton warrior tosses pizza dough in the air while the clown puts pepperoni on a pizza and the superhero carries five plates at once',
  },
  {
    id: 'adventurers-picnic',
    label: 'Forest Mystery',
    vaguePrompt: 'look around',
    specificPrompt: 'The ranger examines the glowing crystal while the druid lights the campfire and the ninja hides behind the tree stump',
  },
  {
    id: 'dungeon-concert',
    label: 'Dungeon Escape',
    vaguePrompt: 'escape somehow',
    specificPrompt: 'The knight opens the locked chest while the mage casts a spell on the sleeping guard and the rogue finds a key behind the barrel',
  },
  {
    id: 'mage-kitchen',
    label: 'Cooking Catastrophe',
    vaguePrompt: 'cook something',
    specificPrompt: 'The mage waves a wand at the stove making it float while the witch stirs the pot and the caveman tries to eat the bread raw',
  },
]

// Helpers
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

// Test: Check if player character is visible/hidden
async function checkPlayerVisibility(page, expectVisible) {
  const result = await page.evaluate(() => {
    const store = window.__gameStore
    if (!store) return { error: 'Store not found' }
    const state = store.getState()
    return {
      currentZone: state.currentZone,
      playerPosition: state.playerPosition,
    }
  })

  const label = expectVisible ? 'VISIBLE' : 'HIDDEN'
  const actual = result.currentZone ? 'in zone (should be hidden)' : 'in village (should be visible)'
  const pass = expectVisible ? !result.currentZone : !!result.currentZone
  console.log(`    Player: expect ${label} — ${pass ? '✅' : '❌'} (${actual})`)
  return pass
}

// Test: Check actors on stage after a prompt
async function checkActors(page, zoneId) {
  const result = await page.evaluate(() => {
    // Check the ScenePlayer3D state via DOM — count 3D character meshes
    // We'll use the store to check lastScript
    const store = window.__gameStore
    if (!store) return { error: 'Store not found' }
    const state = store.getState()
    return {
      lastScript: state.lastScript,
      currentZone: state.currentZone,
    }
  })

  if (result.error) {
    console.log(`    ❌ ${result.error}`)
    return false
  }

  const script = result.lastScript
  if (!script) {
    console.log(`    ❌ No script returned`)
    return false
  }

  console.log(`    Success level: ${script.success_level}`)
  console.log(`    Narration: "${script.narration}"`)
  console.log(`    Actions: ${script.actions?.length ?? 0}`)
  if (script.prompt_feedback) {
    console.log(`    Feedback: "${script.prompt_feedback}"`)
  }
  if (script.guide_hint) {
    console.log(`    Guide hint: "${script.guide_hint}"`)
  }

  // Check action types
  const actionTypes = (script.actions || []).map((a) => a.type)
  const hasSpawn = actionTypes.includes('spawn')
  const hasAnimate = actionTypes.includes('animate')
  console.log(`    Action types: [${actionTypes.join(', ')}]`)
  console.log(`    Has spawn: ${hasSpawn ? '✅' : '⚠️'} | Has animate: ${hasAnimate ? '✅' : '⚠️'}`)

  return true
}

// Main test runner
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
  await sleep(8000) // Loading screen is 2s + 3D model loading

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

    // --- TEST: Enter zone ---
    console.log('\n  📥 Entering zone...')
    await page.evaluate((zoneId) => {
      window.__gameStore.getState().enterZone(zoneId)
    }, zone.id)

    // Wait for transition
    await sleep(3000)
    await screenshot(page, `${zoneNum}-${zone.id}-entered`)

    // Check player hidden
    const playerHidden = await checkPlayerVisibility(page, false)
    if (!playerHidden) results.failed++
    else results.passed++

    // Verify we're in the zone
    const inZone = await page.evaluate(
      (zoneId) => window.__gameStore.getState().currentZone === zoneId,
      zone.id,
    )
    console.log(`    In zone: ${inZone ? '✅' : '❌'}`)
    if (inZone) results.passed++
    else results.failed++

    // Helper: snapshot the current narration so we can detect when it changes
    async function getCurrentNarration() {
      return page.evaluate(() => window.__gameStore.getState().lastScript?.narration || '')
    }

    // Helper: submit prompt and wait for a NEW response (narration changes)
    async function submitAndWait(promptText, label) {
      const prevNarration = await getCurrentNarration()

      // Set input via store (faster than typing for long prompts)
      await page.evaluate((text) => {
        window.__gameStore.getState().setInput(text)
      }, promptText)
      await sleep(300)

      // Submit
      await page.click('button.btn-primary')
      console.log('    ⏳ Waiting for response...')

      // Wait for narration to change (meaning a new script arrived)
      try {
        await page.waitForFunction(
          (prev) => {
            const state = window.__gameStore.getState()
            return !state.isLoading && state.lastScript?.narration !== prev
          },
          { timeout: 25000 },
          prevNarration,
        )
        console.log('    ✅ Got response')
        results.passed++
        return true
      } catch {
        // Check if loading finished but narration didn't change (edge case)
        const stillLoading = await page.evaluate(() => window.__gameStore.getState().isLoading)
        if (!stillLoading) {
          console.log('    ⚠️ Response arrived but narration unchanged')
          results.warnings++
          return true
        }
        console.log('    ❌ No response within 25s')
        results.failed++
        return false
      }
    }

    // --- TEST 1: Vague prompt (should get FUNNY_FAIL or PARTIAL_SUCCESS) ---
    console.log(`\n  💬 Test A: Vague prompt — "${zone.vaguePrompt}"`)

    // Wait for prompt input
    try {
      await page.waitForSelector('textarea.input-magic', { visible: true, timeout: 5000 })
    } catch {
      console.log('    ⚠️ Textarea not found, waiting longer...')
      await sleep(3000)
    }

    await submitAndWait(zone.vaguePrompt, 'vague')
    await sleep(3000) // Let animations play
    await screenshot(page, `${zoneNum}-${zone.id}-vague-result`)

    // Check actors
    const vagueOk = await checkActors(page, zone.id)
    if (vagueOk) results.passed++
    else results.failed++

    // Check success level — vague should ideally be FUNNY_FAIL or PARTIAL_SUCCESS
    const vagueLevel = await page.evaluate(
      () => window.__gameStore.getState().lastScript?.success_level,
    )
    if (vagueLevel === 'FUNNY_FAIL' || vagueLevel === 'PARTIAL_SUCCESS') {
      console.log(`    ✅ Vague prompt got ${vagueLevel} (expected)`)
      results.passed++
    } else if (vagueLevel === 'FULL_SUCCESS') {
      console.log(`    ⚠️ Vague prompt got FULL_SUCCESS (unexpected for a vague prompt)`)
      results.warnings++
    } else {
      console.log(`    ❌ Unexpected success level: ${vagueLevel}`)
      results.failed++
    }

    // --- TEST 2: Specific prompt (should get FULL_SUCCESS or PARTIAL_SUCCESS) ---
    console.log(`\n  💬 Test B: Specific prompt — "${zone.specificPrompt.slice(0, 60)}..."`)

    await submitAndWait(zone.specificPrompt, 'specific')
    await sleep(3000) // Let animations play fully
    await screenshot(page, `${zoneNum}-${zone.id}-specific-result`)

    // Check actors
    const specificOk = await checkActors(page, zone.id)
    if (specificOk) results.passed++
    else results.failed++

    // Check success level
    const specificLevel = await page.evaluate(
      () => window.__gameStore.getState().lastScript?.success_level,
    )
    if (specificLevel === 'FULL_SUCCESS') {
      console.log(`    ✅ Specific prompt got FULL_SUCCESS`)
      results.passed++
    } else if (specificLevel === 'PARTIAL_SUCCESS') {
      console.log(`    ⚠️ Specific prompt got PARTIAL_SUCCESS (acceptable)`)
      results.warnings++
    } else {
      console.log(`    ❌ Specific prompt got ${specificLevel}`)
      results.failed++
    }

    // --- TEST 3: Exit zone ---
    console.log('\n  📤 Exiting zone...')
    await page.evaluate(() => {
      window.__gameStore.getState().exitZone()
    })
    await sleep(3000)
    await screenshot(page, `${zoneNum}-${zone.id}-exited`)

    // Check player visible again
    const playerVisible = await checkPlayerVisibility(page, true)
    if (!playerVisible) results.failed++
    else results.passed++

    // Verify we're back in village
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

  // Console errors
  if (consoleErrors.length > 0) {
    console.log(`\n  🔴 Console errors (${consoleErrors.length}):`)
    consoleErrors.slice(0, 20).forEach((e) => console.log(`    - ${e.slice(0, 120)}`))
  } else {
    console.log('  🟢 No console errors')
  }

  // Badges earned
  const badges = await page.evaluate(() => {
    const state = window.__gameStore.getState()
    return Object.entries(state.badges)
      .filter(([, v]) => v)
      .map(([k]) => k)
  })
  if (badges.length > 0) {
    console.log(`\n  🏆 Badges earned: ${badges.join(', ')}`)
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
