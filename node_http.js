// 手写node http服务
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-type': 'text/plain'
  });
  res.end('Hello World!');
}).listen(3000, '127.0.0.1');
