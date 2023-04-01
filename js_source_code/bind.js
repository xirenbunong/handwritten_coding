// 实现bind
Function.prototype.mybind = function(context, ...args) {
  if(this === Function.prototype) {
    // 这里直接报错
    throw new Error('error');
  }
  const _this = this;
  // 注意这里的 F
  return function F() {
    const newArgs = args.concat(Array.prototype.slice.call(arguments));
    // 判断是否用于构造函数，如果是，那就绑到new构造的对象上
    // 所以这里通过new(将构造函数的this指向这个新对象)去实现
    // 将最开始的this绑到外面new的对象mdzz上(如下所示的例子)
    if(this instanceof F) {
      return new _this(...newArgs);
    }
    return _this.apply(context, newArgs);
  }
}

function fun() {
  console.log(this.name, arguments);
}
let obj = {
  name: 'lisa'
}
let b = fun.bind(obj, 6);
b(9);

// // 实现bind之前看一个this绑定优先级的例子
// function foo(a) {
//   this.a = a;
// }
// const obj1 = {};
// // 首先bind构造的函数bar内部将this绑定到了obj1
// var bar = foo.bind(obj1);
// bar(3);
// console.log(obj1.a); // 正常打印3
// // 当bar作为构造函数被new调用时，返回的实例mdzz与obj1解绑了
// // 也就是说new绑定修改了bind绑定中的this指向。
// // 也就是说new绑定优先级比bind高
// var mdzz = new bar(6);
// console.log(mdzz.a); // 6