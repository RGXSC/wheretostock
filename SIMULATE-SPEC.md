# `simulate.html` — the fast-forward page

Third standalone file, same constraints as the other two: one HTML file, no
network, system fonts, runs from a double-clicked `file://`. **Five slides**, a
sticky stage pill, a dot per slide and one big **Next**; ← → and Enter also
move. Some slides own more than one press, and the strip beside the pill shows
how many they still owe.

The order is the game's: **the strategy is set before its consequences are
shown**.

| | slide | presses |
|---|---|---|
| 1 | The board | 1 |
| 2 | Your combination | 1 |
| 3 | **The season** | 7 |
| 4 | **The limit, and what flexibility can** | 2 |
| 5 | Every combination | 1 |

It was eight slides. Three of them — the demand, the warehouse and the limit —
showed three tables that were four-fifths the same picture, and a room reading
the second one spent its first ten seconds working out whether anything had
changed. A fourth, the Monte Carlo, has moved out of the deck entirely and now
lives in `play.html`, which is what participants are given at the end anyway
(`PLAY-SPEC.md`).

## The board is the game's (November 2026)

The deck used to play a board of its own: five boutiques, 650 pieces, a
forecast weighted across the collection and the network. It made the argument
well and it had one cost — **no figure on it could be put beside a figure the
room had just produced**. A team that finished the game at +61 000 € had
nothing to compare that with on a slide that talked about 199 400 €.

It now plays **the game's own board**: the same five bags, Paris and Tokyo,
the same forecast (2 per boutique per bag per week — 26 a cell, 260 in all),
the same season (the game's weekly demand table summed: Paris 49 / 41 / 34 /
10 / 37, Tokyo 19 / 16 / 13 / 26 / 15), the same 120 000 € of fixed cost, and
the game's launch split (the share placed at launch is halved between the two
boutiques and each half rounded to a piece — `placeAtLaunch`, one function for
the rigid engine and the pool, mirroring the game's `splitStock`).

What that buys: **the deck's margin on a square is the margin of that square
played perfectly in the game.** All thirty squares the game offers (targets
60–100, 30–90% in the boutiques) were played in the game itself with perfect
foresight; the two grids are identical, to the euro. The room reads the matrix
on slide 5 as *what our square could have made* — and the distance to its own
result as the price of not knowing where demand would land.

| in the boutiques | 60% | 70% | 80% | 90% | 100% |
|---|---|---|---|---|---|
| 30% | 53 | 66 | **72** | **72** | 67 |
| 50% | 53 | 66 | **72** | **72** | 67 |
| 80% | 53 | 61 | 63 | 60 | 51 |
| 100% | 48 | 50 | 46 | 37 | 31 |

(margin, k€, rigid capacity; the 100% row is the deck's alone — the game stops
at 90%.) 80% and 90% tie at 72 000 €; the deck names the first it finds, 80/30,
which is also the game's documented optimum.

`check-drift.mjs` now compares the two files: boutiques, bag names, each
cell's forecast and each cell's demand against the game's table summed. The
week-by-week **shape** belongs to the game alone and can change freely — it
did, the same month, when the best sellers were made to sell earlier — but the
season totals cannot change in one file only.

**The five-boutique deck is kept**, complete and working, with the spec that
explains it: `archive/simulate-five-boutiques.html` and
`archive/SIMULATE-SPEC-five-boutiques.md`. Everything that spec says about why
the season slide is built the way it is still holds here; the sections below
keep that reasoning and carry this board's figures. What did not survive the
move is the study of how typical the five-boutique season was (4 000 redraws,
"three squares within 5%"): it described that board and stays with it.

**Two things changed in the layout because a cell is now twice as wide.** The
outcome figures sit **beside** the third bar instead of on a line under it
(`WIDE_CELLS`): 22px a row, six rows, and the whole board — totals included —
fits a 1536 × 800 screen without scrolling.

**Slide 2's placement table is on one fixed ruler** (November 2026): every
bar — made, Paris, Tokyo, warehouse — is measured against the most one bag can
ever be made (87, at a 60% target), not against the largest cell on screen.
On the old relative scale every combination filled the columns to the same
length and a 60% target looked exactly like 100%; on a fixed ruler a low
target draws long bars and a high one short ones, which is the decision. The
columns have fixed widths, so nothing moves sideways as the sliders move. And the two ringed cells stay on
the bag the spotlight walked through: with ten cells instead of twenty-five,
rings that land on Estérel straight after three beats on Aveline read as a new
subject nobody introduced.

