// 二叉树的最大深度(深度优先遍历)
// 深度优先遍历算法口诀
// 1.访问根节点。
// 2.对根节点的 children 挨个进行深度优先遍历。
// 3.递归。
const tree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        {
          val: 'd',
          children: [],
        },
        {
          val: 'e',
          children: [],
        }
      ],
    },
    {
      val: 'c',
      children: [
        {
          val: 'f',
          children: [],
        },
        {
          val: 'g',
          children: [],
        }
      ],
    }
  ],
};
// 深度优先遍历
const dfs = (root) => {
  console.log(root.val);
  root.children.forEach(item => dfs(item));
};

dfs(tree); // abdecfg
