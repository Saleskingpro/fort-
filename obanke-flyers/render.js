// Renders each flyer HTML to a PNG at 2x (2160x2700). Usage: node render.js group-flyer zobo-flyer
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  for (const name of process.argv.slice(2)) {
    await page.goto('file://' + path.join(__dirname, name + '.html'));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(__dirname, name + '.png') });
    console.log('rendered', name);
  }
  await browser.close();
})();
