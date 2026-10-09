# Button Component

## Context & Goal

The button group (`src/components/Button/Group.tsx`) becomes part of the
`Button` component and is called as `Button.Group`. The group passes its props
through to the rendered element.

## Non-Goals

- No own group props (orientation, alignment, spacing variants); only native
  `ul` props.
- No token clean-up of `Button.module.css` (e.g. `min-height: 41px`); this is a
  separate feature.
- No changes to the button styles themselves.

## Acceptance Criteria

- [x] The call `<Button.Group><Button>xxx</Button></Button.Group>` works.

## Open Decisions

- **Entry point `index.tsx` (variant A).** `Button.tsx` is a client component,
  and a server component cannot access properties of a client reference
  (`Button.Group` throws "You cannot dot into a client module from a server
  component"). A new entry point without `"use client"` wraps the client button
  in a server-safe function and attaches `Group` to it. Rejected: a Base UI
  style namespace (`Button.Root`, `Button.Group`), which would change every
  existing `<Button>` call; a separate `ButtonGroup` export, which does not
  meet the requirement.
- **List markup.** The group renders a `ul` and wraps every child in an `li`,
  so callers pass buttons directly. Empty children (`null`, `false`) do not
  create empty list items.
- **Group as server component.** `Group` has no state and creates no functions,
  so it needs no `"use client"`.
- **Props.** `Group` accepts all native `ul` props and merges `className` with
  `.button-group`; no own props for now.
- **Shared helper `src/lib/class-names.ts`.** `joinClassNames` moves out of
  `Button.tsx` so `Group` can reuse it. Rejected: the `clsx` package, a
  dependency for a few lines of code.

## Checklist

- [x] Move `joinClassNames` to `src/lib/class-names.ts` and use it in `Button.tsx`
- [x] Rewrite `Group.tsx` as a server component rendering `ul`/`li` with prop pass-through
- [x] Add entry point `src/components/Button/index.tsx` exposing `Button` with `Button.Group`
- [x] Switch imports in the prototype page and `CounterDemo.tsx` to `@/components/Button`
- [x] Use `<Button.Group>` on the prototype components page
- [x] Run lint and build, check the components page in the built app
- [x] Archive this plan
