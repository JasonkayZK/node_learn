/**
 * open和C语言中的fopen函数类似;
 *
 * 接收至少两个参数: path, flags;
 *
 * 参数详情:
 *
 * 1.path: 文件路径
 * 2.flags: r, r+, w, w+, a, a+
 * 3.[model]: POSIX系统中文件权限
 * 4.[callback(err, fd)]: 回调函数, 传递一个文件描述符fd
 *
 */
let fs = require('fs');

fs.open('content.txt', 'r', '0666', function (err, fd) {
    if (err) {
        console.error(err);
    } else {
        console.log(fd);
    }
});

