import { Button as ClientButton, type ButtonProps } from "./Button";
import { Group } from "./Group";
import { IconButton } from "./IconButton";

export type { ButtonProps } from "./Button";
export type { GroupProps } from "./Group";
export type { IconButtonProps } from "./IconButton";

// No "use client": server components cannot access properties of a client
// reference, so Group and Icon are attached to a server-safe wrapper instead.
function ButtonRoot(props: ButtonProps) {
  return <ClientButton {...props} />;
}

export const Button = Object.assign(ButtonRoot, { Group, Icon: IconButton });
