import { notFound } from "next/navigation";
import { pageExists } from "@/lib/timesheet-repository";
import { Timesheet } from "@/modules/Timesheet/Timesheet";

export default async function TimesheetByIdPage({ params }: PageProps<"/timesheet/[pageId]">) {
  const { pageId } = await params;

  // Unknown ids (e.g. old URLs after a reseed) get a 404 instead of a load error.
  if (!(await pageExists(pageId))) {
    notFound();
  }

  // The key remounts the timesheet, so switching pages starts with a fresh load.
  return <Timesheet key={pageId} pageId={pageId} />;
}
