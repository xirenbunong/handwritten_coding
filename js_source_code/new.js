// 实现new操作符
// new的过程：1.创建一个新对象；2.构造函数的this指向这个新对象；3.给这个新对象添加属性、方法；4.返回这个对象。注意构造函数显式返回对象的情况
function myNew() {
  const obj = new Object();
  // 这里是使用shift将arguments中的第一个也就是下面例子中的person(构造函数原型)
  const constructor = [].shift.call(arguments);
  // 新对象的隐式原型等于构造函数的显式原型。那么属性、方法就被添加到了obj
  obj.__proto__ = constructor.prototype;
  // 改变this指向
  const res = constructor.apply(obj, arguments);
  // ret || obj 这里这么写考虑了构造函数显式返回 null 的情况
  return typeof res === 'object' ? res || obj : obj;
}

// 体会使用例子，明白为什么是Constructor = [].shift.call(arguments)
function person(name, age) {
  this.name = name
  this.age = age
}
let p = myNew(person, '布兰', 12)
console.log(p)  // { name: '布兰', age: 12 }
