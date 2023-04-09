Function.prototype.mybind = function(context, ...args) {
  if(this === Function.prototype) {
    return new Error('error');
  }
  const _this = this;

  return function F() {
    const newArgs = args.concat(Array.prototype.slice.call(arguments));
    if(this instanceof F) {
      return new _this(...newArgs);
    }
    return _this.apply(context, newArgs)
  }
}