// 102. 二叉树的层序遍历
// 实际上就是 广度优先算法
// 记住口诀
// 新建一个队列，把根节点入队。
// 把队头出队并访问。
// 把队头的 children 挨个入队。
// 重复第二、三步，直到队列为空。
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if(!root) return [];
  const q = [[root, 0]];
  const res = [];
  while(q.length) {
    const [n, level] = q.shift();
    // 对于当前level没有值
    if(!res[level]) {
      res.push([n.val]);
    } else {
      // 对于当前level已经有值
      res[level].push(n.val);
    }
    if(n.left) q.push([n.left, level + 1]);
    if(n.right) q.push([n.right, level + 1]);
  }
  return res;
};
