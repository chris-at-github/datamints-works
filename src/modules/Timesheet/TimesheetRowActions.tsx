import { Trash2Icon } from "lucide-react";
import { AlertDialog } from "@/components/AlertDialog";
import { Button } from "@/components/Button";

export type TimesheetRowActionsProps = {
  rowNumber: number;
  // Empty rows are deleted right away, rows with data only after confirmation.
  isEmpty: boolean;
  onDelete: () => void;
};

// Actions for one row; more buttons will join the group later.
export function TimesheetRowActions({ rowNumber, isEmpty, onDelete }: TimesheetRowActionsProps) {
  const deleteLabel = `Delete row ${rowNumber}`;

  return (
    <Button.Group>
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
