// 49 多解对比:正确性 + 运行时间。直接跑(Node 24 能直接执行 .ts):
//   node neetcode-2026/49.group-anagrams/bench.ts
import { groupAnagramsCountLabel } from './CountLabelSolution.ts';
import { groupAnagramsCountKey } from './CountKeySolution.ts';
import { groupAnagramsSortKey } from './SortKeySolution.ts';
import { groupAnagramsCountCharKey } from './CountCharKeySolution.ts';

type Solver = (strs: string[]) => string[][];
const solvers: Record<string, Solver> = {
  计数签名·字母标签: groupAnagramsCountLabel,
  计数签名·优化键: groupAnagramsCountKey,
  排序签名: groupAnagramsSortKey,
  计数签名·定宽字符: groupAnagramsCountCharKey,
};

// 固定种子的伪随机,每次跑的输入一样,结果才能横向比较
let seed = 49;
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);

// 造输入:先造 base 个「词根」,再随机打乱字母派生出 n 个词,保证有足够多的同组词
function makeInput(n: number, maxLen: number, base: number): string[] {
  const roots = Array.from({ length: base }, () =>
    Array.from({ length: 1 + Math.floor(rand() * maxLen) }, () =>
      String.fromCharCode(97 + Math.floor(rand() * 26)),
    ),
  );
  return Array.from({ length: n }, () => {
    const w = [...roots[Math.floor(rand() * base)]];
    for (let i = w.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [w[i], w[j]] = [w[j], w[i]];
    }
    return w.join('');
  });
}

// 题目允许任意顺序 → 比较前把组内、组间都排好序
const normalize = (groups: string[][]) =>
  groups.map((g) => [...g].sort().join(',')).sort().join('|');

const cases = {
  '短词(k≤6,接近 LeetCode 用例)': makeInput(10_000, 6, 2_000),
  '长词(k≤100,题目上限)': makeInput(10_000, 100, 2_000),
};

const RUNS = 7;
for (const [caseName, input] of Object.entries(cases)) {
  console.log(`\n== ${caseName} · n=${input.length}`);
  const expected = normalize(groupAnagramsSortKeyReference(input));
  for (const [name, solve] of Object.entries(solvers)) {
    const ok = normalize(solve(input)) === expected;
    const times: number[] = [];
    for (let r = 0; r < RUNS; r++) {
      const t0 = performance.now();
      solve(input);
      times.push(performance.now() - t0);
    }
    times.sort((a, b) => a - b);
    console.log(`${ok ? '✅' : '❌'} ${name.padEnd(10, ' ')} 中位数 ${times[RUNS >> 1].toFixed(2)} ms`);
  }
}

// 对照答案:只用来判对错,不参与计时(故意写成最朴素的样子)
function groupAnagramsSortKeyReference(strs: string[]): string[][] {
  const m = new Map<string, string[]>();
  for (const s of strs) {
    const k = s.split('').sort().join('');
    m.set(k, [...(m.get(k) ?? []), s]);
  }
  return [...m.values()];
}