## The stock bar (November 2026)

**Under "In the boutiques at launch", on slides 4 and 5, one bar in three
parts: in the boutiques · in the warehouse · in the production pool.** All
five bags together, in pieces.

The pool was only ever a sentence and a table column, and a room kept hearing
it as a second warehouse. Drawn beside the other two it is *seen* to be carved
out of what is held back — half of it — and it is **hatched**, because it is
line time and not stock: nothing in it exists until a shortage calls on it.
Its key says so in four words, *made only if needed*.

- **Slide 4** (flexible capacity): the pool is the subject, so the bar always
  shows it. At 90/80: 230 · 30 · 30.
- **Slide 5** (every combination): the bar follows the **pool switch**. Off,
  the warehouse holds everything not placed (230 · 60 · 0, the third key
  greyed *pool off*); on, half of the warehouse becomes the pool in front of
  the room. It is there while squares are being chosen; **once all forty are
  played, the sliders, the two buttons and the bar go** — there is nothing
  left to choose — and the matrices move up under the switch.

**The pool switch is a real on/off toggle**, big — 70 px, the name at 21 px
and an OFF / ON pill beside it — in a row of its own between the controls and
the matrices, so it appears (after two squares) without moving the button under
the facilitator's hand. With the field full it is the only control on the
slide. The outline on the last square tested goes too: with nothing being
tested, it pointed at something nobody on screen could explain.

The figures are `computeFlex`'s own totals, so the bar cannot disagree with
the table or the matrix beneath it. Proportions are `flex-grow`, so the three
parts always fill the track whatever the rounding and a part worth nothing
takes no room. The nodes are built once and then updated: replacing them on
every drag of a slider would restart the width transition each time.

No percentages on it. 230 of 290 is 79.3%, and a bar reading *79%* under a
slider reading *80%* starts an argument about rounding in the one place the
slide wants an argument about pools.

**The answer card comes up to the top.** On slide 4 the flexible-capacity card
opens *below* the question it answers, which on a laptop is below the fold:
the beat changed and the room was left looking at the same table, greyed.
`showAnswerCard()` scrolls it up under the top bar; the question is one flick
of the wheel above.

## The season slide, beat by beat

**One table is built once and transformed in place.** The block *below* the
grid is replaced at every beat, never appended: three slides at least gave the
room three clean resets at the top of the screen, and a merged slide that only
grows would be strictly worse than what it replaced.

| beat | what is on screen |
|---|---|
| 0 | **the plan** — one grey bar a cell, a grey `?` where the outcome will go |
| 1 | **spotlight**: the worst shortage on the board, opened alone |
| 2 | **spotlight**: the biggest surplus, opened alone |
| 3 | **spotlight**: that bag's **whole row** — both boutiques and its season |
| 4 | **the whole board** — ten cells — and nothing else on the screen |
| 5 | **spotlight**: the grand total, over a board already filled in |
| 6 | **the warehouse answers** — green eats into red, in place |

**The headings say what is spotlit** (November 2026): *One bag in one
boutique*, then — derived from the two stops — *Another bag in the same
boutique*, *The same bag in the other boutique* or *Another bag in the other
boutique*, then *One bag, both boutiques*. They were "One boutique" and "One
more boutique", written for five boutiques; on this board the two stops are
mostly both in Paris (Aveline short, Doriane left over), and "one more
boutique" was false. The surplus card then makes the point that board offers:
*"23 Dorianes went to Paris, which asked for 10. 13 are sitting there while,
in the same boutique, Aveline ran out."* Amber is captioned **"sitting where
nobody wants it"** everywhere — it was "sitting in the wrong boutique", which
a heavy push makes untrue (Doriane over in both cities at once).

**The order of the last three is the whole argument in miniature.** The grand
total used to be stop 3 of the walk, spotlit while every other cell still read
`?` — a sum on screen before any of the detail that makes it, which is exactly
the reasoning the slide exists to attack. The board is filled first now, and
the total is read off it.

