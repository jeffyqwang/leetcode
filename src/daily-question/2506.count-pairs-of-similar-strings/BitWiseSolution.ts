export function BitWiseSimilarPairs(words: string[]): number {
  let res = 0;
  const cnt = new Map<number, number>();
  for (const word of words) {
    let state = 0;
    for (const c of word) {
      state |= 1 << (c.charCodeAt(0) - 'a'.charCodeAt(0));
    }
    res += cnt.get(state) || 0;
    cnt.set(state, (cnt.get(state) || 0) + 1);
  }
  return res;
}
