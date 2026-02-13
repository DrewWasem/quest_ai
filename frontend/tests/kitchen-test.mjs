/**
 * Quick test — just mage-kitchen zone
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

  // Enter mage-kitchen
  await page.evaluate(() => window.__gameStore.getState().enterZone('mage-kitchen'))
  await sleep(3000)
  await page.screenshot({ path: `${DIR}/kitchen-entered.png`, fullPage: true })
  console.log('Entered kitchen')

  // Submit specific prompt
  const prev = await page.evaluate(() => window.__gameStore.getState().lastScript?.narration || '')
  await page.evaluate((t) => window.__gameStore.getState().setInput(t),
    'The mage waves a wand at the stove making it float while the witch stirs the pot and the caveman tries to eat the bread raw')
  await sleep(300)
  await page.click('button.btn-primary')

  await page.waitForFunction(
    (p) => { const s = window.__gameStore.getState(); return !s.isLoading && s.lastScript?.narration !== p },
    { timeout: 25000 }, prev
  )
  await sleep(3000)
  await page.screenshot({ path: `${DIR}/kitchen-specific.png`, fullPage: true })
  console.log('Got specific response')

  // Open in Chrome
  await browser.close()
  console.log('Done! Opening screenshots...')
}

run().catch(e => { console.error(e); process.exit(1) })
