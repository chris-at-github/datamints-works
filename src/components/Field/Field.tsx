"use client";

import { Field as BaseField } from "@base-ui/react/field";
import { mergeStateClassName } from "@/lib/class-names";
import styles from "./Field.module.css";

// Client component: the parts merge className functions, see Button.tsx.
// index.tsx assembles them as Field.Label etc.

export type FieldProps = BaseField.Root.Props;

// Links label and control, so the control gets its accessible name from the label.
export function Field({ className, ...props }: FieldProps) {
  return <BaseField.Root className={mergeStateClassName(styles.field, className)} {...props} />;
}

export type FieldLabelProps = BaseField.Label.Props;

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return <BaseField.Label className={mergeStateClassName(styles.field__label, className)} {...props} />;
}

export type FieldControlProps = BaseField.Control.Props;

// Renders an input; pass render={<textarea />} for multiline text.
export function FieldControl({ className, ...props }: FieldControlProps) {
  return <BaseField.Control className={mergeStateClassName(styles.field__control, className)} {...props} />;
}
