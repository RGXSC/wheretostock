# `summary.html` — debrief tool

Second standalone file, same constraints as the game: one HTML file, no
network, system fonts, runs from a double-clicked `file://`. It never plays
the game — it only reads exports from it.

---

## 1. Getting data in

Up to **20 team-games**. Three routes, all available at once:

| Route | Behaviour |
|---|---|
| **Drop a pile of files** | Drag-and-drop zone, or a file picker with multi-select. Handles all 5 rooms in one go. |
| **One file at a time** | Same picker, used repeatedly. Files accumulate. |
| **Paste** | A textarea taking the clipboard output of the game's *Copy all data* button (TSV) or raw CSV. |

The parser must not care which of the three it came from: it sniffs the
delimiter (tab vs comma), reads the header row by **name** not position, and
tolerates the UTF-8 BOM the CSV download writes.

**One file may contain several games.** Rows are grouped by
`Team` + `Game`, so a facilitator who concatenates five exports into one
sheet gets five entries, not one broken one.

### Duplicate detection — automatic, no prompting on the happy path

Two levels, because they mean different things:

- **Identical content** (same team, same game, same rows) → silently skipped,
  reported as *"Team 3 · Run 1 — already loaded, skipped"*. This is the
  common case: the facilitator drops the same folder twice.
- **Same game, one summary and one full export** → *not* a conflict. They are
  the same result at two levels of detail, so the fuller one is kept
  automatically and the swap is reported. A facilitator who pastes a room's
  summary and later drops its CSV should not be interrogated about it.
- **Same `Team` + `Game`, same format, different content** → a real conflict.
  Offer **Replace** / **Keep both** (the newcomer is suffixed `(2)`) /
  **Discard**.

### Validation on import

Each game is checked and badged, never silently dropped:

- Expect `13 × 5 × 3 = 195` rows. Fewer → **incomplete**, badged with the week
  it reached, and **excluded from the ranking stages by default** (toggle to
  include). A room that crashed still has data worth looking at, but it must
  not be ranked against rooms that finished.
- Row identities re-checked: `opening + received − sold = closing` on boutique
  rows, `sold + missed = demand`. A failure means a hand-edited file; badge it
  loudly.
- **Demand fingerprint.** Hash the `Demand` column across all
  week × bag × location rows. Every game in a comparable session must share
  one fingerprint. If two differ, the rooms played **different versions of the
  game** and their P&Ls are not comparable — show a blocking banner naming the
  odd ones out. Given how often the demand table has changed during
  development, this is the single most valuable check in the tool.

### Economics

`UnitCost` and `FixedCost` are carried on every export row (added to the game
for this purpose), so margin is computed from the file alone:

    margin = Σ Revenue − ProducedTotal × UnitCost − FixedCost

Older exports without those columns fall back to editable fields defaulting
to 200 € and 117 000 €, with a visible warning that the numbers were assumed
rather than read.

---

## 2. The reveal

One large **Next** button; Space / Enter / → also advance, ← goes back. Six
stages, all teams on screen the whole time — the columns fill in, and the
sorts are the drama, because rows visibly overtake one another.

| Stage | What appears |
|---|---|
| **0 — Teams** | One row per team-game, alphabetical. Names only. Nothing else. |
| **1 — Setup** | Two columns fill in: target sell-through, % in boutique. *"Here is what each team committed to."* |
| **2 — Turnover** | Turnover column fills in. **Still alphabetical** — deliberately, so nobody can read the ranking yet. |
| **3 — Sort by turnover** | Rows animate into turnover order. Rank badges appear. |
| **4 — Margin** | Margin and margin % fill in, **order unchanged**. This is the moment the contradiction lands: the top row on turnover is often not the top row on margin. |
| **5 — Sort by margin** | Rows animate into margin order. The overtaking is the whole point of the exercise. |
| **6 — Map, turnover** | §3. |
| **7 — Map, margin** | The same squares; bars animate from turnover to margin. |

