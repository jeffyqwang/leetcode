//in order 意思是中序遍历

import { ITreeNode } from '../../data-structure/Tree/TreeNode';
// 中序遍历 (In-order Traversal)
//中序遍历是左根右
// 二叉搜索树 (BST) 的排序操作：对于二叉搜索树，中序遍历可以按升序访问所有节点，这是因为BST的性质是左子树的所有元素小于根节点，根节点小于右子树的所有元素。
// 计算表达式：在处理表达式树时，中序遍历可以给出中缀表达式，这对于人类阅读和理解数学表达式非常直接。
export function inorderTraversal(root: ITreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const stack: ITreeNode[] = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root?.left;
    }
    root = stack.pop()!;
    result.push(root.val);
    root = root.right;
  }
  return result;
}
export function inorderTraversalByRecursion(root: ITreeNode | null): number[] {
  const result: number[] = [];
  const inorder = (node: ITreeNode | null) => {
    if (!node) return;
    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  };
  inorder(root);
  return result;
}
