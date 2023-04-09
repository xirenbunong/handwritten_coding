Function.prototype.myapply = function(context, args) {
  if(this === Function.prototype) {
    return undefined;
  }

  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  args = Array.isArray(args) ? args : [];
  const res = context[fn](...args);
  delete context[fn];
  return res;
}
