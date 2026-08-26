# `play.html` — the standalone player

Fourth standalone file, same constraints as the other three: one HTML file, no
network of any kind, system fonts, opens from a double-clicked `file://` or
from a link, works offline.

It **was** slide 8 of `simulate.html`, and it is now the only place the Monte
Carlo exists at all — the deck dropped it. It exists because the session ends
and the argument does not:
someone who has just spent an afternoon being told that pushing everything to
the shelf is expensive wants to go and prove it to themselves, and they cannot
be handed a facilitator's deck to do that.

The link is given out at the end: the deck's last slide finishes with a QR
code to it, drawn as inline SVG — 33 modules at error-correction Q, about 3 cm
on a projected 2 m screen, which scans from the back of a room — with the URL
in text underneath for phones that will not.

Both are generated, not typed. If the URL ever moves, the code has to be
regenerated with it, and the check is to render the slide and decode the
picture rather than to read the source.

Deployed at `https://rgxsc.github.io/wheretostock/play.html`.

---

## 1. What is on the page

One card, one screen, no slides. Top to bottom:

1. **A sentence** saying what the thing does — thousands of random seasons per
   combination, averaged, so what you read is not one lucky season.
2. **Four controls**: bags in the collection (1–500), boutiques in the
   network (1–500), how concentrated the collection is, how concentrated the
   network is. These describe the world, and changing any of them means
   running again.
3. **Forecast error setup**, folded. Two spread sliders and two spikiness
   sliders, bag and boutique. Defaults 21% and 44% — the deck's, measured off
   the board.
4. **Run** and **Stop**, a progress bar, and a line counting seasons and
   combinations.
5. **The two prices**, in a box of their own: **cost of one bag** and **what
   flexible capacity costs**. Always visible, filled in before the first run,
   and captioned with the thing that makes them different from everything
   above — neither re-runs anything.
6. **Two matrices**, turnover and margin, target sell-through down the side
   and launch push across the top, directly under the prices that drive them.
7. **The read-out**: the best square, and what sharing the pool is worth at
   the premium currently set.

Nothing else. No export, no persistence, no localStorage — the same reasoning
as the deck: this is a thing to play with, not a game with results to collect.
`index.html` and `summary.html` own that.

**It has to work on a phone.** The deck hands this page out as a QR code on
its last slide, so most of the people who ever open it open it on a phone held
in one hand. Under 620px:

- the four world controls and the two matrices **stack** instead of sitting
  side by side;
- the matrices keep their real column widths and **scroll inside their own
  frame** — `.matrices > div { min-width: 0 }` is what stops a 700px table
  pushing the whole *page* sideways, which it did;
- **Run is sticky to the bottom** of the viewport, over a translucent bar with
  `env(safe-area-inset-bottom)` padding, so it is reachable while the inputs
  at the top of the page are being set rather than after a scroll back down.

`phonefit.mjs` checks all of that at 390×844 and 360×740: no page-level
horizontal scroll before or after a run, no element reaching past the viewport
that has no scrolling ancestor to absorb it, the matrix scrolling inside its
frame, the matrices stacked, and Run on screen while the inputs are in view.

## 2. Why the flex cost is a slider, and why it sits where it does

It was asked for as *"always visible, 0 to 30% of product cost, step of 5%"*,
and that is right for a reason worth writing down. Every other knob on this
page describes the **world** — how big the collection is, how wrong the
forecast is. The flex premium is the only one that describes **a deal you can
go and negotiate**. Someone playing alone will move the other sliders once and
this one twenty times, because the question they actually carry back to work
is *how much would I pay for this?*

Hiding it in a fold would have made the page's whole second argument optional.

It started life among the controls at the top, which was the wrong home for
the same reason. Up there it read as a world setting — something to choose
before pressing Run — and the cost of a bag, its natural pair, was a full
screen further down on the far side of the progress bar. Both are now in one
box directly above the matrices, because what they have in common is the point:
**neither of them re-runs anything.** They are arithmetic on sums already
accumulated, so the answer moves while you drag, and the box says so.

