// 数组去重、扁平化
const unique1 = (arr) => {
  return arr.filter((ele, idx) => {
    return arr.indexOf(ele) === idx;
  })
}

const unique2 = (arr) => {
  return Array.from(new Set(arr));
}

const unique3 = (arr) => {
  return [...new Set(arr)];
}

const flat1 = (arr) => {
  while(arr.some(ele => Array.isArray(ele))) {
    arr = [].concat(...arr);
  }
}

const flat2 = (arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(flat2(arr[i]));
    } else {
      result.push(arr[i])
    }
  }
  return result;
}

// 已知如下数组：
// var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

Array.prototype.flat = function() {
  var arr = this;
  while (arr.some(ele => Array.isArray(ele))) {
      arr = [].concat(...arr)
  }
  return arr;
}

Array.prototype.sortBy = function() {
  var arr = this;
  return arr.sort((a, b) => +a - +b)
}

Array.prototype.unique = function() {
  var arr = this;
  return Array.from(new Set(arr))
}
// 链式调用
arr.flat().sortBy().unique();
