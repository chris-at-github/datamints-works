import { Field as ClientField, FieldControl, FieldLabel, type FieldProps } from "./Field";

export type { FieldControlProps, FieldLabelProps, FieldProps } from "./Field";

// No "use client": server components cannot access properties of a client
// reference, so the parts are attached to a server-safe wrapper instead.
function FieldRoot(props: FieldProps) {
  return <ClientField {...props} />;
}

export const Field = Object.assign(FieldRoot, {
  Label: FieldLabel,
  Control: FieldControl,
});
