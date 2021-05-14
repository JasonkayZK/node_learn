let getUserInfo = function (user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('Hello'), Math.floor(400 * Math.random()));
    });
}

let showUserInfo = function (user) {
    return getUserInfo().then(info => {
        console.log('用户信息', info);
        return true;
    });
}

let timeout = function (delay, result) {
    return new Promise(resolve => {
        setTimeout(() => resolve(result), delay);
    });
}

let showToast = function () {
    console.log('show loading...');
}

let hideToast = function () {
    console.log('hide loading time: ' + (new Date() - time) + " ms");
}

// loading时间显示需要
const time = +new Date();
showToast();
Promise.all([showUserInfo(), timeout(200)]).then(() => {
    hideToast();
});
