const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1920, height: 1080 } });
  const page = await browser.newPage();
  
  // Navigate to team page
  await page.goto('https://ecreative.tw/team', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'team_full.png', fullPage: true });

  // Try to click a team member
  try {
    const avatar = await page.$('.people .item a');
    if (avatar) {
      await avatar.click();
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: 'team_clicked.png', fullPage: true });
    }
  } catch (e) {
    console.error('Error clicking team member:', e);
  }

  // Navigate to works page
  await page.goto('https://ecreative.tw/works', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'works_full.png', fullPage: true });

  // Try to hover and click a work item
  try {
    const worksItem = await page.$('.list .item .link');
    if (worksItem) {
      await worksItem.hover();
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: 'works_hover.png', fullPage: true });

      await worksItem.click();
      await new Promise(r => setTimeout(r, 3000));
      await page.screenshot({ path: 'works_clicked.png', fullPage: true });
    }
  } catch (e) {
    console.error('Error clicking works item:', e);
  }

  await browser.close();
  console.log('Screenshots captured successfully.');
})();
