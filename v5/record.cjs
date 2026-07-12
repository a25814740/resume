const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder')

;(async () => {
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1920, height: 1080 } })
  const page = await browser.newPage()
  const recorder = new PuppeteerScreenRecorder(page)
  
  await recorder.start('works.mp4')
  console.log('Recording works...')
  await page.goto('https://ecreative.tw/works', { waitUntil: 'networkidle2' })
  // wait for loading screen to disappear
  await new Promise(r => setTimeout(r, 6000))

  // Simulate mouse drag from right to left
  const mouse = page.mouse
  await mouse.move(1000, 500)
  await mouse.down()
  await mouse.move(500, 500, { steps: 50 })
  await mouse.up()
  await new Promise(r => setTimeout(r, 2000))

  // hover item
  const items = await page.$$('.item')
  if (items.length > 0) {
    await items[0].hover()
    await new Promise(r => setTimeout(r, 2000))
    await items[0].click()
    await new Promise(r => setTimeout(r, 5000))
  }
  await recorder.stop()

  const recorderTeam = new PuppeteerScreenRecorder(page)
  await recorderTeam.start('team.mp4')
  console.log('Recording team...')
  await page.goto('https://ecreative.tw/team', { waitUntil: 'networkidle2' })
  await new Promise(r => setTimeout(r, 6000))

  const teamItems = await page.$$('.item')
  if (teamItems.length > 0) {
    await teamItems[0].hover()
    await new Promise(r => setTimeout(r, 2000))
    await teamItems[0].click()
    await new Promise(r => setTimeout(r, 5000))
  }
  await recorderTeam.stop()

  await browser.close()
  console.log('Done')
})()
