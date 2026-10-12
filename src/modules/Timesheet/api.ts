import { formatDate } from "@/lib/date";
import { createEmptyEntries, type TimesheetEntry, type TimesheetPageData } from "./entries";

const NEW_PAGE_ROW_COUNT = 5;

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`${init?.method ?? "GET"} ${url} failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function put<T>(url: string, body: unknown): Promise<T> {
  return request<T>(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// Without an id the latest page is loaded; it is null if there is none yet.
export async function fetchPage(pageId?: string): Promise<TimesheetPageData | null> {
  const url = pageId ? `/api/timesheet-pages/${encodeURIComponent(pageId)}` : "/api/timesheet-pages/latest";
  const { page } = await request<{ page: TimesheetPageData | null }>(url);

  return page;
}

export async function saveEntry(pageId: string, entry: TimesheetEntry): Promise<void> {
  await put(`/api/timesheet-entries/${encodeURIComponent(entry.id)}`, { pageId, ...entry });
}

export async function deleteEntry(id: string): Promise<void> {
  const url = `/api/timesheet-entries/${encodeURIComponent(id)}`;
  const response = await fetch(url, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(`DELETE ${url} failed with status ${response.status}`);
  }
}

// Creates a page for today with empty rows; the rows are saved as well, so they
// are there after a reload.
export async function createPage(): Promise<TimesheetPageData> {
  const page: TimesheetPageData = {
    id: crypto.randomUUID(),
    date: formatDate(new Date()),
    entries: createEmptyEntries(NEW_PAGE_ROW_COUNT, 0),
  };

  await put(`/api/timesheet-pages/${encodeURIComponent(page.id)}`, { date: page.date });
  await Promise.all(page.entries.map((entry) => saveEntry(page.id, entry)));

  return page;
}
