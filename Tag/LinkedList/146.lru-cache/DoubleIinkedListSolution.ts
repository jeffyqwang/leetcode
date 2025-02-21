/*
 * @lc app=leetcode.cn id=146 lang=typescript
 * @lcpr version=30204
 *
 * [146] LRU 缓存
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
interface ILinkedListNode {
  value: any;
  key: number;
  pre: ILinkedListNode | null;
  next: ILinkedListNode | null;
}
class DoubleLinkedListNode {
  value: any;
  key: number;
  pre: DoubleLinkedListNode | null;
  next: DoubleLinkedListNode | null;

  constructor(
    key: number,
    value: any,
    pre?: ILinkedListNode,
    next?: ILinkedListNode
  ) {
    this.key = key;
    this.value = value;
    this.pre = pre ?? null;
    this.next = next ?? null;
  }
}
class DoubleLinkedListLRUCache {
  capacity: number = 0;
  head: DoubleLinkedListNode | null = null;
  length: number = 0;
  constructor(capacity: number) {
    this.capacity = capacity;
  }

  printList(head?: ILinkedListNode | null): void {
    let current = head ?? this.head;
    const result: string[] = [];
    while (current) {
      result.push(`[key: ${current.key}, value: ${current.value}]`);
      current = current.next;
    }
    console.log(result.join(' -> '));
  }
  deleteKey(key: number) {
    if (this.head?.key === key) {
      this.head = this.head.next;
      if (this.head) this.head.pre = null;
      this.length--;
    } else {
      let cur = this.head;
      while (cur) {
        if (cur.key === key) {
          cur.pre!.next = cur.next;
          if (cur.next) {
            cur.next.pre = cur.pre;
          }
          this.length--;
          break;
        }
        cur = cur.next;
      }
    }
  }
  updateHead(key: number, value: number) {
    this.deleteKey(key);
    const headNext = this.head;
    this.head = new DoubleLinkedListNode(key, value);
    this.head.next = headNext;
    if (headNext) headNext.pre = this.head;
    this.length++;
  }
  deleteTail() {
    if (!this.head) return;
    let cur = this.head;
    if (!cur?.next) {
      this.head = null;
      this.length--;
    }
    while (cur?.next) {
      cur = cur.next;
    }
    if (cur?.pre) {
      cur.pre.next = null;
      this.length--;
    }
  }
  get(key: number): number {
    let cur = this.head;
    while (cur) {
      if (cur.key === key) {
        this.updateHead(key, cur.value);
        return cur.value;
      }
      cur = cur.next;
    }
    return -1;
  }

  put(key: number, value: number): void {
    this.updateHead(key, value);
    if (this.length > this.capacity) {
      this.deleteTail();
    }
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
