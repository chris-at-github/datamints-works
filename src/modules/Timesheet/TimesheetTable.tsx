import { mergeClassName } from "@/lib/class-names";
import type { TimesheetEntry, TimesheetField } from "./entries";
import { TimesheetRow } from "./TimesheetRow";
import styles from "./TimesheetTable.module.css";

export type TimesheetTableProps = {
  entries: TimesheetEntry[];
  onChange: (index: number, field: TimesheetField, value: string) => void;
  onBlur: (index: number, field: TimesheetField) => void;
  onDelete: (index: number) => void;
};

export function TimesheetTable({ entries, onChange, onBlur, onDelete }: TimesheetTableProps) {
  const narrowHeadClassName = mergeClassName(styles["timesheet-table__head"], styles["timesheet-table__head--narrow"]);

  return (
    <table className={styles["timesheet-table"]}>
      <thead>
        <tr>
          <th scope="col" className={narrowHeadClassName}>
            Start
          </th>
          <th scope="col" className={narrowHeadClassName}>
            End
          </th>
          <th scope="col" className={narrowHeadClassName}>
            Duration
          </th>
          <th scope="col" className={narrowHeadClassName}>
            Ticket
          </th>
          <th
            scope="col"
            className={mergeClassName(styles["timesheet-table__head"], styles["timesheet-table__head--booking-text"])}
          >
            Booking text
          </th>
          <th scope="col" className={styles["timesheet-table__head"]}>
            Internal booking text
          </th>
          {/* Row actions; intentionally without a heading. */}
          <th scope="col" className={narrowHeadClassName} />
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          <TimesheetRow
            key={entry.id}
            entry={entry}
            rowNumber={index + 1}
            onChange={(field, value) => onChange(index, field, value)}
            onBlur={(field) => onBlur(index, field)}
            onDelete={() => onDelete(index)}
          />
        ))}
      </tbody>
    </table>
  );
}
