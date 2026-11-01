// 解法二:O(1) 额外空间 —— 不生成新字符串,直接在 s 上双指针。
// 左右指针各自跳过非字母数字的字符,比较时统一小写。
// 跑:node neetcode-2026/125.valid-palindrome/bench.ts
export function isPalindromeTwoPointer(s: string): boolean {
  const isAlnum = (str: string) => {
    return (
      (str >= 'a' && str <= 'z') ||
      (str >= 'A' && str <= 'Z') ||
      (str >= '0' && str <= '9')
    );
  };
  let i = 0,
    j = s.length - 1,
    res = true;
  while (i < j) {
    if (!isAlnum(s[i])) {
      i++;
      continue;
    }
    if (!isAlnum(s[j])) {
      j--;
      continue;
    }
    if (s[i].toLocaleLowerCase() !== s[j].toLocaleLowerCase()) {
      res = false;
      break;
    }
    i++;
    j--;
  }
  return res;
}
