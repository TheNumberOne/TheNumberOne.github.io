export type IsAddable<T, M> = T extends M
  ? true
  : T extends Record<infer K, unknown>
  ? IsAddable<T[K], M>
  : false

export function addRecords<T>(
  left: number | T,
  ...right: (number | T)[]
): IsAddable<T, number> extends true ? T : unknown {
  return additiveRecord<number, T>(
    (item): item is number => typeof item === 'number',
    0,
    (a, b) => a + b,
    left,
    right
  )
}

function singleAdditiveRecord<M, T>(
  isBase: (item: unknown) => item is M,
  zero: M,
  add: (left: M, right: M) => M,
  left: M | T,
  right: M | T
): IsAddable<T, M> extends true ? T : unknown {
  if (isBase(left)) {
    if (isBase(right)) {
      // @ts-expect-error Since left and right are Base, T must be a supertype of number. Typescript can't infer this.
      return add(left, right)
    }

    ;[left, right] = [right, left]
  }

  // since left is not the base, it must be an object
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const result: Record<string, unknown> = { ...(left as Record<string, unknown>) }

  if (isBase(right)) {
    for (const key of Object.getOwnPropertyNames(left)) {
      result[key] = singleAdditiveRecord(
        isBase,
        zero,
        add,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        (left as Record<string, unknown>)[key] ?? zero,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        right
      )
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return result as T
  }

  for (const key of Object.getOwnPropertyNames(right)) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    if (!(key in result)) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      result[key] = (right as Record<string, unknown>)[key]
    } else {
      result[key] = singleAdditiveRecord(
        isBase,
        zero,
        add,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        (left as Record<string, unknown>)[key],
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        (right as Record<string, unknown>)[key]
      )
    }
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return result as T
}

export function additiveRecord<M, T>(
  isBase: (item: unknown) => item is M,
  zero: M,
  add: (left: M, right: M) => M,
  first: T | M,
  rest: (T | M)[]
): IsAddable<T, M> extends true ? T : unknown {
  // @ts-expect-error The types are kinda complex here lol
  return rest.reduce(
    // @ts-expect-error The types are kinda complex here lol
    (left, right) => singleAdditiveRecord<M, T>(isBase, zero, add, left, right),
    first
  )
}