The premium is quoted off the cost the bag slider is set to, not off the
default. Side by side, *"+10% — a piece made late costs 220 € instead of
200 €"* under a slider reading 380 € is a visible contradiction.

Range 0–30% of the bag's cost, in steps of 5, default 10%. It never stops
paying inside that range — a piece drawn late costs at most 260 € and serves
1 000 € of demand — but the **best square moves at +15%**, from 90/30 to
80/30: dearer late capacity is answered by committing more up front. The
default sits one step below that switch, so the first nudge changes the answer
rather than a number. See `SIMULATE-SPEC.md` §4c for the sweep.

## 3. The engine

Lifted **verbatim** from `simulate.html`:

`heat`, `matrix`, `key`, `best`, `paretoShares`, `topShare`, `shapeSVG`,
`errParams`, `gauss`, `errDraw`, `normCdf`, `errQuantile`, `errDensity`,
`errShapeSVG`, `errHint`, `mcHints`, `readMC`, `mcStart`, `renderMC`.

Only four of those still exist in the deck — `heat`, `matrix`, `key`, `best`,
the ones that draw the matrix — and they are what `check-drift.mjs` now pins.
The other fifteen went with the Monte Carlo and are this file's alone.

Plus `WEEKS`, `ST_LEVELS`, `SP_LEVELS`, the formatters, the colour ramp, and a
trimmed `ECON` — `{ price:1000, cost:200, fixedPct:0.45 }`. The deck's
`F_BAG` / `D_BAG` / `F_TOTAL` are its hard-coded board and the Monte Carlo has
no use for them: it builds its own board from the sliders and computes the
fixed cost per run.

The model is specified in §6 below — the lognormal error, the half-central /
half-shared split of what is held back, the committed-versus-drawn accounting,
and why moving the premium does not re-run anything. It used to live in
`SIMULATE-SPEC.md`; it moved here when the deck dropped the Monte Carlo, so
there is still exactly one description of one model.

The only bespoke code is `init()`: the wiring. Same as the deck's, minus the
slide machinery, plus Enter to run.

## 4. Drift, and the check that catches it

Both files are self-contained by design. No imports, no build step. So the
engine exists twice and **nothing in a browser would ever notice the two
copies disagreeing**.

The failure that costs us is silent and public: the deck says 90/30 is the
best square, someone in the room opens the player on their laptop, and it says
something else.

```
node check-drift.mjs
```

at the repo root. It pulls each of the four still-shared functions out of both
files as text, normalises whitespace — the two files nest them differently —
and compares. Identical: `OK`, exit 0. Otherwise it names every
function that drifted or went missing and exits 1. No dependencies; it reads
the two HTML files as text.

**Run it after touching either file.** A model change is made in both, or it
is not made.

`play.html` was assembled from `simulate.html` by script rather than by hand,
for the same reason.

## 5. Deliberately absent

- **The rest of the deck.** Its five slides are a facilitator talking. Handed
  to someone alone they are a slideshow with no one presenting it.
- **The board.** The deck's 5×5 example exists so a room can follow one bag
  through one season. Alone, with sliders that go to 500, it would be a
  detour.
- **Export, persistence, results.** As above.
- **A shared engine file.** It would end the drift problem and break the
  constraint that has held since the first file: one HTML, no build, opens
  from a link. The check is the cheaper trade.

---

## 6. The model

Any board up to **500 bags × 500 boutiques**. Forecast shares are a power law
on each axis with a steepness slider, read back as *"the top fifth carries
X% of the forecast"* and drawn live: one bar per bag or boutique, biggest
first, with the cumulative share over the top. The bars alone say little once
the curve is steep — one item towers and the rest is a flat line — so it is
how fast the cumulative curve reaches the ceiling that shows the
concentration. Above sixty items the bars are pooled and the caption says so.

**The error.** One draw per bag and one per city, multiplied, and **lognormal**
— a forecast is missed by a multiplier, not a subtraction: a bag can sell three
times what was planned and can never sell less than none.

