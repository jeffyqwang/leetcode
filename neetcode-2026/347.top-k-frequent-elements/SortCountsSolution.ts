// 解法 1:计数 + 只对频次排序,取第 k 大的频次当门槛(2026-10-15 已提交,AC 98%)
// 复杂度 O(n + m log m),m = 不同数值个数;最坏 m≈n → O(n log n),不满足進階
export function topKFrequentSortCounts(nums: number[], k: number): number[] {
  const map: Map<number, number> = new Map();
  nums.forEach((v) => {
    map.set(v, (map.get(v) ?? 0) + 1);
  });

  let leastCount = [...map.values()].sort((pre, cur) => cur - pre)[k - 1];

  const res: number[] = [];
  [...map.keys()].forEach((key) => {
    if ((map.get(key) ?? 0) >= leastCount) {
      res.push(key);
    }
  });
  return res;
}
