class TreeNode {
     val: number
      left: TreeNode | null
      right: TreeNode | null
      constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.left = (left===undefined ? null : left)
          this.right = (right===undefined ? null : right)
      }
  }
interface TreeNode{
    val: number
    left: TreeNode | null
    right: TreeNode | null
}
function inorderTraversal(root: TreeNode | null): number[] {
   if(!root)return[];
    const result: number[] = [];
    const stack:TreeNode[] = [];
    let _root: TreeNode | null = root;
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
const root = new TreeNode(1,null,new TreeNode(2,new TreeNode(3,null,null),null))
console.log(inorderTraversal(root))
