// 解法 4:计数签名,每格计数变成一个字符(定宽编码,不用分隔符)—— String.fromCharCode 可一次收多个参数
export function groupAnagramsCountCharKey(strs: string[]): string[][] {
  const res: Record<string, string[]> = {};
  const convertStringToNum = (str: string) => {
    const count: number[] = new Array(26).fill(0);
    for (let i = 0; i < str.length; i++) {
      count[str.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }
    return String.fromCharCode(...count);
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
