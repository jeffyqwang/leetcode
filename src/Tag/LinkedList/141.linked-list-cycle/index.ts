/*
 * @lc app=leetcode.cn id=141 lang=typescript
 * @lcpr version=30204
 *
 * [141] 环形链表
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
import { ListNode } from '../206.reverse-linked-list/ArraySolution';
function hasCycle(head: ListNode | null): boolean {
  if (!head?.next) return false;
  let fast: ListNode | null | undefined = head.next.next,
    slow: ListNode | null | undefined = head;
  while (fast) {
    if (fast === slow) return true;
    fast = fast.next?.next;
    slow = slow?.next;
  }
  return false;
}
// @lc code=end

/*
// @lcpr case=start
// [3,2,0,-4]\n1\n
// @lcpr case=end

// @lcpr case=start
// [1,2]\n0\n
// @lcpr case=end

// @lcpr case=start
// [1]\n-1\n
// @lcpr case=end

 */
