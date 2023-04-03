// 无重复字符的最长子串
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let l = 0;
  const len = s.length;
  const map = new Map();
  let res = 0;
  for(let r = 0; r < len; r++) {
    if(map.has(s[r]) && l <= map.get(s[r])) {
      l = map.get(s[r]) + 1;
    }
    map.set(s[r], r);
    res = Math.max(res, r - l + 1);
  }
  console.log(res);
  return res;
};

lengthOfLongestSubstring('ssadscdfffsdfghj');
