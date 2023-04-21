// 选择排序
// https://visualgo.net/zh 结合排序可视化理解
function selectionSort(arr) {
  for (let i = 0; i < arr.length-1; i++) {
    let minIndex = i;
    for (let j = i; j < arr.length; j++) {
      if(arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if(minIndex !== i) {
      [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
    }
  }
  console.log(arr);
}

const arr = [1, 5, 2, 3, 7, 6, 4];

selectionSort(arr);
