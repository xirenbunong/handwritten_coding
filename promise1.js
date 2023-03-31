// 实现promise
// Promise为我们解决了什么问题：在传统的异步编程中，如果异步之间存在依赖关系，我们就需要通过层层嵌套回调来满足这种依赖，如果嵌套层数过多，可读性和可维护性都变得很差，产生所谓“回调地狱”，而Promise将回调嵌套改为链式调用，增加可读性和可维护性。
// 步骤：1.Promise的构造方法接收一个executor()，在new Promise()时就立刻执行这个executor回调；2.executor()内部的异步任务被放入宏/微任务队列，等待执行；3.then()被执行，收集成功/失败回调，放入成功/失败队列；4.executor()的异步任务被执行，触发resolve/reject，从成功/失败队列中取出回调依次执行
// 先实现一个基本的 Promise
class MyPromise {
  constructor(executor) {
    this._resolveQueue = [];
    this._rejectQueue = [];
    let _resolve = (val) => {
      while(this._resolveQueue.length) {
        const callBack = this._resolveQueue.shift();
        callBack(val);
      }
    }
    let _reject = (val) => {
      while(this._rejectQueue.length) {
        const callBack = this._rejectQueue.shift();
        callBack(val);
      }
    }
    executor(_resolve, _reject);
  }

  // then收集依赖，在上面的callback(val)中触发依赖
  then(resolveFn, rejectFn) {
    this._resolveQueue.push(resolveFn);
    this._rejectQueue.push(rejectFn);
  }
}

