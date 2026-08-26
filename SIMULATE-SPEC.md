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
| 3 | **spotlight**: that bag's **whole row** — five boutiques and its season |
| 4 | **all twenty-five**, and nothing else on the screen |
| 5 | **spotlight**: the grand total, over a board already filled in |
| 6 | **the warehouse answers** — green eats into red, in place |

**The order of the last three is the whole argument in miniature.** The grand
total used to be stop 3 of the walk, spotlit while every other cell still read
`?` — a sum on screen before any of the detail that makes it, which is exactly
the reasoning the slide exists to attack. The board is filled first now, and
the total is read off it.

**Stop 3 is a row, not a cell**, because two single cells do not settle it. A
shortage in one boutique and a surplus in another are only obviously the same
problem once they are seen in **one bag, at one moment** — Aveline planned 244,
asked for 268, and underneath that 93 nobody could buy and 42 sitting where
nobody wants them. The stock cannot walk from Paris to Tokyo. That is the
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
cell of it.** Three cards of about thirty words, then twenty-five cells the
room already knows how to decode — and it then reads them as a *pattern*, an
amber column under Paris and New York against a red one under Tokyo and
Shanghai, instead of as a wall of numbers. That is the beat the three-slide
version never reached, because the room was still decoding cell one.

**The stops are derived, never written down.** The argmax gap, the argmax
surplus, and then the whole row of whichever bag the first stop landed in. At
90/80 that resolves to Aveline in Tokyo (−47), Aveline in Paris (+25) and the
Aveline row — but a facilitator who moved a slider on the previous slide would
otherwise be walking the room through cells that are no longer the story, and
at 90/30 they are not.

Each card also names **where the next press goes**, and it is a different
place three times: another cell, then all twenty-five, then the warehouse.
Saying "the next one" on the last stop sent the room hunting for a fourth
cell; saying "for all twenty-five" on the grand total promised something
already on the screen behind it.

**The last beat draws the warehouse ON the table just read**, not as a second table.
Every red segment splits where it stands: the covered part turns green, the
rest stays red, the delta re-labels from −47 to −20. **Not one amber segment
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
carries **one figure per segment** on a line of its own under the bars:

    ▬▬▬▬▬▬▬▬▬▬▬   73        grey    the plan
    ▬▬▬▬▬▬       101        navy    what it asked for
    ▬▬▬▄▄▄▄
                  54 +27 −20        navy · green · red

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

**The bars are 10px**, and there is nothing under the grid to make room for
(below). At 6px a bar made of three segments and two gaps is not a bar, it is
a smudge.

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
Netted, the season reads *71 short* and sounds like a volume problem. Added,
it reads **650 planned, 650 demanded, 198 short and 127 spare** — the whole
argument of the page in one cell.

**One bag and two boutiques are followed under the grid**, chosen from the
setup rather than fixed, because the interesting pair moves with the sliders.
What is wanted is one boutique sitting on stock the season did not want and
one still missing sales after the warehouse has done all it can. At a light
push neither exists — nothing is stranded and the warehouse covers every gap —
and both cards then read as successes, which is the lesson rather than an
empty slot. At 90/80 it lands on Aveline in Paris and Tokyo: given 65 and 54,
asked for 40 and 101.

Every table on the page puts the **boutiques across the top** — the axis they
have on the board, on the demand grid and on the placement table — because
summing that axis away is exactly where the thread the room is holding breaks.

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
   lead time and no guessing. When two boutiques are short of the same bag and
   the central pile cannot cover both, it is split in proportion to what each
   is short of — which decides where the sale happens, not how many there
   are. In reality that is one to three days against a bag that sells once a
   fortnight, so it is close to true. The consequence is that this page is the
   **upper bound** of what central stock can ever be worth.
3. **Five cities, not two** — Paris, Tokyo, New York, Shanghai, London — and
   each carries its own forecast. The launch push follows **each bag's own
   forecast row**, not one network-wide share applied to the whole collection,
   so the naive-equal-split error of the main game is removed and only the
   demand error is left.
4. **Stock can still be stranded — that is what the second decision buys.**
   Instant replenishment removes the *lead time*, not the placement error: the
   warehouse refills a boutique that runs out, but it cannot take back what
   was already pushed. A bag sitting in a boutique the season does not want is
   stuck there while another turns customers away. At the margin optimum,
   pushing 30% rather than 100% is worth **122 sales — 122 000 €**, and that
   is the entire slope of the push axis.

Unchanged: the five bags, thirteen weeks of forecast, production = forecast ÷
target sell-through, 1 000 € price, 200 € unit cost. The fixed cost is 45% of
forecast sales **rounded up to the nearest 10 000** — 300 000 € here and
120 000 € in the game — so the briefing carries a round number instead of a
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

Forecast **650** = 2 per city per bag per week × 13 × 5 × 5. Split across the
collection 37.5 / 30 / 15 / 12.5 / 5 % (the shape of the reference file the
brief was based on) and across the network 30 / 25 / 20 / 15 / 10 %.

The launch-push axis runs **30% to 100%** in steps of ten. It does not start
at zero: no boutique opens a launch with an empty window, and the same floor
is used in the game.

