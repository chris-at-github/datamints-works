# Base UI

## Context & Goal

Integrate Base UI (`@base-ui/react`) and verify the integration with a first own
component: a `Button` in `src/components/Button/` that wraps the Base UI
`Button`, styled with a CSS Module. The component is shown on a demo route
`/components/button`.

The global preparation for Base UI (`.page` wrapper with `isolation: isolate`,
`body { position: relative; }`) already exists from the CSS structure feature.

## Non-Goals

- No further components (dialog, menu, popover, …) and therefore no verification
  of portals and the `.page` stacking context.
- No button variants or sizes — exactly one style.
- No spacing, radius or typography variables — fixed values in the CSS Module.
- No automated tests; testing remains TBD.

## Acceptance Criteria

- [x] `@base-ui/react` is listed as `^1.8.0` in `package.json` and installed.
- [x] `src/components/Button/Button.tsx` and `Ruler.module.css` exist.
- [x] `Button` passes through all props of the Base UI `Button` and merges
      `className` (string and function).
- [x] The button has exactly one style; colors come from `--color-neutral-*` /
      `--color-base-*`, all other values are fixed.
- [x] Hover, pressed, `:focus-visible` and disabled are visible, with a
      transition via `--transition-duration-default`.
- [x] `--transition-duration-default` lives in `variables.css` and is `0s` under
      `prefers-reduced-motion: reduce`.
- [x] `/components/button` shows default, disabled and counter. (The link
      variant was dropped, see Open Decisions.)
- [x] The page itself stays a server component; only the counter is a client
      component.
- [x] Keyboard: Tab reaches the buttons, disabled ones are skipped, Enter/Space
      trigger, the focus ring only appears for keyboard focus.
- [x] `ddev exec npm run build` completes without errors.
- [x] `docs/guides/base-ui.md` exists and is listed in the guide index.

## Open Decisions

**Package `@base-ui/react`.** The former name `@base-ui-components/react` is
deprecated. Version range `^1.8.0` as requested, so minor updates are allowed;
`package-lock.json` still pins the installed version.

**Own wrapper components instead of using Base UI directly in modules.** Styles
live in one place; modules only use `src/components/*`. Rejected: styling Base UI
parts in every module (duplicated styles).

**Pass through all props.** `Button` accepts `Button.Props` from Base UI, so
`disabled`, `onClick`, `type`, `render`, `focusableWhenDisabled` etc. work
unchanged. Rejected: a narrow, hand-picked prop list.

**`className` merging covers strings and functions.** Base UI accepts
`className` as a string or as `(state) => string`. The wrapper prepends the
module class in both cases.

**`Ruler.tsx` is a client component (`"use client"`).** A function `className`
(created by the wrapper when merging a function) cannot cross the server/client
boundary. Marking the wrapper as a client component keeps merging inside the
client. Server components can still render `Button` with serializable props,
including React elements for `render`. Rejected: leaving the wrapper as a server
component and only forwarding strings — it breaks as soon as a caller passes a
function.

**Pressed state via `:active`.** The Base UI `Button` only exposes
`data-disabled`; there is no `data-pressed` (that belongs to `Toggle`).

**Transitions via `--transition-duration-default`.** Defined in `variables.css`
as `150ms`, overridden to `0s` inside `@media (prefers-reduced-motion: reduce)`.
Every transition using the variable is disabled automatically. Rejected: a
reduced-motion media query in every CSS Module.

**No link variant via `render`.** Discovered during the HTML check: rendering
`<Button nativeButton={false} render={<a href="/" />}>` produces
`<a role="button">` with button keyboard behaviour. `render` is meant for
elements that must behave like a button, not for navigation links that should
look like a button — screen readers would announce a button. The link demo was
removed (user decision); links styled as buttons will get their own component
later (e.g. based on `next/link`). Rejected: keeping it with a note (wrong
semantics in the demo); building a `ButtonLink` now (scope growth).

**Demo route `/components/button`.** Lives in `src/app/components/button/`.
Note: a second folder named `components` besides `src/components/`; accepted by
the user. The counter demo is a colocated client component
(`src/app/components/button/CounterDemo.tsx`) because it only belongs to the
demo. A small `page.module.css` lays out the demo sections.

## Checklist

- [x] Create branch `feature/base-ui`
- [x] Install `@base-ui/react@^1.8.0`
- [x] Add `--transition-duration-default` incl. reduced motion to `variables.css`
- [x] Create `src/components/Button/Button.tsx` (prop pass-through, `className` merging)
- [x] Create `src/components/Button/Button.module.css` (style and states)
- [x] Create demo route `src/app/components/button/` (page, counter, layout CSS)
- [x] Verify `ddev exec npm run build`
- [x] Verify served HTML via `curl` (`data-disabled`, link as `<a>`)
- [x] Remove link demo (`role="button"` on `<a>`)
- [x] User check in the browser incl. keyboard
- [x] Write `docs/guides/base-ui.md`, add to index, link from `docs/guides/css.md`
- [x] Move plan to `docs/plans/archive/`
