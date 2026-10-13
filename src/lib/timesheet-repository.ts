import { prisma } from "@/lib/prisma";
import type {
  TimesheetEntry,
  TimesheetNeighbors,
  TimesheetPageData,
  TimesheetPageResult,
  TimesheetValues,
} from "@/modules/Timesheet/entries";

// Shapes database rows like the API response: entries in row order, without pageId.
// createdAt is only needed to find the neighbours and is removed afterwards.
const PAGE_SELECT = {
  id: true,
  date: true,
  createdAt: true,
  entries: {
    orderBy: { sorting: "asc" },
    omit: { pageId: true },
  },
} as const;

// Highest date wins; pages on the same day are told apart by creation time.
export async function findLatestPage(): Promise<TimesheetPageResult | null> {
  const page = await prisma.timesheetPage.findFirst({
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    select: PAGE_SELECT,
  });

  return page && withNeighbors(page);
}

export async function findPage(id: string): Promise<TimesheetPageResult | null> {
  const page = await prisma.timesheetPage.findUnique({ where: { id }, select: PAGE_SELECT });

  return page && withNeighbors(page);
}

async function withNeighbors({ createdAt, ...page }: TimesheetPageData & { createdAt: Date }): Promise<TimesheetPageResult> {
  return { page, neighbors: await findNeighbors(page.date, createdAt) };
}

// Same order as findLatestPage: by date, then by creation time.
async function findNeighbors(date: string, createdAt: Date): Promise<TimesheetNeighbors> {
  const [newer, older] = await Promise.all([
    prisma.timesheetPage.findFirst({
      where: { OR: [{ date: { gt: date } }, { date, createdAt: { gt: createdAt } }] },
      orderBy: [{ date: "asc" }, { createdAt: "asc" }],
      select: { id: true },
    }),
    prisma.timesheetPage.findFirst({
      where: { OR: [{ date: { lt: date } }, { date, createdAt: { lt: createdAt } }] },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      select: { id: true },
    }),
  ]);

  return { newerId: newer?.id ?? null, olderId: older?.id ?? null };
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
