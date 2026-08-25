/* Does play.html still carry the deck's engine?

   play.html is the standalone player: slide 8 of simulate.html, lifted out so
   participants can open it from one link. Both files are self-contained by
   design - no imports, no build step - so the Monte Carlo engine exists twice
   and nothing in the browser would ever notice the two copies disagreeing.
   The failure that costs us is silent: the deck says one square is best, the
   player says another, in front of a room.

   Run it with `node check-drift.mjs` after touching either file. No
   dependencies; it reads the two HTML files as text.

   Whitespace and indentation are ignored - the two files nest the engine
   differently. Anything else is drift. */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

/* Every declaration in both files starts at column 0, so a function ends
   where the next one begins. Brace counting was tried first and is wrong:
   braces inside strings and regexes throw the count off. */
function pull(src, name, file){
  const start = src.search(new RegExp('^function ' + name + '\\s*\\(', 'm'));
  if(start < 0) return { file, name, missing:true };
  const rest = src.slice(start + 1);
  const nxt = rest.search(/^(?:function |const |let |var |\/\*)/m);
  const body = (nxt < 0 ? rest : rest.slice(0, nxt));
  return { file, name, code:('f' + body).replace(/\s+/g, ' ').trim() };
}

/* The engine: the shared maths, plus the two functions that read the controls
   and write the read-out. Anything named here has to stay identical. */
const SHARED = [
  'heat', 'matrix', 'key', 'best', 'paretoShares', 'topShare', 'shapeSVG',
  'errParams', 'gauss', 'errDraw', 'normCdf', 'errQuantile', 'errDensity',
  'errShapeSVG', 'errHint', 'mcHints', 'readMC', 'mcStart', 'renderMC',
];

const deck = readFileSync(join(HERE, 'simulate.html'), 'utf8');
const play = readFileSync(join(HERE, 'play.html'), 'utf8');

const drifted = [], missing = [];
for(const name of SHARED){
  const a = pull(deck, name, 'simulate.html'), b = pull(play, name, 'play.html');
  if(a.missing || b.missing){ missing.push([a, b].filter(x => x.missing)); continue; }
  if(a.code !== b.code) drifted.push(name);
}

for(const pair of missing) for(const m of pair) console.log('MISSING  ' + m.name + ' in ' + m.file);
for(const name of drifted) console.log('DRIFTED  ' + name);

if(!drifted.length && !missing.length){
  console.log('OK  ' + SHARED.length + ' shared functions, identical in both files');
  process.exit(0);
}
console.log('\nThe two copies of the engine disagree. Fix the odd one out, or if the\n'
          + 'change is deliberate, make it in both files.');
process.exit(1);
