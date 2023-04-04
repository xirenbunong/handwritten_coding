// 112. 路径总和
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
  if(!root) return false;
  let result = false;
  const dfs = (r, v) => {
    if(!r.left && !r.right && v === targetSum) {
      result = true;
    }
    if(r.left) dfs(r.left, v + r.left.val);
    if(r.right) dfs(r.right, v + r.right.val);
  }
  dfs(root, root.val)
  return result;
}
