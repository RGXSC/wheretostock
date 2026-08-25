# `play.html` — the standalone player

Fourth standalone file, same constraints as the other three: one HTML file, no
network of any kind, system fonts, opens from a double-clicked `file://` or
from a link, works offline.

It is **slide 8 of `simulate.html` on its own**, plus flexible capacity and a
price for it. It exists because the session ends and the argument does not:
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
2. **Five controls, always visible**: bags in the collection (1–500),
   boutiques in the network (1–500), how concentrated the collection is, how
   concentrated the network is, and **what flexible capacity costs**.
3. **Forecast error setup**, folded. Two spread sliders and two spikiness
   sliders, bag and boutique. Defaults 21% and 44% — the deck's, measured off
   the board.
4. **Run** and **Stop**, a progress bar, and a line counting seasons and
   combinations.
5. **Two matrices**, turnover and margin, target sell-through down the side
   and launch push across the top, with the cost-of-a-bag slider above them.
6. **The read-out**: the best square, and what sharing the pool is worth at
   the premium currently set.

Nothing else. No export, no persistence, no localStorage — the same reasoning
as the deck: this is a thing to play with, not a game with results to collect.
`index.html` and `summary.html` own that.

## 2. Why the flex cost is a slider and not a fold

It was asked for as *"always visible, 0 to 30% of product cost, step of 5%"*,
and that is right for a reason worth writing down. Every other knob on this
page describes the **world** — how big the collection is, how wrong the
forecast is. The flex premium is the only one that describes **a deal you can
go and negotiate**. Someone playing alone will move the other sliders once and
this one twenty times, because the question they actually carry back to work
is *how much would I pay for this?*

Hiding it in a fold would have made the page's whole second argument optional.

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

Plus `WEEKS`, `ST_LEVELS`, `SP_LEVELS`, the formatters, the colour ramp, and a
trimmed `ECON` — `{ price:1000, cost:200, fixedPct:0.45 }`. The deck's
`F_BAG` / `D_BAG` / `F_TOTAL` are its hard-coded board and the Monte Carlo has
no use for them: it builds its own board from the sliders and computes the
fixed cost per run.

The model itself is specified in `SIMULATE-SPEC.md` §4, §4b and §4c — the
lognormal error, the half-central / half-shared split of what is held back,
the committed-versus-drawn accounting, and why moving the premium does not
re-run anything. None of it is restated here, because two descriptions of one
model is exactly the failure this file is at risk of.

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

at the repo root. It pulls each of the nineteen shared functions out of both
files as text, normalises whitespace — the two files nest the engine
differently — and compares. Identical: `OK`, exit 0. Otherwise it names every
function that drifted or went missing and exits 1. No dependencies; it reads
the two HTML files as text.

**Run it after touching either file.** A model change is made in both, or it
is not made.

`play.html` was assembled from `simulate.html` by script rather than by hand,
for the same reason.

## 5. Deliberately absent

- **The rest of the deck.** Slides 1–7 are a facilitator talking. Handed to
  someone alone they are a slideshow with no one presenting it.
- **The board.** The deck's 5×5 example exists so a room can follow one bag
  through one season. Alone, with sliders that go to 500, it would be a
  detour.
- **Export, persistence, results.** As above.
- **A shared engine file.** It would end the drift problem and break the
  constraint that has held since the first file: one HTML, no build, opens
  from a link. The check is the cheaper trade.
