export class TreeNode {
  val: any;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: any, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
export interface ITreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
