export function calc(query) {
  return typeof query === "number" ? query * 2 : `Answer: ${query} * 2`;
}
