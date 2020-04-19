let events = require('events');
let eventEmitter = new events.EventEmitter();

eventEmitter.on('someEvent', function (arg1, arg2) {
    console.log('listener1', arg1, arg2);
})

eventEmitter.on('someEvent', function (arg1, arg2) {
    console.log('listener2', arg1, arg2);
})

eventEmitter.emit('someEvent', 'Jasonkay', 1996);
eventEmitter.emit('someEvent', 'Jasonkay', 1996);

// Output:
// listener1 Jasonkay 1996
// listener2 Jasonkay 1996
// listener1 Jasonkay 1996
// listener2 Jasonkay 1996
