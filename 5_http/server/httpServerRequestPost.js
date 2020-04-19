let http = require('http');
let querystring = require('querystring');
let util = require('util');

http.createServer((req, res) => {
  let post = '';

  req.on('data', chunk => {
    post += chunk;
  });

  req.on('end', () => {
    post = querystring.parse(post);
    res.end(util.inspect(post));
  });
}).listen(3000);
