# Timesheet Page

## Context & Goal

The timesheet module is split into components in `src/modules/Timesheet/`. A new
sub-component `TimesheetPage` represents exactly one day; later there will be
several pages to browse through. Each page shows the current date at the top
left and a reset button at the top right (more buttons will follow). Reset asks
for confirmation and restores the initial state. Below the table, an "Add rows"
button appends five empty rows.

## Non-Goals

- No browsing between pages; there is exactly one page (today).
- No persistence; a reload still resets the table.
- No upper limit for rows, no focus handling after adding rows.
- No update of the date at midnight while the page stays open.
- No further header buttons yet.
- No caret handling in the time mask; editing in the middle of a value moves
  the caret to the end.

## Acceptance Criteria

- [x] The page is displayed correctly.
- [x] The buttons work.

## Open Decisions

**Component split.** All parts live in `src/modules/Timesheet/`, each with its
own CSS Module where it needs styles:
- `Timesheet.tsx` determines today's date and renders one `TimesheetPage`.
  It will take over browsing later.
- `TimesheetPage.tsx` holds the rows of its day and renders header, table and
  the "Add rows" button. Rejected: state in `Timesheet` right away; it moves up
  once browsing needs to keep the state of several pages.
- `TimesheetHeader.tsx` shows the date (left, `display display--layout-2`, plain
  text) and the button group (right).
- `TimesheetTable.tsx` renders the `<table>` and its head.
- `TimesheetRow.tsx` renders one row with its fields.
- `entries.ts` holds the row data type (`TimesheetEntry`), empty rows and the
  update rule (duration ↔ end time). Named "entry" so it does not clash with the
  `TimesheetRow` component.

**Time helpers in `src/lib/time.ts`.** `parseTime`, `formatTime`, `getDuration`
and `addDuration` are free of React and timesheet specifics, so they can be
reused. Date formatting lives in `src/lib/date.ts` (`formatDate`, `YYYY-MM-DD`).
It uses the local date parts, not `toISOString()`, which is UTC and would show
the wrong day around midnight.

**Today's date is read in the browser via `useSyncExternalStore`.** `/timesheet`
is prerendered at build time, so a date computed during render would be the
build date, and server and browser would disagree (hydration error). The server
snapshot is `null` (empty date), the client snapshot is today. Rejected:
`useEffect` + `setState` (extra render, flagged by
`react-hooks/set-state-in-effect`) and dynamic rendering (gives up the static
page and still uses the server's time zone).

**Reset confirmation with Base UI `AlertDialog`.** It is meant for destructive
actions that need confirmation and does not close on an outside click. Wrapped
in `src/components/AlertDialog/` following the `Button` pattern: every part
passes all Base UI props through and merges `className`; `index.tsx` attaches
the parts to a server-safe root (`AlertDialog.Trigger`, `.Popup`, `.Title`,
`.Description`, `.Close`). Trigger and Close render the own `Button`. `Popup`
includes portal and backdrop, as they are always needed. Styles use the existing
tokens. Rejected: a small prop API (`title`, `onConfirm`, …), which would hide
the Base UI parts. Texts: "Reset timesheet?", "All entries of this day will be
removed.", "Cancel", "Reset".

**`mergeClassName` in `src/lib/class-names.ts`.** The string-or-function merge
from `Button.tsx` is needed in four dialog parts, so it becomes a shared
helper. `Button.tsx` is not changed in this feature.

**Reset restores the initial state.** Exactly five empty rows, added rows are
removed.

**Time fields are plain text inputs in `HH:MM`.** Start and end time no longer
use `<input type="time">`; a picker is not needed, and the native field shows
AM/PM in some locales. All three time fields are now `type="text"` with the
placeholder `HH:MM`.

**Input mask for time fields.** Start time, end time and duration only accept
`HH:MM` (`maskTime` in `src/lib/time.ts`):
- Only digits are kept, at most four; other characters are dropped while typing
  and pasting.
- The colon is added from the third digit on (`231` → `23:1`), not right after
  the second; otherwise Backspace would delete it and the mask would add it
  again at once.
- Hours always have two digits, so half past nine is typed as `0930`. Rejected
  for now: detecting `930` as `9:30` (ambiguous, e.g. `123`).
- Impossible digits are blocked while typing (first hour digit at most `2`,
  second at most `3` after a `2`, first minute digit at most `5`); the mask
  stops at the first such digit.

**Time fields are completed and rounded on blur.** Partial input is completed
(`completeTime`: `9` → `09:00`, `12` → `12:00`, `12:3` → `12:30`) and then
rounded to the nearest quarter hour (`roundTime`: `10:23` → `10:30`,
`10:22` → `10:15`), capped at `23:45`. The result goes through the normal update
rule, so duration and end time stay consistent. Rejected: rounding on every
change (the value would jump while typing) and only marking invalid values via
`:user-invalid` (the wrong value would stay in the state).

**Buttons.** The existing `Button` component, the header buttons in
`Button.Group`. Labels in English: "Reset", "Add rows".

## Checklist

- [x] Move the time calculation to `src/lib/time.ts` and add `src/lib/date.ts`.
- [x] Split the module into `Timesheet`, `TimesheetPage`, `TimesheetTable`,
      `TimesheetRow` and `entries.ts`, each with its own CSS Module.
- [x] Add `TimesheetHeader` with today's date.
- [x] Add the "Add rows" button.
- [x] Add the `AlertDialog` component in `src/components/AlertDialog/`.
- [x] Add the "Reset" button with confirmation.
- [x] Add `roundTime` to `src/lib/time.ts` and round time fields on blur.
- [x] Replace the native time inputs with text inputs.
- [x] Add an input mask for the time fields and complete partial input on blur.
- [x] Run lint and build, check `/timesheet` in the browser (interaction confirmed manually).
- [x] Tick the acceptance criteria and move the plan to `docs/plans/archive/`.
