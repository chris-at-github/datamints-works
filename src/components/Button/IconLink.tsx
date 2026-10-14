import Link from "next/link";
import type { ComponentProps } from "react";
import { Icon, type IconComponent } from "@/components/Icon/Icon";
import { mergeClassName } from "@/lib/class-names";
import styles from "./Button.module.css";

export type IconLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  icon: IconComponent;
};

// A real link in the look of Button.Icon, for navigation; a Button with
// render={<a>} would be announced as a button (see docs/guides/base-ui.md).
// Icon-only links need an aria-label to get an accessible name.
export function IconLink({ icon, className, ...props }: IconLinkProps) {
  return (
    <Link className={mergeClassName(styles.button, styles["button--icon"], styles["button--link"], className)} {...props}>
      <Icon icon={icon} />
    </Link>
  );
}
