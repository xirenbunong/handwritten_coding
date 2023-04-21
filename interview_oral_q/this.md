### 描述一下this
    我们经常说"谁调用它，this就指向谁"。但是这种回答并不全面。

我们按照使用场景分类讨论：
1. 在函数体中，非显式或隐式地简单调用函数时，在严格模式下，函数内的 this 会被绑定 undefined上，在非严格模式下则会被绑定到全局对象 window/global 上。
```js
function f1() {
  console.log(this); // window
}

function f2() {
  'use strict'
  console.log(this); // undefined
}
```
2. 一般使用 new 方法调用构造函数时，构造函数内的 this 会被绑定到新创建的对象上。
```js
// 结合new实现来理解，这里不赘述
```

3. 一般通过 call/apply/bind 方法显式调用函数时，函数体内的 this 会被绑定到指定参数的对象上。
```js
// 结合call、apply、bind的实现和使用
```

4. 一般通过上下文对象调用函数时，函数体内的 this 会被绑定到该对象。
```js
const person = {
  name: 'Lisa',
  child: {
    name: 'Julie',
    fn: function() {
      console.log(this.name);
    }
  }
}
// this 指向最后调用它的对象
console.log(person.child.name); // Julie
```

5. 在箭头函数中 this 的指向是由外层(函数或全局)作用域来决定的。
```js
const foo = {
  fn: function() {
    setTimeout(() => {
      console.log(this);
    });
  }
}

console.log(foo.fn()); // {fn: ƒ}
```

---

### 写到最后

> 回答该问题只答出文字部分即可，代码是用于结合理解的。
> 答完这道，一般情况下面试官会根据回答中提到的箭头函数、call/bind继续提问。
