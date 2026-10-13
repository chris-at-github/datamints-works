import { findLatestPage } from "@/lib/timesheet-repository";

// The latest page with its entries and neighbours; both are null if there is no page yet.
export async function GET() {
  return Response.json((await findLatestPage()) ?? { page: null, neighbors: null });
}
