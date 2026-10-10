"use client";

import { useState } from "react";
import { AlertDialog } from "@/components/AlertDialog";
import { Button } from "@/components/Button";
import { createEmptyEntries, type TimesheetField, updateEntry } from "./entries";
import { TimesheetHeader } from "./TimesheetHeader";
import { TimesheetTable } from "./TimesheetTable";
import styles from "./TimesheetPage.module.css";

const INITIAL_ROW_COUNT = 5;
const ADDED_ROW_COUNT = 5;

export type TimesheetPageProps = {
  // Day of this page as "YYYY-MM-DD"; null until it is known in the browser.
  date: string | null;
};

// One page holds the entries of exactly one day.
export function TimesheetPage({ date }: TimesheetPageProps) {
  const [entries, setEntries] = useState(() => createEmptyEntries(INITIAL_ROW_COUNT));

  function handleChange(entryIndex: number, field: TimesheetField, value: string) {
    setEntries((currentEntries) =>
      currentEntries.map((entry, index) => (index === entryIndex ? updateEntry(entry, field, value) : entry)),
    );
  }

  function handleReset() {
    setEntries(createEmptyEntries(INITIAL_ROW_COUNT));
  }

  function handleAddRows() {
    setEntries((currentEntries) => [...currentEntries, ...createEmptyEntries(ADDED_ROW_COUNT)]);
  }

  return (
    <section className={styles["timesheet-page"]}>
      <TimesheetHeader date={date}>
        <AlertDialog>
          <AlertDialog.Trigger>Reset</AlertDialog.Trigger>
          <AlertDialog.Popup>
            <AlertDialog.Title>Reset timesheet?</AlertDialog.Title>
            <AlertDialog.Description>All entries of this day will be removed.</AlertDialog.Description>
            <Button.Group>
              <AlertDialog.Close>Cancel</AlertDialog.Close>
              <AlertDialog.Close onClick={handleReset}>Reset</AlertDialog.Close>
            </Button.Group>
          </AlertDialog.Popup>
        </AlertDialog>
      </TimesheetHeader>
      <TimesheetTable entries={entries} onChange={handleChange} />
      <div>
        <Button onClick={handleAddRows}>Add rows</Button>
      </div>
    </section>
  );
}
