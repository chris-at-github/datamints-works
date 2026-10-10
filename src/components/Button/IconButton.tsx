import { Icon, type IconComponent } from "@/components/Icon/Icon";
import { mergeClassName } from "@/lib/class-names";
import { Button, type ButtonProps } from "./Button";
import styles from "./Button.module.css";

export type IconButtonProps = Omit<ButtonProps, "children" | "className"> & {
  icon: IconComponent;
  className?: string;
};

// Server component: the icon component is a function and cannot be passed to
// the client Button, so it is rendered here and only the SVG is passed on.
// For the same reason className is a string only, not a Base UI state function.
// Icon-only buttons need an aria-label to get an accessible name.
export function IconButton({ icon, className, ...props }: IconButtonProps) {
  return (
    <Button className={mergeClassName(styles["button--icon"], className)} {...props}>
      <Icon icon={icon} />
    </Button>
  );
}
