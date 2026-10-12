// Sample data for development: two days, the newer one with more than five rows.
// Clears both tables first, so it can be run again.
import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { getDuration } from "../src/lib/time";

type SampleEntry = [startTime: string, endTime: string, ticket: string, bookingText: string, bookingTextInternal: string];

const SAMPLE_PAGES: { date: string; entries: SampleEntry[] }[] = [
  {
    date: "2026-10-08",
    entries: [
      ["08:00", "09:30", "WORKS-12", "Set up project", ""],
      ["09:30", "12:00", "WORKS-14", "Build timesheet table", "Pairing with the team"],
      ["13:00", "16:15", "WORKS-15", "Add duration calculation", ""],
    ],
  },
  {
    date: "2026-10-09",
    entries: [
      ["08:00", "08:15", "", "Daily stand-up", ""],
      ["08:15", "10:00", "WORKS-21", "Split timesheet module", ""],
      ["10:00", "10:30", "WORKS-22", "Review", "Waiting for feedback"],
      ["10:30", "12:00", "WORKS-23", "Reset dialog", ""],
      ["13:00", "14:00", "WORKS-24", "Add rows button", ""],
      ["14:00", "15:30", "WORKS-25", "Time input mask", "Cursor jumps to the end"],
      ["15:30", "16:00", "", "Team meeting", ""],
      ["16:00", "17:00", "WORKS-26", "Documentation", ""],
    ],
  },
];

async function main() {
  await prisma.timesheetEntry.deleteMany();
  await prisma.timesheetPage.deleteMany();

  for (const { date, entries } of SAMPLE_PAGES) {
    await prisma.timesheetPage.create({
      data: {
        id: crypto.randomUUID(),
        date,
        entries: {
          create: entries.map(([startTime, endTime, ticket, bookingText, bookingTextInternal], sorting) => ({
            id: crypto.randomUUID(),
            sorting,
            startTime,
            endTime,
            duration: getDuration(startTime, endTime),
            ticket,
            bookingText,
            bookingTextInternal,
          })),
        },
      },
    });
  }

  console.log(`Seeded ${SAMPLE_PAGES.length} timesheet pages.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
