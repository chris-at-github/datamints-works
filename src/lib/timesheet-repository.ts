import { prisma } from "@/lib/prisma";
import type { TimesheetEntry, TimesheetPageData, TimesheetValues } from "@/modules/Timesheet/entries";

// Shapes database rows like the API response: entries in row order, without pageId.
const PAGE_SELECT = {
  id: true,
  date: true,
  entries: {
    orderBy: { sorting: "asc" },
    omit: { pageId: true },
  },
} as const;

// Highest date wins; pages on the same day are told apart by creation time.
export function findLatestPage(): Promise<TimesheetPageData | null> {
  return prisma.timesheetPage.findFirst({
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    select: PAGE_SELECT,
  });
}

export function findPage(id: string): Promise<TimesheetPageData | null> {
  return prisma.timesheetPage.findUnique({ where: { id }, select: PAGE_SELECT });
}

export function savePage(id: string, date: string): Promise<Omit<TimesheetPageData, "entries">> {
  return prisma.timesheetPage.upsert({
    where: { id },
    create: { id, date },
    update: { date },
    select: { id: true, date: true },
  });
}

export type EntryInput = {
  pageId: string;
  sorting: number;
  values: Partial<TimesheetValues>;
};

// Creates or updates an entry; returns null if its page does not exist.
export async function saveEntry(id: string, { pageId, sorting, values }: EntryInput): Promise<TimesheetEntry | null> {
  const page = await prisma.timesheetPage.findUnique({ where: { id: pageId }, select: { id: true } });

  if (!page) {
    return null;
  }

  return prisma.timesheetEntry.upsert({
    where: { id },
    create: { id, pageId, sorting, ...values },
    update: { sorting, ...values },
    omit: { pageId: true },
  });
}

// Deleting a missing entry is not an error, so repeated deletes are harmless.
export async function deleteEntry(id: string): Promise<void> {
  await prisma.timesheetEntry.deleteMany({ where: { id } });
}
