import { ListNode } from './ArraySolution';
export function reverseList(head: ListNode | null): ListNode | null {
  if (head === null) return null;
  if (head.next === null) return head;
  if (head.next.next === null) {
    const newHead = head.next;
    newHead.next = head;
    head.next = null;
    return newHead;
  }
  let pre = head,
    cur = head.next,
    next: ListNode | null = head.next.next;
  head.next = null;
  while (next) {
    cur.next = pre;
    pre = cur;
    cur = next;
    next = next.next;
  }
  cur.next = pre;
  return cur;
}
