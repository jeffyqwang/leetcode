// 解法 2:计数签名,优化键的生成(不为每一格单独造小字符串,也不能撞键 —— 见错题本 A6)
export function groupAnagramsCountKey(strs: string[]): string[][] {
  const res: Record<string, string[]> = {};
  const convertStringToNum = (str: string) => {
    const count: number[] = new Array(26).fill(0);
    for (let i = 0; i < str.length; i++) {
      count[str.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }
    return count.join('*');
  };
  const numStrs = strs.map((v) => convertStringToNum(v));
  for (let i = 0; i < numStrs.length; i++) {
    const element = numStrs[i];
    if (!res[element]) {
      res[element] = [strs[i]];
    } else {
      res[element].push(strs[i]);
    }
  }
  return Object.values(res);
}
