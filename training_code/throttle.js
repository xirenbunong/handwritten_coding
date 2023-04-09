function throttle(fn, wait) {
  let pre = 0;
  return function() {
    const now = +new Date();
    const args = Array.prototype.slice.call(arguments);
    if(now - pre >= wait) {
      fn.apply(this, args);
      pre = now;
    }
  }
}