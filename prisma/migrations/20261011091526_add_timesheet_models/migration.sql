-- CreateTable
CREATE TABLE "TimesheetPage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TimesheetEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageId" TEXT NOT NULL,
    "sorting" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL DEFAULT '',
    "endTime" TEXT NOT NULL DEFAULT '',
    "duration" TEXT NOT NULL DEFAULT '',
    "ticket" TEXT NOT NULL DEFAULT '',
    "bookingText" TEXT NOT NULL DEFAULT '',
    "bookingTextInternal" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "TimesheetEntry_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "TimesheetPage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "TimesheetEntry_pageId_sorting_idx" ON "TimesheetEntry"("pageId", "sorting");
