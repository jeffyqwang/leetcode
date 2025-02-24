export class DoubleLinkedListNode {
  value: any;
  pre: DoubleLinkedListNode | null;
  next: DoubleLinkedListNode | null;

  constructor(value: any, pre?: ILinkedListNode, next?: ILinkedListNode) {
    this.value = value;
    this.pre = pre ?? null;
    this.next = next ?? null;
  }
}
export interface ILinkedListNode {
  value: any;
  pre: ILinkedListNode | null;
  next: ILinkedListNode | null;
}
