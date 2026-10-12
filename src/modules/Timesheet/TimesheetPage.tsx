"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { deleteEntry, saveEntry } from "./api";
import {
  createEmptyEntries,
  getNextSorting,
  roundEntryTime,
  type TimesheetField,
  type TimesheetPageData,
  updateEntry,
} from "./entries";
import { TimesheetHeader } from "./TimesheetHeader";
import { TimesheetTable } from "./TimesheetTable";
import styles from "./TimesheetPage.module.css";

const ADDED_ROW_COUNT = 5;

export type TimesheetPageProps = {
  page: TimesheetPageData;
  onNew: () => void;
};

// One page holds the entries of exactly one day; the loaded entries are the
// starting state, changes are kept here.
export function TimesheetPage({ page, onNew }: TimesheetPageProps) {
  const [entries, setEntries] = useState(page.entries);

  function handleChange(entryIndex: number, field: TimesheetField, value: string) {
    setEntries((currentEntries) =>
      currentEntries.map((entry, index) => (index === entryIndex ? updateEntry(entry, field, value) : entry)),
    );
  }

  // Every blur saves the whole entry, also for empty rows; time fields are
  // rounded first, so the rounded value is stored.
  function handleBlur(entryIndex: number, field: TimesheetField) {
    const entry = entries[entryIndex];
    const nextEntry = roundEntryTime(entry, field);

    if (nextEntry !== entry) {
      setEntries((currentEntries) => currentEntries.map((current, index) => (index === entryIndex ? nextEntry : current)));
    }

    saveEntry(page.id, nextEntry).catch((error: unknown) => console.error(error));
  }

  // The row disappears at once, the request runs in the background.
  function handleDelete(entryIndex: number) {
    const entry = entries[entryIndex];

    setEntries((currentEntries) => currentEntries.filter((current) => current.id !== entry.id));
    deleteEntry(entry.id).catch((error: unknown) => console.error(error));
  }

  // New rows are saved right away, so they are still there after a reload.
  function handleAddRows() {
    const newEntries = createEmptyEntries(ADDED_ROW_COUNT, getNextSorting(entries));

    setEntries((currentEntries) => [...currentEntries, ...newEntries]);
    Promise.all(newEntries.map((entry) => saveEntry(page.id, entry))).catch((error: unknown) => console.error(error));
  }

  return (
    <section className={styles["timesheet-page"]}>
      <TimesheetHeader date={page.date}>
        <Button onClick={onNew}>New</Button>
      </TimesheetHeader>
      <TimesheetTable entries={entries} onChange={handleChange} onBlur={handleBlur} onDelete={handleDelete} />
      <div>
        <Button onClick={handleAddRows}>Add rows</Button>
      </div>
    </section>
  );
}
