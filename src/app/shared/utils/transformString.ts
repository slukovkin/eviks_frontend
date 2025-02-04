export function firstCharToUpperCase(value: string): string {
  if (value === '') return value
  return value.charAt(0).toUpperCase() + value.slice(1, value.length).toLowerCase()
}
