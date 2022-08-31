export function typedEntries<K extends string | number | symbol, V>(
  object: Record<K, V>
): [K, V][] {
  return Object.entries(object) as [K, V][]
}
