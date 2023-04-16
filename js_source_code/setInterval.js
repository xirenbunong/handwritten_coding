// setTimeout实现setInterval功能

// 简易版本
// function mySetInterval(callback, wait) {
//   setTimeout(function () {
//     callback()
//     newInterval(callback, wait)
//   }, wait)
// }

// 完整版本
function mySetInterval (callback, wait) {
  let timer = null;

  function intervalFunc () {
    callback();
    timer = setTimeout(intervalFunc, wait);
  }

  timer = setTimeout(intervalFunc, wait);

  return {
    clear: function () {
      clearTimeout(timer);
    }
  };
}

let myTimer = mySetInterval(function () {
  console.log('Hello World!');
}, 1000);

// 取消定时器
myTimer.clear(); // 使用返回的对象的clear()方法可以取消定时器。
