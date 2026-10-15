import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/Button";

export type TimesheetEntryPaginationProps = {
  previousId: string | null;
  nextId: string | null;
  onNavigate: (entryId: string) => void;
};

// Left leads to the row above, right to the row below; without a target the
// button stays visible but disabled, so the header does not shift.
export function TimesheetEntryPagination({ previousId, nextId, onNavigate }: TimesheetEntryPaginationProps) {
  return (
    <Button.Group>
      <Button.Icon
        icon={ChevronLeftIcon}
        aria-label="Previous entry"
        disabled={!previousId}
        onClick={() => previousId && onNavigate(previousId)}
      />
      <Button.Icon
        icon={ChevronRightIcon}
        aria-label="Next entry"
        disabled={!nextId}
        onClick={() => nextId && onNavigate(nextId)}
      />
    </Button.Group>
  );
}
