// 第1个重复两次的元素
function test(str) {
  let res = '';
  const len = str.length;
  if(len < 2) return str;
  const map = new Map();
  const strArr = str.split('');
  strArr.forEach(s => {
    map.set(s, map.has(s) ? map.get(s) + 1 : 1);
  });
  for (let i = 0; i < strArr.length; i++) {
    if(map.get(strArr[i]) === 2) {
      res = strArr[i];
      break;
    }
  }
  console.log(res);
}

test('iuytyuootp');
