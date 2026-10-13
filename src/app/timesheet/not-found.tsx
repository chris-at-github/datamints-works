import Link from "next/link";

// Shown inside the timesheet layout when a page calls notFound().
export default function TimesheetNotFound() {
  return (
    <>
      <p>Timesheet page not found.</p>
      <p>
        <Link href="/timesheet">Go to the latest page</Link>
      </p>
    </>
  );
}
