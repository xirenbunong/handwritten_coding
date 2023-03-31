// 实现节流
function throttle(fn, wait) {
  let pre = 0; // 闭包保存pre
  return function() {
    const now = +new Date();
    const context = this;
    const args = Array.prototype.slice.call(arguments);
    if(now - pre >= wait) {
      fn.apply(context, args);
      pre = now;
    }
  }
}
