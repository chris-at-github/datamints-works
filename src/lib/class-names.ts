// Merges plain class names and skips empty values, e.g. an omitted className prop.
// Always returns a string, so it fits every HTML element.
export function mergeClassName(...classNames: (string | undefined)[]) {
  return classNames.filter(Boolean).join(" ");
}

// Prepends a base class to the className of a Base UI component. Base UI also
// accepts a function of the component state; mergeClassName would turn it into
// its source text, so a new function is returned that merges on every call.
export function mergeStateClassName<State>(
  baseClassName: string | undefined,
  className: string | ((state: State) => string | undefined) | undefined,
) {
  return typeof className === "function"
    ? (state: State) => mergeClassName(baseClassName, className(state))
    : mergeClassName(baseClassName, className);
}
