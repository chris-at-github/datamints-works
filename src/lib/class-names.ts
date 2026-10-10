// Joins class names and skips empty values, e.g. an omitted className prop.
export function joinClassNames(...classNames: (string | undefined)[]) {
  return classNames.filter(Boolean).join(" ");
}

// Prepends a base class to a Base UI className, which can be a string or a
// function of the component state.
export function mergeClassName<State>(
  baseClassName: string | undefined,
  className: string | ((state: State) => string | undefined) | undefined,
) {
  return typeof className === "function"
    ? (state: State) => joinClassNames(baseClassName, className(state))
    : joinClassNames(baseClassName, className);
}
