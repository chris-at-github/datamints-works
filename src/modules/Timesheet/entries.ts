import { addDuration, completeTime, getDuration, roundTime } from "@/lib/time";

// The editable values of one row.
export type TimesheetValues = {
  startTime: string;
  endTime: string;
  duration: string;
  ticket: string;
  bookingText: string;
  bookingTextInternal: string;
};

export type TimesheetField = keyof TimesheetValues;

export const TIMESHEET_FIELDS: TimesheetField[] = [
  "startTime",
  "endTime",
  "duration",
  "ticket",
  "bookingText",
  "bookingTextInternal",
];

const TIME_FIELDS: TimesheetField[] = ["startTime", "endTime", "duration"];

// Named "entry" so it does not clash with the TimesheetRow component.
export type TimesheetEntry = TimesheetValues & {
  id: string;
  sorting: number;
};

// A page as delivered by the API: one day with its entries in row order.
export type TimesheetPageData = {
  id: string;
  date: string;
  entries: TimesheetEntry[];
};

const EMPTY_VALUES: TimesheetValues = {
  startTime: "",
  endTime: "",
  duration: "",
  ticket: "",
  bookingText: "",
  bookingTextInternal: "",
};

// Ids come from the browser, so new rows can be keyed and saved right away.
export function createEmptyEntries(count: number, firstSorting: number): TimesheetEntry[] {
  return Array.from({ length: count }, (_, index) => ({
    ...EMPTY_VALUES,
    id: crypto.randomUUID(),
    sorting: firstSorting + index,
  }));
}

// Sorting value for rows appended after the existing ones.
export function getNextSorting(entries: TimesheetEntry[]): number {
  return entries.reduce((max, entry) => Math.max(max, entry.sorting + 1), 0);
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

// Completes and rounds a time field to a quarter hour, e.g. when leaving it;
// other fields and values that cannot be parsed are returned unchanged.
export function roundEntryTime(entry: TimesheetEntry, field: TimesheetField): TimesheetEntry {
  if (!TIME_FIELDS.includes(field)) {
    return entry;
  }

  const rounded = roundTime(completeTime(entry[field]));

  return rounded === null || rounded === entry[field] ? entry : updateEntry(entry, field, rounded);
}
