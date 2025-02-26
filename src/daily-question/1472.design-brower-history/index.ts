/*
 * @lc app=leetcode.cn id=1472 lang=typescript
 * @lcpr version=30204
 *
 * [1472] 设计浏览器历史记录
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
class BrowserHistory {
  backStack: string[] = [];
  forwardStack: string[] = [];
  constructor(homepage: string) {
    this.backStack.push(homepage);
  }

  visit(url: string): void {
    this.backStack.push(url);
    while (this.forwardStack.length) this.forwardStack.pop();
  }

  back(steps: number): string {
    const res = Math.max(this.backStack.length - steps, 1);
    while (this.backStack.length > res) {
      this.forwardStack.push(this.backStack.pop()!);
    }
    return this.backStack[this.backStack.length - 1];
  }

  forward(steps: number): string {
    const res = Math.max(this.forwardStack.length - steps, 0);
    while (this.forwardStack.length > res) {
      this.backStack.push(this.forwardStack.pop()!);
    }
    return this.backStack[this.backStack.length - 1];
  }
}

/**
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */
// @lc code=end

/*
// @lcpr case=start
// ["BrowserHistory","visit","visit","visit","back","back","forward","visit","forward","back","back"][["leetcode.com"],["google.com"],["facebook.com"],["youtube.com"],[1],[1],[1],["linkedin.com"],[2],[2],[7]]\n
// @lcpr case=end

 */