It used to be a flat draw over a typed min/max. That was not neutral. Holding
the mean and the spread fixed and swapping the flat draw for a lognormal moves
the **margin optimum a full step, 80%/30% to 90%/30%** — fat tails make deep
production a worse bet, because the extreme over-shoots are too big to cover
with stock anyway while the ordinary seasons cluster tighter. What does *not*
move under any shape tested: the push optimum stays at 30%, which is the claim
this page exists to make, and the turnover optimum stays at 60%/30%.

**Two knobs per axis, and they have to be independent or neither means
anything.** A plain lognormal cannot give both: pin its mean — which we must,
since the season is recentred to the same total and only relative error
survives — and one parameter is left, whose width and skew move together. So
the log-error is normal with a width that is itself drawn: the ordinary one
nine times in ten, `k` times wider the tenth.

| knob | what it sets |
|---|---|
| *typically wrong by* | the overall spread, as a coefficient of variation |
| *spikiness* | `k`. At 0 every bag is a little off; turned up, most land close and a few miss enormously |

The ordinary width is re-solved by bisection on each change so the overall
spread stays exactly where the first slider put it — move spikiness and only
the shape changes. Spikiness starts at 0 on both axes, a pure lognormal.

**The two spreads are not the same, and that is the point.** They are set to
what the deterministic board two slides back actually does, so the room is not
handed two different worlds. Measured on that board, demand as a multiple of
forecast:

| | multipliers | spread |
|---|---|---|
| per bag | 1.10 · 1.00 · 0.90 · 0.70 · 1.31 | **20%** |
| per boutique | 0.50 · 1.51 · 0.50 · 1.51 · 1.47 | **44%** |

So the defaults are **21% on the bag axis and 44% on the boutique axis**. Both
axes used to start at 21%, which left the placement error at half what the
room had just been shown. That matters more than it sounds: the push decision
is worth roughly the *square* of how wrong the placement is, so the axis read
1.33 M€ at 21% against 4.09 M€ at the board's own 44%. The best square is
90%/30% at every spread from 21% to 55%, so nothing else on the page moves —
only the size of the number the slide is making its case with.

One gap remains, deliberately. The board's boutique error is **polarised** —
0.50, 1.51, 0.50, 1.51, no one in the middle — and a lognormal is unimodal, so
it cannot reproduce that. At matched spread the polarised version costs about
35% more (7.7 M€ against 5.4 M€ on a ±50% test). The Monte Carlo is therefore
the conservative reading of the push decision, which is the safe direction for
a claim the page is trying to defend.

The curve is drawn live under each pair, on a **fixed** 0 to 2.6× axis: a range
that rescaled itself would make every setting look identical, and the point is
watching the shape move against a still axis. Its caption reads percentiles
rather than a standard deviation — *half the bags land between −15% and +13%
of forecast · one in a hundred is over +59%*. The far end is the 99th and not
the 95th: with the wide draw firing one time in ten, the 95th still sits inside
the ordinary lump and so *falls* as spikiness rises, which is the opposite of
what the slider does.

The whole block sits behind a `<details>` shut by default. Closed, the panel
reads as two board sizes and two concentrations, which is the teaching moment;
open, the error model is all there for whoever asks how the seasons are drawn.

The season total is still kept exactly on the forecast by rescaling, and the
range that actually resulted is reported on the slide along with the shape
(−69% to +216% per bag at the defaults).

**Speed.** The error model is separable — `d(i,j) = A(i)·B(j)` — and that
collapses the arithmetic. A boutique runs out of bag *i* exactly when its own
error term clears a threshold that depends on *i* alone, so sorting the
boutiques by that term once per season and keeping two prefix sums turns each
of the thirty combinations into a binary search instead of a sweep of the
network. Measured, 20-second budget:

| board | seasons | combinations |
|---|---|---|
| 500 × 500 | 31 000 | 1 240 000 |
| 200 × 200 | 75 000 | 3 000 000 |
| 40 × 40 | 469 000 | 18 760 000 |
| 5 × 5 | 4 640 000 | 185 700 000 |

A test checks the fast path against a plain bag-by-city loop over 480 random
cases; worst relative gap 2 × 10⁻¹⁵.

Quantities are continuous in this mode rather than whole bags — over 250 000
lines the rounding changes nothing and costs a great deal of time. Stated on
the slide.

