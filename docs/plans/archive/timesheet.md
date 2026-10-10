# Timesheet

## Context & Goal

A new route `/timesheet` (`src/app/timesheet/page.tsx`) shows a spreadsheet-like
table for time bookings. The table has five rows, and every row has the columns
start time, end time, duration, ticket, booking text and internal note. All
cells are editable; the duration is calculated from start and end time.

## Non-Goals

- No spreadsheet behaviour beyond plain input fields (no active cell, no arrow
  key navigation, no row numbers or column letters).
- No validation (time format, 15-minute steps, ticket format, text length).
- No persistence; a reload resets the table.
- No adding or removing rows (a "+5" button is planned for later).
- No JavaScript-based auto height for multi-line fields.
- No reusable components in `src/components/`.

## Acceptance Criteria

- [x] The table and all its columns are editable.
- [x] The duration is calculated dynamically.

## Open Decisions

**Route and module.** `src/app/timesheet/page.tsx` stays a server component and
only renders the module `src/modules/Timesheet/` (`Timesheet.tsx`,
`Timesheet.module.css`). The module is a client component because it holds the
row state. No parts are extracted into `src/components/`, as nothing is reused.

**Column order.** Duration sits directly after end time, as it is derived from
start and end time. UI language is English: Start time, End time, Duration,
Ticket, Booking text, Internal note.

**Start and end time: native `<input type="time" step="900">`.** The value is
always `HH:MM` (24 h). The step is not enforced by every browser, and the
display follows the browser locale (e.g. AM/PM); both are accepted until
validation is added. Rejected: a `<select>` with 96 values (forces the steps,
but feels less like a spreadsheet).

**Duration: text input in `HH:MM`.** A `time` input would show AM/PM in some
locales, which makes no sense for a duration. Rules:
- Changing start or end time recalculates the duration as `end - start`.
  If a time is missing or the end is not after the start, the duration is
  `00:00` (the "0" case in `HH:MM` format).
- Changing the duration sets the end time to `start + duration`, if the start
  time and the duration can be parsed and the result is before `24:00`.
  Otherwise only the duration value changes.

**Booking text and internal note: `<textarea>` with `field-sizing: content`.**
The field grows with its content without JavaScript. Browsers without support
show a field with a fixed height. Rejected: measuring `scrollHeight` in
JavaScript.

**Wider page.** `--page-max-width` changes from `960px` to `1600px` for all
pages, so the six columns fit.

**Design tokens rule.** The rule in `CLAUDE.md` is rewritten: existing tokens are
used where their name fits the purpose, not just because the value matches.
Other values may be written directly in CSS.

## Checklist

- [x] Rewrite the design-token rule in `CLAUDE.md`.
- [x] Set `--page-max-width` to `1600px`.
- [x] Create `src/app/timesheet/page.tsx` and the module `src/modules/Timesheet/`
      with the table markup (five rows, six columns, labelled inputs).
- [x] Add row state and the duration calculation in both directions.
- [x] Style the table in `Timesheet.module.css`.
- [x] Run lint and build, check `/timesheet` in the browser (interaction confirmed manually).
- [x] Tick the acceptance criteria and move the plan to `docs/plans/archive/`.
