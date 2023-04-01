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

