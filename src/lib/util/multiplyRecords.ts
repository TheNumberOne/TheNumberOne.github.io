import type { IsAddable } from './addRecords'
import { additiveRecord } from './addRecords'

export function multiplyRecords<T>(
  left: number | T,
  ...right: (number | T)[]
): IsAddable<T, number> extends true ? T : unknown {
  return additiveRecord<number, T>(
    (n): n is number => typeof n === 'number',
    1,
    (a, b) => a * b,
    left,
    right
  )
}
