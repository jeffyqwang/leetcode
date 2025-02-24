export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function reverseList(head: ListNode | null): ListNode | null {
  if (head === null) return null;
  const arr: ListNode[] = [];
  while (head) {
    arr.push(head);
    head = head.next;
  }
  arr.reverse().forEach((node, index) => {
    node.next = arr[index + 1] ?? null;
  });
  return arr[0];
}
