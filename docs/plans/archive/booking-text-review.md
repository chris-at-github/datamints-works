# Booking Text Review

## Context & Goal

Every entry gets a second, editable booking text next to the original one: the
reviewed booking text. A button on the entry detail page sends the entry to
Claude, which rewrites the booking text by rules from a Markdown template, and
the answer is stored in the reviewed field. The original booking text stays
unchanged. The review runs on the server, so it can also be started without the
UI (an API request, later a script or a job).

## Non-Goals

- No final UI design for the button; it sits plainly below the field for now.
- No error or success feedback in the UI; errors are logged to the console.
- No further fields in the JSON answer besides `optimizedText` (e.g. hints).
- No refusal fallback to another model.
- No authentication for the review route (local DDEV only).
- No reviewed booking text in the table.

## Acceptance Criteria

- [x] The booking text is processed and the answer is written into the reviewed field.
- [x] The review can be run several times in a row; each run overwrites the field.

## Open Decisions

**Field `bookingTextReviewed`.** New text column on `TimesheetEntry`, label
"Reviewed booking text". Neutral, so it also fits manual edits; editable and
saved on blur like the other fields. Rejected: `bookingTextOptimized` (bound to
the AI), `bookingTextExternal`, `bookingTextFinal`, `bookingTextPolished`.

**Server-side service.** `reviewBookingText(entryId)` in
`src/lib/booking-text-review.ts` loads the entry and the page date from the
database, fills the template, calls Claude, stores the answer and returns the
updated entry. `POST /api/timesheet-entries/<id>/review` calls it and answers
with `{ entry }`; the button calls the route. Other triggers use the service or
the route. Rejected: sending the values from the client (a trigger without UI
would have nothing to send, and the result would not be stored).

**API key only on the server.** The key is read by the SDK on the server; no
`NEXT_PUBLIC_` prefix, so it never ends up in the client bundle.

**Anthropic SDK.** `@anthropic-ai/sdk` brings types, retries on 429/5xx and
typed error classes. Rejected: plain `fetch` (all of that would be rebuilt).

**Structured outputs with Zod.** `client.messages.parse()` with
`zodOutputFormat()` constrains the answer to the schema
`{ optimizedText: string }` and returns it parsed and typed. `zod` is added as
a dependency; it can later validate the API routes too. Rejected: asking for
JSON in the prompt (the answer can be invalid or incomplete) and a hand-written
JSON schema with `JSON.parse` (no types, own validation).

**Template `prompts/booking-text-review.md`.** One file, versioned, written in
German, holds the rules and the placeholders and is sent as the user message.
Placeholders use `{{name}}`: `date`, `startTime`, `endTime`, `duration`,
`ticket`, `bookingText`, `bookingTextInternal`. Unknown placeholders are
removed. The file is read on every run, so rule changes apply without restart.

**Configuration in `.env`.** `ANTHROPIC_API_KEY` (read by the SDK),
`ANTHROPIC_MODEL` (default `claude-sonnet-5-5`, Haiku later maybe) and
`ANTHROPIC_EFFORT` (default `low`: short texts, fast and cheap). Placeholders
in `.env.example`. A missing key or model fails with an error in the console.

**Errors and refusals.** A missing configuration, API errors, a refusal
(`stop_reason: "refusal"`) or a missing parsed answer throw in the service; the
route logs them, answers 502 for all of them and the button logs the error. An unknown entry answers 404. Rejected for now: the
server-side refusal fallback (beta endpoint, rarely needed for booking texts;
can be added later).

**Button.** Below the reviewed field, label "Review booking text". Disabled
while the booking text is empty and while a review runs (loading state). Before
the request it waits for pending saves, so the text just typed is sent.

## Checklist

- [x] Add the column `bookingTextReviewed` with a migration and to `TIMESHEET_FIELDS`.
- [x] Add the editable field to the detail page.
- [x] Install `@anthropic-ai/sdk` and `zod`, add the variables to `.env.example`.
- [x] Add the template `prompts/booking-text-review.md` with base rules in German.
- [x] Add the service `reviewBookingText()` with template filling and the Claude call.
- [x] Add the route `POST /api/timesheet-entries/<id>/review`.
- [x] Add the button with loading state; it waits for pending saves and fills the field.
- [x] Add the guide `docs/guides/claude-api.md` and link it in the index.
- [x] Run lint and build, run several reviews in the browser and via `curl`.
- [x] Tick the acceptance criteria and move the plan to `docs/plans/archive/`.
