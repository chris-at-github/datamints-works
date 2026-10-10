import { mergeClassName } from "@/lib/class-names";
import { completeTime, maskTime, roundTime } from "@/lib/time";
import type { TimesheetEntry, TimesheetField } from "./entries";
import styles from "./TimesheetRow.module.css";

export type TimesheetRowProps = {
  entry: TimesheetEntry;
  rowNumber: number;
  onChange: (field: TimesheetField, value: string) => void;
};

export function TimesheetRow({ entry, rowNumber, onChange }: TimesheetRowProps) {
  // The mask keeps time fields in "HH:MM" while typing.
  function handleTimeChange(field: TimesheetField, value: string) {
    onChange(field, maskTime(value));
  }

  // Partial input is completed and rounded to a quarter hour when leaving the field.
  function handleTimeBlur(field: TimesheetField, value: string) {
    const rounded = roundTime(completeTime(value));

    if (rounded !== null && rounded !== value) {
      onChange(field, rounded);
    }
  }

  const multilineClassName = mergeClassName(styles["timesheet-row__field"], styles["timesheet-row__field--multiline"]);

  return (
    <tr>
      <td className={styles["timesheet-row__cell"]}>
        <input
          className={styles["timesheet-row__field"]}
          type="text"
          placeholder="HH:MM"
          value={entry.startTime}
          onChange={(event) => handleTimeChange("startTime", event.target.value)}
          onBlur={(event) => handleTimeBlur("startTime", event.target.value)}
          aria-label={`Start time, row ${rowNumber}`}
        />
      </td>
      <td className={styles["timesheet-row__cell"]}>
        <input
          className={styles["timesheet-row__field"]}
          type="text"
          placeholder="HH:MM"
          value={entry.endTime}
          onChange={(event) => handleTimeChange("endTime", event.target.value)}
          onBlur={(event) => handleTimeBlur("endTime", event.target.value)}
          aria-label={`End time, row ${rowNumber}`}
        />
      </td>
      <td className={styles["timesheet-row__cell"]}>
        <input
          className={styles["timesheet-row__field"]}
          type="text"
          placeholder="HH:MM"
          value={entry.duration}
          onChange={(event) => handleTimeChange("duration", event.target.value)}
          onBlur={(event) => handleTimeBlur("duration", event.target.value)}
          aria-label={`Duration, row ${rowNumber}`}
        />
      </td>
      <td className={styles["timesheet-row__cell"]}>
        <input
          className={styles["timesheet-row__field"]}
          type="text"
          value={entry.ticket}
          onChange={(event) => onChange("ticket", event.target.value)}
          aria-label={`Ticket, row ${rowNumber}`}
        />
      </td>
      <td className={styles["timesheet-row__cell"]}>
        <textarea
          className={multilineClassName}
          rows={1}
          value={entry.bookingText}
          onChange={(event) => onChange("bookingText", event.target.value)}
          aria-label={`Booking text, row ${rowNumber}`}
        />
      </td>
      <td className={styles["timesheet-row__cell"]}>
        <textarea
          className={multilineClassName}
          rows={1}
          value={entry.internalNote}
          onChange={(event) => onChange("internalNote", event.target.value)}
          aria-label={`Internal note, row ${rowNumber}`}
        />
      </td>
    </tr>
  );
}
