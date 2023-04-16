// 广度优先遍历算法口诀
// 1.新建一个队列，把根节点入队。
// 2.把队头出队并访问。
// 3.把队头的 children 挨个入队。
// 4.重复第二、三步，直到队列为空。
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
// 广度优先遍历
const bfs = (root) => {
  const q = [root];
  while (q.length > 0) {
    const n = q.shift();
    console.log(n.val);
    n.children.forEach(child => {
      q.push(child);
    });
  }
};

bfs(tree); // abcdefg
