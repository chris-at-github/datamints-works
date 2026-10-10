import { mergeClassName } from "@/lib/class-names";
import type { TimesheetEntry, TimesheetField } from "./entries";
import { TimesheetRow } from "./TimesheetRow";
import styles from "./TimesheetTable.module.css";

export type TimesheetTableProps = {
  entries: TimesheetEntry[];
  onChange: (index: number, field: TimesheetField, value: string) => void;
};

export function TimesheetTable({ entries, onChange }: TimesheetTableProps) {
  const timeHeadClassName = mergeClassName(styles["timesheet-table__head"], styles["timesheet-table__head--time"]);

  return (
    <table className={styles["timesheet-table"]}>
      <thead>
        <tr>
          <th scope="col" className={timeHeadClassName}>
            Start time
          </th>
          <th scope="col" className={timeHeadClassName}>
            End time
          </th>
          <th scope="col" className={timeHeadClassName}>
            Duration
          </th>
          <th
            scope="col"
            className={mergeClassName(styles["timesheet-table__head"], styles["timesheet-table__head--ticket"])}
          >
            Ticket
          </th>
          <th scope="col" className={styles["timesheet-table__head"]}>
            Booking text
          </th>
          <th scope="col" className={styles["timesheet-table__head"]}>
            Internal note
          </th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          // Rows are only appended or reset, never reordered, so the index is a stable key.
          <TimesheetRow
            key={index}
            entry={entry}
            rowNumber={index + 1}
            onChange={(field, value) => onChange(index, field, value)}
          />
        ))}
      </tbody>
    </table>
  );
}
