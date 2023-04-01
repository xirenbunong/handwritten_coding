function myInstanceof(target, origin) {
  const proto = target.__proto__;
  if(proto) {
    if(proto === origin.prototype) {
      return true;
    } else {
      return myInstanceof(proto, origin);
    }
  } else {
    return false;
  }
}