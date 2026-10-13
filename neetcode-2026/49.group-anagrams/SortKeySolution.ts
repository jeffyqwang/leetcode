// 解法 3:排序签名 —— 每个单词排序后的结果当键(eat / tea / ate → "aet")
// 复杂度:O(n · k log k)。面试里一般先写这个保底,再说可以用计数优化到 O(n · k)
export function groupAnagramsSortKey(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  const sortStr = (str: string) => {
    const arr = str.split('');
    return arr.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join('');
  };
  for (let i = 0; i < strs.length; i++) {
    const element = strs[i];
    const sorted = sortStr(element);
    if (!map.has(sorted)) {
      map.set(sorted, [element]);
    } else {
      map.get(sorted)?.push(element);
    }
  }
  return [...map.values()];
}
