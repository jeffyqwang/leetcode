/*
 * @lc app=leetcode.cn id=125 lang=typescript
 * @lcpr version=30204
 *
 * [125] 验证回文串
 */

/*
 * 【問題(日本語)】125. 有効な回文(Valid Palindrome)
 * すべての大文字を小文字に変換し、英数字以外のすべての文字を取り除いたあとで、前から読んでも後ろから読んでも同じになる文字列を回文といいます。文字列 s が与えられたとき、s が回文であれば true を、そうでなければ false を返してください。英数字とは、英字と数字のことです。
 * 制約:1 <= s.length <= 2 * 10^5、s は印字可能な ASCII 文字のみで構成されます
 * 例1:入力 s = "A man, a plan, a canal: Panama" → 出力 true
 *   説明:"amanaplanacanalpanama" は回文です。
 * 例2:入力 s = "race a car" → 出力 false
 *   説明:"raceacar" は回文ではありません。
 * 例3:入力 s = " " → 出力 true
 *   説明:英数字以外の文字を取り除くと、s は空文字列 "" になります。空文字列は前から読んでも後ろから読んでも同じなので、回文です。
 *
 * 【用語】
 * 回文(かいぶん)回文串 / 大文字(おおもじ)大写字符 / 小文字(こもじ)小写字符
 * 英数字(えいすうじ)字母数字字符 / 英字(えいじ)字母 / 空文字列(からもじれつ)空字符串
 * 文字列(もじれつ)字符串 / 印字可能(いんじかのう)可打印 / ASCII(あすきー)ASCII 码
 * 変換(へんかん)转换
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function isPalindrome(s: string): boolean {
  const newS = s.toLocaleLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0,
    right = newS.length - 1,
    res = true;
  while (left < right) {
    if (newS.charAt(left) !== newS.charAt(right)) {
      res = false;
      break;
    }
    left++;
    right--;
  }
  return res;
}
// @lc code=end

// TODO(练习 2026-10-26 留): 写一版 O(1) 额外空间的双指针 —— 不生成 newS,左右指针各自跳过非字母数字、比较时统一小写。
// 实测参考:现版 0.43ms vs O(1) 版 0.54ms(2e5),O(1) 版省内存不省时间。写好后放 125.valid-palindrome/TwoPointerSolution.ts。

/*
// @lcpr case=start
// "A man, a plan, a canal: Panama"\n
// @lcpr case=end

// @lcpr case=start
// "race a car"\n
// @lcpr case=end

// @lcpr case=start
// " "\n
// @lcpr case=end

// @lcpr case=start
// "a"\n
// @lcpr case=end
// expect=true

// @lcpr case=start
// "0P"\n
// @lcpr case=end
// expect=false

// @lcpr case=start
// "ab_a"\n
// @lcpr case=end
// expect=true

// @lcpr case=start
// "Aa"\n
// @lcpr case=end
// expect=true

// @lcpr case=start
// "12321"\n
// @lcpr case=end
// expect=true

// @lcpr case=start
// "1a2"\n
// @lcpr case=end
// expect=false

// @lcpr case=start
// ".,"\n
// @lcpr case=end
// expect=true

// @lcpr case=start
// "a.b,.B A"\n
// @lcpr case=end
// expect=true

// @big 2e5 回文(混大小写+标点) | [(() => { const h = Array.from({ length: 5e4 }, (_, i) => "aB3,"[i % 4]).join(""); return h + [...h].reverse().join(""); })()] | expect=true
// @big 2e5 只有最中间不同 | [(() => { const h = "a".repeat(1e5 - 1); return h + "xy" + h; })()] | expect=false
// @big 2e5 全是标点 | [",.: ".repeat(5e4)] | expect=true

 */
