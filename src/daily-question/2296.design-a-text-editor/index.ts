/*
 * @lc app=leetcode.cn id=2296 lang=typescript
 * @lcpr version=30204
 *
 * [2296] 设计一个文本编辑器
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * 为中型文档优化的文本编辑器
 * 结合双向链表和分块存储的优化设计
 */
/**
 * 用于文本编辑器的节点类
 */
class LinkedNode {
  val: string;
  prev: LinkedNode | null;
  next: LinkedNode | null;

  constructor(val: string) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }

  insert(val: string): void {
    const node = new LinkedNode(val);
    node.next = this;
    node.prev = this.prev;
    if (this.prev) {
      this.prev.next = node;
    }
    this.prev = node;
  }

  remove(): void {
    const node = this.prev;
    this.prev = node.prev;
    if (node.prev) {
      node.prev.next = this;
    }
  }

  range(end: LinkedNode): string {
    let result = '';
    let node: LinkedNode | null = this;
    while (node !== end) {
      result += node!.val;
      node = node!.next;
    }
    return result;
  }
}

class TextEditor {
  cursor: LinkedNode;

  constructor() {
    this.cursor = new LinkedNode('\0');
  }

  addText(text: string): void {
    for (let i = 0; i < text.length; i++) {
      this.cursor.insert(text[i]);
    }
  }

  deleteText(k: number): number {
    let count = 0;
    while (k > 0 && this.cursor.prev) {
      this.cursor.remove();
      k--;
      count++;
    }
    return count;
  }

  cursorLeft(k: number): string {
    while (k > 0 && this.cursor.prev) {
      this.cursor = this.cursor.prev;
      k--;
    }
    let head = this.cursor;
    for (let i = 0; i < 10 && head.prev; i++) {
      head = head.prev;
    }
    return head.range(this.cursor);
  }

  cursorRight(k: number): string {
    while (k > 0 && this.cursor.next) {
      this.cursor = this.cursor.next;
      k--;
    }
    let head = this.cursor;
    for (let i = 0; i < 10 && head.prev; i++) {
      head = head.prev;
    }
    return head.range(this.cursor);
  }
}

/**
 * Your TextEditor object will be instantiated and called as such:
 * var obj = new TextEditor()
 * obj.addText(text)
 * var param_2 = obj.deleteText(k)
 * var param_3 = obj.cursorLeft(k)
 * var param_4 = obj.cursorRight(k)
 */
// @lc code=end

/*
// @lcpr case=start
// ["TextEditor", "addText", "deleteText", "addText", "cursorRight", "cursorLeft", "deleteText", "cursorLeft","cursorRight"][[], ["leetcode"], [4], ["practice"], [3], [8], [10], [2], [6]]\n
// @lcpr case=end

 */