**Animation:** FLIP — measure each row's position before and after the sort,
apply the inverse transform, then transition it to zero. 1400 ms with a 50 ms
stagger, slow enough to follow one team overtaking another from across a
room. No library.

**Presentation details:** large type, high contrast, readable from a metre —
same discipline as the game. A team's row keeps a stable colour across all
stages so it can be tracked through both sorts.

---

## 3. The map — two stages

Target sell-through **across** (60→100%), % in boutique **down the side**
(30% at the top → 90% at the bottom), so reading downwards is "committing
more and more to the boutiques".

Shown twice: **turnover first, then the same squares switched to margin.**
Teams keep their square between the two, so nothing moves — the bars animate
their length and colour in place, and the eye can see which team collapses
when turnover becomes margin.

- Each team is a **bar**, not a chip: length carries the result so magnitude
  is visible without decoding colour. Several teams in one square stack.
- **Bar length runs 50%→100% across the range on screen** — the weakest team
  gets half the width, the strongest the full width. Zero-based bars made a
  12% spread in turnover invisible; a purely range-based bar would have left
  the weakest team a stub.
- **Part games get a short hatched stub, never a length.** They are excluded
  from the ranking, so a bar sized like a real one — the first version gave
  them a flat 70% — reads as a middling score against teams that actually
  finished. The stub is shorter than every ranked bar and carries the word
  *part* instead of a number.
- **Colour is recomputed for whatever metric is on screen**, over that
  metric's own range: a team can be green on turnover and deep red on margin,
  which is the lesson. The ramp runs through five stops — red, orange, amber,
  light green, green — because a three-stop ramp turned the whole middle of
  the field into one muddy olive.
- The value sits in its own gutter that the bar cannot enter, and a bar too
  short to hold its team name puts the name alongside in dark ink — decided
  by measuring the rendered label, not by guessing a threshold, so a long
  team name cannot end up as white text on white.
- **No background shading.** The tool could compute what margin was reachable
  in each square by replaying the demand, but that asserts what a team "could
  have" made in a square it never chose. The map shows where teams landed and
  how they did, nothing counterfactual.

## 4. The detail — under the fold, opt-in

Below the matrix, closed by default and opened with a button. Deliberately
not the focus: it is for after the reveal, when someone asks *"but why did we
lose those sales?"*

One room at a time, chosen from a chip per room. Nothing renders until a room
is picked — with 20 teams, drawing everything is unreadable and slow. Rooms
that were imported as a one-line summary have their chip disabled, with the
reason on hover.

Five charts, one per bag:

- **Stacked bars** = stock left at the end of each week, split into
  warehouse / Paris / Tokyo.
- **A strip underneath** = that week's demand, split into what was served
  (dark) and what was missed (red).

Stock and demand differ by an order of magnitude — a bag can hold 65 units
against a weekly demand of 6 — so they are deliberately **not** put on a
shared axis, and no dual axis is used either. The strip has its own baseline
and its own maximum, both labelled. Nothing in the drawing implies the two
can be compared directly.

This reads straight to the diagnosis: a room whose bars are almost entirely
warehouse-grey while the red strip grows was sitting on stock it never
shipped; a room with no grey at all committed everything at launch and had
nothing left to move.

### Zoom — one bag, big, split by boutique

Any card opens on click (or Enter when focused) into a full-width panel:

- the whole-bag stack across the top, at roughly three times the card size;
- **Paris and Tokyo side by side underneath, on one shared pair of
  scales** — a boutique selling half as much must *look* half as tall, which
  is the whole point of the 2:1 skew in the demand table. Each boutique shows
  its own stock and its own demand strip, so "we shipped to the wrong
  boutique" is
  visible rather than inferred.
- ‹ › step through the five bags without closing; Esc or a click outside
  closes. The zoom's keys are captured, so stepping between bags never
  advances the reveal underneath.

The card grid itself was redrawn taller: the demand strip was 26px against a
96px stock block and a single missed sale was invisible on it. It is now 54px
against 116px.

