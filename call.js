// 实现call
// 挂载在 Function 的原型上，所有的 function 都可以找到它
// ...args 不理解的话多体会call的用法
Function.prototype.mycall = function(context, ...args) {
  // 避免直接调用
  if(this === Function.prototype) {
    return undefined;
  }

  context = context || window; // 如果第一个参数没传，默认指向window

  const fn = Symbol(); // 创建一个独一无二的属性，避免和context原有属性冲突

  context[fn] = this;
  const res = context[fn](...args);

  delete context[fn]; // 删除context 的 fn，方便下次继续调用call
  return res;
}

function fun() {
  console.log(this.name, arguments)
}
let obj = { name: 'lisa' }
fun.mycall(obj, 'didi', 'didi')
