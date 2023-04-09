function debounce(fn, wait) {
  let timer;
  return function() {
    const args = Array.prototype.slice.call(arguments);
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  }
}