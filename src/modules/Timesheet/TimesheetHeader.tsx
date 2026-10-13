import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import styles from "./TimesheetHeader.module.css";

export type TimesheetHeaderProps = {
  // Day of the page as "YYYY-MM-DD".
  date: string;
  // Rendered right next to the date.
  pagination?: ReactNode;
  children?: ReactNode;
};

// Date and pagination on the left, the page actions as a button group on the right.
export function TimesheetHeader({ date, pagination, children }: TimesheetHeaderProps) {
  return (
    <header className={styles["timesheet-header"]}>
      <div className={styles["timesheet-header__date"]}>
        <span className="display display--layout-2">{date}</span>
        {pagination}
      </div>
      <Button.Group>{children}</Button.Group>
    </header>
  );
}
