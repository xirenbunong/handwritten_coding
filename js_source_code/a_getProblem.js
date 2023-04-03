// 有一个数组，随机获取我所有的手写题目
const list = [
  '实现call',
  '实现apply',
  '实现bind',
  '实现EventEmitter',
  '实现防抖',
  '实现节流',
  '实现深拷贝',
  '数组去重、扁平化',
  '洗牌算法',
  '函数柯里化',
  '实现promise',
  '实现instanceof',
  '实现new操作符',
  '数组原型方法',
  '大文件上传',
  'ajax并发请求',
  'Vue响应式',
  'Vue3 Proxy 实现响应式',
  'Koa 洋葱模型',
  '3.无重复字符的最长子串',
  '88.合并两个有序数组',
  '1.两数之和',
  '20.有效的括号',
  '165. 比较版本号',
  '二叉树的最大深度',
  '二叉树的最小深度',
  '冒泡排序',
  '选择排序',
  '插入排序',
  '归并排序',
  '快速排序',
  '二分搜索',
  '合并两个有序链表',
  '猜数字大小',
  '爬楼梯'
];

function getOneProblem(list) {
  const len = list.length;
  const random = Math.floor(len * Math.random());
  console.log(list[random]);
  return list[random]
}
getOneProblem(list);
