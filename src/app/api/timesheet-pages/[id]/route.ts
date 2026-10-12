import { readJsonObject } from "@/lib/request";
import { findPage, savePage } from "@/lib/timesheet-repository";

export async function GET(_request: Request, { params }: RouteContext<"/api/timesheet-pages/[id]">) {
  const page = await findPage((await params).id);

  return page ? Response.json({ page }) : Response.json({ error: "Page not found" }, { status: 404 });
}

// Creates or updates a page; the id comes from the browser.
export async function PUT(request: Request, { params }: RouteContext<"/api/timesheet-pages/[id]">) {
  const body = await readJsonObject(request);

  if (typeof body?.date !== "string") {
    return Response.json({ error: "date must be a string" }, { status: 400 });
  }

  return Response.json({ page: await savePage((await params).id, body.date) });
}
