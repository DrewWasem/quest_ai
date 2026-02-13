import puppeteer from 'puppeteer'
function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }
async function run() {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1280, height: 900 } })
  const page = await browser.newPage()
  await page.goto('http://localhost:5174', { waitUntil: 'domcontentloaded', timeout: 60000 })
  await sleep(8000)
  await page.evaluate(() => window.__gameStore.getState().enterZone('mage-kitchen'))
  await sleep(3000)

  // Find all objects and measure bounding boxes near the table position
  const info = await page.evaluate(() => {
    const r3f = window.__r3f
    if (!r3f) return 'no r3f'
    const scene = r3f.store.getState().scene
    const results = []
    scene.traverse((obj) => {
      if (!obj.isMesh) return
      const wp = new window.THREE.Vector3()
      obj.getWorldPosition(wp)
      // Kitchen center is [-48, 0, 5], table is at [-1.5, 0, 1] relative = [-49.5, 0, 6]
      const dx = wp.x - (-49.5)
      const dz = wp.z - 6
      if (Math.abs(dx) < 3 && Math.abs(dz) < 3) {
        const box = new window.THREE.Box3().setFromObject(obj)
        results.push({
          name: obj.name,
          parent: obj.parent?.name || '',
          worldPos: { x: +wp.x.toFixed(2), y: +wp.y.toFixed(2), z: +wp.z.toFixed(2) },
          boxMin: { x: +box.min.x.toFixed(2), y: +box.min.y.toFixed(2), z: +box.min.z.toFixed(2) },
          boxMax: { x: +box.max.x.toFixed(2), y: +box.max.y.toFixed(2), z: +box.max.z.toFixed(2) },
        })
      }
    })
    return results
  })
  console.log(JSON.stringify(info, null, 2))
  await browser.close()
}
run().catch(e => { console.error(e); process.exit(1) })
