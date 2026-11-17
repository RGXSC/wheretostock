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
const game = readFileSync(join(HERE, 'index.html'), 'utf8');

/* THE FIXED-COST RULE lives in all three engines and in none of the shared
   functions, so the check above cannot see it. It is 45% of forecast sales
   ROUNDED UP to the nearest 10 000 - the rounding is what turns 117 000 into
   the 120 000 a briefing can say out loud.

   play.html took the raw product for a while, so the SAME 650-unit board cost
   292 500 there and 300 000 in the deck: a 7 500 € disagreement between two
   pages shown in one session. Nothing in a browser notices, which is exactly
   why it is pinned here. */
const RULE = /Math\.ceil\(\s*ECON\.fixedPct\s*\*\s*\w+\s*\*\s*ECON\.price\s*\/\s*10000\s*\)\s*\*\s*10000/;

const ENGINES = [['index.html', game], ['simulate.html', deck], ['play.html', play]];
const unrounded = ENGINES.filter(function(e){ return !RULE.test(e[1]); });
/* Guard the guard. A pattern that matches nothing would report every engine
   as unrounded, and one that matched everything would report none - either
   way the check would be theatre. If NO engine matches, the pattern is what
   broke, not the engines. */
if(unrounded.length === ENGINES.length)
  console.log('PATTERN  no engine matches the fixed-cost rule at all — the check\'s\n'
            + '         regex is probably what needs updating, not the engines');

/* THE SEASON. Since November 2026 the deck plays the game's own board: the
   same five bags in the same two boutiques, each cell's forecast the game's
   two pieces a week, and each cell's demand the game's weekly table summed
   over the season. That is what lets a room put its own result beside the
   deck's figures - and it is two literals in two files, which nothing in a
   browser compares. The week-by-week SHAPE belongs to the game alone and can
   change freely; the season totals cannot change in one file only. */
function literal(src, name, open, close){
  const at = src.search(new RegExp('^const ' + name + ' = \\' + open, 'm'));
  if(at < 0) return null;
  const from = src.indexOf(open, at), to = src.indexOf('\n' + close + ';', from);
  if(to < 0) return null;
  try{ return new Function('return (' + src.slice(from, to + 2) + ')')(); }catch(err){ return null; }
}
const seasonOff = [];
{
  const gameBags = literal(game, 'BAGS', '[', ']'), gameDemand = literal(game, 'DEMAND', '{', '}');
  const deckBags = literal(deck, 'BAGS', '[', ']'), deckDemand = literal(deck, 'DEMAND', '[', ']');
  const deckForecast = literal(deck, 'FORECAST', '[', ']');
  const weeks = Number((game.match(/^const WEEKS = (\d+);/m) || [])[1]);
  const stores = (game.match(/^const STORES = \{\s*A:'([^']+)',\s*B:'([^']+)'\s*\};/m) || []).slice(1);
  const boutiques = (deck.match(/^const BOUTIQUES = \[([^\]]*)\];/m) || ['', ''])[1]
    .split(',').map(function(x){ return x.trim().replace(/^'|'$/g, ''); }).filter(Boolean);
  const sum = function(a){ return a.reduce(function(x, y){ return x + y; }, 0); };
  if(!gameBags || !gameDemand || !deckBags || !deckDemand || !deckForecast || !weeks || stores.length !== 2){
    seasonOff.push('could not read the two boards — the check\'s parsing is probably what needs updating');
  }else{
    if(boutiques.join('/') !== stores.join('/'))
      seasonOff.push('boutiques: the deck has ' + boutiques.join(', ') + ', the game ' + stores.join(', '));
    if(deckBags.length !== gameBags.length)
      seasonOff.push('bags: the deck has ' + deckBags.length + ', the game ' + gameBags.length);
    gameBags.forEach(function(b, i){
      const d = gameDemand[b.key];
      if(!d || !deckBags[i] || !deckDemand[i] || !deckForecast[i]) return;
      if(deckBags[i].name !== b.name)
        seasonOff.push('bag ' + (i + 1) + ': the deck calls it ' + deckBags[i].name + ', the game ' + b.name);
      const want = [sum(d.A), sum(d.B)];
      if(d.A.length !== weeks || d.B.length !== weeks)
        seasonOff.push(b.name + ': the game\'s table does not have ' + weeks + ' weeks');
      if(deckDemand[i].join('/') !== want.join('/'))
        seasonOff.push(b.name + ' demand: the deck has ' + deckDemand[i].join(' / ')
                     + ', the game\'s season sums to ' + want.join(' / '));
      if(deckForecast[i].join('/') !== [2 * weeks, 2 * weeks].join('/'))
        seasonOff.push(b.name + ' forecast: the deck has ' + deckForecast[i].join(' / ')
                     + ', the game plans ' + 2 * weeks + ' per boutique');
    });
  }
}

const drifted = [], missing = [];
for(const name of SHARED){
  const a = pull(deck, name, 'simulate.html'), b = pull(play, name, 'play.html');
  if(a.missing || b.missing){ missing.push([a, b].filter(x => x.missing)); continue; }
  if(a.code !== b.code) drifted.push(name);
}

for(const pair of missing) for(const m of pair) console.log('MISSING  ' + m.name + ' in ' + m.file);
for(const name of drifted) console.log('DRIFTED  ' + name);

for(const e of unrounded)
  console.log('UNROUNDED  ' + e[0] + ' does not round the fixed cost up to the nearest 10 000');

for(const line of seasonOff) console.log('SEASON  ' + line);

if(!drifted.length && !missing.length && !unrounded.length && !seasonOff.length){
  console.log('OK  ' + SHARED.length + ' shared functions, identical in both files');
  console.log('OK  ' + ENGINES.length + ' engines apply the same fixed-cost rule');
  console.log('OK  the deck plays the game\'s season, bag by bag and boutique by boutique');
  process.exit(0);
}
if(drifted.length || missing.length)
  console.log('\nThe two copies of the engine disagree. Fix the odd one out, or if the\n'
            + 'change is deliberate, make it in both files.');
if(seasonOff.length)
  console.log('\nThe fast-forward deck plays the game\'s own season so that a room can\n'
            + 'compare its result with the slides. Change the season totals in\n'
            + 'index.html (DEMAND) and simulate.html (DEMAND, FORECAST) together.');
if(unrounded.length)
  console.log('\nThe fixed cost is 45% of forecast sales rounded UP to the nearest\n'
            + '10 000, and every engine has to apply it — otherwise the same board\n'
            + 'costs different money on two pages shown in the same session.');
process.exit(1);
