"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPage, fetchPage } from "./api";
import type { TimesheetNeighbors, TimesheetPageResult } from "./entries";
import { TimesheetPage } from "./TimesheetPage";

type LoadState = { status: "loading" } | { status: "error" } | ({ status: "ready" } & TimesheetPageResult);

// A page created because there was none has no neighbours.
const NO_NEIGHBORS: TimesheetNeighbors = { newerId: null, olderId: null };

export type TimesheetProps = {
  // Without an id the latest page is shown.
  pageId?: string;
};

// Loads a day page in the background and renders it.
// If there is no page at all, one is created for today.
export function Timesheet({ pageId }: TimesheetProps) {
  const router = useRouter();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    // Strict Mode runs effects twice in development; the cancelled run must not
    // apply its result or create a second page.
    let ignore = false;

    async function load() {
      const result = await fetchPage(pageId);

      if (ignore) {
        return;
      }

      setState({ status: "ready", ...(result ?? { page: await createPage(), neighbors: NO_NEIGHBORS }) });
    }

    load().catch((error: unknown) => {
      console.error(error);

      if (!ignore) {
        setState({ status: "error" });
      }
    });

    return () => {
      ignore = true;
    };
  }, [pageId]);

  // The new page gets its own URL, so a reload shows it again.
  async function handleNew() {
    try {
      const page = await createPage();

      router.push(`/timesheet/${page.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  // Like "New", every page gets a history entry, so the browser's back button pages back.
  function handleNavigate(targetPageId: string) {
    router.push(`/timesheet/${targetPageId}`);
  }

  if (state.status === "loading") {
    return <p>Loading…</p>;
  }

  if (state.status === "error") {
    return <p>The timesheet could not be loaded.</p>;
  }

  return (
    <TimesheetPage
      key={state.page.id}
      page={state.page}
      neighbors={state.neighbors}
      onNew={handleNew}
      onNavigate={handleNavigate}
    />
  );
}
