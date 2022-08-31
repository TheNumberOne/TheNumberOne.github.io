export function typedKeys<K extends string | number | symbol>(object: Record<K, unknown>): K[] {
  return Object.keys(object) as K[]
}
