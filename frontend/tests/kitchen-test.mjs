/**
 * Quick test — just mage-kitchen zone with Mad Libs vignette system.
 * Uses Vite dev dynamic imports for deterministic vignette resolution.
 */
import puppeteer from 'puppeteer'

const BASE_URL = 'http://localhost:5174'
const DIR = '/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/tests/screenshots'

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function run() {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1280, height: 900 } })
  const page = await browser.newPage()
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await sleep(6000)

  // Dismiss TitleScreen
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'))
    const playBtn = buttons.find(b => b.textContent?.includes('Play') || b.textContent?.includes('PLAY'))
    if (playBtn) playBtn.click()
    else document.body.click()
  })
  await sleep(2000)
  await page.evaluate(() => document.body.click()) // skip intro
  await sleep(3000)

  // Enter mage-kitchen
  await page.evaluate(() => window.__gameStore.getState().enterZone('mage-kitchen'))
  await sleep(3000)
  await page.screenshot({ path: `${DIR}/kitchen-entered.png`, fullPage: true })
  console.log('Entered kitchen')

  // Submit specific tags via vignette resolver (no API call)
  const result = await page.evaluate(async () => {
    const { resolveVignette, buildVignetteScript } = await import('/src/services/vignette-resolver.ts')
    const { getQuestStage } = await import('/src/data/quest-stages.ts')

    const store = window.__gameStore
    const state = store.getState()
    const stage = getQuestStage('mage-kitchen')
    if (!stage) return { error: 'No quest stage' }

    const tags = { SPELL: 'fire_spell', APPLIANCE: 'stove', RESULT: 'explode' }
    const vignette = resolveVignette(tags, stage)
    const script = buildVignetteScript(vignette, tags)

    state.setLastScript(script)
    state.setVignetteSteps(vignette.steps)

    return {
      vignetteId: vignette.id,
      promptScore: vignette.promptScore,
      narration: script.narration,
      successLevel: script.success_level,
      actionCount: script.actions?.length ?? 0,
      stepCount: vignette.steps.length,
    }
  })

  if (result.error) {
    console.error('Error:', result.error)
  } else {
    console.log(`Vignette: ${result.vignetteId}`)
    console.log(`Score: ${result.promptScore} | Success: ${result.successLevel}`)
    console.log(`Narration: "${result.narration}"`)
    console.log(`Actions: ${result.actionCount} | Steps: ${result.stepCount}`)
  }

  await sleep(4000)
  await page.screenshot({ path: `${DIR}/kitchen-specific.png`, fullPage: true })
  console.log('Got specific response')

  // Test random combo too
  await page.evaluate(async () => {
    const { resolveVignette, buildVignetteScript } = await import('/src/services/vignette-resolver.ts')
    const { getQuestStage } = await import('/src/data/quest-stages.ts')

    const store = window.__gameStore
    const state = store.getState()
    const stage = getQuestStage('mage-kitchen')

    const tags = { SPELL: 'grow_spell', APPLIANCE: 'fridge', RESULT: 'go_wild' }
    const vignette = resolveVignette(tags, stage)
    const script = buildVignetteScript(vignette, tags)

    state.setLastScript(script)
    state.setVignetteSteps(vignette.steps)
  })

  await sleep(4000)
  await page.screenshot({ path: `${DIR}/kitchen-random.png`, fullPage: true })
  console.log('Got random response')

  await browser.close()
  console.log('Done!')
}

run().catch(e => { console.error(e); process.exit(1) })
