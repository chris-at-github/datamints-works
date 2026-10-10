"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import { mergeStateClassName } from "@/lib/class-names";
import styles from "./Button.module.css";

export type ButtonProps = BaseButton.Props;

// Client component: merging a function className creates a new function,
// which cannot be passed across the server/client boundary.
export function Button({ className, ...props }: ButtonProps) {
  return <BaseButton className={mergeStateClassName(styles.button, className)} {...props} />;
}
