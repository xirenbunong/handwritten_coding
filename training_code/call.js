Function.prototype.mycall = function(context, ...args) {
  if(this === Function.prototype) {
    return undefined;
  }

  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
}
