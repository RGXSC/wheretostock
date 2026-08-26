/* Do the deck and the player still draw the same chart?

   play.html is the standalone player. It began as slide 8 of simulate.html,
   lifted out so participants could open it from one link; the deck has since
   dropped the Monte Carlo entirely, so the simulation engine now lives in
   play.html alone and there is nothing left to drift about it.

   What the two files still share is the MATRIX: the same grid of
   sell-through against launch push, drawn by the same four functions. Both
   files are self-contained by design - no imports, no build step - so those
   four exist twice and nothing in a browser would ever notice the copies
   disagreeing. The failure that costs us is silent: the deck's grid and the
   player's grid shade the same number differently, in front of a room.

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

/* What genuinely still exists in both files. The other fifteen went with the
   Monte Carlo when the deck dropped it - they are play.html's alone now, and
   listing them here would only report them missing for ever.

   `heat` has no caller in simulate.html and has not had one for a while. It
   stays in both files and stays on this list on purpose: it is the colour
   ramp the matrix would use, and letting a dead copy drift is how you get a
   surprise the day something calls it again. */
const SHARED = ['heat', 'matrix', 'key', 'best'];

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
