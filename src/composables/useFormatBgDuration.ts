export function formatBgDuration(days: number) {
  const d = Math.max(0, Math.floor(days))

  if (d < 7) return d === 1 ? '1 ден' : `${d} дни`

  const weeks = Math.floor(d / 7)
  if (weeks < 4) return weeks === 1 ? '1 седмица' : `${weeks} седмици`

  const months = Math.floor(d / 30)
  if (months < 12) return months === 1 ? '1 месец' : `${months} месеца`

  const years = Math.floor(d / 365)
  return years === 1 ? '1 година' : `${years} години`
}
