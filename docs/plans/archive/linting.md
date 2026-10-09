# Linting

## Context & Goal

Make linting part of the workflow: ESLint for JavaScript/TypeScript (already
installed via `eslint-config-next`) and Stylelint for CSS. An `.editorconfig`
defines the code style so that both PhpStorm and Claude create files that pass
the linters without a formatter. npm scripts run the linters; `CLAUDE.md` and a
guide document them so Claude uses them before every commit.

## Non-Goals

- No formatter (Prettier or similar).
- No Git hooks (Husky, lint-staged, `.githooks/`).
- No ESLint upgrade — stays on ESLint 9.
- No property-order rules for CSS (`stylelint-order`).
- No automated verification of the PhpStorm setup — documented only.

## Acceptance Criteria

- [x] `.editorconfig` in the project root: UTF-8, LF, 2 spaces, final newline,
      no trailing whitespace (except Markdown), selected `ij_` properties
      matching the existing code.
- [x] Stylelint 17 and `stylelint-config-standard` are installed and configured.
- [x] Class names are kebab-case everywhere; the Stylelint rule is active.
- [x] `package.json` contains `lint`, `lint:js`, `lint:css`, `lint:fix`,
      `lint:js:fix`, `lint:css:fix`.
- [x] ESLint stays on 9; no Prettier; no Git hooks.
- [x] `ddev exec npm run lint` passes on the current code; existing findings are
      fixed, not disabled.
- [x] `CLAUDE.md` is updated: stack, commands, lint before every commit, follow
      `.editorconfig`.
- [x] `docs/guides/lint.md` exists (incl. PhpStorm setup) and is listed in the
      guide index.

## Open Decisions

**ESLint for JS/TS.** Already set up with `eslint-config-next` (Next.js, React
hooks, TypeScript rules). Rejected: Biome / Oxlint — faster, but incomplete
coverage of the Next.js-specific rules.

**Stylelint with `stylelint-config-standard` only.** Understands native nesting,
`@layer` and `oklch()`. Rejected: Biome's CSS linter (fewer rules, second tool);
`stylelint-config-clean-order` (stricter than needed for now).

**No formatter; `.editorconfig` carries the style.** PhpStorm reads the standard
properties plus IntelliJ-specific `ij_*` properties (quotes, semicolons, spaces
in braces, trailing commas). Claude follows the same file when writing code.
Rejected: Prettier (user decision); exporting a PhpStorm code-style scheme to
`.idea/` (not committed, not readable for Claude).

**kebab-case class names everywhere.** Including CSS Modules; in TSX, names with
a hyphen are accessed as `styles["primary-button"]`. Turbopack offers no official
option to expose kebab-case classes as camelCase. Rejected: camelCase in modules
with a separate rule (user decision).

**npm scripts, chained with `&&`.** `lint` runs `lint:js && lint:css`; if ESLint
fails, Stylelint does not run in that pass. Accepted for simplicity. Rejected: a
custom `scripts/lint.mjs` (more effort for two commands).

**Lint before every commit, not via Git hooks.** Claude runs
`ddev exec npm run lint`, fixes findings (first `lint:fix`, then manually) and
asks before adding a disable comment. Git hooks were rejected: Git runs on the
host, Node only in the container — a hook would need a running DDEV container.

**Fixing existing Stylelint findings.** `@import` switched to `url()` (layer order
verified in the build), `oklch()` hues written as `0deg`, deprecated `clip`
replaced by `clip-path: inset(50%)`, a comment groups the transition variable
(`custom-property-empty-line-before`), and `:focus-visible` moved before
`:hover` in `Ruler.module.css` (`no-descending-specificity`, no visual change).

**No vendor prefix for `text-size-adjust`, no browserslist.** Stylelint flags
the prefixed properties. The build showed that Lightning CSS adds `-moz-` but
strips `-webkit-`: Next.js' default targets (`chrome 111, edge 111, firefox 111,
safari 16.4`) do not include iOS Safari (`ios_saf`). Adding `ios_saf` to a
browserslist would make Lightning CSS emit the prefix (verified), but the user
decided iOS font inflation is not relevant. Only the unprefixed property
remains. Rejected: a disable comment (ineffective, Lightning CSS strips the
prefix anyway); a custom browserslist (not needed).

**ESLint stays on 9.** `eslint-config-next` 16.3.5 accepts `>=9`, but bundled
plugins may not fully support ESLint 10. An upgrade is a separate work package.

## Checklist

- [x] Create branch `feature/linting`
- [x] Add `.editorconfig`
- [x] Install Stylelint 17 and `stylelint-config-standard`, add `stylelint.config.mjs`
- [x] Add npm scripts to `package.json`
- [x] Run linters, fix existing findings
- [x] Update `CLAUDE.md` (stack, commands, lint before commit, `.editorconfig`)
- [x] Write `docs/guides/lint.md` (incl. PhpStorm), add to index
- [x] Move plan to `docs/plans/archive/`
