/*
 * @lc app=leetcode.cn id=217 lang=typescript
 * @lcpr version=30204
 *
 * [217] 存在重复元素
 */

/*
 * 【問題(日本語)】217. 重複要素の存在判定(Contains Duplicate)
 * 整数配列 nums が与えられます。いずれかの値が配列内に少なくとも 2 回出現する場合は true を、
 * すべての要素が互いに異なる場合は false を返してください。
 * 制約:1 <= nums.length <= 10^5、-10^9 <= nums[i] <= 10^9
 *
 * 【用語】
 * 整数配列(せいすうはいれつ)整数数组 / 要素(ようそ)元素 / 重複(ちょうふく)重复
 * 出現する(しゅつげんする)出现 / 互いに異なる(たがいにことなる)互不相同 / 返す(かえす)返回
 * 制約(せいやく)约束条件 / 時間計算量・空間計算量(じかん・くうかんけいさんりょう)时间/空间复杂度
 * 早期リターン(そうきリターン)提前返回 / ソート済み(ソートずみ)已排序 / 隣接(りんせつ)相邻
 * 破壊的(はかいてき)メソッド 会修改原数据的方法(sort 就是)/ インプレース 原地
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function containsDuplicate(nums: number[]): boolean {
  const set = new Set();
  for (let index = 0; index < nums.length; index++) {
    if (set.has(nums[index])) {
      return true;
    }
    set.add(nums[index]);
  }
  return false;
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,3,1]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3,4]\n
// @lcpr case=end

// @lcpr case=start
// [1,1,1,3,3,4,3,2,4,2]\n
// @lcpr case=end

 */
