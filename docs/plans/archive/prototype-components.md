# Prototype Components

## Context & Goal

Rename the route branch `/components` to `/prototype` and merge the separate
demo pages (`/components/button`, `/components/typography`) into one page
`/prototype/components`. `/prototype` itself becomes an overview page.

## Non-Goals

- No changes to the typography content; it is moved over as it is.
- No separate demo files per component; the page holds all demo markup.
- No jump links or table of contents on the components page.
- No redirects from the old `/components/*` URLs.
- No changes to archived plans in `docs/plans/archive/`.

## Acceptance Criteria

- [x] `/prototype` shows an overview with a link to `/prototype/components`.
- [x] `/prototype/components` has an `h1` "Components", a `section` Button
      (`h2`) with Default, Disabled and Counter (`h3`), and a section with the
      unchanged typography content.
- [x] All demo markup lives in `src/app/prototype/components/page.tsx`; only
      the existing client component `CounterDemo.tsx` lives in
      `src/app/prototype/components/_helpers/`.
- [x] The shared frame (`layout.tsx`, `layout.module.css`) stays at the top of
      the route branch, now `src/app/prototype/`.
- [x] The pages have the titles "Prototype" and "Components".
- [x] `/components`, `/components/button` and `/components/typography` return
      a 404.
- [x] The path in `docs/guides/base-ui.md` is updated.
- [x] `ddev exec npm run lint` and `ddev exec npm run build` pass.

## Open Decisions

- **Helper folder `_helpers/`.** A leading underscore marks a private folder in
  the App Router, so it can never become a route. Rejected: `helpers/` without
  underscore, which only stays route-free as long as nobody adds a `page.tsx`.
- **Typography headings.** The typography section keeps its `h1`–`h3` display
  headings unchanged although the page already has an `h1`; the heading outline
  is not relevant for prototype pages.
- **Old URLs.** Dropped without redirects; they were only used internally.

## Checklist

- [x] Move `src/app/components/` to `src/app/prototype/` and update the
      `LayoutProps` route
- [x] Add overview page `src/app/prototype/page.tsx`
- [x] Create `src/app/prototype/components/page.tsx` with Button and
      Typography sections
- [x] Move `CounterDemo.tsx` to `src/app/prototype/components/_helpers/`
- [x] Remove the old `button/` and `typography/` pages
- [x] Update the path in `docs/guides/base-ui.md`
- [x] Run lint and build, check routes and 404s
- [x] Archive this plan
