import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import styles from "./TimesheetHeader.module.css";

export type TimesheetHeaderProps = {
  // Null until the date is known in the browser.
  date: string | null;
  children?: ReactNode;
};

// Date on the left, the page actions as a button group on the right.
export function TimesheetHeader({ date, children }: TimesheetHeaderProps) {
  return (
    <header className={styles["timesheet-header"]}>
      <span className="display display--layout-2">{date}</span>
      <Button.Group>{children}</Button.Group>
    </header>
  );
}
