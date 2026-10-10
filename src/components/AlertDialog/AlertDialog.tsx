"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@/components/Button/Button";
import { mergeStateClassName } from "@/lib/class-names";
import styles from "./AlertDialog.module.css";

// Client component: the parts merge className functions and render the client
// Button, see Button.tsx. index.tsx assembles them as AlertDialog.Trigger etc.

export type AlertDialogProps = BaseAlertDialog.Root.Props;

export function AlertDialog(props: AlertDialogProps) {
  return <BaseAlertDialog.Root {...props} />;
}

export type AlertDialogTriggerProps = BaseAlertDialog.Trigger.Props;

// Rendered as the own Button; a render prop passed by the caller still wins.
export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return <BaseAlertDialog.Trigger render={<Button />} {...props} />;
}

export type AlertDialogPopupProps = BaseAlertDialog.Popup.Props;

// Portal and backdrop are always needed, so they are part of the popup.
export function AlertDialogPopup({ className, ...props }: AlertDialogPopupProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className={styles["alert-dialog__backdrop"]} />
      <BaseAlertDialog.Popup className={mergeStateClassName(styles["alert-dialog__popup"], className)} {...props} />
    </BaseAlertDialog.Portal>
  );
}

export type AlertDialogTitleProps = BaseAlertDialog.Title.Props;

export function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return <BaseAlertDialog.Title className={mergeStateClassName(styles["alert-dialog__title"], className)} {...props} />;
}

export type AlertDialogDescriptionProps = BaseAlertDialog.Description.Props;

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return (
    <BaseAlertDialog.Description
      className={mergeStateClassName(styles["alert-dialog__description"], className)}
      {...props}
    />
  );
}

export type AlertDialogCloseProps = BaseAlertDialog.Close.Props;

// Closes the dialog; an onClick runs before, e.g. to confirm the action.
export function AlertDialogClose(props: AlertDialogCloseProps) {
  return <BaseAlertDialog.Close render={<Button />} {...props} />;
}
