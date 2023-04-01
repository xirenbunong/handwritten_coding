// 实现防抖
function debounce(fn, wait) {
  let timer; // 闭包存储timer
  return function() {
    clearTimeout(timer);
    const _this = this;
    const args = Array.prototype.slice.call(arguments);
    timer = setTimeout(() => {
      fn.apply(_this, args);
    }, wait);
  }
}