**Stop 3 is a row, not a cell**, because two single cells do not settle it. A
shortage in one boutique and a surplus in another are only obviously the same
problem once they are seen in **one bag, at one moment** — Aveline planned 52,
asked for 68, and underneath that 26 the shelves could not serve and 4 sitting
where nobody wants them. The stock cannot walk from Paris to Tokyo. That is the
sentence the grand total then generalises.

**Nothing sits under the grid until beat 5.** Beat 4 used to carry the
followed bag boutique by boutique — given at launch, demand, sold, needed from
the warehouse, left on the shelf — and the grid above now says every one of
those things for all five bags instead of one. It was also the only reason a
900 × 1440 screen had to scroll: the grid is 542px, that table was 322px, and
the beat now lands at exactly 900. Beat 5 keeps what the grid genuinely cannot
show — what the two followed boutiques cost in money, what was made against
what reached a shelf, and the P&L.

**The walk exists because a dense grid is unreadable until you can read one
cell of it.** Three cards of about thirty words, then a board the room already
knows how to decode — and it then reads it as a *pattern*, a red column under
Paris against an amber one under Tokyo, with Doriane the one row that runs the
other way, instead of as a wall of numbers. That is the beat the three-slide
version never reached, because the room was still decoding cell one.

**The stops are derived, never written down.** The argmax gap, the argmax
surplus, and then the whole row of whichever bag the first stop landed in. At
90/80 that resolves to Aveline in Paris (−26), Doriane in Paris (+13) and the
Aveline row. On this board the first two are the same cells at every setting
that strands anything; at the four that strand nothing (80/30, 90/30, 100/30,
100/40) the second stop is the cell the forecast got closest to — Doriane in
Tokyo, planned 26 and asked for 26, *"the one we got exactly right"*, whose
shelf still ran short because most of the bag never left the warehouse.

Each card also names **where the next press goes**, and it is a different
place three times: another cell, then the whole board (*"for all ten"*), then
the warehouse. Saying "the next one" on the last stop sent the room hunting
for a fourth cell; saying "for all of them" on the grand total promised
something already on the screen behind it.

**The last beat draws the warehouse ON the table just read**, not as a second table.
Every red segment splits where it stands: the covered part turns green, the
rest stays red, the delta re-labels from −26 to −14. **Not one amber segment
moves**, because central stock cannot un-place what has already shipped —
which is the argument the old slide had to make in prose.

## The demand cell

Three bars on one scale across the whole table so a big boutique looks big:

1. what was **planned**;
2. what the season **actually asked for**;
3. **what happened to that demand** — served off the shelf, sent from the
   warehouse, still missing — and then any **surplus** past the end of it.

Bar 3 is bar 2 recoloured. Blue + green + red always sums to exactly the
demand above it, and amber is the only thing that can ever stick out past its
end. That is the single rule the whole grid rests on, and it is what the first
spotlight card teaches.

**Every figure is the colour of the bar it counts**, and the outcome row
carries **one figure per segment**:

    ▬▬▬▬▬▬         26        grey    the plan
    ▬▬▬▬▬▬▬▬▬▬▬   49        navy    what it asked for
    ▬▬▬▬▬▄▄▄▄▄▄   23 +12 −14        navy · green · red

(With five boutiques a cell was 170px wide and the three figures needed a line
of their own under the bars; with two they sit beside the third bar.)

The one that costs money — red or amber — is set large, and those large
figures line up down the right edge of every cell, so the table still scans as
a field of red and amber from five metres.

Three things had to be got wrong first to arrive here. The outcome row used to
print **one** figure beside a bar made of two or three segments, so a reader
could not tell which part it counted or why there was only one of it. Above
the bars there was a big signed delta as well, which was that same cost figure
printed a second time. And putting the figures beside the bars left them 46%
of a 170px column to live in — `54 +27 −20` and `−93 +42` do not fit in eighty
pixels, so the last column painted its surplus out past the edge of the table
and lost it. Their own line, right-aligned across the whole cell, is what made
three figures possible at all.

**A total drops the figure for what it sold**, because it is on the row above
it in every cell that made it up, and a total can carry a shortage *and* a
surplus — four figures where a cell wants three. What the warehouse **sent**
is never dropped: a green segment with no green figure beside it is exactly
the failure this line exists to fix.

