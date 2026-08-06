# `simulate.html` — the fast-forward page

Third standalone file, same constraints as the other two: one HTML file, no
network, system fonts, runs from a double-clicked `file://`. Seven slides, a
sticky stage pill and one big **Next**; ← → and Enter also move.

The order is the game's: **the strategy is set before its consequences are
shown**, and each step gets its own slide so the before and the after are two
pictures rather than one table changing under you.

- **Slide 2** — the two sliders, and a table of where every piece goes: each
  bag's launch push spread across the five boutiques on that bag's own
  forecast row, and what stays central.
- **Slide 3** — the real demand revealed, and what the launch push alone
  could serve. This is where the gaps appear.
- **Slide 4** — *Use the warehouse stock*: every gap the bag's own central
  pile can reach is filled, and what is still lost is what no logistics could
  have reached.

**One bag and two boutiques are followed across all three.** Aveline in Paris
and Tokyo, fixed rather than computed: the plan sends them almost the same
quantity — 65 and 54 — and the season asks Paris for 40 and Tokyo for 101.
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
4. **Nothing can be stranded in the wrong boutique.** That failure mode — the
   whole subject of the debrief's team panel — cannot happen here by
   construction, because of 2.

Unchanged: the five bags, thirteen weeks of forecast, production = forecast ÷
target sell-through, 1 000 € price, 200 € unit cost, fixed cost 45% of
forecast sales.

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

With instant replenishment, holding everything centrally is never beaten on
sales — 0% push gives exactly `min(demand, production)` per bag, the
theoretical maximum. The reference file hid this by never offering less than
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

**The error.** One flat draw per bag and one per city, multiplied. The typed
range cannot be honoured exactly *and* leave the season total on the forecast
unless it is symmetric — a flat −25/+100 has a mean of +37.5%. The page keeps
the total exact, rescaling each season, and reports the range that actually
resulted (−25/+60 typed comes back as about −46/+67). Stated on the slide.

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

On both boards, because the question applies to both.

Only the **margin** optimum can move: turnover does not contain the cost, so
its best square is fixed — which is the point worth making, and the page says
so. ★ marks the turnover optimum, ◆ the margin optimum, and ★ is drawn on the
margin matrix too so the gap between them is visible.

On the Monte Carlo board the slider costs nothing: average production per
combination is kept alongside average turnover, so margin at any other cost is
arithmetic on results already in hand. No re-run.

## 6. Deliberately absent

- **Production flexibility.** Teased in one sentence, never simulated.
- **Any export or persistence.** This page is a demonstration, not a game with
  results to collect; the other two files own that.
- **Any counterfactual.** Every square is a season actually played out under
  the stated rules.
