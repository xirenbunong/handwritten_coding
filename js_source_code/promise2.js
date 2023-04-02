// 实现promise
// 实现一个符合Promise/A+规范的
// 核心(两条)：1.单项状态改变(Pending -> Fulfilled 或 Pending -> Rejected，状态变更不可逆) 2.then方法接收两个可选参数，返回一个promise，可以被同一个 promise 调用多次。
// catch()方法返回一个Promise，并且处理拒绝的情况。它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。
// finally()方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。在finally之后，还可以继续then。并且会将值原封不动的传递给后面的then

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this._status = PENDING;
    this._value = undefined;
    this._resolveQueue = [];
    this._rejectQueue = [];

    let _resolve = (val) => {
      // 包装一下传入 为了传入setTimeout
      const run = () => {
        if(this._status !== PENDING) return; // 对应规范中的"状态只能由pending到fulfilled或rejected"
        this._status = FULFILLED;
        this._value = val;
        // 这里之所以使用一个队列来储存回调,是为了实现规范要求的 "then 方法可以被同一个 promise 调用多次"
        while(this._resolveQueue.length) {
          const callBack = this._resolveQueue.shift();
          callBack(val);
        }
      }
      setTimeout(run); // 模拟异步 延迟执行回调
    };

    let _reject = (val) => {
      // 包装一下传入 为了传入setTimeout
      const run = () => {
        if(this._status !== PENDING) return;
        this._status = REJECTED;
        this._value = val;
        while(this._rejectQueue.length) {
          const callBack = this._rejectQueue.shift();
          callBack(val);
        }
      }
      setTimeout(run);
    };
    executor(_resolve, _reject);
  }

  then(resolveFn, rejectFn) {
    // return一个新的promise
    return new MyPromise((resolve, reject) => {
      // 包装一下 resolveFn，因为要对 then 返回值进行讨论
      const fulfiledFn = (val) => {
        try {
          const x = resolveFn(val);
          // 如果返回的是promise对象，我们要调用 then 递归出结果
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      }

      // 同理
      const rejectedFn = (val) => {
        try {
          const x = rejectFn(val);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      }

      switch (this._status) {
        case PENDING:
          this._resolveQueue.push(fulfiledFn);
          this._rejectQueue.push(rejectedFn);
          break;
        case FULFILLED:
          fulfiledFn(this._value);
          break;
        case REJECTED:
          rejectedFn(this._value);
          break;
      }
    })
  }

  catch(rejectFn) {
    return this.then(undefined, rejectFn);
  }

  finally(callBack) {
    return this.then(
      // 执行回调,并return value传递给后面的then
      value => MyPromise.resolve(callBack()).then(() => value),
      reason => MyPromise.resolve(callBack()).then(() => {throw reason})
    )
  }

  static resolve(value) {
    //根据规范, 如果参数是Promise实例, 直接return这个实例
    if(value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(promiseArr) {
    let index = 0;
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach((p, i) => {
        //Promise.resolve(p)用于处理传入值不为Promise的情况
        MyPromise.resolve(p).then(val => {
          index++;
          result[i] = val;
          if(promiseArr.length === index) {
            resolve(resolve);
          }
        },
        err => {
          reject(err);
        })
      });
    })
  }

  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      //同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
      for (const p of promiseArr) {
        MyPromise.resolve(p).then(val => {
          resolve(val);
        }, err => {
          reject(err);
        })
      }
    })
  }

  // Promise.any 只要传入的 promise 有一个是 fullfilled 则立即 resolve 出去，否则将所有 reject 结果收集起来并返回
  static any(promiseArr) {
    const errs = [];
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach((p, i) => {
        //Promise.resolve(p)用于处理传入值不为Promise的情况
        MyPromise.resolve(p).then(val => {
          resolve(val);
        },
        err => {
          errs.push(err);
          if(promiseArr.length === i) {
            reject(new Error(errs));
          }
        })
      });
    })
  }
}
