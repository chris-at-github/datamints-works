import { mergeClassName } from "@/lib/class-names";
import { maskTime } from "@/lib/time";
import type { TimesheetEntry, TimesheetField } from "./entries";
import styles from "./TimesheetRow.module.css";

export type TimesheetRowProps = {
  entry: TimesheetEntry;
  rowNumber: number;
  onChange: (field: TimesheetField, value: string) => void;
  // Called when a field is left; the page rounds time fields and saves the entry.
  onBlur: (field: TimesheetField) => void;
};

export function TimesheetRow({ entry, rowNumber, onChange, onBlur }: TimesheetRowProps) {
  // The mask keeps time fields in "HH:MM" while typing.
  function handleTimeChange(field: TimesheetField, value: string) {
    onChange(field, maskTime(value));
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
          onBlur={() => onBlur("startTime")}
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
          onBlur={() => onBlur("endTime")}
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
          onBlur={() => onBlur("duration")}
          aria-label={`Duration, row ${rowNumber}`}
        />
      </td>
      <td className={styles["timesheet-row__cell"]}>
        <input
          className={styles["timesheet-row__field"]}
          type="text"
          value={entry.ticket}
          onChange={(event) => onChange("ticket", event.target.value)}
          onBlur={() => onBlur("ticket")}
          aria-label={`Ticket, row ${rowNumber}`}
        />
      </td>
      <td className={styles["timesheet-row__cell"]}>
        <textarea
          className={multilineClassName}
          rows={1}
          value={entry.bookingText}
          onChange={(event) => onChange("bookingText", event.target.value)}
          onBlur={() => onBlur("bookingText")}
          aria-label={`Booking text, row ${rowNumber}`}
        />
      </td>
      <td className={styles["timesheet-row__cell"]}>
        <textarea
          className={multilineClassName}
          rows={1}
          value={entry.bookingTextInternal}
          onChange={(event) => onChange("bookingTextInternal", event.target.value)}
          onBlur={() => onBlur("bookingTextInternal")}
          aria-label={`Internal booking text, row ${rowNumber}`}
        />
      </td>
    </tr>
  );
}
