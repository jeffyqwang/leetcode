// 解法一(主解,已 AC):先整串清洗出 newS,再双指针比较。时间 O(n),额外空间 O(n)。
export function isPalindromeFilter(s: string): boolean {
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
