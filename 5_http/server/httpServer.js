/**
 * 使用http.Server实现一个http服务器;
 *
 * 是master分支中的app.js的分解操作;
 *
 */
let http = require('http');

let server = new http.Server();

server.on('request', function (req, res) {
  res.writeHead(200, {'Content-Type': 'test/html'});
  res.write('<h1>Node.js</h1>>');
  res.end('<p>Hello world</p>');
})

server.listen(3000);
