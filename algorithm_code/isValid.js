// 20. 有效的括号
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if(s.length % 2 === 1) {
    return false;
  }
  const stack = []; // 数组维护一个栈
  const map = new Map();
  map.set('(', ')');
  map.set('{', '}');
  map.set('[', ']');
  for(let i = 0; i < s.length; i++) {
    const c = s[i];
    if(map.has(c)) {
      stack.push(c);
    } else {
      // 栈顶的元素
      const r = stack[stack.length - 1];
      // 当前元素的value和栈顶相同，出栈
      if(c === map.get(r)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};
