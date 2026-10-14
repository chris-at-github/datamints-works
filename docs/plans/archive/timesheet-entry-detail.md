# Timesheet Entry Detail

## Context & Goal

Every timesheet entry gets a detail page to edit its values. It is opened from
an icon link in the row actions and is a page of its own for now; later it may
open as a modal. The fields are saved on blur like in the table, and closing
leads back to the table, which shows the saved values.

## Non-Goals

- No modal yet (later via intercepting routes).
- No editable duration; it is shown like in the table.
- No further actions on the detail page (delete, previous/next entry).
- No save feedback.

## Acceptance Criteria

- [x] All field values can be saved.
- [x] Back in the table, the data is up to date.
- [x] Closing leads back to the table.
- [x] The row action buttons do not wrap after going to the detail page and back.
- [x] The hard selector for the row actions is removed.
- [x] All components look unchanged.

## Open Decisions

**Route `/timesheet/<pageId>/entries/<entryId>`.** Mirrors the data hierarchy;
the close link follows from the URL. Rejected: `/timesheet/entries/<entryId>`
(the page would have to be read from the entry first).

**Loading in the server component.** The page loads the entry through the
repository and passes it to a client form as the starting state. Later, an
intercepting route renders the same page as a modal; Next fetches it on the
client (RSC payload), so no own API is needed. Rejected: a new
`GET /api/timesheet-entries/<id>` loaded on the client (loading state, extra
roundtrip). Unknown entries, or entries of another page, get the timesheet 404.

**Base UI Field.** Label and control are linked accessibly by
`Field.Root`, `Field.Label` and `Field.Control`; the textareas use
`Field.Control` with `render`. Wrapped in `src/components/Field/`. Rejected:
Base UI `Form` (meant for submitting and validation, every field saves on its
own) and `Field.Item` (groups checkboxes or radios inside a field).

**Icon link instead of a button.** Opening the detail page is a navigation, so
it is a real link: `IconLink` in `src/components/Button/` renders `next/link`
in the look of `Button.Icon` and shares its styles. Rejected: `Button` with
`render={<a>}` (announced as a button, see `docs/guides/base-ui.md`).

**Row action.** lucide `ArrowBigRightIcon`, rightmost in the actions column
(after delete), accessible name "Edit row N".

**Layout.** Start, end and duration share the first row in three equal
columns; ticket, booking text and internal booking text each take a full row.
On narrow screens the three columns stack. Labels: "Start", "End", "Duration",
"Ticket", "Booking text", "Internal booking text".

**Fields.** Time fields behave like in the table (mask while typing, completed
and rounded to a quarter hour on blur, duration recomputed). The duration is a
read-only field, so it lines up with its label. Ticket is a single-line input,
booking text and internal booking text are growing textareas.

**Header.** The date of the page and "Entry N" (position by sorting), with a
close link (×, "Close") at the top right that leads to `/timesheet/<pageId>`.

**Links wait for pending saves.** Clicking a link while a field is focused
first starts the save on blur; the target page could load before it finishes.
This happens in both directions: the close link of the detail page (the table
would show the old value) and the edit link in the table (the detail page would
show the old value and overwrite the change on the next save). The shared hook
`usePendingSaves` tracks running saves, and both links wait for them before they
navigate. Rows that were just added are tracked as well.

**Fresh data in the table.** `Timesheet` loads its page on mount, so returning
from the detail page shows the saved values without further changes.

**Cascade layer for components.** Going back from the detail page made the row
action buttons wrap: `.button-group` and the row's `nowrap` rule are both
unlayered CSS modules with the same specificity, and the detail page loads
`Button.module.css` again, so it ends up last. All CSS modules in
`src/components/` now wrap their rules in `@layer components`, ordered
`normalize, base, layout, typography, components, utilities`; module and page
CSS stays unlayered and always wins over components, whatever the load order.
Utilities still win over components. Rejected: raising the specificity per
override (has to be remembered at every override).

## Checklist

- [x] Add `findEntry()` to the repository (entry, page date, row number).
- [x] Add the `Field` wrapper in `src/components/Field/`.
- [x] Add `IconLink` in `src/components/Button/`.
- [x] Add the route with the 404 check and the detail form with the layout.
- [x] Save on blur and let close wait for pending saves.
- [x] Add the edit link to the row actions and let it wait for pending saves.
- [x] Add the `components` layer and wrap all component CSS modules in it.
- [x] Remove the hard selector for the row actions.
- [x] Document the components layer in `docs/guides/css.md`.
- [x] Run lint and build, check the detail page in the browser (confirmed manually).
- [x] Tick the acceptance criteria and move the plan to `docs/plans/archive/`.
