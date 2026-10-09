import { Children, type ComponentProps } from "react";
import { joinClassNames } from "@/lib/class-names";
import styles from "./Button.module.css";

export type GroupProps = ComponentProps<"ul">;

// Server component: renders a list and wraps every child in a list item,
// so callers pass buttons directly.
export function Group({ className, children, ...props }: GroupProps) {
  return (
    <ul className={joinClassNames(styles["button-group"], className)} {...props}>
      {Children.map(children, (child) =>
        child === null || child === undefined || typeof child === "boolean" ? null : <li>{child}</li>,
      )}
    </ul>
  );
}
