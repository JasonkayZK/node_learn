/**
 * 通过url库直接解析请求路径, 获取GET方法的queryString
 */
let http = require('http');
let url = require('url');
let util = require('util');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);
