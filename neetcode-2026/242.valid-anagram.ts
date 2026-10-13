/*
 * @lc app=leetcode.cn id=242 lang=typescript
 * @lcpr version=30204
 *
 * [242] 有效的字母异位词
 */

/*
 * 【問題(日本語)】242. 有効なアナグラム(Valid Anagram)
 * 2 つの文字列 s と t が与えられます。t が s のアナグラムであるかどうかを判定する関数を書いてください。
 * 制約:1 <= s.length, t.length <= 5 * 10^4、s と t は英小文字のみで構成される
 * 発展:入力に Unicode 文字が含まれる場合はどうしますか?解法をどう調整できますか?
 *
 * 【用語】
 * 文字列(もじれつ)字符串 / アナグラム(anagram)字母异位词 / 判定する(はんていする)判断
 * 関数(かんすう)函数 / 英小文字(えいこもじ)小写英文字母 / 構成される(こうせいされる)由…组成
 * 発展(はってん)进阶 / 調整する(ちょうせいする)调整
 * 文字コード(もじコード)字符编码(charCodeAt)/ 出現回数(しゅつげんかいすう)出现次数 / カウント(count)计数
 * 定数空間(ていすうくうかん)常数空间 O(1) / 上限(じょうげん)上界
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const count: number[] = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    const sNo = s.charCodeAt(i) % 26;
    count[sNo]++;
    const tNo = t.charCodeAt(i) % 26;
    count[tNo]--;
  }
  for (let i = 0; i < 26; i++) {
    if (count[i] !== 0) return false;
  }
  return true;
}
// @lc code=end

/*
// @lcpr case=start
// "anagram"\n"nagaram"\n
// @lcpr case=end

// @lcpr case=start
// "rat"\n"car"\n
// @lcpr case=end

 */
