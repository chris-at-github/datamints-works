"use client";

import styles from "./Ruler.module.css";

// Client component: merging a function className creates a new function,
// which cannot be passed across the server/client boundary.
export function Ruler() {
  return <hr className={styles.ruler} />;
}
