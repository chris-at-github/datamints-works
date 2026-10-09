# CSS Structure

## Context & Goal

Establish a clear CSS architecture for the Next.js application. Global concerns
(CSS custom properties, normalization, base HTML element styles, utilities) live
in global stylesheets under `src/styles/`. Styles for components and modules are
written as CSS Modules, colocated with their React file.

Terminology:

- **Components** (`src/components/`) — small building blocks (button, icon, badge).
- **Modules** (`src/modules/`) — self-contained content areas composed of
  components (image gallery, text-image block).

Each component or module gets its own folder, e.g.
`src/components/Button/Button.tsx` + `src/components/Button/Button.module.css`.

The structure prepares the later adoption of Base UI (second step), which ships
unstyled components that are styled via CSS Modules and `data-*` state attributes.

## Non-Goals

- No installation or usage of Base UI (second step).
- No content for `variables.css` — the design tokens are authored by the user.
- No example component or module.
- No Sass/PostCSS preprocessor; native CSS nesting only.
- No Tailwind, no CSS-in-JS.
- No dark mode or theme switching.

## Acceptance Criteria

- [x] `src/styles/` contains `application.css`, `layers.css`, `normalize.css`,
      `variables.css`, `base.css`, `utilities.css`.
- [x] `layout.tsx` imports only `application.css`; `globals.css` and
      `page.module.css` are deleted.
- [x] Inter is loaded as a variable font and applied to `body`.
- [x] A root wrapper with `isolation: isolate` exists.
- [x] `src/components/` and `src/modules/` exist.
- [x] `ddev exec npm run build` completes without errors.
- [x] The start page shows a heading and a paragraph in Inter, without template
      styles, in the browser.
- [x] `docs/guides/css.md` exists and is listed in the guide index.

## Open Decisions

**File names.** `normalize.css` (instead of `reset.css`), `variables.css`
(instead of `tokens.css`), `application.css` (instead of `globals.css`) as
requested. Note: the content of `normalize.css` is a modern hybrid of normalize
and reset, not the classic necolas `normalize.css`.

**Normalization: own hybrid instead of a package.** A short, commented rule set
modelled on Josh Comeau / Andy Bell. Rejected: `modern-normalize` (extra
dependency, harder to place into a cascade layer) and the classic
`normalize.css` (targets browsers that no longer matter).

**Cascade layers only for global styles.** `layers.css` declares
`@layer normalize, base, utilities;`. CSS Modules stay unlayered and therefore
always win over all global styles — including utilities. Consequence: utility
classes must only cover concerns that do not overlap with component styles
(e.g. `.visually-hidden`). Rejected: (a) wrapping every CSS Module in
`@layer components { }` — clearest precedence, but boilerplate in every file;
(c) no layers — precedence would depend on specificity and Next.js load order.

**Each global file wraps itself in its layer.** `application.css` plain-`@import`s
the files; each file wraps its rules in `@layer <name> { }`. `variables.css`
belongs to the `base` layer. Rejected: `@import "…" layer(name)` — relies on the
bundler merging layered imports correctly.

**Layer order in a separate `layers.css`, imported first.** Discovered during the
build: Turbopack inlines `@import` contents before all other rules of the
importing file, so an `@layer normalize, base, utilities;` statement in
`application.css` ended up after the layer blocks and had no effect — the order
depended on import order alone. Moving the statement into `layers.css` and
importing it first puts it at the top of the bundle (verified with deliberately
reversed imports). Rejected: dropping the statement and relying on import order
with a comment — no single explicit source of truth.

**Template styles removed completely.** All `globals.css` rules were demo
content (`overflow-x: hidden` on `html`/`body` hides layout bugs and breaks
`position: sticky`; `max-width: 100vw` can cause horizontal scrolling; flex
layout on `body` is a layout decision, not a base style).

**Global styles stay neutral.** Since the user authors `variables.css`,
`normalize.css` and `base.css` do not reference custom properties except the
font variable provided by `next/font`.

**Font: Inter via `next/font/google`.** Loaded without `weight`, so `next/font`
serves the variable font (one file, weights 100–900). Self-hosted at build time,
no runtime request to Google. Exposed as `--font-inter` on `<html>` and applied
in `base.css`. Geist and Geist Mono are removed.

**Base UI preparation now.** A root wrapper `<div className="root">` with
`isolation: isolate` (portalled popups stack above page content) and
`body { position: relative; }` (iOS Safari scroll lock) are added in this step,
commented with their Base UI rationale.

**Native CSS nesting allowed.** Supported by all current browsers; Turbopack /
Lightning CSS lowers it where needed.

**Empty directories tracked via `.gitkeep`.** Git does not track empty folders.

**Unused template assets removed.** Added on request after the browser check:
all SVGs in `public/` were unreferenced; `public/.gitkeep` keeps the folder.

## Checklist

- [x] Create `src/styles/normalize.css` (commented hybrid reset, layer `normalize`)
- [x] Create `src/styles/variables.css` (empty `:root` placeholder, layer `base`)
- [x] Create `src/styles/base.css` (body font, Base UI rules, root wrapper, layer `base`)
- [x] Create `src/styles/utilities.css` (`.visually-hidden`, layer `utilities`)
- [x] Create `src/styles/application.css` (layer order + imports)
- [x] Move layer order into `src/styles/layers.css` (Turbopack import hoisting)
- [x] Update `src/app/layout.tsx` (import `application.css`, Inter, root wrapper)
- [x] Delete `src/app/globals.css`
- [x] Reduce `src/app/page.tsx` to heading + paragraph, delete `page.module.css`
- [x] Create `src/components/.gitkeep` and `src/modules/.gitkeep`
- [x] Verify `ddev exec npm run build`
- [x] Verify start page in the browser (Inter, no template styles, layer order)
- [x] Write `docs/guides/css.md` and add it to `docs/guides/README.md`
- [x] Update `CLAUDE.md` structure section (`src/styles/`, `src/components/`, `src/modules/`)
- [x] Remove unused template SVGs from `public/`
- [x] Move plan to `docs/plans/archive/`

## Addendum: Neutral Color Scale

Added on request before merging, although `variables.css` content was a non-goal.

**Decisions:**

- Scale `--color-neutral-10` (light) to `--color-neutral-90` (dark) in steps of 10.
- `oklch()` instead of hex: lightness is perceptually uniform, so equal steps
  look equal.
- Lightness from 95% to 23% in even 9% steps. A first draft
  used `100% - step` (90% … 10%), but `neutral-90` compiled to `#030303` and was
  indistinguishable from black.
- Pure neutral (chroma `0`), no tint.
- White and black as separate `--color-base-white` / `--color-base-black`
  instead of `neutral-0` / `neutral-100`: they are fixed endpoints and must stay
  pure if the grays are tinted later. Names chosen by the user.

**Checklist:**

- [x] Write neutral scale and base white/black in `src/styles/variables.css`
- [x] Verify `ddev exec npm run build`
