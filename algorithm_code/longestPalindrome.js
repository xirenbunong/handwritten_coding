// 5. 最长回文子串
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if(s.length < 2) return s;
  let res = '';
  for (let i = 0; i < s.length; i++) {
    helper(i, i);
    helper(i, i+1);
  }
  function helper(m, n){
    while(m >= 0 && n < s.length && s[m] === s[n]) {
      m--;
      n++;
    }
    // 注意此处m,n的值循环完后，是恰好不满足循环条件的时刻
    // 此时m到n的距离为n-m+1，但是mn两个边界不能取 
    // 所以应该取m+1到n-1的区间，长度是n-m-1
    // 比较 res.length，可以得到最大的res
    if(n - m - 1 > res.length) {
      res = s.slice(m+1, n); // slice也要取[m+1,n-1]这个区间
    }
  }
  return res;
};