/*
 * @lc app=leetcode.cn id=49 lang=typescript
 * @lcpr version=30204
 *
 * [49] 字母异位词分组
 */

/*
 * 【問題(日本語)】49. アナグラムのグループ化(Group Anagrams)
 * 文字列の配列 strs が与えられます。アナグラム(文字を並べ替えると互いに同じ文字列になる語)同士をグループにまとめてください。結果のリストは任意の順序で返して構いません。
 * 制約:1 <= strs.length <= 10^4、0 <= strs[i].length <= 100、strs[i] は英小文字のみで構成されます
 *
 * 【用語】
 * 文字列(もじれつ)字符串 / 配列(はいれつ)数组 / アナグラム(anagram)字母异位词
 * グループ(group)分组 / 並べ替える(ならべかえる)重新排列 / 任意(にんい)任意
 * 順序(じゅんじょ)顺序 / 返す(かえす)返回 / 英小文字(えいこもじ)小写字母
 * 制約(せいやく)约束条件
 * キー(key)键 / シグネチャ(signature)签名 / 区切り文字(くぎりもじ)分隔符
 * 衝突(しょうとつ)冲突 / 計数ソート(けいすうソート)计数排序 / 比較ソート(ひかくソート)比较排序
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function groupAnagrams(strs: string[]): string[][] {
  const res: Record<string, string[]> = {};
  const convertStringToNum = (str: string) => {
    const count = new Array(26).fill(0);
    for (let i = 0; i < str.length; i++) {
      count[str.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }
    return count.map((v, i) => `${String.fromCharCode(97 + i)}${v}`).join('');
  };
  const numStrs = strs.map((v) => convertStringToNum(v));
  for (let i = 0; i < numStrs.length; i++) {
    const element = numStrs[i];
    if (!res[element]) {
      res[element] = [strs[i]];
    } else {
      res[element].push(strs[i]);
    }
  }
  return Object.values(res);
}
// @lc code=end

/*
// @lcpr case=start
// ["eat", "tea", "tan", "ate", "nat", "bat"]\n
// @lcpr case=end

// @lcpr case=start
// [""]\n
// @lcpr case=end

// @lcpr case=start
// ["a"]\n
// @lcpr case=end

 */
