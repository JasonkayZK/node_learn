let events = require('events');

let eventEmitter = new events.EventEmitter();

// eventEmitter.on('error', function (err) {
//     console.log(err);
// });

eventEmitter.emit('error');

// EventEmitter规定:
// 对于发射的特殊事件error, 如果无响应的监听器
// 则node会把他当做异常!


