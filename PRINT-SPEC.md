# `print/` — the things that go on the table

Three assets that exist on paper, not on screen: the money, the pick cards and
the facilitator's sheet. Each is authored as one standalone HTML file with the
same rules as the games — no network, no build step, opens from a double-click
— and `print/build.mjs` turns each into its own PDF for the print shop.

```
print/money.html   → money.pdf    12 pages   6 denominations, fronts and backs
print/cards.html   → cards.pdf     2 pages   7 pick cards, fronts and backs
print/script.html  → script.pdf    2 pages   how to run the cash
print/build.mjs                              node print/build.mjs
```

`build.mjs` is the only build step in the repository and it touches nothing the
games use. It also **asserts the page count** of every asset and exits 1 if one
is wrong: a paragraph that grows by three lines otherwise becomes a third page
silently, and nobody finds out until fifty sheets have run.

---

## 1. Why the money exists

The write-off is the whole point of the session and it is the hardest line to
feel. On a screen it is a number in a table that a room reads and nods at. In
notes it is a stack that a team counts out of its own pile and hands back, for
bags nobody bought.

So the cash follows the P&L exactly:

| | | |
|---|---|---|
| **during the season** | paid out | 1 000 € a bag, week by week, as they sell |
| **after week 13** | taken back | the fixed cost, 120 000 € |
| | taken back | 200 € × what sold |
| | taken back | 200 € × what did **not** sell |
| | left on the table | the margin |

**That order is why `index.html` and `summary.html` changed.** They used to
read turnover → cost of sold → *gross margin on what sold* → written off →
fixed. Now both read turnover → fixed → cost of sold → cost of unsold → margin:
three deductions between the two ends, in the order the notes physically move,
so the screen never contradicts the table. The last deduction stands alone
because it is the only line of the five a team could have changed.

## 2. The notes

Six denominations — 100, 200, 500, 1 000, 2 000, 5 000 — each on its own pair
of pages, fronts then backs.

**The 5 000 is exactly twice the 100 in both dimensions**: 98 × 52 mm against
49 × 26 mm, through a geometric progression of 2^(1/5) — every note 15% larger
than the one below it, all six holding the same 1.885 proportion. The first
version grew 4% a step, under the difference anyone can actually see; at 15% a
step the piles sort themselves and a note is identifiable face down.

The top of the range is capped at 98 mm wide because two columns of it fill an
A4 exactly. Anything wider drops the 5 000 — by far the most-printed note — to
one column and half a wasted sheet.

| | 100 | 200 | 500 | 1 000 | 2 000 | 5 000 |
|---|---|---|---|---|---|---|
| mm | 49 × 26 | 56 × 30 | 65 × 34 | 74 × 39 | 85 × 45 | 98 × 52 |
| per sheet | 40 | 27 | 24 | 14 | 12 | 10 |

**Everything on the note is sized off the note's own height**, so the 100 and
the 5 000 are one design at two scales rather than two designs. Every row is
`flex:none`: left to shrink, the lines under the portrait were squeezed to
nothing by the auto margin above them — present in the DOM, zero pixels tall,
and invisible in a screenshot until measured.

### The layout is a banknote's

Portrait centred in an engraved vignette, the issuing bank above it, the value
in all four corners, the words along the bottom. Type is small and tracked: a
note carries a lot of information quietly, and the first version shouted a
15 mm numeral across the face of a 26 mm card.

Everything sits on a plate inset 7% of the note height, inside a second finer
rule — an engraved note has two borders, and here the outer one doubles as the
cut guide it shares with its neighbour.

### The faces

A portrait per denomination, where a real note has a monarch, and the
denomination is the character's seniority.

| | | |
|---|---|---|
| 100 | the forecaster | *A forecast is a hypothesis* |
| 200 | the merchandiser | *Placed is not sold* |
| 500 | the buyer | *Choice is paid for in advance* |
| 1 000 | the warehouse manager | *Stock in the wrong place is not stock* |
| 2 000 | the boutique director | *Demand does not travel* |
| 5 000 | the chief financial officer | *Margin is what remains* |

The line under each name sits where a real note carries its motto. They are
plain statements about the trade rather than jokes at the job's expense — the
CFO's is the moral of the session, on the note the room will hold most of.

