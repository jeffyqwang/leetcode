/*
 * @lc app=leetcode.cn id=347 lang=typescript
 * @lcpr version=30204
 *
 * [347] 前 K 个高频元素
 */

/*
 * 【問題(日本語)】347. 上位K個の頻出要素(Top K Frequent Elements)
 * 整数配列 nums と整数 k が与えられます。出現頻度が上位 k 番目以内に入る要素を返してください。答えは任意の順序で返して構いません。
 * 制約:1 <= nums.length <= 10^5、-10^4 <= nums[i] <= 10^4、k の範囲は [1, 配列内の異なる要素の個数]、答えが一意であることが保証されています(つまり、配列内の出現頻度上位 k 個の要素の集合は一意に定まります)
 * 発展:アルゴリズムの時間計算量は、配列のサイズを n としたとき、O(n log n) よりも必ず優れている必要があります。
 *
 * 【用語】
 * 整数(せいすう)整数 / 配列(はいれつ)数组 / 出現頻度(しゅつげんひんど)出现频率
 * 要素(ようそ)元素 / 任意の順序(にんいのじゅんじょ)任意顺序 / 範囲(はんい)范围
 * 異なる(ことなる)不同的 / 一意(いちい)唯一 / 保証する(ほしょうする)保证
 * 時間計算量(じかんけいさんりょう)时间复杂度
 * 頻度(ひんど)频次 / バケットソート(bucket sort)桶排序 / 最悪計算量(さいあくけいさんりょう)最坏复杂度
 * 参照(さんしょう)引用 / 境界(きょうかい)边界 / 範囲外(はんいがい)越界
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function topKFrequent(nums: number[], k: number): number[] {
  const map: Map<number, number> = new Map();
  nums.forEach((v) => {
    map.set(v, (map.get(v) ?? 0) + 1);
  });

  const bunkets = new Array<number[]>(nums.length + 1);
  [...map.keys()].forEach((key) => {
    const value = map.get(key) ?? 0;
    if (!bunkets[value]) bunkets[value] = [];
    bunkets[value].push(key);
  });

  let res: number[] = [];
  for (let i = bunkets.length - 1; i >= 0; i--) {
    const bunket = bunkets[i];
    if (bunket?.length) {
      res = [...res, ...bunket];
    }
    if (res.length === k) return res;
  }
  return res;
}
// @lc code=end

/*
// @lcpr case=start
// [1,1,1,2,2,3]\n2\n
// @lcpr case=end

// @lcpr case=start
// [1]\n1\n
// @lcpr case=end

// @lcpr case=start
// [1,2,1,2,1,2,3,1,3,2]\n2\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3]\n3\n
// @lcpr case=end
// expect~=[1,2,3]

// @lcpr case=start
// [5,5,5,5]\n1\n
// @lcpr case=end
// expect=[5]

 */
