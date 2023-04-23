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

// Object.prototype.a = () => {
//   console.log('a');
// }
// Function.prototype.b = () => {
//   console.log('b');
// }

// function F(){}

// var f = new F();

// F.a(); // a
// F.b(); // b
// f.a(); // a
// f.b(); // b is not a function
