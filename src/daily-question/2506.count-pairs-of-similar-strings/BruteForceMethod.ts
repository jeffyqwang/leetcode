export function similarPairs(words: string[]): number {
  let count = 0;
  const filteredWords = words.map((s) => {
    return [...new Set(s.split(''))]
      .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
      .join('');
  });
  for (let i = 0; i < words.length - 1; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if (filteredWords[i] === filteredWords[j]) count++;
    }
  }
  return count;
}
