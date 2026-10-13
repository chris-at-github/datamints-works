import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/Button";
import type { TimesheetNeighbors } from "./entries";

export type TimesheetPaginationProps = {
  neighbors: TimesheetNeighbors;
  onNavigate: (pageId: string) => void;
};

// Left leads to the newer page, right to the older one; without a target the
// button stays visible but disabled, so the header does not shift.
export function TimesheetPagination({ neighbors: { newerId, olderId }, onNavigate }: TimesheetPaginationProps) {
  return (
    <Button.Group>
      <Button.Icon
        icon={ChevronLeftIcon}
        aria-label="Newer page"
        disabled={!newerId}
        onClick={() => newerId && onNavigate(newerId)}
      />
      <Button.Icon
        icon={ChevronRightIcon}
        aria-label="Older page"
        disabled={!olderId}
        onClick={() => olderId && onNavigate(olderId)}
      />
    </Button.Group>
  );
}
