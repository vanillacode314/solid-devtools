const getLogLabel = () => [
  `%csolid-devtools`,
  'color: #fff; background: #2c4f7c; padding: 1px 4px;',
]

export function info<T>(data: T): T {
  console.info(...getLogLabel(), data)
  return data
}

export function log(...args: any[]): void {
  console.log(...getLogLabel(), ...args)
}
export function warn(...args: any[]): void {
  console.warn(...getLogLabel(), ...args)
}

export function formatTime(d: Date = new Date()): string {
  return (
    ('0' + d.getHours()).slice(-2) +
    ':' +
    ('0' + d.getMinutes()).slice(-2) +
    ':' +
    ('0' + d.getSeconds()).slice(-2)
  )
}

export function callArrayProp<
  K extends PropertyKey,
  T extends (...args: Args) => void,
  Args extends unknown[],
>(object: { [_ in K]?: T[] }, key: K, ...args: Args): void {
  const arr = object[key]
  if (arr) for (const cb of arr as T[]) cb(...args)
}

export function pushToArrayProp<K extends PropertyKey, T>(
  object: { [_ in K]?: T[] },
  key: K,
  value: T,
): T[] {
  let arr = object[key]
  if (arr) arr.push(value)
  else arr = object[key] = [value]
  return arr
}

export function mutateFilter<T, S extends T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => value is S,
): void
export function mutateFilter<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => unknown,
): void
export function mutateFilter<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => unknown,
): void {
  const temp = array.filter(predicate)
  array.length = 0
  array.push.apply(array, temp)
}

export function mutateRemove<T>(array: T[], item: T): void {
  array.splice(array.indexOf(item), 1)
}

export const dedupeArray = <T>(array: readonly T[]) => Array.from(new Set(array))

/** Checks if both arrays contain the same values. Order doesn't matter. */
export const arrayRefEquals = <T>(a: readonly T[], b: readonly T[]) =>
  a === b || (a.length === b.length && a.every(e => b.includes(e)))

/** function that trims too long string */
export function trimString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '…'
}

export function findIndexById<T extends { id: string }>(array: T[], id: string): number {
  for (let i = 0; i < array.length; i++) if (array[i].id === id) return i
  return -1
}

export function findItemById<T extends { id: string }>(array: T[], id: string): T | undefined {
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (item.id === id) return item
  }
}
