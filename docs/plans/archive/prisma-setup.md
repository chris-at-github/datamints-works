# Prisma Setup

## Context & Goal

Prepare a SQLite database accessed through Prisma ORM. The setup covers the
packages, the Prisma configuration, migrations, the generated client and a
shared client instance in `src/lib/prisma.ts`. Models follow in a separate
feature.

## Non-Goals

- No models; the first real migration comes with the first model.
- No connection of the timesheet to the database.
- No Prisma Studio and no extra DDEV port; the database is inspected with the
  `sqlite3` command line in the container.
- No seed script.

## Acceptance Criteria

- [x] `ddev exec npm run db:migrate` creates the database.
- [x] A test call through `src/lib/prisma.ts` reads successfully.
- [x] Lint and build pass.

## Open Decisions

**Prisma 7.10.0, pinned explicitly.** The npm tag `latest` currently points to
`8.0.0-rc.22`, a release candidate, so a plain `npm install prisma` would install
a pre-release. `prisma`, `@prisma/client` and the adapter are pinned to the
stable `7.10.0`.

**Driver adapter `@prisma/adapter-better-sqlite3`.** Prisma 7 needs a driver
adapter for SQLite. better-sqlite3 is the standard for a local SQLite file.
Rejected: `@prisma/adapter-libsql` (only useful for Turso or remote databases).

**Migrations instead of `db push`.** Schema changes are versioned as SQL files in
`prisma/migrations/`. Rejected: `prisma db push` (no history).

**File layout.**
- Schema: `prisma/schema.prisma`.
- Configuration: `prisma.config.ts` in the project root (Prisma 7 reads the
  database URL from here, no longer from the schema).
- Database file: `prisma/dev.db`, not in Git.
- Generated client: `src/generated/prisma/` (generator `prisma-client`), not in
  Git.
- Client instance: singleton in `src/lib/prisma.ts`, kept on `globalThis` in
  development so hot reloading does not open a new connection each time.

**Database URL only via `.env`.** `DATABASE_URL` comes from `.env`, which is not
committed. A committed `.env.example` holds the default
(`file:./prisma/dev.db`); after cloning it is copied to `.env`. Prisma 7 no longer
loads `.env` itself, so `prisma.config.ts` imports `dotenv/config` (`dotenv` as
dev dependency). Next.js loads `.env` on its own at runtime. Rejected: a default
value in `prisma.config.ts`.

**npm scripts.** `db:migrate` (`prisma migrate dev`), `db:generate`
(`prisma generate`) and `postinstall` (`prisma generate`), so the client exists
right after `npm install` and lint/build do not fail on a fresh clone.

**Test without a model.** `prisma migrate dev` creates the SQLite file even
without models. The read test runs `SELECT 1` via `$queryRaw` through
`src/lib/prisma.ts` in a temporary route that is not committed. Rejected: a
throwaway model.

**No ESLint ignore for `src/generated/**`.** Approved by the user, but not
needed: every generated file starts with `/* eslint-disable */`, so ESLint
reports nothing there. `eslint.config.mjs` stays unchanged.

**Documentation.** New guide `docs/guides/prisma.md` (without Studio) and the
commands in `CLAUDE.md`.

**Inspecting the database with `sqlite3` instead of PhpStorm.** PhpStorm on
Windows could not open the file: the SQLite JDBC driver failed to load its native
Windows library ("No native library found", even with a verified driver JAR and
`?nolock=1` for the WSL path), an SSH tunnel does not apply to a file database,
and the "Dev Container" environment has no JDK. The user chose the `sqlite3`
command line in the DDEV container, which is already installed. Rejected:
installing a JDK in the container for PhpStorm.

## Checklist

- [x] Install `prisma`, `@prisma/client`, `@prisma/adapter-better-sqlite3` (all
      `7.10.0`) and `dotenv`.
- [x] Add `prisma/schema.prisma`, `prisma.config.ts`, `.env.example` and the
      `.gitignore` entries.
- [x] Add `src/lib/prisma.ts`.
- [x] Add the npm scripts.
- [x] Run `db:migrate` and the temporary read test, then remove the test.
- [x] Add `docs/guides/prisma.md`, the guide index entry and the commands in
      `CLAUDE.md`.
- [x] Run lint and build.
- [x] Tick the acceptance criteria and move the plan to `docs/plans/archive/`.
