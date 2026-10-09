# Button Icon

## Context & Goal

Add an icon-only button `Button.Icon` that receives its icon as a component
(`icon={Plus}`) and renders it as inline SVG. Icons come from the `lucide-react`
library for now and will be replaced by own icons later. Because icons are also
needed outside buttons, a general `Icon` component in `src/components/Icon/`
renders them; `Button.Icon` uses it. The button styles live in the existing
`Button.module.css`.

## Non-Goals

- No icon next to a button label (icon plus text); only icon-only buttons.
- No icon position handling.
- No icon size token; the icon scales with the font size.
- No own icon set yet; only the type is prepared so own icons can be added later.
- No enforced `aria-label` in TypeScript.

## Acceptance Criteria

- [x] `Button.Icon` is shown inside the `Button.Group` on `/prototype/components`.

## Open Decisions

- **Icon source `lucide-react`.** Icons are React components rendering inline
  SVG, colored via `currentColor`, typed and tree-shaken. Rejected: own SVG
  files with SVGR (loader config, no own icons yet), hand-written TSX icons
  (manual work per icon), an SVG sprite (not inline).
- **Icon type.** `Icon` accepts any component that renders an `svg` with its
  props, so own icon components can replace lucide icons later without changing
  the API.
- **`Button.Icon` as server component.** A component passed as `icon` is a
  function and cannot be passed to the client `Button`. `Button.Icon` renders
  the icon itself and passes only the rendered SVG as children. For the same
  reason it accepts `className` only as a string, not as a Base UI state
  function.
- **Icon size `1em`.** No token, as decided; the icon follows the font size of
  its context.
- **Square icon button.** `min-width` repeats the hard-coded `min-height: 41px`
  of `.button`; both move to tokens in the planned token clean-up.
- **Accessibility.** The icon itself is decorative (`aria-hidden`); the button
  should get an `aria-label`, which is recommended but not enforced.

## Checklist

- [x] Install `lucide-react`
- [x] Create `src/components/Icon/` (`Icon.tsx`, `Icon.module.css`)
- [x] Create `src/components/Button/IconButton.tsx` and add its styles to `Button.module.css`
- [x] Expose it as `Button.Icon` in `src/components/Button/index.tsx`
- [x] Show `Button.Icon` in the `Button.Group` on the prototype components page
- [x] Run lint and build, check the components page in the built app
- [x] Archive this plan
