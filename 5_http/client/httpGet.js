let http = require('http');

http.get({host: '127.0.0.1', port: 3000}, res => {
  res.setEncoding('utf8');
  res.on('data', data => {
    console.log(data);
  });
});
