import {
  Popover as ClientPopover,
  PopoverClose,
  PopoverPopup,
  type PopoverProps,
  PopoverTitle,
  PopoverTrigger,
} from "./Popover";

export type {
  PopoverCloseProps,
  PopoverPopupProps,
  PopoverProps,
  PopoverTitleProps,
  PopoverTriggerProps,
} from "./Popover";

// No "use client": server components cannot access properties of a client
// reference, so the parts are attached to a server-safe wrapper instead.
function PopoverRoot(props: PopoverProps) {
  return <ClientPopover {...props} />;
}

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Popup: PopoverPopup,
  Title: PopoverTitle,
  Close: PopoverClose,
});
