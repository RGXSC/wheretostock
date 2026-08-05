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
- Row identities re-checked: `opening + received − sold = closing` on store
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
| **0 — Room** | One row per team-game, alphabetical. Names only. Nothing else. |
| **1 — Setup** | Two columns fill in: target sell-through, % in store. *"Here is what each room committed to."* |
| **2 — Turnover** | Turnover column fills in. **Still alphabetical** — deliberately, so nobody can read the ranking yet. |
| **3 — Sort by turnover** | Rows animate into turnover order. Rank badges appear. |
| **4 — Margin** | Margin and margin % fill in, **order unchanged**. This is the moment the contradiction lands: the top row on turnover is often not the top row on margin. |
| **5 — Sort by margin** | Rows animate into margin order. The overtaking is the whole point of the exercise. |
| **6 — Matrix** | §3. |

**Animation:** FLIP — measure each row's position before and after the sort,
apply the inverse transform, then transition it to zero. 600–800 ms with a
slight stagger, so the eye can follow a specific room moving. Skippable by
clicking again. No library.

**Presentation details:** large type, high contrast, readable from a metre —
same discipline as the game. A room's row keeps a stable colour across all
stages so it can be tracked through both sorts.

---

## 3. The matrix

Sell-through target (60→100%, 5 rows) × % in store (30→90%, 7 columns) = 35
cells.

- Teams sit in their cell as **chips**. Multiple teams in one cell stack
  vertically; the cell grows. Empty cells stay visible so the shape of the
  grid reads.
- Chips carry the team name and margin, coloured on a diverging scale from
  the best to the worst margin in the room.
- **No background shading.** Cells stay plain. The tool could compute what
  margin was reachable in each cell by replaying the demand, but that asserts
  what a room "could have" made in a square it never chose, on an assumed
  replenishment policy. Decided against: the matrix shows where teams landed
  and how they did, nothing counterfactual.
- What the matrix is for is the *clustering* — whether the rooms all crowded
  into one corner, and whether the ones that did well share a square.

---

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
  warehouse / Store A / Store B.
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
