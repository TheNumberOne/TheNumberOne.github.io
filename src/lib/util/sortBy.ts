export function sortBy<T, K>(array: T[], key: (item: T) => K): T[] {
	return array.concat().sort((a, b) => {
		const keyA = key(a)
		const keyB = key(b)
		return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
	})
}