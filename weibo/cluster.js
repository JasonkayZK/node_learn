var cluster = require('cluster');
var app = require('./app');

var workers = {};
var count = require('os').cpus().length;

console.log('cpus has ' + count + '.');

function spawn() {
  var worker = cluster.fork();
  workers[worker.pid] = worker;
  return worker;
}

if (cluster.isMaster) {
  console.log('isMaster');
  for (var i = 0; i < count; i++) {
    console.log('start No.' + i + ' cluster...');
    spawn();
  }
  cluster.on('death', function (worker) {
    console.log('worker ' + worker.pid + ' died. spawning a new process...');
    delete workers[worker.pid];
    spawn();
  });
} else {
  console.log('no master.');
  app.listen(process.env.app_port || 3000);
}

// process.on('SIGTERM', function() {
//   for (var pid in workers) {
//     console.log('Sigterm, so kill ' + pid);
//     process.kill(pid);
//   }
//   process.exit(0);
// });
