/*
 * @lc app=leetcode.cn id=146 lang=typescript
 * @lcpr version=30204
 *
 * [146] LRU 缓存
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
class MyListNode {
  key: number;
  value: number;
  prev: MyListNode | null;
  next: MyListNode | null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  private capacity: number;
  private size: number = 0;
  private cache = new Map<number, MyListNode>();
  private dummyHead = new MyListNode(-1, -1);
  private dummyTail = new MyListNode(-1, -1);

  constructor(capacity: number) {
    this.capacity = capacity;
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.prev = this.dummyHead;
  }

  get(key: number): number {
    if (!this.cache.has(key)) return -1;

    const node = this.cache.get(key)!;
    this.moveToHead(node);
    return node.value;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      node.value = value;
      this.moveToHead(node);
      return;
    }

    const newNode = new MyListNode(key, value);
    this.cache.set(key, newNode);
    this.addToHead(newNode);
    this.size++;

    if (this.size > this.capacity) {
      const removed = this.removeTail();
      this.cache.delete(removed.key);
      this.size--;
    }
  }

  private moveToHead(node: MyListNode) {
    this.removeNode(node);
    this.addToHead(node);
  }

  private addToHead(node: MyListNode) {
    node.prev = this.dummyHead;
    node.next = this.dummyHead.next;
    this.dummyHead.next!.prev = node;
    this.dummyHead.next = node;
  }

  private removeNode(node: MyListNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private removeTail(): MyListNode {
    const tail = this.dummyTail.prev!;
    this.removeNode(tail);
    return tail;
  }

  printList(): void {
    let current = this.dummyHead.next;
    const result: string[] = [];
    while (current && current !== this.dummyTail) {
      result.push(`[key: ${current.key}, value: ${current.value}]`);
      current = current.next;
    }
    console.log(result.join(' -> '));
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
