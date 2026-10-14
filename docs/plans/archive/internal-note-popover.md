# Internal Note Popover

## Context & Goal

The internal booking text is rarely used, so it no longer gets its own table
column. Instead, every row gets an icon button in the actions column that opens
a popover with a growing textarea. The icon shows whether a row has an internal
booking text, and the booking text column takes all the space that is freed.

## Non-Goals

- No tooltip or preview of the internal booking text.
- No change to the data model or the API (`bookingTextInternal` stays).
- No discard on Escape; Escape closes and saves like every other way of closing.

## Acceptance Criteria

- [x] The internal booking text can be saved.
- [x] Rows with an internal booking text show the changed icon, for existing
      texts and right after adding one.
- [x] The booking text column is as wide as possible.

## Open Decisions

**Base UI Popover.** Non-modal, anchored to the button; focus handling, Escape
and click outside are built in. Wrapped in `src/components/Popover/` following
`docs/guides/base-ui.md`. Rejected: a dialog (modal, too heavy for a short note),
a collapsible row (the table would jump) and a menu (meant for actions, not
form fields).

**Button.** In the actions column before the delete button, so the destructive
action stays on the outside. lucide `MessageSquareIcon`, or
`MessageSquareCheckIcon` when the row has an internal booking text. Accessible
name "Internal booking text, row N".

**Popover content.** Title "Internal booking text" and the textarea, both left
aligned, plus a close button (×) at the top right. The textarea is multiline and
grows with its content; it is focused when the popover opens, and the focus
returns to the button when it closes.

**Saving.** The text is saved when the popover closes (`onOpenChange`), by
Escape, a click outside or ×. Rejected: saving on blur like the other fields — a
focused element that is removed with the popup does not reliably fire blur.

**Delete confirmation.** A row with only an internal booking text still counts
as filled and asks before deleting.

**Booking text width.** The `width: 50%` rule is removed; the booking text
column takes the rest of the table.

**Actions on one line.** The actions column shrinks to its content, so the row
passes a class with `flex-wrap: nowrap` to the button group; the rule lives in
`TimesheetRow.module.css`, `Button.Group` stays unchanged.

## Checklist

- [x] Add the `Popover` wrapper in `src/components/Popover/`.
- [x] Add the internal booking text button with the popover to the row actions.
- [x] Remove the internal booking text column and the booking text width rule.
- [x] Run lint and build, check the popover in the browser (confirmed manually).
- [x] Tick the acceptance criteria and move the plan to `docs/plans/archive/`.
