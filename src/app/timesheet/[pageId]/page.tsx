import { Timesheet } from "@/modules/Timesheet/Timesheet";

export default async function TimesheetByIdPage({ params }: PageProps<"/timesheet/[pageId]">) {
  const { pageId } = await params;

  // The key remounts the timesheet, so switching pages starts with a fresh load.
  return <Timesheet key={pageId} pageId={pageId} />;
}