Real demand is hard-coded and also totals **650**. That is the point of the
whole page: **the volume call was right**, and every error is in the spread.

Per bag it is a clean ladder — Aveline +10%, Bastide 0%, Calanque −10%,
Doriane −30%, Estérel +30%. The two worst forecasts sit on the two smallest
bags and the biggest seller is not the one that runs hot; put +30% on the
leader instead and one whole row of the matrix carries the answer.

Per boutique it is ±50% with **no one in the middle** — Paris and New York
halve, Tokyo and Shanghai run 50% over, London 45% over, and Tokyo overtakes
Paris. That width is not decoration. With a mild boutique error the warehouse
covers every gap and the launch push is worth nothing until it reaches 100%;
at ±50% it is worth 123 000 €, and the optimum narrows from twenty-one
squares to three.

**"Three" is this draw, not this design.** The matrix is one hard-coded
season, and that season is tighter than almost any other of the same
construction. Redrawn 4 000 times at the error the board itself carries — 21%
per bag, 44% per boutique — the count of squares within 5% of the best runs:

| | squares within 5% |
|---|---|
| the shipped board | **3** |
| a typical season | **10** (median) |
| 10th–90th percentile | 5 – 16 |

So the shipped season is tighter than nine seasons in ten. Quote the three as
what this board does, not as how sharply the setup discriminates.

**Which half of the answer to lean on.** Over the same 4 000 redraws, the two
axes are not equally solid:

| | per-season winner |
|---|---|
| best margin | 90/30 **48%** · 80/30 24% · 100/30 9% · 90/40 6% · 70/30 3% |
| best turnover | 60/30 **59%** · 60/40 10% · 60/50 5% |

The **push** half is robust: some `x/30` square wins in **84%** of seasons and
`x/40` in a further 6%, so *hold stock central* survives essentially every
draw — which is the claim this page exists to make. The **sell-through** half
is a coin-flip between neighbours: 90% is the modal answer but wins only about
half the time, with 80% behind it a quarter of the time. The board's 90/30 and
60/30 are the modal winners and agree with the Monte Carlo in `play.html`, so
nothing on screen is wrong; but a room should be told the push is the finding and the
sell-through is the weaker half.

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
  allows is 90% sell-through and 30% push."* Even there, with every bag placed
  exactly where the season wanted it, **6 customers are turned away and 79
  bags go unsold**.

  Both conversions are **written out** rather than left to the reader:
  *6 × 1 000 € = 6 000 € of sales never made* and *79 × 200 € = 15 800 €
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
that table is where the good region is, not a reading of every square.

## 4. The Monte Carlo — moved out

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
    flex    = pool − central     joins ONE pool shared by all five

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

**One thing deliberately not copied.** The original splits the launch *flat*
across its five stores, because it has no store-level forecast to split by:
equal placement against unequal demand is its lesson. This board does have
one, and every table on the page is built on it, so the launch is placed on
each boutique's forecast share exactly as the rigid engine does. What is imported is the pool, not the placement.
Copying the flat split would have made the boutique forecast meaningless and
moved every number in the deck.

What it is worth, at each engine's own best combination:

| | best | made | sold | turned away | unsold | margin |
|---|---|---|---|---|---|---|
| rigid | 90 / 30 | 723 | 644 | 6 | 79 | 199 400 € |
| **flexible** | **100 / 30** | **650** | **650** | **0** | **0** | **220 000 €** |

**+20 600 €, and production lands exactly on the forecast.** Rigid capacity
forces you to over-produce as insurance; flexible capacity lets you produce
the plan and flex the difference. It is the answer to the question the beat
before it ends on — which is why the two share a slide.

Both margins are read off the page's own `run()` and `computeFlex()`. They
were quoted as 207k and 228k for a while: 7 500 € high on each row, which is
exactly the fixed-cost rounding this spec documents in §2 — 45% of forecast
sales is 292 500 € and the file rounds it up to 300 000 €. A table copied
before a rounding change stays wrong quietly, so these are re-derived rather
than remembered.

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
them, one table per bag (made · to the boutiques · its own reserve · into the
shared pool · real demand · still short) and two boxes side by side, rigid
against flexible, carrying the same four numbers each.

## 6. Deliberately absent

- ~~**Production flexibility.**~~ Now simulated — see §4b.
- ~~**The Monte Carlo.**~~ Moved to `play.html` — see §4.
- **Any export or persistence.** This page is a demonstration, not a game with
  results to collect; the other two files own that.
- **Any counterfactual.** Every square is a season actually played out under
  the stated rules.
- **A way to skip the spotlight walk in one press.** A facilitator behind
  schedule will want one. They cannot have it: the whole point of the walk is
  that the twenty-five-cell grid is unreadable until you can read one cell,
  and landing a room on it un-taught is worse than the three slides this
  replaced. The beat strip in the topbar shows the cost up front instead.
- **Auto-playing reveals.** Considered and dropped. Animating the demand and
  the warehouse over two seconds each would save presses, but it takes the
  pacing away from the person who can see the room.
