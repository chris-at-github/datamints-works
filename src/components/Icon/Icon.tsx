import type { ComponentProps, ComponentType } from "react";
import { joinClassNames } from "@/lib/class-names";
import styles from "./Icon.module.css";

// Any component rendering an svg with its props: lucide icons today,
// own icon components later.
export type IconComponent = ComponentType<ComponentProps<"svg">>;

export type IconProps = ComponentProps<"svg"> & {
  icon: IconComponent;
};

// Decorative by default: the surrounding element provides the accessible name.
export function Icon({ icon: IconSvg, className, ...props }: IconProps) {
  return (
    <IconSvg
      aria-hidden="true"
      focusable="false"
      className={joinClassNames(styles.icon, className)}
      {...props}
    />
  );
}
