const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

;(async () => {
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1920, height: 1080 } })
  const page = await browser.newPage()
  
  await page.goto('https://ecreative.tw/works', { waitUntil: 'networkidle2' })
  await new Promise(r => setTimeout(r, 2000))
  await page.screenshot({ path: 'works_stealth_full.png', fullPage: true })

  // Try to find a work item and hover it
  const items = await page.$$('.item')
  if (items.length > 0) {
    await items[0].hover()
    await new Promise(r => setTimeout(r, 1000))
    await page.screenshot({ path: 'works_stealth_hover.png', fullPage: true })

    await items[0].click()
    await new Promise(r => setTimeout(r, 3000))
    await page.screenshot({ path: 'works_stealth_click.png', fullPage: true })
  }

  await page.goto('https://ecreative.tw/team', { waitUntil: 'networkidle2' })
  await new Promise(r => setTimeout(r, 2000))
  await page.screenshot({ path: 'team_stealth_full.png', fullPage: true })

  const teamItems = await page.$$('.item')
  if (teamItems.length > 0) {
    await teamItems[0].click()
    await new Promise(r => setTimeout(r, 2000))
    await page.screenshot({ path: 'team_stealth_click.png', fullPage: true })
  }

  await browser.close()
  console.log('Stealth capture complete')
})()
