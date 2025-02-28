/*
 * @lc app=leetcode.cn id=121 lang=typescript
 * @lcpr version=30204
 *
 * [121] 买卖股票的最佳时机
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function maxProfit(prices: number[]): number {
  // 边界条件：如果价格数组为空或只有一天的价格，无法交易，返回0
  if (prices.length <= 1) return 0;

  let minPrice = prices[0]; // 记录到目前为止的最低买入价格
  let maxProfit = 0; // 记录最大利润

  // 只需遍历一次数组
  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i];

    // 计算如果在当前价格卖出，能获得的利润
    const potentialProfit = currentPrice - minPrice;

    // 更新最大利润
    if (potentialProfit > maxProfit) {
      maxProfit = potentialProfit;
    }

    // 更新最低买入价格
    if (currentPrice < minPrice) {
      minPrice = currentPrice;
    }
  }

  return maxProfit;
}
// @lc code=end

/*
// @lcpr case=start
// [7,1,5,3,6,4]\n
// @lcpr case=end

// @lcpr case=start
// [7,6,4,3,1]\n
// @lcpr case=end

 */
