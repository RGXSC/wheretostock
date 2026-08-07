# `simulate.html` — the fast-forward page

Third standalone file, same constraints as the other two: one HTML file, no
network, system fonts, runs from a double-clicked `file://`. Seven slides, a
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
they have on the board, on the demand matrix and on the placement table. The
demand matrix uses one cell format throughout, inside the squares and down the
season column and along the bottom row, with a legend naming its three parts:
the forecast, the actual demand, the gap.

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
target sell-through, 1 000 € price, 200 € unit cost, fixed cost 45% of
forecast sales.

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

## 3. Why there is no artificial limit on central stock

With instant replenishment, holding stock back is never beaten on sales — the
axis floor of 30% push already returns exactly `min(demand, production)` per
bag, the theoretical maximum, because what is left central can go wherever the
season asks. The reference file hid this by never offering less than
50% push. This page does the opposite and shows it, because the honest finding
is more useful than a rigged optimum:

- The matrix says outright that centralising wins on **allocation**.
- The closing slide shows what it cannot fix: with 650 made against 650
  demanded and every bag shipped on demand, **34 customers are still turned
  away and 34 bags still go unsold** — 34 000 € of turnover that no logistics
  can reach. The slide opens on that figure and ends on the question it
  raises, and nothing follows it. Every figure on it is computed from the two
  tables, so retuning the demand retunes the slide.

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
the shape changes. Defaults 21% / 0 on both axes, which is a pure lognormal.

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

- **Production flexibility.** Teased in one sentence, never simulated.
- **Any export or persistence.** This page is a demonstration, not a game with
  results to collect; the other two files own that.
- **Any counterfactual.** Every square is a season actually played out under
  the stated rules.
