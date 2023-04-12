class MyPromise {
  constructor(executor) {
    this._resolveQueue = [];
    this._rejectQueue = [];

    const _resolve = (val) => {
      while(this._resolveQueue.length) {
        const cb = this._resolveQueue.shift();
        cb(val);
      }
    }

    const _reject = (val) => {
      while(this._rejectQueue.length) {
        const cb = this._rejectQueue.shift();
        cb(val);
      }
    }

    executor(_resolve, _reject);
  }

  then(_resolveFn, _rejectFn) {
    this._resolveQueue.push(_resolveFn);
    this._rejectQueue.push(_rejectFn);
  }

  static all(promiseArr) {
    const result = [];
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach((p, i) => {
        MyPromise.resolve(p).then(val => {
          result[i] = val;
          if(i === promiseArr.length) {
            resolve(result);
          }
        }, err => {
          reject(err);
        })
      });
    })
  }

  static any(promiseArr) {
    const errs = [];
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach((p, i) => {
        Promise.resolve(p).then(val => {
          resolve(val);
        }, err => {
          errs[i] = err;
          if(promiseArr.length === i) {
            reject(new Error(errs));
          }
        })
      })
    })
  }
}
