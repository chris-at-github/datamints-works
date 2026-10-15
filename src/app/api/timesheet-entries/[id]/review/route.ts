import { reviewBookingText } from "@/lib/booking-text-review";

// Reviews the booking text of the entry with Claude and answers with the
// updated entry. Any failure of the review (configuration, API error, refusal)
// answers 502 and is logged on the server.
export async function POST(_request: Request, { params }: RouteContext<"/api/timesheet-entries/[id]/review">) {
  try {
    const entry = await reviewBookingText((await params).id);

    return entry ? Response.json({ entry }) : Response.json({ error: "Entry not found" }, { status: 404 });
  } catch (error) {
    console.error(error);

    return Response.json({ error: error instanceof Error ? error.message : "Review failed" }, { status: 502 });
  }
}
