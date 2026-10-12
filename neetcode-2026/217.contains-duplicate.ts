/*
 * @lc app=leetcode.cn id=217 lang=typescript
 * @lcpr version=30204
 *
 * [217] 存在重复元素
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
