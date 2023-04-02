function reactive(target) {
  if(typeof target !== 'object' || target === null) {
    return target;
  }

  const proxyConf = {
    get(target, key, receiver) {
      // Reflect.get代表了[[Get]]原语的最小封装，它比user['name']这样的方式更加底层，
      // 因此，也更加强大。它强就强在第三个参数receiver上，我们可以使用receiver指定访问器的上下文this.
      // 在实际调用对象和被代理对象不同时，修改访问器的上下文this以保证上下文不会丢失。
      const result = Reflect.get(target, key, receiver);
      // 深度监听
      return reactive(result);
    },
    set(target, key, newVal, receiver) {
      // 值没变就不 set 了
      if(target[key] === newVal) {
        return true;
      }
      updateView();

      const result = Reflect.set(target, key, newVal, receiver);
      return result;
    },
    deleteProperty() {
      const result = Reflect.deleteProperty(target, key);
      updateView();
      return result;
    }
  }

  const observed = new Proxy(target, proxyConf);
  return observed;
}

// 触发更新视图
function updateView() {
  console.log('视图更新')
}

const data = {
  name: 'lisa',
  age: 21
}

const proxyData = reactive(data)

console.log(proxyData.name)
proxyData.age = 22;
proxyData.high = 180;
