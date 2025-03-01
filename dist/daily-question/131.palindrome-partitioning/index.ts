/*
 * @lc app=leetcode.cn id=131 lang=typescript
 * @lcpr version=30204
 *
 * [131] 分割回文串
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function partition(s: string): string[][] {
  // 结果集，存储所有可能的分割方案
  const result: string[][] = [];
  // 当前路径，存储当前正在探索的分割方案
  const path: string[] = [];

  // 辅助函数：判断字符串是否为回文串
  function isPalindrome(str: string): boolean {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }

  // 回溯函数
  function backtrack(start: number) {
    // 终止条件：已经处理到字符串末尾
    if (start === s.length) {
      result.push([...path]); // 将当前路径的副本加入结果集
      return;
    }

    // 尝试从start开始的所有可能子串
    for (let i = start; i < s.length; i++) {
      // 获取当前子串
      const subStr = s.substring(start, i + 1);

      // 检查是否为回文串
      if (isPalindrome(subStr)) {
        // 将当前子串加入路径
        path.push(subStr);

        // 递归处理剩余部分
        backtrack(i + 1);

        // 回溯：撤销最后的选择
        path.pop();
      }
      // 如果不是回文串，则不进行这个分割，尝试下一个可能的分割点
    }
  }

  // 从字符串起始位置开始回溯
  backtrack(0);
  return result;
}

// @lc code=end

/*
// @lcpr case=start
// "aab"\n
// @lcpr case=end

// @lcpr case=start
// "a"\n
// @lcpr case=end

 */
