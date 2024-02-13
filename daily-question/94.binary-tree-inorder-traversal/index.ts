
//in order 意思是中序遍历

import { ITreeNode } from '../../data-structure/Tree/TreeNode';

//中序遍历是左根右
export function inorderTraversal(root: ITreeNode | null): number[] {
   if(!root)return[];
    const result: number[] = [];
    const stack:ITreeNode[] = [];
    let _root: ITreeNode | null = root;
    while(_root||stack.length){
      while(_root){
        stack.push(_root);
        _root = _root?.left;
      }
      _root = stack.pop()!;
     result.push(_root.val)
     _root= _root.right
    }
    return result;
};
