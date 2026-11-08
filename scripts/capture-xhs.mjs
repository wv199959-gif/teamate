import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';

const sections = [
  ['01-cover', 'top'],
  ['02-background', 'story'],
  ['03-positioning', 'value'],
  ['04-usage-flow', 'journey'],
  ['05-key-pages', 'page-showcase'],
  ['06-trust-rules', 'rules'],
  ['07-roadmap', 'roadmap'],
  ['08-closing', 'closing'],
];
const singlesDir = 'dist/xhs-single';
const pairsDir = 'dist/xhs-pairs';
await fs.mkdir(singlesDir, { recursive: true });
await fs.mkdir(pairsDir, { recursive: true });

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1440 }, deviceScaleFactor: 2 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);

  const imageBuffers = [];
  for (const [name, sectionId] of sections) {
    const section = page.locator(`#${sectionId}`);
    await section.waitFor({ state: 'visible', timeout: 20000 });
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    const capture = await section.screenshot({ animations: 'disabled', scale: 'device' });
    const output = await sharp(capture)
      .resize(1080, 1440, { fit: 'contain', background: '#f3e9dc' })
      .png()
      .toBuffer();
    await fs.writeFile(path.join(singlesDir, `${name}.png`), output);
    imageBuffers.push(output);
  }

  const pairs = [
    ['01-cover-and-background', 0],
    ['02-positioning-and-flow', 2],
    ['03-pages-and-rules', 4],
    ['04-roadmap-and-closing', 6],
  ];
  for (const [name, start] of pairs) {
    const output = await sharp({ create: { width: 1080, height: 2880, channels: 3, background: '#f3e9dc' } })
      .composite([
        { input: imageBuffers[start], left: 0, top: 0 },
        { input: imageBuffers[start + 1], left: 0, top: 1440 },
      ])
      .png()
      .toBuffer();
    await fs.writeFile(path.join(pairsDir, `${name}.png`), output);
  }
} finally {
  await browser.close();
}

