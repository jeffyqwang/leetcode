import { TreeNode } from '../../data-structure/Tree/TreeNode';

// 后序遍历 (Post-order Traversal)
//后序遍历是左右根
// 释放/删除树节点：在需要先删除子节点再删除父节点的场景中使用，比如在释放树占用的内存资源时，后序遍历确保在删除节点前，其子节点已被安全删除。
// 后缀表达式：对于表达式树，后序遍历可以提供后缀表达式（逆波兰式），这种形式适合某些计算机算法直接计算表达式的值。
// 依赖性排序：在项目构建或者其他需要处理依赖性的场景中，后序遍历可以确保依赖项先于项目或任务本身被处理。

export function postorderTraversalByRecursion(root: TreeNode | null): number[] {
  const result: number[] = [];
  const postorder = (node: TreeNode | null) => {
    if (!node) return;
    postorder(node.left);
    postorder(node.right);
    result.push(node.val);
  };
  postorder(root);
  return result;
}
export function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const stack: TreeNode[] = [];
  while (root || stack.length) {
    while (root) {
      result.unshift(root.val);
      stack.push(root);
      root = root.right;
    }
    root = stack.pop()!;
    root = root.left;
  }
  return result;
}
