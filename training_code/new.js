function myNew() {
  const obj = Object.create();
  const constructor = [].shift.call(arguments);
  obj.__proto__ = constructor.prototype;
  const res = constructor.apply(obj, arguments);
  return typeof res === 'object' ? res || obj : obj;
}
