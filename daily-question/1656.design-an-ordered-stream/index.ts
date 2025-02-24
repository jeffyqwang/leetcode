/*
 * @lc app=leetcode.cn id=1656 lang=typescript
 * @lcpr version=30204
 *
 * [1656] 设计有序流
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
class OrderedStream {
  stream = new Map();
  ptr = 1;
  capacity = 0;
  constructor(n: number) {
    this.capacity = n;
  }

  insert(idKey: number, value: string): string[] {
    const res: string[] = [];
    this.stream.set(idKey, value);
    if (this.ptr === idKey) {
      while (this.stream.get(this.ptr)) {
        res.push(this.stream.get(this.ptr));
        this.ptr++;
      }
    }
    return res;
  }
}

/**
 * Your OrderedStream object will be instantiated and called as such:
 * var obj = new OrderedStream(n)
 * var param_1 = obj.insert(idKey,value)
 */
// @lc code=end
