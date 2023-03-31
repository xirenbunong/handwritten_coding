// 洗牌算法
function disorder(arr) {
  const len = arr.length;
  let current = len - 1;
  let random;
  while(current > -1) {
    random = Math.floor(len * Math.random());
    [arr[random], arr[current]] = [arr[current], arr[random]];
    current--;
  }
  return arr;
}

disorder([1, 2, 3, 4, 5, 6]);
