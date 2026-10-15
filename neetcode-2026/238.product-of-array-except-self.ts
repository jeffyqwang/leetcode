/*
 * @lc app=leetcode.cn id=238 lang=typescript
 * @lcpr version=30204
 *
 * [238] 除了自身以外数组的乘积
 */

/*
 * 【問題(日本語)】238. 自分以外の要素の積(Product of Array Except Self)
 * 整数配列 nums が与えられます。answer[i] が nums[i] を除くすべての要素の積と等しくなるような配列 answer を返してください。nums の任意の要素について、その前方の要素すべての積と後方の要素すべての積は32ビット整数の範囲に収まることが保証されています。除算を使わず、O(n) の時間計算量で解いてください。
 * 制約:2 <= nums.length <= 10^5、-30 <= nums[i] <= 30、answer[i] は32ビット整数の範囲に収まることが保証されています
 * 発展:追加の空間計算量 O(1) で解くことはできますか?(空間計算量の分析上、出力配列は追加の空間には含まれません。)
 * 例1:入力 nums = [1,2,3,4] → 出力 [24,12,8,6]
 * 例2:入力 nums = [-1,1,0,-3,3] → 出力 [0,0,9,0,0]
 *
 * 【用語】
 * 整数配列(せいすうはいれつ)整数数组 / 要素(ようそ)元素 / 積(せき)乘积
 * 前方(ぜんぽう)前面(前缀) / 後方(こうほう)后面(后缀) / 除算(じょさん)除法
 * 時間計算量(じかんけいさんりょう)时间复杂度 / 空間計算量(くうかんけいさんりょう)空间复杂度 / 範囲(はんい)范围
 * 出力配列(しゅつりょくはいれつ)输出数组
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function productExceptSelf(nums: number[]): number[] {
  const res: number[] = new Array(nums.length);

  res[0] = 1;
  let right = 1;

  for (let i = 1; i < nums.length; i++) {
    res[i] = res[i - 1] * nums[i - 1];
  }

  for (let j = nums.length - 2; j >= 0; j--) {
    right = right * nums[j + 1];
    res[j] = res[j] * right;
  }
  return res;
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,3,4]\n
// @lcpr case=end

// @lcpr case=start
// [-1,1,0,-3,3]\n
// @lcpr case=end

 // @lcpr case=start
// [2,3]\n
// @lcpr case=end
// expect=[3,2]
// ↑ 最小长度 2

// @lcpr case=start
// [5,0,2]\n
// @lcpr case=end
// expect=[0,10,0]
// ↑ 一个 0

// @lcpr case=start
// [0,4,0]\n
// @lcpr case=end
// expect=[0,0,0]
// ↑ 两个 0

// @lcpr case=start
// [-2,-3,4]\n
// @lcpr case=end
// expect=[-12,-8,6]
// ↑ 负数

// @lcpr case=start
// [1,1,1,1,1]\n
// @lcpr case=end
// expect=[1,1,1,1,1]
// ↑ 全 1

*/
