function findCommonElements(arr1, arr2) {
  const set1 = new Set(arr1);
  const resultSet = new Set();
  
  for (const item of arr2) {
    if (set1.has(item)) {
      resultSet.add(item);
    }
  }
  
  return resultSet;
}

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];

const commonElements = findCommonElements(arr1, arr2);
console.log(Array.from(commonElements)); // 输出 Set {3, 4, 5} -> [3, 4, 5]
