"use client";

import { useState } from "react";
import { joinClassNames } from "@/lib/class-names";
import styles from "./Timesheet.module.css";

const ROW_COUNT = 5;
const MINUTES_PER_DAY = 24 * 60;

type TimesheetRow = {
  startTime: string;
  endTime: string;
  duration: string;
  ticket: string;
  bookingText: string;
  internalNote: string;
};

type TimesheetField = keyof TimesheetRow;

const EMPTY_ROW: TimesheetRow = {
  startTime: "",
  endTime: "",
  duration: "",
  ticket: "",
  bookingText: "",
  internalNote: "",
};

// Parses "H:MM" or "HH:MM" into minutes; returns null for anything else.
function parseMinutes(value: string): number | null {
  const match = /^(\d{1,2}):([0-5]\d)$/.exec(value.trim());

  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

// Missing times or an end that is not after the start count as zero.
function calculateDuration(startTime: string, endTime: string): string {
  const start = parseMinutes(startTime);
  const end = parseMinutes(endTime);

  if (start === null || end === null || end <= start) {
    return formatMinutes(0);
  }

  return formatMinutes(end - start);
}

// Start and end time drive the duration; an edited duration moves the end time.
function updateRow(row: TimesheetRow, field: TimesheetField, value: string): TimesheetRow {
  const nextRow = { ...row, [field]: value };

  if (field === "startTime" || field === "endTime") {
    nextRow.duration = calculateDuration(nextRow.startTime, nextRow.endTime);
  }

  if (field === "duration") {
    const start = parseMinutes(nextRow.startTime);
    const duration = parseMinutes(value);

    if (start !== null && duration !== null && start + duration < MINUTES_PER_DAY) {
      nextRow.endTime = formatMinutes(start + duration);
    }
  }

  return nextRow;
}

export function Timesheet() {
  const [rows, setRows] = useState<TimesheetRow[]>(() => Array.from({ length: ROW_COUNT }, () => EMPTY_ROW));

  function handleChange(rowIndex: number, field: TimesheetField, value: string) {
    setRows((currentRows) =>
      currentRows.map((row, index) => (index === rowIndex ? updateRow(row, field, value) : row)),
    );
  }

  return (
    <table className={styles.timesheet}>
      <thead>
        <tr>
          <th scope="col" className={joinClassNames(styles.timesheet__head, styles["timesheet__head--time"])}>
            Start time
          </th>
          <th scope="col" className={joinClassNames(styles.timesheet__head, styles["timesheet__head--time"])}>
            End time
          </th>
          <th scope="col" className={joinClassNames(styles.timesheet__head, styles["timesheet__head--time"])}>
            Duration
          </th>
          <th scope="col" className={joinClassNames(styles.timesheet__head, styles["timesheet__head--ticket"])}>
            Ticket
          </th>
          <th scope="col" className={styles.timesheet__head}>
            Booking text
          </th>
          <th scope="col" className={styles.timesheet__head}>
            Internal note
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const rowNumber = index + 1;

          return (
            // Rows are fixed and never reordered, so the index is a stable key.
            <tr key={index}>
              <td className={styles.timesheet__cell}>
                <input
                  className={styles.timesheet__field}
                  type="time"
                  step={900}
                  value={row.startTime}
                  onChange={(event) => handleChange(index, "startTime", event.target.value)}
                  aria-label={`Start time, row ${rowNumber}`}
                />
              </td>
              <td className={styles.timesheet__cell}>
                <input
                  className={styles.timesheet__field}
                  type="time"
                  step={900}
                  value={row.endTime}
                  onChange={(event) => handleChange(index, "endTime", event.target.value)}
                  aria-label={`End time, row ${rowNumber}`}
                />
              </td>
              <td className={styles.timesheet__cell}>
                <input
                  className={styles.timesheet__field}
                  type="text"
                  placeholder="HH:MM"
                  value={row.duration}
                  onChange={(event) => handleChange(index, "duration", event.target.value)}
                  aria-label={`Duration, row ${rowNumber}`}
                />
              </td>
              <td className={styles.timesheet__cell}>
                <input
                  className={styles.timesheet__field}
                  type="text"
                  value={row.ticket}
                  onChange={(event) => handleChange(index, "ticket", event.target.value)}
                  aria-label={`Ticket, row ${rowNumber}`}
                />
              </td>
              <td className={styles.timesheet__cell}>
                <textarea
                  className={joinClassNames(styles.timesheet__field, styles["timesheet__field--multiline"])}
                  rows={1}
                  value={row.bookingText}
                  onChange={(event) => handleChange(index, "bookingText", event.target.value)}
                  aria-label={`Booking text, row ${rowNumber}`}
                />
              </td>
              <td className={styles.timesheet__cell}>
                <textarea
                  className={joinClassNames(styles.timesheet__field, styles["timesheet__field--multiline"])}
                  rows={1}
                  value={row.internalNote}
                  onChange={(event) => handleChange(index, "internalNote", event.target.value)}
                  aria-label={`Internal note, row ${rowNumber}`}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
