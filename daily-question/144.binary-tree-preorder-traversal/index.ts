import { TreeNode } from '../../data-structure/Tree/TreeNode';

// 前序遍历 (Pre-order Traversal)
// 创建树的副本：当你想要创建树的一个完全独立的副本时，前序遍历是一个直观的方法，因为它首先访问父节点，然后是子节点，这样可以在遍历的过程中直接复制。
// 打印树结构：用于以一种清晰的层次结构打印树，特别是在展示目录结构或者任何分层次的数据时，前序遍历能够先展示上级结构，再展示下级结构。
// 表达式树：对于表达式树（运算符为节点，操作数为叶子的树），前序遍历可以给出前缀表达式（波兰式）。

export function preorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const stack: TreeNode[] = [root];
  while (stack.length) {
    const node = stack.pop()!;
    result.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}
export const preorderTraversalByRecursion = (
  root: TreeNode | null
): number[] => {
  const result: number[] = [];
  const preorder = (node: TreeNode | null) => {
    if (!node) return;
    result.push(node.val);
    preorder(node.left);
    preorder(node.right);
  };
  preorder(root);
  return result;
};
