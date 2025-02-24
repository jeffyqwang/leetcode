/*
 * @lc app=leetcode.cn id=2595 lang=typescript
 * @lcpr version=30204
 *
 * [2595] 奇偶位数
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function evenOddBit(n: number): number[] {
  let even = 0,
    odd = 0
  for (let i = 0; i <= 10; i++) {
    if (((n >> i) & 1) === 1) {
      if ((i & 1) === 0) {
        even++
      } else odd++
    }
  }
  return [even, odd]
}
// @lc code=end

/*
// @lcpr case=start
// 50\n
// @lcpr case=end

// @lcpr case=start
// 2\n
// 679o00 @lcpr case=end

 */
