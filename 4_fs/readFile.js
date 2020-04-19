/**
 * 使用readFile时默认为二进制编码, 所以需要指定编码格式;
 */
let fs = require('fs');

fs.readFile('content.txt', function (err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});
// Output:
// <Buffer 54 65 78 74 20 e6 96 87 e6 9c ac e6 96 87 e4 bb b6 e7 a4 ba e4 be 8b 0a>

fs.readFile('content.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});
// Output:
// Text 文本文件示例
