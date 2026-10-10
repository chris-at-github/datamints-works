import {
  AlertDialog as ClientAlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogPopup,
  type AlertDialogProps,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog";

export type {
  AlertDialogCloseProps,
  AlertDialogDescriptionProps,
  AlertDialogPopupProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
} from "./AlertDialog";

// No "use client": server components cannot access properties of a client
// reference, so the parts are attached to a server-safe wrapper instead.
function AlertDialogRoot(props: AlertDialogProps) {
  return <ClientAlertDialog {...props} />;
}

export const AlertDialog = Object.assign(AlertDialogRoot, {
  Trigger: AlertDialogTrigger,
  Popup: AlertDialogPopup,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Close: AlertDialogClose,
});
