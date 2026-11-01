// 125 多解对比:先过边界用例,再在 2e5 上计时。直接跑(Node 24 能直接执行 .ts):
//   node neetcode-2026/125.valid-palindrome/bench.ts
import { isPalindromeFilter } from './FilterSolution.ts';
import { isPalindromeTwoPointer } from './TwoPointerSolution.ts';

const solvers: Record<string, (s: string) => boolean> = {
  '先清洗 O(n) 空间': isPalindromeFilter,
  '双指针 O(1) 空间': isPalindromeTwoPointer,
};

// [输入, 期望]:题面示例 + 主文件里补过的反例,外加专门坑 O(1) 版的几条
const cases: [string, boolean][] = [
  ['A man, a plan, a canal: Panama', true],
  ['race a car', false],
  [' ', true],
  ['a', true],
  ['0P', false],
  ['ab_a', true],
  ['Aa', true],
  ['12321', true],
  ['1a2', false],
  ['.,', true],
  ['a.b,.B A', true],
  [',,,a', true], // 左边连续跳过,跳到和右指针重合
  ['a,,,', true], // 右边连续跳过
  [',a,b,', false], // 两边都要跳
  ['.a.', true],
];

const half = Array.from({ length: 5e4 }, (_, i) => 'aB3,'[i % 4]).join('');
const big: [string, string, boolean][] = [
  ['2e5 回文(混大小写+标点)', half + [...half].reverse().join(''), true],
  ['2e5 只有最中间不同', 'a'.repeat(1e5 - 1) + 'xy' + 'a'.repeat(1e5 - 1), false],
  ['2e5 全是标点', ',.: '.repeat(5e4), true],
];

const RUNS = 51;
for (const [name, solve] of Object.entries(solvers)) {
  const bad = cases.filter(([s, want]) => {
    try {
      return solve(s) !== want;
    } catch {
      return true;
    }
  });
  console.log(`\n== ${name}`);
  console.log(bad.length ? `❌ 错 ${bad.length} 条: ${bad.map(([s, w]) => JSON.stringify(s) + '→期望 ' + w).join(' / ')}` : `✅ ${cases.length} 条边界用例全过`);
  if (bad.length) continue;
  for (const [label, input, want] of big) {
    const times: number[] = [];
    let ok = true;
    for (let r = 0; r < RUNS; r++) {
      const t0 = performance.now();
      ok = solve(input) === want && ok;
      times.push(performance.now() - t0);
    }
    times.sort((a, b) => a - b);
    console.log(`${ok ? '✅' : '❌'} ${label}  中位数 ${times[RUNS >> 1].toFixed(3)} ms`);
  }
}