**The bars are 16px and the three of them sit flush**, with the whitespace
between cells rather than between the bars inside one cell. There is nothing
under the grid to make room for (below), and the slide had 150px of unused
space beneath the table at 1400×940. At 6px a bar made of three segments and
two gaps is not a bar, it is a smudge; at 10px it was legible and no more.
Flush rows also group the three bars as one reading, which is what they are.
With five boutiques the cost was a grid of 929px, which a 1280×800 screen
scrolled; with two, and the figures beside the bars, the whole board fits
1536×800 and scrolls about 20px on its busiest beat.

## The season's arithmetic closes on screen

Turnover and Margin used to sit side by side with nothing between them, so the
one sum the slide exists to explain could not be checked: 238 000 € became
60 000 € and a room had to take it on trust. The two deductions are now shown
between them, in the order the notes move — **fixed cost, then what was made**
— set smaller than the two ends, because they are the working and not the
answer.

Every figure in that row, and in the game's P&L, is derived from `ECON`. They
were string literals: retuning `fixedPct` to 0.30 left the game's P&L still
claiming "about 45%" beside a charge of 80 000 €.

**And the copy names the rounding.** "About 45% of forecast sales" is checkable
and lands somewhere else — 45% of the game's forecast is 117 000 € exactly,
the charge is 120 000 €, so a room doing the sum the sentence invites finds a
number the game never charges. Both the briefing and the P&L now say
*"45% of forecast sales, rounded up"*, which reconciles.

## Red is not the same claim on both sides of the warehouse

Before the warehouse ships, red is what the **shelf** could not serve — and
the warehouse is about to cover a good part of it. Only after it has shipped
is red genuinely a customer nobody could serve.

The deck used to caption it *"nobody could buy"* from the first beat, and the
walk card told the room those customers were *"walking out of the door"* at
1 000 € each — writing off sales the deck then spends a whole beat saving. On
this board the spotlit cell goes from −26 to −14 once the warehouse answers:
nearly half the loss the card had already booked.

Everything that names it now branches on `whUsed`:

- the legend reads **"the shelf could not serve"** before, **"nobody could
  buy"** after;
- the walk card says the shelf could not serve them — *"26 the shelf could
  not serve — if nothing reaches them. The warehouse has not shipped yet."*
  The **price is not quoted here at all**: at 1 000 € a head it needed a hedge
  to stay true, and the hedge made the sentence hard to read. The figure
  belongs to the beat that can actually charge it;
- the whole-board lead says the warehouse has not shipped and how much it
  is still holding;
- the row and total cards say *"the shelves could not serve"*.

The amber claim is unchanged and stays absolute, because it is: the warehouse
can answer a shortfall and can do nothing at all about stock already sitting
in the wrong boutique.

`r7precise.mjs` sweeps every pre-warehouse beat of five combinations — thirty
(combination, beat) pairs — for any wording that writes the sale off.

## The colours

Four roles, one hex each, named once in `:root` so a bar, its number, the ring
round its cell and the legend can never disagree. The previous version wrote
five hex codes inline inside a template string, where the legend could — and
did — drift away from them.

| | | |
|---|---|---|
| `--plan` | `#9aa7b3` grey | the forecast: a plan, not an outcome |
| `--real` | `#1b3a57` navy | what the season asked for, and the part we served |
| `--miss` | `#c0341a` red | customers who found nothing — 1 000 € each, never earned |
| `--spare` | `#d8901f` amber | stock where nobody wants it — 200 € each, already spent |

Green (`--good`) keeps its one existing meaning, *something worked*, and
appears in the grid only at beat 5, only inside a segment that was red a
moment earlier.

**Amber and not green for surplus**, deliberately. Green already means
*achieved* everywhere else on the page — the best square in the matrix, stock
successfully shipped, a focus card that reads "nothing stranded" — and
painting stranded stock green would tell the room the surplus was a success,
which is the exact misreading the limit beat exists to destroy. Red is revenue
never earned, amber is cash already spent: two different kinds of bad, and the
five-fold gap between 1 000 € and 200 € is the point.

It also survives colour-blind viewing and greyscale, which red-against-green
would not: the two differ in lightness as well as hue, every delta carries a
sign, and position disambiguates anyway — red only ever sits *inside* the
demand bar, amber only ever extends *past* its end.

**The totals add the cells; they never net one against another.** A shortage
in Tokyo is not cancelled by a surplus in Paris, because the stock cannot walk
there, and pretending it can is the exact error this slide exists to expose.
Netted, the season reads *30 short* and sounds like a volume problem. Added,
it reads **260 planned, 260 demanded, 72 short and 42 spare** — the whole
argument of the page in one cell.