## 4b. The team panel — where one team made its margin, and where it lost it

Opened from the **Zoom on margin** button beside the team chips, under
**Overview by team**. Four beats, in order:

1. **Where the money went.** Turnover, production, fixed cost, margin — then
   two leaks stated as facts: *sales it could not serve* and *bags nobody
   bought*. This is what separates two teams on the same margin: one lost
   sales, the other drowned in stock.
2. **Which bag, which boutique.** The game board as a grid — five bags by
   Paris / Tokyo / warehouse, one unit scale shared across every team loaded, so
   stepping ‹ › between teams compares like with like.
3. **All five bags, week by week**, with the week the warehouse ran out
   marked. From that point nothing could be redirected, and the three
   silhouettes are the whole lesson: a wall of grey that drains steadily
   (kept central, released), grey gone by week 4 with red piling up after
   (committed early, then stranded), or no grey at all and a stack that never
   melts (over-produced and over-committed).
4. **The punch line** — one bag named in red: the bag that lost most sales to
   stock stranded in the other boutique. It reads the **attributed** figure, the
   same number the bar below credits, and *not* the raw
   `min(endB, missA) + min(endA, missB)` cap. That cap only asks whether the
   unsold stock and the missed sale sat on opposite shelves, so it stays
   positive even where the waterfall has already charged those misses to
   central stock — reading it here made the line claim placement had cost
   sales that the bar directly underneath credited as zero. Ranked on the
   attributed figure the line is the largest single-bag slice of the bar's
   stranded segment: never more than the bar shows, and absent exactly when
   the bar shows nothing.
5. **Why those sales were lost** — the bar, its key, and a caption giving the
   scope: all five bags together, and the season's total lost sales. The
   punch line above counts **one bag** while this bar totals **all five**, and
   the two sit close enough on screen to be read as a single figure
   disagreeing with itself, so each states its own scope — the punch line
   carries the all-bag total, the bar carries the caption. In the debrief the
   bar's full width is the worst team in the session, so stepping between
   teams compares counts and not only proportions.

### The three causes, and why they are bounded

Every lost sale is charged to exactly one cause, over the **season**, with
each bucket bounded by bags that really existed. Per bag, with
`left = made − sold`:

| Cause | Count |
|---|---|
| never made — the bag sold out everywhere | `max(0, missed − left)` |
| the bag existed — not on this shelf in time | of the rest, as many as ended in the warehouse or in transit |
| stranded in the other boutique | the remainder, capped by what the **other** boutique finished with unsold |

Two things this fixes. A week-by-week version charged a miss to "the other
boutique" whenever that boutique happened to hold stock that week, which counted the
same seven physical bags seventeen times — the headline was 43% too high.
And `left` is `made − sold`, **not** the sum of the closing columns: a
shipment sent in the last week leaves the warehouse and never arrives, so the
closings lose it (11 bags for one team in the test corpus).

Central is charged before stranded on purpose: where both could explain a
lost sale, the reading that does *not* blame placement is the conservative
one.

### What keeps it honest

- **Nothing counterfactual.** No "you would have made X with a different
  split" — that needs the demand replayed under an assumed shipping policy,
  and inventing one is not the tool's place. The screen says where the stock
  was and where the customers were; the facilitator draws the conclusion.
- **It cannot teach "hoard everything".** *The bag existed — not on this
  shelf in time* is one of the three causes, so a team that sat on stock sees its own
  error named. Under-production is named separately too, so a team that was
  simply short is not told it was a placement problem.
- Per-bag margin excludes the fixed cost, and the column header says so —
  the five figures must not look as though they should add up to the margin.

Teams imported as a one-line summary get beat 1 and an explanation of why the
rest is missing.

## 4c. The same panel inside the game

`index.html` carries the same four beats behind a nearly transparent **i** in
the bottom-right corner of the P&L page, and nowhere else. The order it
supports: the room is walked through everyone's results first, then each team
opens its own detail.

