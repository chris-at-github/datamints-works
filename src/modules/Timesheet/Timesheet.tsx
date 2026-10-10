"use client";

import { useSyncExternalStore } from "react";
import { formatDate } from "@/lib/date";
import { TimesheetPage } from "./TimesheetPage";

// The date never changes while the page is open, so there is nothing to subscribe to.
function subscribe() {
  return () => {};
}

// Frame around the day pages; browsing between them will be added here.
// Today is read in the browser only: the route is prerendered at build time,
// so the server snapshot is null instead of the build date.
export function Timesheet() {
  const today = useSyncExternalStore(
    subscribe,
    () => formatDate(new Date()),
    () => null,
  );

  return <TimesheetPage date={today} />;
}