**Nothing follows the grid but the roll-up and the P&L.** A pair of focus
cards used to sit there, restating one bag's two interesting boutiques in
words and a big number. Once the grid taught the room to read a cell — the
spotlight walk, the figures per segment, the taller bars — the cards were
saying in prose what two cells of the table above were already saying in
colour. The two cells those cards were about stayed **ringed** on the grid for
a while after the cards went — pointing, on most combinations, at a bag the
walk had not opened, with nothing on screen to say why (November 2026: "what
is the highlight on Doriane for?"). The rings are gone; the spotlight walk is
what points at cells now.

Every table on the page puts the **boutiques across the top** — the axis they
have on the board, on the demand grid and on the placement table — because
summing that axis away is exactly where the thread the room is holding breaks.

## The spotlight card shows the colour, it does not name it

The cards used to say *"Grey is the plan … Navy is what the season actually
asked for … 40 red"*, which asks a room looking at a bar to translate a colour
word back into that bar. Each card now carries **a swatch of the segment
itself**, built from the same class names as the bars, so there is one palette
and no second list of hexes to drift.

The swatches are 26×11px — bar-shaped, not dots — and each carries a 1px
hairline, because the card sits on near-black `--ink` and `--real` navy would
otherwise be invisible on it.

Two traps, both hit on the way here.

**A swatch that is not the colour on screen.** The first version offered green
for "served off the shelf" while the third bar is still navy at that beat —
green only appears once the warehouse ships, two beats later.

**Two swatches of the same colour in one card.** The served part of bar 3 *is*
the same navy as bar 2, so chipping both put two identical blocks in one
paragraph, which reads as a mistake even though it is true. Position separates
them in the grid; nothing separates them in prose. The card now says what bar 3
is — *"the third bar is that one again, cut where the shelf ran out"* — and
carries the red chip only. **One colour, one chip, per card.**

`swatch.mjs` (a Playwright harness in the session scratchpad, not shipped in
the repository — as with every `*.mjs` named in this spec) checks all 228
swatches across the three cards of all forty
combinations against the classes actually drawn in the cells each card points
at, that no card repeats a colour, and that no card names a colour in words.

## The spotlight

The same trick the game's step-by-step guide uses: dim the page, cut a hole
over one cell, put a card beside it. Renamed to `.spot-mask` / `.spot-hole` /
`.spot-card` on the way in, because `.hint` was already taken in this file and
pasting the game's rules verbatim would have turned eight form captions into
fixed black bubbles.

Every position is measured from live rects and re-measured on a resize, a
scroll and a `ResizeObserver` — positioning once at open time leaves the hole
where the target used to be. `#spot-root` stays a direct child of `<body>`:
all three layers are `position:fixed`, so any ancestor that gained a transform
would reparent them silently and the hole would land nowhere.

**Clicking the dimming advances the walk rather than dismissing it.** The mask
is a full-viewport click target above the page; a facilitator driving with the
mouse must never be able to leave the beat state disagreeing with what is on
screen.

**The card is placed against the viewport minus the footbar.** Treating the
whole window as free space put the card over Back and Next at 800px tall —
the two controls the facilitator is actually using. Checked at 1280×800,
1366×768, 1440×900 and 1920×1080: on screen, clear of its own hole, clear of
the footbar, hole above the fold.

## Getting out of the way

**Back un-beats before it leaves the slide.** With one internal step per slide
a facilitator who overshot could live with re-entering at the end; on a
six-beat slide they cannot, and the walk could never be replayed live.

**The board slide has a way past it.** It is worth reading once; a facilitator
running this for the fifth time wants the argument, not the introduction, so
`Skip to the season` jumps straight there on the defaults.

**A different combination is a different season.** Moving any slider resets
the season slide to beat 0 — re-entering it half-revealed, under numbers the
room has never seen, is worse than starting it again.

---


## 1. What is different from the game and the debrief

Everything below is a deliberate change, and each one is stated on the page:

1. **There are no weeks.** The thirteen weeks collapse into one shot: a single
   demand number per bag per city for the whole season. No decision is taken
   during the season — the two setup numbers decide everything.
2. **The warehouse replenishes instantly and perfectly.** A boutique that runs
   out is resupplied the moment it does, always from the right pile, with no
   lead time, no weekly shipping maximum and no guessing. When two boutiques are short of the same bag and
   the central pile cannot cover both, it is split in proportion to what each
   is short of — which decides where the sale happens, not how many there
   are. In reality that is one to three days against a bag that sells once a
   fortnight, so it is close to true. The consequence is that this page is the
   **upper bound** of what central stock can ever be worth.
3. **Stock can still be stranded — that is what the second decision buys.**
   Instant replenishment removes the *lead time*, not the placement error: the
   warehouse refills a boutique that runs out, but it cannot take back what
   was already pushed. A bag sitting in a boutique the season does not want is
   stuck there while the other one turns customers away. At the margin optimum
   (80%), pushing 30% rather than 100% is worth **26 sales — 26 000 €**, and
   that is the entire slope of the push axis.

The board itself is **no longer a difference**: since November 2026 it is the
game's (above). The five-city network is in the archive.

Unchanged: the five bags, thirteen weeks of forecast, production = forecast ÷
target sell-through, 1 000 € price, 200 € unit cost. The fixed cost is 45% of
forecast sales **rounded up to the nearest 10 000** — 120 000 € here as in
the game, and `play.html` applies the same rule (`check-drift.mjs`
pins it across all three) — so the briefing carries a round number instead of a
spreadsheet output. Safe to round, and worth knowing why: the fixed cost is a
constant in the objective, so it moves the level of every square and the
choice of none. Swept from 0 to 90% of forecast sales, the best combination
never budged.

Leftover stock is worth **nothing** — the margin writes it off at full cost
with no recovery, and the board says so in as many words. It is not a detail:
zero salvage is what makes over-producing expensive and puts the optimum
where it is. Stating only that the unit cost is paid "whether it sells or
not" leaves room to read the stock as still carrying value, and a team that
reads it that way over-produces on purpose. The assumption holds the answer
until salvage passes roughly **178 € of the 200 €** — under that, the
optimum does not move at all.

## 2. The board

Forecast **260** = 2 per boutique per bag per week × 13 × 2 × 5 — the game's,
flat: 26 in every cell.

The launch-push axis runs **30% to 100%** in steps of ten. It does not start
at zero: no boutique opens a launch with an empty window, and the same floor
is used in the game. The game stops at 90%; the deck keeps the 100% row,
because *everything in the boutiques* is the end of the argument and the pool
has nothing to work with there (the two engines agree on that whole row).

Real demand is hard-coded — the game's weekly table summed — and also totals
**260**. That is the point of the whole page: **the volume call was right**,
and every error is in the spread.

Per bag: Aveline +30%, Bastide +10%, Calanque −10%, Doriane −30%, Estérel on
the forecast. Per boutique: Paris takes 171 of the 260 against 130 planned,
Tokyo 89. Four bags sell 2.6 times more in Paris than in Tokyo and Doriane
does the reverse, so whatever is placed at launch — split equally, as in the
game — is half in the wrong city. That is what gives the launch push its
price: 26 000 € at the optimum, and from 72 000 € down to 46 000 € along the
80% column.

## 3. Why there is no artificial limit on central stock

With instant replenishment, holding stock back is never beaten on sales — the
axis floor of 30% push already returns exactly `min(demand, production)` per
bag, the theoretical maximum, because what is left central can go wherever the
season asks. The reference file hid this by never offering less than
50% push. This page does the opposite and shows it, because the honest finding
is more useful than a rigged optimum:

- The matrix says outright that centralising wins on **allocation**.
- **The first beat of slide 4** shows what it cannot fix. It is measured
  **where the margin actually peaks** — the argmax over both axes, found
  rather than assumed — and says so in as many words: *"The best this board
  allows is 80% sell-through and 30% push."* Even there, with every bag placed
  exactly where the season wanted it, **3 customers are turned away and 68
  bags go unsold**. (90/30 ties with it at 72 000 € — 10 turned away, 40
  unsold; the beat shows the first the search finds.)

  Both conversions are **written out** rather than left to the reader:
  *3 × 1 000 € = 3 000 € of sales never made* and *68 × 200 € = 13 600 €
  already spent*. The heading talks money and the table underneath counts
  bags, so a beat that prints only the two ends makes the room do the
  arithmetic in its head — at which point it has stopped making its point and
  started setting a puzzle.

  It ends on the question it raises — *how could we do better, without impact
  on the margin?* — and the **next beat of the same slide** answers it. That
  is why the two are no longer two slides. Every figure is computed from the
  two tables, so retuning the demand retunes the beat; the numbers above are
  what the shipped board currently gives.

Matrix squares are drawn in three tiers rather than a gradient — the best,
everything within 5% of it, and the rest — because what a room needs from
that table is where the good region is, not a reading of every square. A paler red pair mirrors the greens at the bottom (November 2026): the
worst square, and every square in the lowest quarter of the range on screen,
drawn only once three or more squares are filled. The reds are lighter than
the greens on purpose, so the eye still lands on the good region first; they
only mark what to avoid. play.html shares the same rule (`check-drift.mjs`).

## 4. The Monte Carlo — moved out, and handed over

**The last slide ends by giving the player away.** A QR code and the URL, under
*"Play a full season yourself"* — an instruction, not a label. It used to sit
on its own slide; it belongs at the end of the matrix, because the matrix is
where a room starts wanting to change something the deck cannot change.

It is read off a phone, so `play.html` has a phone layout — `PLAY-SPEC.md` §1.


It was slide 8 and it is now the whole of `play.html`. A twenty-second
simulation is the wrong thing to make a room watch when the same page is
handed to every participant at the end, and the deck was carrying five hundred
lines of engine to run it once.

The model — the lognormal forecast error, the Pareto concentration of the
collection and the network, the fast path, the accumulators that let both
price sliders re-read a finished run — is specified in `PLAY-SPEC.md` §6.

## 4b. Flexible capacity

The engine is the one from the original push/pull simulator this work grew
out of, ported to this board.

Per bag, everything held back from the launch splits in two:

    pool    = production − pushed to the boutiques
    central = ceil(pool / 2)     this bag's OWN reserve
    flex    = pool − central     joins the SHARED CAPACITY POOL

Sales resolve in three waves: shelf stock, then the bag's own reserve, then
the shared pool — which serves whichever bag turns out to need it, because it
was never assigned to one.

The rule that makes it matter:

    production = pushed + own reserves + flex ACTUALLY drawn

Capacity reserved and never called on is **never manufactured, so never
paid for**. Reserving costs nothing; only using it does, at the same 200 € as
everything else. There is **no premium**. That is the original's model, and it
is why the gain is as large as it is — worth saying out loud rather than
leaving someone to find it.

**The vocabulary is fixed, and it says *production*.** What a bag keeps for
itself is its **warehouse** — a real place with real stock in it. What the
five share is the **shared production capacity pool**: a slot on the line,
assigned to no bag, holding nothing. Called just "the pool" or "its reserve",
a room hears a second warehouse full of stock, which is the one thing it is
not. The heading carries a small factory mark for the same reason.

The split is written **50%**, never "half": a room hears "half" as a rough
proportion and "50%" as a rule, and this one is a rule.

**The pool is attributed per bag, not just totalled.** The table said what
each bag put *into* the pool and what it was *still short* — which left the
pool itself invisible, since nothing on screen showed it being used. It now
carries two columns, **Into the production pool** and **Drawn from the pool**,
and the last column is **Still lost**: what the pool could not cover. The
column before them is **Its own warehouse**. The summary line names who took
what.

The pool is drawn against total shortage, so a bag's share of it is
apportioned by **largest remainder**:

    drawn_i = floor(short_i × used / short_total), then the leftover units go
              to the largest fractional parts

Integer floors alone lose units and the columns stop summing. `poolswitch.mjs`
checks, over all forty combinations, that the drawn column sums to exactly the
pool used, that `drawn + lost = short` per bag, and that no bag draws more
than it was short.

**A switch on the last slide, over the whole field.** The pool is argued on
one combination on slide 4; on slide 5 an on/off switch — *production capacity
pool, 50% of everything not in the boutiques at launch* — re-reads every square
that has been played. It exists because the interesting fact is not that the
numbers go up, it is what happens to the best square. The read-out names the
rigid optimum and then quotes the move **in money**: on this board 80/30 →
100/30 is worth 1 400 € (86 600 € → 88 000 €), 1.6% of the margin and over
the half-percent threshold, so it says the pool **moves the answer** and why.
(On the five-boutique board the move was worth 400 € on 220 000 €, and the
sentence says *nudges* in that case: the value is the pool, not the move.) See
"Two claims, worth very different amounts" in `PLAY-SPEC.md`.

**Which way it moved is computed, not written.** Production is `F ÷
sell-through`, so a *higher* target is *less* made: this board's move commits
**170 up front instead of 215** — 80 in the boutiques and 90 in the
warehouses, against 100 and 115 — and lets the pool make the difference, 90
pieces instead of 52. The first version of that sentence said "you can hold
more back once holding it back stops being a bet" — exactly backwards on the
board it was written for, and it shipped. The clause is now chosen from the
two optima, because the model goes both ways: `play.html` on a 5×5 collection
moves 90/30 → **80/30** instead, where reserving more is what pays.

The switch never plays a square nobody played. It re-reads the cache; it does
not fill it. And there is no second cache: `computeFlex` is deterministic and
costs a few hundred operations, so forty squares re-read instantly and there
is nothing to fall out of step with the rigid cache.

**The launch is placed as the game places it.** The original push/pull
simulator splits the launch *flat* across its stores; the five-boutique deck
split it on each boutique's forecast share instead. On the game's board the
two are the same thing — every boutique is forecast the same — and the rule is
the game's own, to the piece: the launch share is halved and each half
rounded (`placeAtLaunch`). Both engines call that one function, so the two
seasons in the side-by-side differ by the pool and by nothing else; they used
to round the same launch two different ways.

What it is worth, at each engine's own best combination:

| | best | made | sold | turned away | unsold | margin |
|---|---|---|---|---|---|---|
| rigid | 80 / 30 | 325 | 257 | 3 | 68 | 72 000 € |
| **flexible** | **100 / 30** | **260** | **260** | **0** | **0** | **88 000 €** |

**+16 000 €, and production lands exactly on the forecast.** Rigid capacity
forces you to over-produce as insurance; flexible capacity lets you produce
the plan and flex the difference. It is the answer to the question the beat
before it ends on — which is why the two share a slide.

Both margins are read off the page's own `run()` and `computeFlex()`, on the
default combination too: 90/80 makes 60 000 € rigid and 67 000 € with the pool
(30 pieces of line time, all 30 called on — Aveline 14, Bastide 8, Estérel 5,
Calanque 3). A table copied before a change of board or of rounding stays
wrong quietly, so these are re-derived rather than remembered.

**Order.** The limit answers the warehouse, so it follows it; flexibility
answers the limit, so it shares its slide; and the matrix comes last, scaling
an argument that is already finished rather than interrupting it:

    the board · your combination · the season · the limit and what
    flexibility can · every combination

Moving the limit ahead of the matrix cost it one line of copy: it used to say
the margin *"peaked at 90% / 30%"*, crediting a matrix nobody had seen yet. It
now states the best the board allows, and the matrix proves it on the screen
after.

**UI.** One slide, no new control. The engine needs none — the existing push
slider already sets the pool — so the deck's sell-through and push sliders
simply appear a third time and stay in step with the other two copies. Under
the push slider, the **stock bar** (above): boutiques · warehouse · production
pool. Under them, one table per bag (committed · to the boutiques · its own
warehouse · into the production pool · drawn from the pool · real demand ·
still lost) and two boxes side by side, rigid against flexible, each headed by
**turnover and margin** side by side at the same size — the pool sells more
*and* earns more, and a box showing the margin alone hid the first half — then
the same four counts each.

## 6. Deliberately absent

- ~~**Production flexibility.**~~ Now simulated — see §4b.
- ~~**The Monte Carlo.**~~ Moved to `play.html` — see §4.
- **Any export or persistence.** This page is a demonstration, not a game with
  results to collect; the other two files own that.
- **Any counterfactual.** Every square is a season actually played out under
  the stated rules.
- **A way to skip the spotlight walk in one press.** A facilitator behind
  schedule will want one. They cannot have it: the whole point of the walk is
  that the grid is unreadable until you can read one cell,
  and landing a room on it un-taught is worse than the three slides this
  replaced. The beat strip in the topbar shows the cost up front instead.
- **Auto-playing reveals.** Considered and dropped. Animating the demand and
  the warehouse over two seconds each would save presses, but it takes the
  pacing away from the person who can see the room.
