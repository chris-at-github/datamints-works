"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";
import { mergeStateClassName } from "@/lib/class-names";
import styles from "./Popover.module.css";

// Client component: the parts merge className functions, see Button.tsx.
// index.tsx assembles them as Popover.Trigger etc.

export type PopoverProps = BasePopover.Root.Props;

export function Popover(props: PopoverProps) {
  return <BasePopover.Root {...props} />;
}

export type PopoverTriggerProps = BasePopover.Trigger.Props;

// Without styles: callers pass the own button via the render prop.
export function PopoverTrigger(props: PopoverTriggerProps) {
  return <BasePopover.Trigger {...props} />;
}

export type PopoverPopupProps = BasePopover.Popup.Props &
  Pick<BasePopover.Positioner.Props, "side" | "align" | "sideOffset">;

// Portal and positioner are always needed, so they are part of the popup.
export function PopoverPopup({ className, side, align, sideOffset = 4, ...props }: PopoverPopupProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner side={side} align={align} sideOffset={sideOffset}>
        <BasePopover.Popup className={mergeStateClassName(styles.popover__popup, className)} {...props} />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

export type PopoverTitleProps = BasePopover.Title.Props;

export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return <BasePopover.Title className={mergeStateClassName(styles.popover__title, className)} {...props} />;
}

export type PopoverCloseProps = BasePopover.Close.Props;

// Without styles: callers pass the own button via the render prop.
export function PopoverClose(props: PopoverCloseProps) {
  return <BasePopover.Close {...props} />;
}
