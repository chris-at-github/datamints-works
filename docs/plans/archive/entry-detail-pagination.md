# Entry Detail Pagination

## Context & Goal

The entry detail page gets a pagination like the timesheet header: two buttons
page through all entries of the same page in row order. The title shows the
position as "Entry N of M".

## Non-Goals

- No modal yet; the pagination is added to the existing detail page.
- No keyboard shortcuts.
- No paging across timesheet pages; the first and last entry are the ends.

## Acceptance Criteria

- [x] All entries of a page can be paged through.
- [x] On the first entry, "previous" is disabled; on the last entry, "next" is disabled.

## Open Decisions

**Direction.** ">" leads to the next entry (the row below in the table), "<" to
the previous one (the row above). Accessible names "Previous entry" and "Next
entry".

**Position.** Top left in the header, before the date and the title, on the
same row as the close link: `[<][>]  date / Entry N of M ……… [×]`.

**Buttons, disabled at the ends.** `Button.Icon` in a `Button.Group` with
lucide chevrons, like `TimesheetPagination`. Without a target the button stays
visible but disabled, so the header does not shift. Rejected: `Button.IconLink`
(middle click and "open in new tab" would work, but links cannot be disabled
natively).

**Own component instead of reusing `TimesheetPagination`.** That one is tied
to newer/older pages and their labels. Rejected: making it generic with
direction and label props (changes the timesheet header for a two-button
component).

**`router.replace` instead of `push`.** Paging does not add history entries, so
the browser's back button leads back to the table. With the planned modal
(intercepting route) back is expected to close the modal, and a later close via
`router.back()` only works if paging adds no entries. Rejected: `push` like in
the timesheet (back would step through every viewed entry first).

**Wait for pending saves.** Like the close link, paging waits until running
saves are finished, so the target entry and the table never miss the last
change. `usePendingSaves` gets a variant for buttons that waits and then
replaces the URL.

**Neighbours on the server.** `findEntry()` additionally returns the ids of the
previous and next entry (by `sorting`) and the number of entries of the page,
so no client request is needed.

**Reset the form per entry.** Paging stays on the same route, so React keeps
the detail component and its state. The page renders it with `key={entry.id}`,
so the form starts fresh with the new entry. Rejected: syncing state with an
effect when the prop changes (extra render, easy to get wrong).

## Checklist

- [x] Extend `findEntry()` with the previous and next entry id and the entry count.
- [x] Add a button variant to `usePendingSaves` that waits for saves and then replaces the URL.
- [x] Add `TimesheetEntryPagination` and place it top left in the detail header.
- [x] Show "Entry N of M" and reset the form per entry via `key`.
- [x] Run lint and build, check the pagination in the browser.
- [x] Tick the acceptance criteria and move the plan to `docs/plans/archive/`.
