export class LinkedListNode {
  value: any;
  next: LinkedListNode | null;
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
export interface ILinkedListNode {
  value: any;
  next: ILinkedListNode | null;
}
