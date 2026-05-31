export function getLabelFromOptions<T extends { value: unknown; label: string }>(
  options: T[],
  value: unknown,
): string | null {
  if (value === null || value === undefined) return null
  const found = options.find((o) => o.value === value)
  return found ? found.label : null
}
