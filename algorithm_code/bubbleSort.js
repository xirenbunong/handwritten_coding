// 冒泡排序
// https://visualgo.net/zh 结合排序可视化理解
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if(arr[j+1] < arr[j]) {
        [arr[j+1], arr[j]] = [arr[j], arr[j+1]];
      }
    }
  }
  console.log(arr);
}

const arr = [1, 5, 2, 3, 7, 6, 4];

bubbleSort(arr);
