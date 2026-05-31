export function formatDate(dateInput: string) {
  return new Intl.DateTimeFormat('bg-BG', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateInput))
}
