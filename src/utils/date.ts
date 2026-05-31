export function getBgWeekday(dateStr: string): string {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('bg-BG', { weekday: 'long' }).format(date)
}

export function formatBgDate(dateStr: string): string {
  const date = new Date(dateStr)
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}.${m}.${y}`
}

export function formatChatDate(input: Date | string | number) {
  const d = new Date(input)
  const now = new Date()

  const days = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
  const months = [
    'яну',
    'фев',
    'мар',
    'апр',
    'май',
    'юни',
    'юли',
    'авг',
    'сеп',
    'окт',
    'ное',
    'дек',
  ]

  const isToday = d.toDateString() === now.toDateString()

  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay())

  const yearStart = new Date(now.getFullYear(), 0, 1)

  const time = d.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })

  if (isToday) return time

  if (d >= weekStart) {
    return `${days[d.getDay()]}, ${time}`
  }

  if (d >= yearStart) {
    return `${d.getDate()} ${months[d.getMonth()]}, ${time}`
  }

  return `${d.getFullYear()} ${months[d.getMonth()]} ${d.getDate()}, ${time}`
}
