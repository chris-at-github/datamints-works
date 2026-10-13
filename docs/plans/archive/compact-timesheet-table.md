# Compact Timesheet Table

## Context & Goal

The timesheet table becomes more compact: the whole table uses the small font
size, the start time, end time, duration and ticket columns shrink to the width
of their content, and the booking text gets most of the space that is freed.
The duration is shown as plain text instead of an input.

## Non-Goals

- No change to the row height (the delete button stays as it is).
- No smaller paddings; only the font size changes.
- No validation or length limit for the ticket field.
- The logic for an edited duration (`updateEntry` moving the end time) stays;
  it is only not reachable from the table for now.

## Acceptance Criteria

- [x] Start time, end time, duration and ticket are always shown completely.
- [x] The booking text column profits from the freed space.
- [x] The whole table uses `--font-size-small` (checked in the browser).

## Open Decisions

**Content-sized columns via the automatic table layout.** The table switches
from `table-layout: fixed` to the automatic layout. The narrow columns get
`width: 1%` and `white-space: nowrap`, so the browser shrinks them to the wider
of heading and content; the time and ticket inputs get a minimum width in `ch`
(the width of the digit "0"), so "HH:MM" and five-digit tickets fit at any font
size. Rejected: fixed widths in `ch` per column with the fixed layout (the
heading widths would have to be guessed) and inputs growing with their content
(`field-sizing: content`, the layout would jump while typing).

**Headings.** "Start time" and "End time" become "Start" and "End";
"Duration" and "Ticket" stay.

**Booking text wider than the internal booking text.** "Booking text" gets
`width: 50%` of the table, "Internal booking text" takes the rest; the booking
text is more relevant and usually longer.

**Duration as plain text.** The duration cell shows the computed value as text
with the same padding as the inputs.

**Seed tickets.** The seed uses four-digit and low five-digit ticket numbers
instead of `WORKS-…`, matching the real data.

## Checklist

- [x] Use the small font size for the whole table and shorten the headings.
- [x] Shrink the start, end, duration and ticket columns to their content.
- [x] Show the duration as plain text.
- [x] Give the booking text column more space than the internal booking text.
- [x] Switch the seed tickets to numeric values.
- [x] Run lint and build, check the table in the browser (confirmed manually).
- [x] Tick the acceptance criteria and move the plan to `docs/plans/archive/`.
