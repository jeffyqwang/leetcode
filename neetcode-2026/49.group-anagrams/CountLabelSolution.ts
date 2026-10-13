// 解法 1:计数签名,每格带字母标签(a1b0c2…)—— 已提交的第一版,原样保留做基线
export function groupAnagramsCountLabel(strs: string[]): string[][] {
  const res: Record<string, string[]> = {};
  const convertStringToNum = (str: string) => {
    const count = new Array(26).fill(0);
    for (let i = 0; i < str.length; i++) {
      count[str.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }
    return count.map((v, i) => `${String.fromCharCode(97 + i)}${v}`).join('');
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
