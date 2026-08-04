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
- **Same `Team` + `Game`, different content** → this is a real conflict and
  must be raised. Offer **Replace** / **Keep both** (the newcomer is suffixed
  `(2)`) / **Skip**.

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
- Chips carry the team name and margin, coloured on a diverging scale.
- **Background shading = the margin that was achievable in that cell.**
  Computed by the tool, not hardcoded: the demand table is reconstructed from
  any imported export's `Demand` column, then all 35 combinations are
  simulated. Turns the matrix from a seating plan into *"here is where the
  money was, and here is where you stood."*
  - The replenishment policy behind it must be **stated on screen**, not
    buried: *"assumes each shop is topped back up with what it sold, whenever
    it drops to one forecast week of cover."*
  - A toggle turns the shading off, for facilitators who would rather not
    assert what a room "could have" made.

---

## 4. The graphs — under the fold, opt-in

Below the matrix, collapsed. Deliberately not the focus.

A filter bar: **team** (multi-select, defaults to none), **bag** (all / one),
**location** (all / warehouse / Store A / Store B). Nothing renders until at
least one team is picked — with 20 teams, rendering everything is unreadable
and slow.

Four charts, all inline SVG, all driven by the same filtered rows:

1. **Stock by location over 13 weeks** — where the units sat. The signature of
   a room that hoarded centrally versus one that pushed everything out.
2. **Shipped vs demand per week** — bars for demand, line for what left the
   warehouse. Shows whether a room reacted to the curve or shipped on a habit.
3. **Sold vs missed per bag** — the mix mismatch, per room.
4. **Cumulative missed sales** — where a room started losing, and on which bag.

Two teams selected → charts draw both series overlaid for comparison. Beyond
four selected teams, force small-multiples instead of overlay.

---

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

1. Parser + import + duplicate and validation logic, with a plain table
   output. Least glamorous, most likely to bite — test it against real
   exports, deliberately malformed ones, and mixed-version files.
2. The six-stage reveal with the FLIP sorts.
3. The matrix, teams only.
4. The achievable-margin shading.
5. The filtered charts.

Stages 1–3 alone are a usable debrief tool.
