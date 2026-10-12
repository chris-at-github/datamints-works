import { findLatestPage } from "@/lib/timesheet-repository";

// The latest page with its entries; page is null if there is none yet.
export async function GET() {
  return Response.json({ page: await findLatestPage() });
}
