import type { ComponentProps } from "react";
import { HousesIcon } from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { joinClassNames } from "@/lib/class-names";
import styles from "./Card.module.css";

export type CardProps = ComponentProps<"div">;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={joinClassNames(styles.card, className)} {...props}>
      <div className={joinClassNames(styles.card__icon, styles["card__icon--full"])}>
        <Icon icon={HousesIcon} />
      </div>
      {children}
    </div>
  );
}
