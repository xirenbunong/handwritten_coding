// 一个数组，随机获取常见口述题
// 回答一定要深入，并且要对面试官可能深入提问的点进行解析
const list = [
  {
    q: '描述一下this',
    a: ''
  },
  {
    q: '闭包、闭包的用途',
    a: ''
  },
  {
    q: '事件循环原理：浏览器Event Loop、Node中的Event Loop',
    a: ''
  },
  {
    q: '为什么 0.1 + 0.2 != 0.3',
    a: ''
  },
]

function getRandomQuestion(arr) {
  const random = Math.floor(arr.length * Math.random());
  const resQ = arr[random].q;
  const resA = arr[random].a;
  console.log(resQ);
  console.log(resA);
}

getRandomQuestion(list);
