let http = require('http');
let querystring = require('querystring');

let contents = querystring.stringify({
  name: 'Jasonkay',
  email: '271226192@qq.com',
  address: 'SCUT'
});

let options = {
  host: '127.0.0.1',
  port: 3000,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': contents.length
  }
};

let req = http.request(options, res => {
  res.setEncoding('utf8');
  res.on('data', data => {
    console.log(data);
  });
});

req.write(contents);
req.end();
