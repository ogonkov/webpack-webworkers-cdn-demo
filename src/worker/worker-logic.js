export function calc(query) {
  return typeof query === "number" ? query * 2 : `${query} * 2`;
}