**Drawn as masses, not outlines.** One 100 × 128 engraving — skull, brow,
orbits, nose, mouth, jaw, neck, collar and lapels — hatched behind, with hair,
glasses, beard and collar swapped per character. At 5 mm across an outline
disappears and a mass survives, so the eyes are solid pupils under a lid line,
the hair and beard are filled shapes, and the coat is a tint. The lines that
only exist at 98 mm are the shading strokes.

**Expression is three lines, and all three were drawn more than once.**
Outlining the whole eye gave the set a pair of goggles at note size. Heavy
arched brows made them look alarmed, then a brow whose inner end sat lower
than its outer made them look worried — level ends read as nothing at all,
which is what a portrait on a note should do. And the mouth: a cupid's bow
drawn as two curves put the corners below the middle and six people who had
just had bad news looked out of the sheet; a flat dash with a lower-lip line
under it only made them look like they were bearing it. It is now a single
line whose corners sit a third of a millimetre above its middle — the
smallest curve that reads as neither.

### The back

The issuing authority — **Banque du Merchandising** — the season's own thirteen
weeks of demand as a chart, a signature over *The Chief Forecasting Officer*,
and the value in the corners and the words. The room is holding the answer all
session and will not notice until the debrief.

**One denomination per sheet.** Different sizes and a mixed sheet would mean
cuts that stop and start; one size per sheet means every cut runs the full
width or the full height. Two guillotine passes and the sheet is done.

**Nothing to trim between notes.** Inside the block the notes butt edge to edge
and the frame is drawn *inside* each cell, so two neighbours share one visible
line and that line is the cut guide.

**The block is centred on both axes.** This is the only reason there is an
outer margin at all. Duplex printers flip on the long edge by default and some
flip on the short edge; the first mirrors the sheet left-to-right, the second
top-to-bottom. A block centred both ways lands in the same place under either,
so the backs meet the fronts whatever the driver is set to. Verified rather
than assumed: for all six denominations the front grid and the back grid
occupy the same rectangle to within a hundredth of a pixel.

**The band swaps sides on the back.** The coloured strip is on the left of the
front, which is the same physical edge as the right of the back. It has to be
drawn on the right there or it would not coincide with itself through the
paper.

**Not a euro note, and not anybody's.** Nothing imitates the layout, colour or
imagery of any real banknote, both sides are marked **training money**, the
issuing bank is invented, and the six portraits are invented job titles rather
than anybody real. **No real company is named anywhere in this repository** —
the print pack carries the game's own name and nothing else.

## 3. The pick cards

Seven cards, 99 × 70 mm, 2 × 4 on the sheet. Each carries one target
sell-through and one launch push — the two numbers a table types into the setup
screen.

**Backs are identical**, so the deck can be shuffled and drawn face down.

**Five is the maximum that can be distinct on both axes.** The game offers five
sell-through levels (60–100) and seven pushes (30–90). Cards 1–5 are that set;
6 and 7 keep a unique push, repeat a sell-through, and say so on their face.

**The five are deliberately not a diagonal.** Distinctness on both axes forces
a permutation, and the tidy one — highest sell-through against lowest push —
would build a correlation into the room's results that the game never put
there. These five scatter across the grid instead.

**The back sheet prints eight backs for seven cards.** Seven cards in a 2 × 4
grid leave one cell over. Which cell the spare one becomes moves when the sheet
is flipped, and which way depends on the flip edge — so a blank on the back
would land on a real card under one printer setting and not the other. An
eighth back costs a card-sized piece of paper and removes the question.

## 4. Print run

Sized for six tables playing to the end: **45 sheets, 609 notes, 1 656 200 €**
— against a hard ceiling of 260 000 € a table, since total demand across the
thirteen weeks is 260 bags at 1 000 €.

Twenty-nine of those sheets are 5 000 € notes, because 5 000 is the largest
note in the set. **A 10 000 € note would take the run under thirty sheets**
and is one line in `money.html`. Not added: the six denominations were chosen
deliberately, and this is a decision to take rather than assume.

Every payout is a multiple of 1 000 €, so the 100 / 200 / 500 notes only ever
appear at the end, when a table pays 200 € a bag. The facilitator keeps them.

## 5. Deliberately absent

- **A shared stylesheet across the three files.** Same reason as the games: one
  file, openable on its own.
- **Crop marks.** The notes butt against each other, so the neighbour's frame
  is the mark. Marks would only help around the outside of the block, where a
  single straight cut already does.
- **Anything that has to be laminated, folded or assembled.** Print, cut, deal.
