# Next.js DDEV Environment

## Context & Goal

Set up a DDEV-based development environment for this repository, modelled on
`kingdom-prototype`, that runs a single Next.js application.

The container provides the whole toolchain (Node.js 24); no Node.js is installed
or used on the host. The Next.js dev server runs inside the web container and is
published through the DDEV router under the project's HTTPS hostname.

Scope of the application scaffold: Next.js 16 with App Router, TypeScript,
ESLint, Turbopack, `src/` directory, no Tailwind CSS, no database.

## Non-Goals

- No separate React/Vite application. Next.js builds on React, so a second SPA
  adds no learning value here.
- No Vite. Next.js ships its own bundler (Turbopack since v16); Vite is not a
  supported bundler for Next.js and will not be wired in.
- No database container. `omit_containers: [db]` stays, as in the prototype.
- No Tailwind CSS, no UI component library (shadcn/ui or similar).
- No deployment, CI, or hosting setup.
- No test framework. Testing remains TBD per `CLAUDE.md`.
- Linting is installed but not enforced as part of the workflow.

## Acceptance Criteria

- [x] `ddev start` completes without errors.
- [x] `ddev exec npm run dev` starts the dev server and the start page is
      reachable at <https://kingdom-frontend.ddev.site:3000>.
- [x] A change to `src/app/page.tsx` shows up via Fast Refresh without a manual
      browser reload.
- [x] `ddev exec npm run build` completes without errors and
      `ddev exec npm run start` serves the production build at the same URL.
- [x] `ddev exec npm run lint` completes without errors.
- [x] No host Node.js is required; `node_modules/` and `.next/` are excluded
      from Git.
- [x] `CLAUDE.md`, `README.md`, and `docs/guides/ddev.md` describe the actual
      state (Next.js instead of React/Vite, port 3000, app at repository root).

## Open Decisions

**Bundler: Turbopack, not Vite.** The original requirement asked for Vite as the
build tool for Next.js. That combination does not exist — Next.js and Vite are
competing build systems. Rejected alternatives: (a) opting out to webpack, which
is the legacy path since Next.js 16 and noticeably slower; (b) replacing Next.js
with a genuinely Vite-based React meta-framework such as React Router v7 or
TanStack Start. Turbopack was chosen because it is the Next.js 16 default, needs
no extra configuration, and matches the documentation.

**Application at the repository root.** One repo, one `package.json`, no nesting.
`working_dir` therefore stays at the DDEV default `/var/www/html`, which makes
both `ddev exec npm …` and `ddev npm …` work from the project root. Rejected
alternative: a `frontend/` subdirectory as in the prototype — it separates app
code from `.ddev/` and `docs/`, but adds a directory level that a single app does
not need.

**Scaffolding via a temporary directory.** `create-next-app` refuses to write
into a directory that contains unknown files, and this repository already holds
`CLAUDE.md` and `docs/`. The scaffold is therefore generated in `/tmp` inside the
container and then moved into the project root. The generated `README.md` is
discarded; the existing one is kept and updated by hand.

**ESLint installed, not enforced.** `eslint-config-next` catches Next.js-specific
mistakes (incorrect `Image`/`Link` usage, server/client boundary violations).
Available as `npm run lint`, but not part of the workflow — consistent with how
oxlint was handled in the prototype.

**`allowedDevOrigins` is required.** Since v15.3 Next.js rejects dev requests
carrying a foreign `Host` header as protection against DNS rebinding — the same
class of problem that `allowedHosts` solves for Vite. Without the entry, requests
through `kingdom-frontend.ddev.site` are blocked or warned about.

**Fast Refresh over HTTPS is assumed to work unconfigured.** Next.js derives the
HMR websocket target from the page origin, so it should connect to
`wss://kingdom-frontend.ddev.site:3000` on its own — unlike Vite, which needed an
explicit `hmr` block. Verified: the dev websocket lives at `/_next/hmr`, and the
router upgrades it correctly (`101 Switching Protocols`, followed by a
`turbopack-connected` message). No extra configuration was needed.

**Open risk: file watching under WSL2.** The project lives on the WSL2 filesystem
and is bind-mounted into the container. If inotify events do not propagate,
Turbopack will not see changes and polling becomes the fallback. Resolved: inotify
events propagate, a change to `src/app/page.tsx` was served within one second.
No polling configuration is required.

## Checklist

### 1. DDEV configuration

- [x] Create `.ddev/config.yaml` with `name: kingdom-frontend`, `type: generic`,
      `webserver_type: generic`, `docroot: ""`, `nodejs_version: "24"`,
      `omit_containers: [db]`, `corepack_enable: false`.
- [x] Add `web_extra_exposed_ports` for the Next.js dev server
      (`container_port: 3000`, `http_port: 2999`, `https_port: 3000`).
- [x] Run `ddev start` and confirm the container comes up without errors.
- [x] Verify the Node.js version inside the container via `ddev exec node -v`.

### 2. Next.js scaffold

- [x] Generate the app inside the container into a temporary directory:
      App Router, TypeScript, ESLint, `src/`, no Tailwind, Turbopack, npm,
      import alias `@/*`.
- [x] Move the scaffold into the project root, discarding its `README.md`.
- [x] Merge the generated `.gitignore` entries into the existing `.gitignore`
      (notably `.next/`, `next-env.d.ts` handling, `*.tsbuildinfo`).
- [x] Run `ddev exec npm install` and confirm it completes.
- [x] Confirm `package.json` scripts: `dev`, `build`, `start`, `lint`.

### 3. Router integration

- [x] Add `allowedDevOrigins` for `kingdom-frontend.ddev.site` to
      `next.config.ts`.
- [x] Start the dev server and confirm the start page loads at
      <https://kingdom-frontend.ddev.site:3000>.
- [x] Confirm the dev server binds to `0.0.0.0` inside the container, and pin the
      port so it cannot silently fall back to 3001.
- [x] Verify Fast Refresh with a change to `src/app/page.tsx`; if events do not
      arrive, configure polling and record the reason.

### 4. Production build

- [x] Run `ddev exec npm run build` and confirm it completes without errors.
- [x] Run `ddev exec npm run start` and confirm the build is served at the same
      URL.
- [x] Confirm `.next/` is not tracked by Git.

### 5. Linting

- [x] Run `ddev exec npm run lint` and confirm it completes without errors.

### 6. Documentation

- [x] Update `docs/guides/ddev.md`: replace the Vite sections with the Next.js
      equivalents (start environment, commands in the container, dev server
      behind the router, production build).
- [x] Update `CLAUDE.md`: stack section (Next.js 16, Turbopack, ESLint instead of
      Vite/oxlint), command section (ports, paths), structure section.
- [x] Update `README.md`: describe the actual stack and project structure.
- [x] Check `docs/guides/README.md` for entries that no longer apply.

### 7. Wrap-up

- [x] Verify all acceptance criteria against actual command output.
- [x] Move this document to `docs/plans/archive/`.
