# Timesheet Row Actions

## Context & Goal

Every timesheet row gets a button group with actions for that row. The first
action deletes the row. Empty rows are deleted right away; rows with data ask
for confirmation first.

## Non-Goals

- No further row actions yet.
- No undo, no focus handling after deleting.
- No renumbering of `sorting` after deleting.

## Acceptance Criteria

- [x] The row disappears when it is deleted.
- [x] Empty rows are deleted without a confirmation.

## Open Decisions

**Actions column.** A last column without header text holds a `Button.Group`
per row, so more actions can be added later.

**Delete button.** `Button.Icon` with the lucide `Trash2Icon` and the accessible
name "Delete row N". Rejected: a text button (wider column).

**Confirmation only for rows with data.** A row counts as empty if all fields are
empty; a duration of `00:00` also counts as empty (it remains after clearing
start or end time). Rows with data open the existing `AlertDialog`: "Delete
row?", "This row contains data and will be removed.", "Cancel", "Delete".

**Endpoint `DELETE /api/timesheet-entries/[id]`.** Answers 204 even if the entry
does not exist (`deleteMany`), so deleting twice is harmless.

**Optimistic removal.** The row is removed from the state at once, the request
runs in the background; errors are logged to the console, like saving.

**Sorting gaps.** The remaining rows keep their `sorting` values; only the order
matters.

**Deleting the last row is allowed.** The table is empty then, "Add rows" stays.

## Checklist

- [x] Add `DELETE /api/timesheet-entries/[id]` and the repository function.
- [x] Add the actions column with the delete button and the confirmation.
- [x] Remove the row from the state and delete it via the API.
- [x] Run lint and build, check `/timesheet` in the browser (confirmed manually).
- [x] Tick the acceptance criteria and move the plan to `docs/plans/archive/`.
