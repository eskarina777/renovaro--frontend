const MS = {
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  year: 365.25 * 24 * 60 * 60 * 1000,
}

type ShortUnit = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'

const UNIT_ABBR: Record<ShortUnit, { s: string; p: string }> = {
  minute: { s: 'мин', p: 'мин' },
  hour: { s: 'час', p: 'часа' },
  day: { s: 'ден', p: 'дни' },
  week: { s: 'сед', p: 'сед' },
  month: { s: 'мес', p: 'мес' },
  year: { s: 'год', p: 'год' },
}

function formatRelativeTime(input: Date | string | number, now = new Date()) {
  const t = new Date(input).getTime()
  const n = new Date(now).getTime()
  const diffMs = t - n
  const abs = Math.abs(diffMs)

  let unit: ShortUnit
  let value: number

  if (abs < MS.hour) {
    unit = 'minute'
    value = Math.round(diffMs / MS.minute)
  } else if (abs < 24 * MS.hour) {
    unit = 'hour'
    value = Math.round(diffMs / MS.hour)
  } else if (abs < 7 * MS.day) {
    unit = 'day'
    value = Math.round(diffMs / MS.day)
  } else if (abs < 3 * MS.week) {
    unit = 'week'
    value = Math.round(diffMs / MS.week)
  } else if (abs < (12 * MS.year) / 12) {
    const a = new Date(n)
    const b = new Date(t)
    const months =
      (b.getFullYear() - a.getFullYear()) * 12 +
      (b.getMonth() - a.getMonth()) +
      (b.getDate() < a.getDate() ? -1 : 0)

    unit = 'month'
    value = months !== 0 ? months : Math.round(diffMs / (MS.year / 12))
  } else {
    unit = 'year'
    value = Math.round(diffMs / MS.year)
  }

  const num = Math.abs(value)
  const abbr = num === 1 ? UNIT_ABBR[unit].s : UNIT_ABBR[unit].p

  return `${num}${abbr}`
}

export function useRelativeTime() {
  return { formatRelativeTime }
}
