/**
 * Stage Floor Screenshot Capture — All 7 Zones
 *
 * Captures screenshots of each zone with the stage floor visible.
 * Properly handles TitleScreen dismissal and cinematic intro skip.
 *
 * CinematicIntro listens for 'pointerdown' on the <canvas> element
 * (with a 500ms delay after mount), NOT on document.body.
 */
import puppeteer from 'puppeteer'

const BASE_URL = 'http://localhost:5174'
const DIR = '/Users/LuffyDMonkey/claude_projects/pq-3d-world/frontend/tests/screenshots'

const ZONES = [
  'skeleton-birthday',
  'knight-space',
  'barbarian-school',
  'skeleton-pizza',
  'adventurers-picnic',
  'dungeon-concert',
  'mage-kitchen',
]

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// Parse CLI arg: optional zone name (e.g. "mage-kitchen" or "dungeon-concert")
const targetZone = process.argv[2] || null
if (targetZone && !ZONES.includes(targetZone)) {
  console.error(`Unknown zone: "${targetZone}"\nValid zones: ${ZONES.join(', ')}`)
  process.exit(1)
}

async function run() {
  console.log('Launching browser...')
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 900 },
    args: ['--no-sandbox'],
  })

  const page = await browser.newPage()

  console.log('Navigating to app...')
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 })

  // Wait for 3D models to load
  console.log('Waiting for game to load...')
  await sleep(8000)

  // --- Dismiss TitleScreen ---
  console.log('Dismissing TitleScreen...')
  try {
    await page.waitForSelector('button', { timeout: 5000 })
    const clicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'))
      const playBtn = buttons.find(b =>
        b.textContent?.includes('Play') ||
        b.textContent?.includes('PLAY') ||
        b.textContent?.includes('Start')
      )
      if (playBtn) { playBtn.click(); return true }
      return false
    })
    console.log(clicked ? '  Clicked Play button' : '  No Play button found')
  } catch {
    console.log('  No TitleScreen detected')
  }

  // CinematicIntro registers its pointerdown listener after a 500ms delay.
  // Wait 1.5s to be safe, then dispatch pointerdown on the canvas.
  console.log('Waiting for cinematic intro to register skip listener...')
  await sleep(1500)

  console.log('Skipping cinematic intro (pointerdown on canvas)...')
  await page.evaluate(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
      console.log('[test] Dispatched pointerdown on canvas')
    } else {
      console.warn('[test] No canvas element found!')
      // Fallback: click body
      document.body.click()
    }
  })

  // Wait for camera to settle in village view after skip
  console.log('Waiting for camera to settle...')
  await sleep(3000)

  // Verify store is available
  const storeAvailable = await page.evaluate(() => !!window.__gameStore)
  if (!storeAvailable) {
    console.error('__gameStore not available. Is dev server running?')
    await browser.close()
    process.exit(1)
  }

  // Verify intro is done (playingIntro should be false = header visible)
  const introFinished = await page.evaluate(() => {
    // If the header is visible, intro is done
    const header = document.querySelector('header')
    return header && !header.classList.contains('hidden')
  })
  console.log(`Intro finished: ${introFinished ? 'yes' : 'NO — may still be playing'}`)

  if (!introFinished) {
    // Try again — click the canvas directly via Puppeteer
    console.log('  Retrying skip via Puppeteer click on canvas...')
    const canvasEl = await page.$('canvas')
    if (canvasEl) {
      await canvasEl.click()
      await sleep(2000)
    }
  }

  console.log('Game store accessible\n')

  // Determine which zones to capture
  const zonesToCapture = targetZone ? [targetZone] : ZONES

  // Take village overview (skip if targeting a single zone)
  if (!targetZone) {
    await page.screenshot({ path: `${DIR}/stage-00-village.png`, fullPage: true })
    console.log('Saved: stage-00-village.png')
  }

  // Capture zone(s)
  for (const zoneId of zonesToCapture) {
    const idx = ZONES.indexOf(zoneId)
    const num = String(idx + 1).padStart(2, '0')
    console.log(`\nEntering zone: ${zoneId}...`)

    // Enter zone
    await page.evaluate((id) => {
      window.__gameStore.getState().enterZone(id)
    }, zoneId)

    // Wait for camera transition + models to load
    await sleep(4000)

    // Screenshot
    const filename = `stage-${num}-${zoneId}.png`
    await page.screenshot({ path: `${DIR}/${filename}`, fullPage: true })
    console.log(`  Saved: ${filename}`)

    // Exit zone
    await page.evaluate(() => {
      window.__gameStore.getState().exitZone()
    })
    await sleep(2000)
  }

  console.log('\nAll screenshots captured!')
  await browser.close()
  console.log('Done!')
}

run().catch(e => { console.error(e); process.exit(1) })
