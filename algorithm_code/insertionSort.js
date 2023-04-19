// 插入排序
// https://visualgo.net/zh 结合排序可视化理解
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let temp = arr[i];
    let j = i;
    while(j>0) {
      if(arr[j-1] > temp) {
        arr[j] = arr[j-1];
      } else {
        break;
      }
      j--;
    }
    // 注意理解这里的j的值
    arr[j] = temp;
  }
  console.log(arr);
}

const arr = [1, 5, 2, 3, 7, 6, 4];

insertionSort(arr);
