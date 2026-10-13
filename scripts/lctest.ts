// 本地跑题:不走网站、不用会员,直接用题目文件里的 @lcpr case 跑一遍(2026-10-14)。
//   yarn t neetcode-2026/242.valid-anagram.ts
// 用例就是文件底部的 `// @lcpr case=start … case=end` 块(插件也认),想加反例就照样加一块。
// 想自动判对错:在某个 case=end 下一行写 `// expect=<JSON>`,如 `// expect=false`。
// 只支持函数题;设计题(class)暂不支持。Node 24 直接执行 .ts(类型擦除),不用 build。
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const file = process.argv[2];
if (!file) {
  console.error('用法:yarn t <题目文件.ts>');
  process.exit(1);
}
const src = readFileSync(file, 'utf8');
const start = src.indexOf('// @lc code=start');
const end = src.indexOf('// @lc code=end');
if (start < 0 || end < 0) {
  console.error('找不到 @lc code=start / end 标记');
  process.exit(1);
}
const code = src.slice(start + '// @lc code=start'.length, end);
const fn = code.match(/function\s+(\w+)\s*\(/)?.[1];
if (!fn || /^\s*class\s/m.test(code)) {
  console.error('只支持函数题(设计题 class 暂不支持)');
  process.exit(1);
}

const cases: { args: unknown[]; expect?: unknown }[] = [];
const re = /\/\/ @lcpr case=start\s*\n\/\/ (.*)\n\/\/ @lcpr case=end(?:[ \t]*\n\/\/ expect=(.*))?/g;
for (const m of src.matchAll(re)) {
  const args = m[1].split('\\n').filter((s) => s.trim() !== '').map((s) => JSON.parse(s));
  cases.push({ args, expect: m[2] === undefined ? undefined : JSON.parse(m[2]) });
}
if (!cases.length) {
  console.error('文件里没有 @lcpr case');
  process.exit(1);
}

// 题目代码 + 驱动,写成临时 .ts 交给 node 执行
const show = (v: unknown) => JSON.stringify(v);
const driver = `
${code}
const __cases = ${JSON.stringify(cases)};
let __fail = 0;
__cases.forEach((c, i) => {
  const input = c.args.map((a) => JSON.stringify(a)).join(', ');
  let out, mark = '  ';
  try {
    out = JSON.stringify(${fn}(...structuredClone(c.args)));
  } catch (e) {
    out = '💥 ' + e;
    __fail++;
  }
  if ('expect' in c) {
    const ok = out === JSON.stringify(c.expect);
    mark = ok ? '✅' : '❌';
    if (!ok) { __fail++; out += '   (期望 ' + JSON.stringify(c.expect) + ')'; }
  }
  console.log(mark + ' #' + (i + 1) + '  ' + input + '  →  ' + out);
});
if (__fail) process.exitCode = 1;
`;
void show;
const dir = mkdtempSync(join(tmpdir(), 'lctest-'));
const tmp = join(dir, 'run.ts');
writeFileSync(tmp, driver);
const r = spawnSync(process.execPath, ['--no-warnings', tmp], { stdio: 'inherit' });
process.exit(r.status ?? 1);
