/*
 * @lc app=leetcode.cn id=70 lang=typescript
 * @lcpr version=30204
 *
 * [70] 爬楼梯
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
export function climbStairs(n: number): number {
  //递推公式，第n阶楼梯有两种走法，一步一阶和一步两阶，所以f(n) = f(n-1)+f(n-2)
  //终止条件为f(1) = 1, f(2) = 2;
  //实际上为斐波那契数列
  if (n === 1) return 1;
  if (n === 2) return 2;
  return climbStairs(n - 1) + climbStairs(n - 2);
}
// @lc code=end

/*
// @lcpr case=start
// 2\n
// @lcpr case=end

// @lcpr case=start
// 3\n
// @lcpr case=end

 */
