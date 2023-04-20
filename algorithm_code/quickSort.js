// 快速排序
// https://visualgo.net/zh 结合排序可视化理解
// 时间复杂度为O(nlogn)
function quickSort(arr) {
  const rec = (arr) => {
    if(arr.length <= 1) {
      return arr;
    }
    const mid = arr[0];
    const leftArr = [];
    const rightArr = [];
    for (let i = 1; i < arr.length; i++) {
      if(arr[i] < mid) {
        leftArr.push(arr[i])
      } else {
        rightArr.push(arr[i]);
      }
    }
    return [...rec(leftArr), mid, ...rec(rightArr)];
  }
  rec(arr);
}

const arr = [1, 5, 2, 3, 7, 6, 4];

quickSort(arr);
