import { notFound } from "next/navigation";
import { findEntry } from "@/lib/timesheet-repository";
import { TimesheetEntryDetail } from "@/modules/Timesheet/TimesheetEntryDetail";

// Loaded on the server, so a later modal (intercepting route) can reuse this page as it is.
// Paging stays on this route, so the key resets the form state for every entry.
export default async function TimesheetEntryPage({ params }: PageProps<"/timesheet/[pageId]/entries/[entryId]">) {
  const { pageId, entryId } = await params;
  const result = await findEntry(pageId, entryId);

  if (!result) {
    notFound();
  }

  return <TimesheetEntryDetail key={result.entry.id} pageId={pageId} {...result} />;
}
