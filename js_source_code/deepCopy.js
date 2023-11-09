// 实现深拷贝
const isObj = (target) => {
  return (typeof target === 'object' || typeof target === 'function') && target !== null;
}
function deepCopy(target, map = new Map()) {
  // 防止重复引用的
  if(map.get(target)) {
    return target;
  }
  const constructor = target.constructor; // 获取当前target的构造函数，通过name属性可以知道是哪个构造函数名

  // 检测当前对象target是否与正则、日期格式对象匹配
  if(/^(RegExp|Date)$/i.test(constructor.name)) {
    return new constructor(target);
  }

  if(isObj(target)) {
    map.set(target, true); // 为循环引用的对象做标记

    const newObj = Array.isArray(target) ? [] : {};
    for (const key in target) {
      if (Object.hasOwnProperty.call(target, key)) {
        newObj[key] = deepCopy(target[key], map);
      }
    }

    return newObj;
  } else {
    return target;
  }
}
