# `simulate.html` — the fast-forward page

Third standalone file, same constraints as the other two: one HTML file, no
network, system fonts, runs from a double-clicked `file://`. Eight slides, a
sticky stage pill and one big **Next**; ← → and Enter also move.

The order is the game's: **the strategy is set before its consequences are
shown**, and each step gets its own slide so the before and the after are two
pictures rather than one table changing under you.

- **Slide 2** — the two sliders, and a table of where every piece goes: each
  bag's launch push spread across the five boutiques on that bag's own
  forecast row, and what stays in the warehouse.
- **Slide 3** — the real demand revealed, and what the launch push alone
  could serve. Nothing is called *turned away* here: before the warehouse has
  been asked, the gap is a quantity a boutique **needs sending**, not a lost
  sale. Nor is anything called *left over* — that is only true at the end.
- **Slide 4** — the same boutique table, opening exactly as slide 3 left it,
  and then *Use the warehouse stock*: **needed → sent → still missing**, three
  lines, so the room watches the loss shrink. Only then the two followed
  cases, and only then the whole-collection roll-up and the money.

Every table on those slides puts the **boutiques across the top** — the axis
they have on the board, on the demand matrix and on the placement table.

**The demand cell is three bars**, one under the other, on one scale across
the whole table so a big boutique looks big:

1. what was **forecast**;
2. what the season **actually asked for**;
3. what the **shelf could serve** — and this one alone is split in two, into
   the part that **sold** and then either the **gap** the warehouse still has
   to cover or the **surplus** already sitting in the boutique.

Only the third bar carries an outcome, so only the third bar has two colours.
Everything above it is a plan or a fact, and the comparison the room needs is
bar 3 against bar 2. Before the reveal, bar 1 is drawn and the other two are a
question mark.

**The totals add the cells; they never net one against another.** A shortage
in Tokyo is not cancelled by a surplus in Paris, because the stock cannot walk
there, and pretending it can is the exact error this slide exists to expose.
Netted, the season reads *71 short* and sounds like a volume problem. Added,
it reads **650 forecast, 650 demanded, 198 short and 127 spare** — the whole
argument of the page in one cell. The bag rows cross-check against the panel
underneath: Aveline's season shows −93 / +42, and the follow table below it
says *needed from the warehouse 93, left on the shelf 42*.

**One bag and two boutiques are followed across all three**, and they are
chosen from the setup rather than fixed, because the interesting pair moves
with the sliders. What is wanted is one boutique sitting on stock the season
did not want and one still missing sales after the warehouse has done all it
can; the over-push is the requirement, the remaining shortfall a preference.
At a light push neither exists — nothing is stranded and the warehouse covers
every gap — and both cards then read as successes, which is the lesson rather
than an empty slot. At 90/80 it lands on Aveline in Paris and Tokyo: given 65
and 54, asked for 40 and 101.

Every table on those slides keeps the boutique axis, because summing it away
is exactly where the thread the room is holding breaks.

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
60/30 are the modal winners and agree with the Monte Carlo, so nothing on
screen is wrong; but a room should be told the push is the finding and the
sell-through is the weaker half.

## 3. Why there is no artificial limit on central stock

With instant replenishment, holding stock back is never beaten on sales — the
axis floor of 30% push already returns exactly `min(demand, production)` per
bag, the theoretical maximum, because what is left central can go wherever the
season asks. The reference file hid this by never offering less than
50% push. This page does the opposite and shows it, because the honest finding
is more useful than a rigged optimum:

- The matrix says outright that centralising wins on **allocation**.
- The closing slide shows what it cannot fix. It is measured **where the
  margin actually peaks** — the argmax of the matrix on both axes, found
  rather than assumed — and says so in as many words: *"the margin peaked at
  90% sell-through and 30% push."* Even there, with every bag placed exactly
  where the season wanted it, **6 customers are turned away and 79 bags go
  unsold**.

  Both conversions are **written out** rather than left to the reader:
  *6 × 1 000 € = 6 000 € of sales never made* and *79 × 200 € = 15 800 €
  already spent*. The heading talks money and the table underneath counts
  bags, so a slide that prints only the two ends makes the room do the
  arithmetic in its head — at which point it has stopped making its point and
  started setting a puzzle.

  The slide ends on the question it raises, and nothing follows it. Every
  figure is computed from the two tables, so retuning the demand retunes the
  slide — the numbers above are what the shipped board currently gives.

Matrix squares are drawn in three tiers rather than a gradient — the best,
everything within 5% of it, and the rest — because what a room needs from
that table is where the good region is, not a reading of every square.

## 4. The Monte Carlo

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
one, and the concentration sliders, the matrix and the Monte Carlo are all
built on it, so the launch is placed on each boutique's forecast share exactly
as the rigid engine does. What is imported is the pool, not the placement.
Copying the flat split would have made the boutique forecast meaningless and
moved every number in the deck.

What it is worth, at each engine's own best combination:

| | best | made | sold | turned away | unsold | margin |
|---|---|---|---|---|---|---|
| rigid | 90 / 30 | 723 | 644 | 6 | 79 | 207k |
| **flexible** | **100 / 30** | **650** | **650** | **0** | **0** | **228k** |

**+21k, and production lands exactly on the forecast.** Rigid capacity forces
you to over-produce as insurance; flexible capacity lets you produce the plan
and flex the difference. It is the answer to the question the slide before it
ends on.

**Order.** The limit slide used to close the deck. It answers the warehouse
slide, so it now follows it, and flexibility answers the limit slide and
follows that; the matrix and the Monte Carlo come after, scaling an argument
that is already finished rather than interrupting it:

    the board · your combination · what the season asked for · and the
    warehouse · what central stock cannot do · what flexible capacity can ·
    every combination · large network

Moving the limit slide ahead of the matrix cost it one line of copy: it used
to say the margin *"peaked at 90% / 30%"*, crediting a matrix nobody had seen
yet. It now states the best the board allows, and the matrix proves it two
slides later.

**UI.** One slide, no new control. The engine needs none — the existing push
slider already sets the pool — so the deck's sell-through and push sliders
simply appear a third time and stay in step with the other two copies. Under
them, one table per bag (made · to the boutiques · its own reserve · into the
shared pool · real demand · still short) and two boxes side by side, rigid
against flexible, carrying the same four numbers each.

## 4c. Flexible capacity in the Monte Carlo

Slide 6 puts flexibility on the deterministic board. Slide 8 now carries the
same idea at scale, on any board up to 500 × 500.

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
away — same engine, same sliders, no deck around it. See `PLAY-SPEC.md`, and
run `node check-drift.mjs` after any change to the model here: there is no
build step, so the engine exists twice and only that check notices when the
two copies disagree.

## 5. Cost of the bag

One slider, on the Monte Carlo panel. It had a slide of its own; that slide is
gone, because the same lesson is already one drag away on a board the room is
looking at anyway.

Only the **margin** optimum can move: turnover does not contain the cost, so
its best square is fixed — which is the point worth making.

The slider costs nothing to move: average production per combination is kept
alongside average turnover, so margin at any other cost is arithmetic on
results already in hand. No re-run.

## 6. Deliberately absent

- ~~**Production flexibility.**~~ Now simulated — see §4b.
- **Any export or persistence.** This page is a demonstration, not a game with
  results to collect; the other two files own that.
- **Any counterfactual.** Every square is a season actually played out under
  the stated rules.
