import styles from "./prototype.module.css";

export default function PrototypeLayout({ children }: LayoutProps<"/prototype">) {
  return <main className={`page__main ${styles.prototype}`}>{children}</main>;
}
