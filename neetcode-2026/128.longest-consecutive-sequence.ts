/*
 * @lc app=leetcode.cn id=128 lang=typescript
 * @lcpr version=30204
 *
 * [128] 最长连续序列
 */

/*
 * 【問題(日本語)】128. 最長連続シーケンス(Longest Consecutive Sequence)
 * ソートされていない整数配列 nums が与えられます。要素が連続する最長のシーケンス(元の配列内で要素が連続している必要はありません)の長さを求めてください。時間計算量が O(n) のアルゴリズムを設計し、実装してください。
 * 制約:0 <= nums.length <= 10^5、-10^9 <= nums[i] <= 10^9
 * 例1:入力 nums = [100,4,200,1,3,2] → 出力 4
 *   説明:最長の連続シーケンスは [1, 2, 3, 4] で、その長さは 4 です。
 * 例2:入力 nums = [0,3,7,2,5,8,4,6,0,1] → 出力 9
 * 例3:入力 nums = [1,0,1,2] → 出力 3
 *
 * 【用語】
 * 未ソート(みそーと)未排序 / 整数配列(せいすうはいれつ)整数数组 / 連続(れんぞく)连续
 * 最長(さいちょう)最长 / シーケンス(sequence)序列 / 要素(ようそ)元素
 * 長さ(ながさ)长度 / 時間計算量(じかんけいさんりょう)时间复杂度 / アルゴリズム(algorithm)算法
 * 制約(せいやく)约束
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function longestConsecutive(nums: number[]): number {
  const numSet = new Set(nums);

  let longestLength = 0;
  numSet.forEach((v) => {
    if (!numSet.has(v - 1)) {
      let i = v,
        length = 1;
      while (numSet.has(i + 1)) {
        length++;
        i++;
      }
      if (length > longestLength) longestLength = length;
    }
  });

  return longestLength;
}
// @lc code=end

/*
// @lcpr case=start
// [100,4,200,1,3,2]\n
// @lcpr case=end

// @lcpr case=start
// [0,3,7,2,5,8,4,6,0,1]\n
// @lcpr case=end

// @lcpr case=start
// [1,0,1,2]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end
// expect=0

// @lcpr case=start
// [5]\n
// @lcpr case=end
// expect=1

// @lcpr case=start
// [7,7,7]\n
// @lcpr case=end
// expect=1

// @lcpr case=start
// [1,2,0,1]\n
// @lcpr case=end
// expect=3

// @lcpr case=start
// [-3,-1,-2,5]\n
// @lcpr case=end
// expect=3

// @lcpr case=start
// [1000000000,-1000000000]\n
// @lcpr case=end
// expect=1

// @lcpr case=start
// [9,1,4,7,3,-1,0,5,8,-1,6]\n
// @lcpr case=end
// expect=7

// @big 1e5 全连续(乱序) | [Array.from({ length: 1e5 }, (_, i) => (i * 7919) % 1e5)] | expect=100000
// @big 5 万个 0 + 0..49999 | [[...Array(5e4).fill(0), ...Array.from({ length: 5e4 }, (_, i) => i)]] | expect=50000
// @big 1e5 随机(值域 ±1e9) | [Array.from({ length: 1e5 }, (_, i) => ((i * 2654435761) % 2e9) - 1e9)]
// @big 1e5 互不相邻 | [Array.from({ length: 1e5 }, (_, i) => i * 2)] | expect=1

 */
