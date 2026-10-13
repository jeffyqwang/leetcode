# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 这是什么

jeff 的个人 LeetCode 刷题记录，全部用 TypeScript,面向 **leetcode.cn**。文件通过 VS Code 的 LeetCode 插件 + **lcpr**（"LeetCode Problem Runner"）插件生成,所以每个解答文件都带 `@lc` / `@lcpr` 标记注释。解答里的注释用中文写。

## 协作方式（重要:这是复健练习仓)

本仓库是 jeff 的**刻意练习/复健**场景(资深前端,手生复健),不是普通业务仓。在这里默认走全局的**学习模式**:

- **主要解法由 jeff 自己写。** Claude 的职责是拆小任务、指出复杂度/bug/写法问题、给数据结构和思路方向、写完后 review——**不要直接甩完整解答**。
- 卡住时走**提示阶梯**(问卡在哪 → 概念提示 → 方向/伪码 → 完整答案),每级停等;jeff 说「给代码/直接给」才跳到完整实现。
- ⛔ **API 知识直接告诉他,别当思考题。** 「有没有某个 API 能做 X」这种不知道就推不出来的问题,直接给出 API 和签名,让他判断怎么用;启发式提问只留给能靠推理得出的东西(2026-10-14 他原话「这个是API使用问题吧 我不知道的话我根本没得想」)。
- jeff 的代码报错时**不抢着修**:先让他读报错、说诊断,Claude 只提问引导。
- 概念/原理问题随问随答讲透——门槛只针对"替他写/替他修"。

## 一道题的流程（陪练会话不用再靠开场 prompt 交代）

1. **开工**:jeff 用 Raycast `lc` 打开下一题(lcpr 生成文件到 `neetcode-2026/`)。他说写完了 → 读该题文件 + `错题本.md`。
   - **日语对照(自动)**:`lc` 会在后台拉起 `shared-config/scripts/jobhunt/lc_jp.py`,文件一生成就插「【問題(日本語)】题干 + 制約 + 【用語】」并追加 `技術用語.md`(用语只取题干里的词,不剧透解法;日志 `~/.cache/jobhunt/lc_jp.log`)。review 时发现文件里没有日语段 → 手动补:`python3 ~/.claude/memory-backup-repo/shared-config/scripts/jobhunt/lc_jp.py <题号> --now`。review 中讨论到的解法用语(如 早期リターン)由 Claude 补进该题【用語】和 `技術用語.md`。
2. **review / 优化**:**一次只问一个启发式问题,等他答完再问下一个**;不给答案,问题从「行为/复杂度/API 语义/取舍」里挑。
   对照错题本:踩中已有断点要点明「这是 A? 复现」。
3. **收尾**(review 通过后):
   - 提醒他提交:**先用插件提交**;报 `session expired` 就改去 leetcode.cn 网页提交(插件把 Cloudflare 403 误报成登录过期)。
   - Claude 只 `git add` 该题文件并提交,message 用 `feat: add leetcode <id> <英文题名> solution`。
   - 就职块**自动记账**(WakaTime 时长 + 当天提交的题号,`jobblock.py` 同步),⛔ 不用问他刷了多久。
   - 有复现或新的反射断点 → **直接**按 `/cuoti` 的格式记进错题本(复现=在原条目补「<题号> 复现」),⛔ 不用先问他(2026-10-13 他说「不用每次都问我」)。
   - 下一题:让他在 Raycast 敲 `lc`(不填题号 = 队列里的下一题)。

## 命令

- **构建(类型检查 + 产出):** `yarn build`(执行 `tsc`,产物到 `dist/`)。没有 lint / test 脚本。
- **跑解答:** 解答通过 lcpr VS Code 插件执行,用每个文件底部内嵌的测试用例(`// @lcpr case=start … case=end` 块)。**没有命令行测试运行器。** 若要在终端独立运行,必须先编译(`yarn build`)再 `node dist/<path>.js`——因为 `"type": "module"` + ES6 模块导致源码 `.ts` 不能直接跑。
- **多解对比:** 想把一道题做透时,在 `neetcode-2026/<id>.<slug>/` 下放各解法(`export` 函数)+ `bench.ts`(判对错 + 计时),`node neetcode-2026/<id>.<slug>/bench.ts` 直接跑——Node 24 能直接执行 `.ts`(仅限无路径别名的独立文件)。样板见 `49.group-anagrams/`。
- ⚠️ `tsconfig.json` 的 `include` 只有 `src/`,**`tsc -p .` 不检查 `neetcode-2026/`**;要检查单题用 `npx tsc --noEmit --target es2020 --lib es2020 <文件>`。

## 解答文件结构

每个题目文件遵循 lcpr 模板——**不要删这些标记**,插件依赖它们:

```
/* @lc app=leetcode.cn id=<n> lang=typescript ... */
// @lc code=start
<解答 —— 一个裸的 `function name(...)` 声明,或"设计题"用 class>
// @lc code=end
/* // @lcpr case=start  <输入>  // @lcpr case=end   (每个测试用例一个块) */
```

- 被评测的解答放在 `@lc code=start`/`end` 之间。LeetCode 会把它注入到自己的运行框架,所以入口函数/类是**顶层声明,通常不 `export`**。
- 同一文件夹里的其它解法文件(如 `BruteForceSolution.ts`、`GapBufferSolution.ts`、`IterativeSolution.ts`)**会 `export`** 自己的函数,方便 import 进来和 `index.ts` 做性能对比。

## 目录结构

- `src/daily-question/<id>.<slug>/` — 每日一题。`index.ts` 是当前/主要解法,同级文件按其演示的解法命名。
- `src/Tag/<分类>/<id>.<slug>/` — 按主题分组的题(`LinkedList`、`Recursion`、`String`…),同样是"一个文件夹多个解法"的约定。
- `neetcode-2026/` — 较新的 NeetCode roadmap 题,目前是扁平结构(每题一个 `<id>.<slug>.ts`,没有单题文件夹)。
- `src/Algorithm/` — 独立的算法实现(如各种排序),不绑定具体题目。
- `src/data-structure/` — 可复用结构(`LinkedList`、`DoubleLinkedList`、`Tree/TreeNode`),供解答 import。
- `src/utils/` — 辅助函数:`convertArrayToTree`(把 LeetCode 数组转成 `TreeNode`)、`recordFunctionExecutionTime`(计时包装,用于对比不同解法)。

## 约定

- 仓库只提交源码:`.gitignore` 排除 `*.js`,所以编译产物和 `dist/` 里的 JS 不进 git。路径别名 `@/*` → `src/*` 在 `tsconfig.json` 里配置。
- `tsconfig` 的 `strict` **关着**——解答里可以随意用非空断言(`!`)和宽松类型。
- 加新题时,照着相邻文件夹的样子做:保留 lcpr 标记,主要解法放 `index.ts`,每种额外解法各自一个描述性命名、会 `export` 的文件。
- Commit message 风格:`feat: add leetcode <id> <英文题名> solution`(见上面「一道题的流程」)。
