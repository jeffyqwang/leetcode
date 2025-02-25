/*
 * @lc app=leetcode.cn id=14 lang=typescript
 * @lcpr version=30204
 *
 * [14] 最长公共前缀
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function longestCommonPrefix(strs: string[]): string {
  let res = strs[0];
  let i = 0,
    j = 0;
  strs.forEach((str) => {
    if (str.indexOf(res) !== 0) {
      while (
        i < res.length &&
        j < str.length &&
        res.charAt(i) === str.charAt(j)
      ) {
        i++;
        j++;
      }
      res = str.slice(0, j);
      i = 0;
      j = 0;
    }
  });
  return res;
}
// @lc code=end

/*
// @lcpr case=start
// ["flower","flow","flight"]\n
// @lcpr case=end

// @lcpr case=start
// ["dog","racecar","car"]\n
// @lcpr case=end

 */
