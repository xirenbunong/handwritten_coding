// 函数柯里化
// 用闭包把参数保存起来，等到数量足够执行函数了，开始执行函数
function curry(fn, args) {
  args = args || [];
  return function() {
    const newArgs = args.concat(Array.prototype.slice.call(arguments));
    if(newArgs.length < fn.length) {
      return curry.call(this, fn, newArgs);
    } else {
      return fn.apply(this, newArgs);
    }
  }
}
