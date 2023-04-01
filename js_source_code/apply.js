// 实现apply
// 和call一样，解释移步"实现call"，注意 args 不同
Function.prototype.myapply = function(context, args) {
  if(this === Function.prototype) {
    return undefined;
  }

  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  args = Array.isArray(args) ? args : []; // 注意判断下args给个默认值
  const res = context[fn](args);
  delete context[fn];
  return res;
}

function fun() {
  console.log(this.name, arguments);
}
let obj = {
  name: 'lisa'
}
fun.myapply(obj, [10, 11])
