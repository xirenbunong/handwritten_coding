var compareVersion = function (version1, version2) {
  const v1 = version1.split('.');
  const v2 = version2.split('.');
  for (let i = 0; i < v1.length || i < v2.length; ++i) {
    // 每次循环刚开始定义两个变量，就算有一个数组的当前值已经没有了，默认也会是0了
    let x = 0, y = 0;
    if (i < v1.length) {
      // parseInt转一下
      x = parseInt(v1[i]);
    }
    if (i < v2.length) {
      y = parseInt(v2[i]);
    }
    if (x > y) {
      return 1;
    }
    if (x < y) {
      return -1;
    }
  }
  return 0;
};
