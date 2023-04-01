// 数组原型方法
Array.prototype._map = function(exc) {
  const result = [];
  this.forEach((item, index, arr) => {
    result[index] = exc(item, index, arr)
  })
  return result;
}

Array.prototype._filter = function(exc) {
  const result = [];
  this.forEach((item, index, arr) => {
    if(exc(item, index, arr)) {
      result.push(item);
    }
  })
  return result;
}

Array.prototype._reduce = function(exc, initial = 0) {
  let result = initial;
  this.forEach(item => {
    result = exc(result, item);
  })
  return result;
}
