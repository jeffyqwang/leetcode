/*
 * @lc app=leetcode.cn id=1 lang=typescript
 * @lcpr version=30204
 *
 * [1] 两数之和
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function twoSum(nums: number[], target: number): number[] {
  let map = new Map(),
    res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const v = nums[i];
    if (map.has(target - v)) return [i, map.get(target - v)];
    map.set(v, i);
  }
  return res;
}
// @lc code=end

/*
// @lcpr case=start
// [2,7,11,15]\n9\n
// @lcpr case=end

// @lcpr case=start
// [3,2,4]\n6\n
// @lcpr case=end

// @lcpr case=start
// [3,3]\n6\n
// @lcpr case=end

 */
