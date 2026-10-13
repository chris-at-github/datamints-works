# Timesheet Pagination

## Context & Goal

The timesheet header gets two icon-only buttons to page between day pages,
placed right next to the date. Pages are ordered by their date; only the
neighbouring pages are reachable (no page list, no jumping).

## Non-Goals

- At most one page per day (a separate requirement).
- No tooltip on the buttons.
- No keyboard shortcuts.
- No change to the loading state: switching pages shows "Loading…" briefly.

## Acceptance Criteria

- [x] Paging between pages works.
- [x] On the latest page "forward" (`<`, newer) is disabled.
- [x] On the oldest page "back" (`>`, older) is disabled.

## Open Decisions

**Direction.** `<` (`ChevronLeftIcon`) leads to the newer page, `>`
(`ChevronRightIcon`) to the older page, like "newer / older posts" in a feed.
The latest page is the one with the highest date. Accessible names: "Newer page"
and "Older page" — rejected: "Previous / Next page" (ambiguous with this
direction).

**Disabled at the edges.** A button without a target page stays visible but is
disabled, so the layout does not shift.

**Order.** `date`, then `createdAt` as tie-breaker — the same order as
`findLatestPage()`. Several pages per day are out of scope, but existing data
may contain them; the tie-breaker keeps paging from skipping them.

**Neighbours in the main request.** `GET /api/timesheet-pages/[id]` and
`/latest` return `{ page, neighbors: { newerId, olderId } }`. Rejected: a
separate neighbours endpoint (an extra roundtrip).

**URL.** Paging navigates to `/timesheet/<id>` with `router.push`, the Next.js
default (also used by `<Link>` and "New"): every page gets a history entry and
the browser's back button returns to the previous page. Rejected:
`router.replace` (no history entries, back leaves the timesheet).

**Placement.** The date and the pagination group sit together on the left of
the header, the page actions ("New") stay on the right.

## Checklist

- [x] Return the neighbour ids from the repository and both GET endpoints.
- [x] Read the neighbours in the client API and keep them in the `Timesheet` state.
- [x] Add `TimesheetPagination` and place it next to the date in the header.
- [x] Navigate with `router.push` to the selected page.
- [x] Run lint and build, check paging in the browser (confirmed manually).
- [x] Tick the acceptance criteria and move the plan to `docs/plans/archive/`.
