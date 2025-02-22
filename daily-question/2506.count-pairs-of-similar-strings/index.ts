/*
 * @lc app=leetcode.cn id=2506 lang=typescript
 * @lcpr version=30204
 *
 * [2506] 统计相似字符串对的数目
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function similarPairs(words: string[]): number {
  let res = 0;
  const cnt = new Map<number, number>();
  for (const word of words) {
    let state = 0;
    for (const c of word) {
      state |= 1 << (c.charCodeAt(0) - 'a'.charCodeAt(0));
    }
    res += cnt.get(state) || 0;
    cnt.set(state, (cnt.get(state) || 0) + 1);
  }
  return res;
}
// @lc code=end

/*
// @lcpr case=start
// ["aba","aabb","abcd","bac","aabc"]\n
// @lcpr case=end

// @lcpr case=start
// ["aabb","ab","ba"]\n
// @lcpr case=end

// @lcpr case=start
// ["nba","cba","dba"]\n
// @lcpr case=end

 */
