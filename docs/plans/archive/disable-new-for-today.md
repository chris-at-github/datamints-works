# Disable "New" for Today

## Context & Goal

The "New" button in the timesheet header creates a page for today. It is
disabled as soon as a page for today exists, so no second page for the same day
is created by accident.

## Non-Goals

- No server-side check and no unique index on `date` (several users may later
  have pages with the same date).
- No hint or tooltip explaining why the button is disabled.
- No update when the day changes while the timesheet is open; the button state
  is refreshed with the next load.
- No jump to today's page instead of disabling.

## Acceptance Criteria

- [x] "New" is disabled if a page for today already exists.
- [x] "New" is disabled after a page has been created with it.

## Open Decisions

**"Today" in the browser.** Today is `formatDate(new Date())` in local time,
like in `createPage()`. Rejected: a server-computed flag — the DDEV container
runs in UTC and would see another day shortly after midnight.

**Latest date in the main request.** `GET /api/timesheet-pages/[id]` and
`/latest` additionally return `latestDate`, the date of the latest page. Pages
are only created for today, so a page for today exists exactly if
`latestDate` equals today. Rejected: an extra request to `/latest` (another
roundtrip).

**Pages created on the first load.** If there is no page at all, the created
page is the latest one; its date is used as `latestDate`.

## Checklist

- [x] Return `latestDate` from the repository and both GET endpoints.
- [x] Keep `latestDate` in the `Timesheet` state, also for a page created on the first load.
- [x] Disable "New" if `latestDate` is today.
- [x] Run lint and build, check the button in the browser (confirmed manually).
- [x] Tick the acceptance criteria and move the plan to `docs/plans/archive/`.
