export function removeNthFromEnd(
  head: ListNode | null,
  n: number
): ListNode | null {
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
