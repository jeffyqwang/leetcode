// 本地跑题:不走网站、不用会员,直接用题目文件里的 @lcpr case 跑一遍(2026-10-14)。
//   yarn t neetcode-2026/242.valid-anagram.ts
// 用例就是文件底部的 `// @lcpr case=start … case=end` 块(插件也认),想加反例就照样加一块。
// 想自动判对错:在某个 case=end 下一行写 `// expect=<JSON>`,如 `// expect=false`。
// 题目说「任意顺序返回」→ 写 `// expect~=<JSON>`:每一层数组都排序后再比较。
// 题面「示例」里有的用例不用写 expect:自动从 lcpr 缓存的题面取「输出」(标 [题面示例])。
// 只支持函数题;设计题(class)暂不支持。Node 24 直接执行 .ts(类型擦除),不用 build。
import { readFileSync, writeFileSync, mkdtempSync, readdirSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

// 不传参数 = 跑 neetcode-2026/ 里最近改过的题(正在写的那道)
const file = process.argv[2] ?? latestProblem();
if (!file) {
  console.error('用法:yarn t [题目文件.ts]');
  process.exit(1);
}
if (!process.argv[2]) console.log(`→ ${file}\n`);

function latestProblem(): string | undefined {
  const dir = 'neetcode-2026';
  return readdirSync(dir)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => join(dir, f))
    .sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)[0];
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

const cases: { args: unknown[]; expect?: unknown; unordered?: boolean; auto?: boolean }[] = [];
const re = /\/\/ @lcpr case=start\s*\n\/\/ (.*)\n\/\/ @lcpr case=end(?:[ \t]*\n\/\/ expect(~?)=(.*))?/g;
for (const m of src.matchAll(re)) {
  const args = m[1].split('\\n').filter((s) => s.trim() !== '').map((s) => JSON.parse(s));
  if (m[3] === undefined) cases.push({ args });
  else cases.push({ args, expect: JSON.parse(m[3]), unordered: m[2] === '~' });
}
// 没写 expect 的用例:去 lcpr 缓存的题面里找同输入的「示例」,自动拿它的「输出」当期望值
// (题面说「任意顺序」就按不计顺序比)。手写的 expect 优先。
const pid = src.match(/@lc app=\S+ id=(\d+)/)?.[1];
try {
  const dir = join(homedir(), '.lcpr', 'leetcode', 'cache');
  const hit = pid && readdirSync(dir).find((f) => f.startsWith(pid + '.') && f.endsWith('.algorithms.json'));
  if (hit) {
    const desc: string = JSON.parse(readFileSync(join(dir, hit), 'utf8')).desc ?? '';
    const text = desc.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    const unordered = /任意顺序/.test(text);
    // 输入可能跨多行(36 数独的 board),所以用 [\s\S]+? 而不是 .+?
    for (const m of text.matchAll(/输入[:：]\s*([\s\S]+?)\s*\n\s*输出[:：]\s*(.+?)\s*\n/g)) {
      // "nums = [1,1,1,2,2,3], k = 2" → 按 `, 名字 =` 切参数
      const args = m[1].split(/,\s*(?=[A-Za-z_]\w*\s*=)/).map((p) => JSON.parse(p.replace(/^\s*[A-Za-z_]\w*\s*=\s*/, '')));
      const c = cases.find((x) => !('expect' in x) && JSON.stringify(x.args) === JSON.stringify(args));
      if (c) Object.assign(c, { expect: JSON.parse(m[2]), unordered, auto: true });
    }
  }
} catch {
  // 缓存读不到/题面格式变了:只是少了自动期望值,照常跑
}

// 极限用例(插件不认,只给本地跑):输入太大写不进 case 块,用 JS 表达式现场生成,单独计时。
//   // @big <名字> | <返回「参数数组」的 JS 表达式> | expect=<JSON>
//   // @big 1e5 连续 | [Array.from({ length: 1e5 }, (_, i) => i)] | expect=100000
// 每条单独起子进程跑,超过 BIG_TIMEOUT 判超时(O(n²) 在 1e5 上要跑几十秒,别等它)。
const BIG_TIMEOUT = 5000;
const bigs: { name: string; expr: string; expect?: string }[] = [];
for (const m of src.matchAll(/^\/\/ @big (.+?) \| (.+?)(?: \| expect=(.+))?$/gm)) {
  bigs.push({ name: m[1].trim(), expr: m[2].trim(), expect: m[3]?.trim() });
}

if (!cases.length && !bigs.length) {
  console.error('文件里没有 @lcpr case');
  process.exit(1);
}

// 题目代码 + 驱动,写成临时 .ts 交给 node 执行
const show = (v: unknown) => JSON.stringify(v);
const driver = `
${code}
const __cases = ${JSON.stringify(cases)};
let __fail = 0;
const __cmp = (a, b) => (JSON.stringify(a) < JSON.stringify(b) ? -1 : JSON.stringify(a) > JSON.stringify(b) ? 1 : 0);
// 不计顺序 = 每一层数组都排序后再比(49 这类组间、组内都任意)
const __norm = (v) => (Array.isArray(v) ? v.map(__norm).sort(__cmp) : v);
__cases.forEach((c, i) => {
  const input = c.args.map((a) => JSON.stringify(a)).join(', ');
  let out, mark = '  ';
  try {
    const v = ${fn}(...structuredClone(c.args));
    out = JSON.stringify(c.unordered ? __norm(v) : v);
  } catch (e) {
    out = '💥 ' + e;
    __fail++;
  }
  if ('expect' in c) {
    const exp = c.unordered ? __norm(c.expect) : c.expect;
    const ok = out === JSON.stringify(exp);
    mark = ok ? '✅' : '❌';
    if (c.unordered) out += '  (不计顺序)';
    if (c.auto) out += '  [题面示例]';
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
let status = r.status ?? 1;

if (bigs.length) console.log('\n极限用例(只计函数本身耗时,超过 ' + BIG_TIMEOUT / 1000 + 's 判超时):');
bigs.forEach((b, i) => {
  const big = join(dir, `big${i}.ts`);
  writeFileSync(
    big,
    `${code}
const __args = ${b.expr};
const __t = performance.now();
const __v = ${fn}(...__args);
console.log(JSON.stringify({ v: __v, ms: performance.now() - __t }));
`,
  );
  const br = spawnSync(process.execPath, ['--no-warnings', big], { encoding: 'utf8', timeout: BIG_TIMEOUT });
  if (br.error || br.status !== 0) {
    status = 1;
    const why = br.signal ? `⏱ 超时 >${BIG_TIMEOUT / 1000}s` : '💥 ' + (br.stderr.trim().split('\n').pop() ?? '');
    console.log(`❌ ${b.name}  →  ${why}`);
    return;
  }
  const { v, ms } = JSON.parse(br.stdout.trim().split('\n').pop()!);
  const out = JSON.stringify(v);
  const ok = b.expect === undefined || out === JSON.stringify(JSON.parse(b.expect));
  if (!ok) status = 1;
  // 1e5 规模下 O(n) / O(n log n) 都在几十 ms 内,过 1s 基本就是多了一层循环
  const slow = ms > 1000 ? '  ⚠️ 慢' : '';
  console.log(`${b.expect === undefined ? '  ' : ok ? '✅' : '❌'} ${b.name}  →  ${out.length > 60 ? out.slice(0, 60) + '…' : out}  (${ms.toFixed(1)}ms)${slow}${ok ? '' : '   (期望 ' + b.expect + ')'}`);
});
process.exit(status);
