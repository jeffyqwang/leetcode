import { TreeNode } from '../../data-structure/Tree/TreeNode';

export const convertArrayToTree = (arr: (number | null)[]): TreeNode | null => {
  if (!arr.length) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  for (let i = 1; i < arr.length; i += 2) {
    const current = queue.shift()!;
    if (arr[i] !== null) {
      current.left = new TreeNode(arr[i]);
      queue.push(current.left);
    }
    if (i + 1 < arr.length && arr[i + 1] !== null) {
      current.right = new TreeNode(arr[i + 1]);
      queue.push(current.right);
    }
  }
  return root;
};
