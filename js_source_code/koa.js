class Middleware {
  constructor() {
    this.middlewares= [];
  }

  use(fn) {
    if(typeof fn !== 'function') {
      throw new Error('Middleware must be function');
    }
    this.middlewares.push(fn);
    return this;
  }

  compose() {
    const middlewares = this.middlewares;
    function dispatch(index) {
      const middleware = middlewares[index];
      if(!middleware) return;
      try {
        const ctx = {};
        const result = middleware(ctx, dispatch.bind(null, index+1));
        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return dispatch(0);
  }
}

const middleware = new Middleware();
middleware.use(async(ctx, next) => {
  console.log(1);
  await next();
  console.log(2);
})

middleware.use(async(ctx, next) => {
  console.log(3);
  await next();
  console.log(4);
})

middleware.compose(); // 1 3 4 2
