// event.js

// 创建事件对象
let EventEmitter = require('events').EventEmitter;
let event = new EventEmitter();

// 注册事件
event.on('some_event', () => {
    console.log('some event occurred.')
});

// 触发事件
setTimeout(() => {
    event.emit('some_event');
}, 1000);
