// ajax并发请求
// 实现思路：整体采用递归调用来实现：最初发送的请求数量上限为允许的最大值，并且这些请求中的每一个都应该在完成时继续递归发送，通过传入的索引来确定了urls里面具体是那个URL，保证最后输出的顺序不会乱，而是依次输出
function multiRequest(urls=[], maxNum) {
  const len = urls.length;
  // 根据请求数量创建一个数组来保存请求的结果
  const result = new Array(len).fill(false);
  let current = 0;

  return new Promise((resolve, reject) => {
    // 请求maxNum个(注意这里while是为了刚开始要发送maxNum个请求)
    while(current < maxNum) {
      next();
      current++;
    }
    function next() {
      if(current >= len && !result.includes(false)) {
        return resolve(result);
      }
      const url = urls[current];
      fetch(url).then(res => {
        result[current] = res; // 保存请求结果
      }).catch(err => {
        result[current] = err;
      }).finally(() => {
        // 不管成功失败都要继续执行的递归
        next();
        current++;
      })
    }
  })
}