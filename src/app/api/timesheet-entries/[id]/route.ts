import { readJsonObject } from "@/lib/request";
import { saveEntry } from "@/lib/timesheet-repository";
import { TIMESHEET_FIELDS, type TimesheetValues } from "@/modules/Timesheet/entries";

// Creates or updates an entry. Values are not validated yet; only string fields
// are taken, anything else is ignored.
export async function PUT(request: Request, { params }: RouteContext<"/api/timesheet-entries/[id]">) {
  const body = await readJsonObject(request);

  if (typeof body?.pageId !== "string" || !Number.isInteger(body.sorting)) {
    return Response.json({ error: "pageId must be a string and sorting an integer" }, { status: 400 });
  }

  const values: Partial<TimesheetValues> = {};

  for (const field of TIMESHEET_FIELDS) {
    if (typeof body[field] === "string") {
      values[field] = body[field];
    }
  }

  const entry = await saveEntry((await params).id, {
    pageId: body.pageId,
    sorting: body.sorting as number,
    values,
  });

  return entry ? Response.json({ entry }) : Response.json({ error: "Page not found" }, { status: 404 });
}
