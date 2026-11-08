import { chromium } from 'playwright';

const pages = ['plaza', 'detail', 'publish', 'join', 'orders', 'profile', 'org', 'messages', 'review'];
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });

try {
  for (const pageId of pages) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 3 });
    page.on('pageerror', error => console.error(`[${pageId}]`, error.message));
    await page.goto(`http://127.0.0.1:4173/?page=${pageId}`, { waitUntil: 'domcontentloaded' });
    const phone = page.locator('.screen-stage .phone');
    await phone.waitFor({ state: 'visible', timeout: 20000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1200);
    await phone.screenshot({ path: `dist/readme-images/${pageId}.png`, animations: 'disabled', scale: 'device' });
    await page.close();
  }
} finally {
  await browser.close();
}

