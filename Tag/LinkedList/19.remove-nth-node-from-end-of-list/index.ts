/*
 * @lc app=leetcode.cn id=19 lang=typescript
 * @lcpr version=30204
 *
 * [19] 删除链表的倒数第 N 个结点
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
// class ListNode {
//       val: number
//       next: ListNode | null
//       constructor(val?: number, next?: ListNode | null) {
//           this.val = (val===undefined ? 0 : val)
//           this.next = (next===undefined ? null : next)
//       }
//   }

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let cur = head;
  const arr: ListNode[] = [];
  while (cur) {
    if (arr.length <= n) {
      arr.push(cur);
    } else {
      arr.push(cur);
      arr.shift();
    }
    cur = cur.next;
  }
  if (arr.length < n) return head;
  if (arr.length === n) head = head?.next ?? null;
  if (arr.length > 2) {
    arr[0].next = arr[2];
  } else if (arr.length === 2) {
    arr[0].next = null;
  } else {
    return null;
  }
  return head;
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,3,4,5]\n2\n
// @lcpr case=end

// @lcpr case=start
// [1]\n1\n
// @lcpr case=end

// @lcpr case=start
// [1,2]\n1\n
// @lcpr case=end

 */
