function quickSort(arr) {
  const rec = (arr) => {
    if(arr.length === 1) return arr;
    const leftArr = [];
    const rightArr = [];
    const mid = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if(arr[i] >= mid) {
        rightArr.push(arr[i]);
      } else {
        leftArr.push(arr[i]);
      }
    }
    return [...rec(leftArr), mid, ...rec(rightArr)];
  }
  rec(arr);
}