## 7. Flexible capacity in the Monte Carlo

The deck puts flexibility on its deterministic board (`SIMULATE-SPEC.md` §4b).
This page carries the same idea at scale, on any board up to 500 × 500.

The Monte Carlo has its **own** season loop — nothing to do with `computeFlex`
— so the pool logic is folded into it rather than called. Per bag the central
pool splits in half: the bag's own reserve, and a share of one pool held by the
whole collection.

**It needs no second pass over the bags.** Only the TOTAL sold matters, so what
is still short after each bag has drawn on its own reserve, and the size of the
shared pool, both fold into scalars and meet once after the loop:

    drawn      = min(still short after own reserves, the shared pool)
    sold       = shelf + own reserves + drawn
    production = pushed + own reserves + drawn

So the run costs no more than it did before flexibility existed.

**The premium is a visible slider, 0 to 30% of unit cost in steps of 5,
defaulting to +10%.** It is never hidden behind a fold: what flexibility costs
is the whole argument, and tucking it away would make it look settled.

It sits **next to the cost of a bag, in a box of its own above the matrices**,
and not among the controls at the top. The two belong together and neither one
belongs with the rest: every other knob on the page describes the world and
changes what has to be simulated, while these two are read back off seasons
already played. Apart, the premium looked like a world setting — something you
choose before pressing Run — and the fact that it costs nothing to drag was
invisible. The box says so in one line.

Both read out **before the first run**, so the prices are legible while the
page is still being explained, and the premium is quoted **off the cost the
slider is actually set to**: at 380 € a bag, +10% is 418 € against 380 €, not
220 € against 200 €. That error was harmless while the two sliders were at
opposite ends of the card and is not once they are side by side.

Four sums are accumulated per square rather than two — committed, drawn, and
the same seasons played rigidly with their production. That keeps **both** the
unit-cost slider and the premium slider free: margin at any pair of values is
arithmetic on numbers already in hand, with nothing to re-run. The premium
changes the *cost* of flex and never the decision to draw it — a drawn unit
serves demand worth 1 000 € against at most 260 € at the top of the slider — so
the allocation is premium-independent and the accumulators stay valid as it
moves.

Measured on the default 40 × 40 board, from a single run re-read at each stop:

| premium | best square | margin | flexibility is worth | drawn late |
|---|---|---|---|---|
| +0% | 90/30 | 14.53M | +2.46M | 28% of production |
| **+10%** | **90/30** | **14.29M** | **+2.22M** | **28%** |
| **+15%** | **80/30** | 14.19M | +2.12M | 20% |
| +30% | 80/30 | 13.94M | +1.87M | 20% |

Two things the table is for. **The best square moves at +15%**, from 90/30 to
80/30: as late capacity gets dearer you commit more up front instead of relying
on it. The default sits one step below that switch, so a single nudge changes
the answer rather than merely changing a number. And flexibility never stops
paying inside the range — at +30% a late piece costs 260 € against 1 000 € of
revenue — which is honest rather than convenient, and worth saying if a room
asks where the break-even is.

Alongside the two matrices the slide states what the same seasons would have
earned rigidly, so the gain is a comparison and not an assertion.

**This slide also ships on its own**, as `play.html`, for participants to take
away — the slide ends with a QR code to it, inline SVG so the deck stays
self-contained, and the URL is spelled out underneath for anyone whose phone
will not scan from the back of the room. Regenerate the code if the URL moves — same engine, same sliders, no deck around it. See `PLAY-SPEC.md`, and
run `node check-drift.mjs` after any change to the model here: there is no
build step, so the engine exists twice and only that check notices when the
two copies disagree.

## 8. Cost of the bag

One slider, paired with the flexibility premium in the prices box above the
matrices (§7). It had a slide of its own; that slide
is gone, because the same lesson is already one drag away on a board the room
is looking at anyway.

Only the **margin** optimum can move: turnover does not contain the cost, so
its best square is fixed — which is the point worth making.

The slider costs nothing to move: average production per combination is kept
alongside average turnover, so margin at any other cost is arithmetic on
results already in hand. No re-run.
