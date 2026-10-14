import { Trash2Icon } from "lucide-react";
import { AlertDialog } from "@/components/AlertDialog";
import { Button } from "@/components/Button";
import { TimesheetInternalNote } from "./TimesheetInternalNote";

export type TimesheetRowActionsProps = {
  rowNumber: number;
  // Empty rows are deleted right away, rows with data only after confirmation.
  isEmpty: boolean;
  internalBookingText: string;
  onInternalBookingTextChange: (value: string) => void;
  onInternalBookingTextClose: () => void;
  onDelete: () => void;
  className?: string;
};

// Actions for one row; the delete button stays on the outside.
export function TimesheetRowActions({
  rowNumber,
  isEmpty,
  internalBookingText,
  onInternalBookingTextChange,
  onInternalBookingTextClose,
  onDelete,
  className,
}: TimesheetRowActionsProps) {
  const deleteLabel = `Delete row ${rowNumber}`;

  return (
    <Button.Group className={className}>
      <TimesheetInternalNote
        rowNumber={rowNumber}
        value={internalBookingText}
        onChange={onInternalBookingTextChange}
        onClose={onInternalBookingTextClose}
      />
      {isEmpty ? (
        <Button.Icon icon={Trash2Icon} aria-label={deleteLabel} onClick={onDelete} />
      ) : (
        <AlertDialog>
          <AlertDialog.Trigger render={<Button.Icon icon={Trash2Icon} aria-label={deleteLabel} />} />
          <AlertDialog.Popup>
            <AlertDialog.Title>Delete row?</AlertDialog.Title>
            <AlertDialog.Description>This row contains data and will be removed.</AlertDialog.Description>
            <Button.Group>
              <AlertDialog.Close>Cancel</AlertDialog.Close>
              <AlertDialog.Close onClick={onDelete}>Delete</AlertDialog.Close>
            </Button.Group>
          </AlertDialog.Popup>
        </AlertDialog>
      )}
    </Button.Group>
  );
}
