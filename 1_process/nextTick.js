// 两个计算密集型函数;
function somethingComplicated(args) {
    args = 0
    for (let i = 1; i < 10000; ++i) {
        args += i;
    }
    return args;
}

function compute() {
    let args = 0
    for (let i = 1; i < 10000; ++i) {
        args += i;
    }
    return args;
}

// 下面的方法会先执行somethingComplicated, 然后立即调用回调函数;
function doSomething(args, callback) {
    somethingComplicated(args);
    callback();
}

// 在回调函数中执行另一个计算密集型函数;
doSomething(1, () => {
    compute();
});

// 使用nextTick创建另一个事件;
// 此时somethingComplicated和compute在不同的事件中, 提高事件的响应速度
function doSomethingWithTick(args, callback) {
    somethingComplicated(args);
    process.nextTick(callback);
}

doSomethingWithTick(1, compute);