It is computed from `state.log` — the very table the export is built from —
so what a team reads in the game and what the facilitator reads in the
debrief cannot disagree. A cross-check asserts exactly that.

**The game says Margin, never Profit**, including the summary export column,
and the two boutiques are **Paris** and **Tokyo** — in the game, in the export and
in the debrief. Every row is normalised to a slot on the way in, and a
Location the tool does not recognise is called out as an issue rather than
read as a boutique that sold nothing.

**One place keeps the old word on purpose: the CSV column
`StorePctAtSetup`.** The game writes it, the debrief reads it by name, and
they agree — nothing is broken, it is simply the word from before the rename
surviving in the export contract. Renaming it would invalidate every file a
room has already exported, to fix a string no participant ever sees.
`index.html` still carries `LEGACY_LOC = { 'Store A':'A', 'Store B':'B' }` to
accept location values from before that same rename, which is what paying
this cost once already looked like. Leave both alone.

Everywhere else the word is **boutique**, in all three files and in both
specs — *shop* and *store* should not appear in user-facing text or in the
documentation of it.

## 5. Housekeeping

- Everything persists to `localStorage`, so a reload mid-debrief loses
  nothing. Same resume/reset discipline as the game.
- Per-entry **remove**; a global **Clear all** behind a confirmation.
- **Export the comparison**: CSV and clipboard of the one-row-per-team table
  (team, game, setup, turnover, margin, margin %, sell-through, missed).
- A **facilitator sheet**: print stylesheet so stage 5 and the matrix print
  onto one page.

---

## 6. Change already made in `index.html`

`UnitCost` and `FixedCost` are now constant columns on every exported row, so
the debrief needs no assumptions about the game's economics and cannot drift
out of step with them. **Any export taken before this change lacks the two
columns** — re-export those rooms rather than relying on the fallback.

---

## 7. Build order

1. ~~Parser + import + duplicate and validation logic.~~ **Done.**
2. ~~The seven-stage reveal with the FLIP sorts.~~ **Done.**
3. ~~The matrix, teams only.~~ **Done.**
4. ~~The stock-location charts.~~ **Done.**

All four steps are built and are a usable debrief tool on their own. They are
covered by a 42-assertion suite driven by a corpus of 14 real exports,
generated by actually playing the game: five rooms with different strategies,
a replay under a second game name, an exact duplicate, a same-name conflict,
a part game stopped at week 8, a pasted clipboard, a one-line summary, two
rooms concatenated into one sheet, a legacy export with no cost columns, and
a room that played a different demand table.

---

## 8. Collecting results from many rooms — decided against a backend

The question came up of hosting the game on GitHub Pages, letting 20 rooms
play it there, and having the debrief pull "today's results" automatically,
with an admin login to weed out games that were not part of the session.

**Not possible on Pages, and the login would be worse than useless.** Pages
serves static files: there is no server to receive a result and no database
to hold one. Each room's game lives entirely in its own browser storage,
invisible to everyone else. A username and password checked in JavaScript on
a public page is not a security control — the source is readable by anyone —
and there would be nothing behind it to protect, because nothing was ever
stored centrally.

Automatic collection would need a real backend (a free-tier Supabase or
Firebase project, say). That would buy genuine session codes, real admin
auth and real deletion — at the cost of an account to maintain, corporate
network access to a third party, and the game no longer being offline, which
is the property the whole thing was built around.

**Decided: keep collection manual.** It is already built and it scales:

- 20 rooms' full exports concatenated into one sheet → **20 entries in
  643 ms**, one demand fingerprint, no false version warning.
- 20 one-line summaries pasted straight out of a chat channel — each with
  its own repeated header row — parse into 20 entries in a single paste.
- The reveal renders and sorts 20 rows without stalling, and the matrix
  stacks rooms that chose the same square (4 deep in the test).

The practical trade-off to tell facilitators about: **pasting the one-line
summary into a chat is the easy route for 20 rooms, but it carries no
week-by-week data**, so those rooms get no stock charts. Rooms whose detail
matters should send the CSV.
