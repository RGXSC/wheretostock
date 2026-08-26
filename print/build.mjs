/* HTML in, PDF out — one file per asset.

   The three print assets are authored as standalone HTML like everything else
   in this repo, and a print shop wants PDFs. This turns one into the other.
   It is the only build step in the project and it touches nothing the games
   use: index.html, summary.html, simulate.html and play.html are still opened
   straight from disk.

     node print/build.mjs

   Chromium comes from Playwright. If it is not installed, print the HTML from
   a browser instead - File > Print > Save as PDF, margins none, background
   graphics on - and you get the same pages.

   printBackground is not optional here: the notes ARE their colour blocks. */

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/* Playwright is normally installed globally rather than into this repo -
   there is no package.json here and there is not going to be one. ESM does
   not consult NODE_PATH, so ask npm where its global root is and resolve
   from there before giving up. */
async function loadChromium(){
  try{ return (await import('playwright')).chromium; }catch(e){}
  let root = '';
  try{ root = execSync('npm root -g', { encoding:'utf8' }).trim(); }catch(e){}
  if(root){
    try{ return (await import('file://' + join(root, 'playwright/index.mjs'))).chromium; }
    catch(e){}
  }
  console.error('playwright not found. Install it (npm i -g playwright) or print\n'
    + 'the three HTML files from a browser: margins none, background graphics on.');
  process.exit(1);
}
const chromium = await loadChromium();

const HERE = dirname(fileURLToPath(import.meta.url));
/* every asset here has a page count it is supposed to have - twelve for the
   six denominations front and back, two apiece for the cards and the sheet.
   A paragraph that grows by three lines silently becomes a third page
   otherwise, and nobody notices until the printer has run. */
const ASSETS = [
  { name:'money',  pages:12 },
  { name:'cards',  pages:2  },
  { name:'script', pages:2  }
];

const browser = await chromium.launch();
let bad = 0;
for(const { name, pages: want } of ASSETS){
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + join(HERE, name + '.html'));
  await page.waitForLoadState('networkidle');
  if(errs.length){ console.error(name + ': ' + errs.join(' | ')); process.exitCode = 1; }
  const out = join(HERE, name + '.pdf');
  await page.pdf({ path:out, format:'A4', printBackground:true,
                   preferCSSPageSize:true });
  await page.close();
  /* count the pages so a silent overflow cannot ship: every asset here has a
     page count it is supposed to have */
  const buf = readFileSync(out);
  const pages = (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  const okPages = pages === want;
  if(!okPages) bad++;
  console.log((okPages ? 'OK   ' : 'WRONG') + '  ' + name + '.pdf — ' + pages
    + ' pages' + (okPages ? '' : ', expected ' + want) + ', '
    + (buf.length / 1024).toFixed(0) + ' kB');
}
await browser.close();
if(bad){
  console.error('\n' + bad + ' asset(s) came out the wrong length. Something '
    + 'overflowed its page:\nopen the HTML, print-preview it, and trim.');
  process.exit(1);
}
