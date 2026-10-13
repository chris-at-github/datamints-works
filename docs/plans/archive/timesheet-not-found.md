# Timesheet Not Found

## Context & Goal

Opening `/timesheet/<id>` with an id that does not exist (e.g. an old URL after
`db:seed`) currently shows the generic "The timesheet could not be loaded."
message. Instead, a 404 page for the timesheet is shown.

## Non-Goals

- No change to the handling of other errors (network, server errors).
- No global 404 page for the whole app; other routes keep the Next.js default.

## Acceptance Criteria

- [x] An old URL shows the 404 page.

## Open Decisions

**Server-side check with `notFound()`.** `src/app/timesheet/[pageId]/page.tsx`
checks whether the page exists and calls `notFound()` otherwise; the response
has status 404. Rejected: redirecting to `/timesheet` (hides that the URL is
outdated) and a client-side message (status stays 200).

**Not-found page only for the timesheet.** `src/app/timesheet/not-found.tsx`
renders inside the timesheet layout. URLs that match no route at all still get
the global Next.js 404.

**Text.** "Timesheet page not found." with a link "Go to the latest page" to
`/timesheet`.

## Checklist

- [x] Add `pageExists()` to the repository and call `notFound()` for unknown ids.
- [x] Add `src/app/timesheet/not-found.tsx` with the text and the link.
- [x] Run lint and build, check an old URL in the browser (confirmed manually).
- [x] Tick the acceptance criteria and move the plan to `docs/plans/archive/`.
