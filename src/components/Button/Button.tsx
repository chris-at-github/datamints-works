"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import { joinClassNames } from "@/lib/class-names";
import styles from "./Button.module.css";

export type ButtonProps = BaseButton.Props;

// Client component: merging a function className creates a new function,
// which cannot be passed across the server/client boundary.
export function Button({ className, ...props }: ButtonProps) {
  const mergedClassName =
    typeof className === "function"
      ? (state: BaseButton.State) => joinClassNames(styles.button, className(state))
      : joinClassNames(styles.button, className);

  return <BaseButton className={mergedClassName} {...props} />;
}
