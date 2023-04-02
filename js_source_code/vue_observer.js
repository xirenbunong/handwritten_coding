// Vue响应式
// 缺点：1.需要递归深度监听；2.没法新增删除属性，需要Vue.set和Vue.delete配合；3.无法监听到原生数组，需要重写数组方法

function defineReactive(obj, key, val) {
  observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return val;
    },
    set: function(newVal) {
      if (newVal === val) return;
      val = newVal;
      notify();
    }
  });
}

function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  if (Array.isArray(obj)) {
    // 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
    const originalArrayMethods = Object.create(Array.prototype);
    // 重写数组方法
    ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(method => {
      originalArrayMethods[method] = function(...args) {
        const result = Array.prototype[method].apply(this, args);
        notify(); // 触发更新视图
        return result;
      };
    });
    obj.__proto__ = originalArrayMethods;
    // 监听数组元素
    obj.forEach(item => observe(item));
  } else {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        defineReactive(obj, key, obj[key]);
      }
    }
  }
}

function notify() {
  console.log("数据变化了");
}

function reactive(obj) {
  observe(obj);
  return obj;
}

const data = reactive({
  name: "Tom",
  age: 18,
  hobbies: ["reading", "swimming"]
});

// 测试响应式
data.name = "Jerry";
data.age = 20;
data.hobbies.push("coding");
