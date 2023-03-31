// 实现EventEmitter
class EventEmitter {
  constructor() {
    this._events = {};
  }

  // 注册
  on(eventName, callBack) {
    const cbs = this._events[eventName] || [];
    cbs.push(callBack);
    this._events[eventName] = cbs;
  }

  emit(eventName, ...args) {
    const cbs = this._events[eventName] || [];
    cbs.forEach(cb => {
      cb(...args);
    });
  }

  off(eventName, callBack) {
    const cbs = this._events[eventName] || [];
    const newCbs = cbs.filter(cb => {
      // cb.initial !== callBack 看 once 的实现
      return cb !== callBack && cb.initial !== callBack;
    })
    this._events[eventName] = newCbs;
  }

  once(eventName, callBack) {
    // 重新封装callback，主要目的是callback执行后调用off注销
    const one = (...val) => {
      callBack(...val);
      this.off(eventName, one);
    }
    // 做一个绑定，方便 off 的时候找
    one.initial = callBack;
    this.on(eventName, one);
  }
}
