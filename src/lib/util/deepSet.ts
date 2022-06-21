// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IndexType = keyof any

export type ValidPath<T, P extends readonly IndexType[], V> = P extends readonly []
  ? V extends T
    ? true
    : false
  : P extends readonly [infer First, ...infer U]
  ? First extends keyof T
    ? U extends readonly IndexType[]
      ? ValidPath<T[First], U, V>
      : false
    : false
  : false

type SetValueAt<T, P extends readonly IndexType[], V> = ValidPath<T, P, V> extends true
  ? T
  : unknown

export function deepSet<T, P extends readonly IndexType[], V>(
  object: T,
  path: P,
  value: V
): SetValueAt<T, P, V> {
  const stack: Record<IndexType, unknown>[] = []
  let current: unknown = object

  for (let i = 0; i < path.length; i++) {
    // current is for sure an object until we reach the end of the path
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    stack.push(current as Record<IndexType, unknown>)
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    current = (current as Record<IndexType, unknown>)[path[i]]
  }

  current = value

  for (let i = path.length - 1; i >= 0; i--) {
    const top = stack.pop()
    current = {
      ...top,
      [path[i]]: current
    }
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return current as SetValueAt<T, P, V>
}
