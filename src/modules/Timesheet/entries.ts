import { addDuration, getDuration } from "@/lib/time";

// Named "entry" so it does not clash with the TimesheetRow component.
export type TimesheetEntry = {
  startTime: string;
  endTime: string;
  duration: string;
  ticket: string;
  bookingText: string;
  internalNote: string;
};

export type TimesheetField = keyof TimesheetEntry;

const EMPTY_ENTRY: TimesheetEntry = {
  startTime: "",
  endTime: "",
  duration: "",
  ticket: "",
  bookingText: "",
  internalNote: "",
};

export function createEmptyEntries(count: number): TimesheetEntry[] {
  return Array.from({ length: count }, () => EMPTY_ENTRY);
}

// Start and end time drive the duration; an edited duration moves the end time.
export function updateEntry(entry: TimesheetEntry, field: TimesheetField, value: string): TimesheetEntry {
  const nextEntry = { ...entry, [field]: value };

  if (field === "startTime" || field === "endTime") {
    nextEntry.duration = getDuration(nextEntry.startTime, nextEntry.endTime);
  }

  if (field === "duration") {
    nextEntry.endTime = addDuration(nextEntry.startTime, value) ?? nextEntry.endTime;
  }

  return nextEntry;
}
