// 46. 全排列
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = [];
  const rec = (path) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    nums.forEach(n => {
      if (path.includes(n)) {
        return
      }
      rec(path.concat(n));
    })
  }
  rec([]);
  return res
};