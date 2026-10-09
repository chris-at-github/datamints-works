// Joins class names and skips empty values, e.g. an omitted className prop.
export function joinClassNames(...classNames: (string | undefined)[]) {
  return classNames.filter(Boolean).join(" ");
}
