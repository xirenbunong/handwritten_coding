// 寄生组合式继承
function Parent(value) {
  this.val = value;
}

Parent.prototype.getValue = function() {
  console.log(this.val);
}

function Child(value) {
  // 通过 Parent.call(this) 继承父类的属性
  Parent.call(this, value);
}

// 使用 Object.create() 方法创建了一个新对象，该新对象的原型对象被设置为 Parent.prototype。
// 这样，Child 实例在访问属性或方法时，如果在自身实例对象中找不到对应的属性或方法，就会去其原型对象 Parent.prototype 中查找
// 通过第二个参数为新对象添加了一个 constructor 属性，其值为 Child 函数本身。
// 这是因为通过 Object.create() 方法创建的新对象的 constructor 属性会默认指向其父类的构造函数，因此需要手动设置该属性为 Child 函数本身，以确保该属性指向正确的构造函数。
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false, // enumerable 属性为 false 表示 constructor 属性不可枚举，即不会出现在 for...in 循环中
    writable: true, // writable 属性为 true 表示 constructor 属性可写，即可以通过赋值操作修改其值
    configurable: true // configurable 属性为 true 表示 constructor 属性可配置，即可以通过 Object.defineProperty() 方法修改其特性
  }
})
// 上述代码的作用是让 Child 函数继承 Parent 函数的原型对象，
// 并将 Child 函数的 constructor 属性指向 Child 函数本身

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
