/**
 * readFileSync是readFile的同步版本;
 *
 * readFileSync读取到的文件内容会以函数返回值的形式返回;
 *
 * (通常情况下在node中的回调函数无返回值)
 *
 * 对于异常, 同步方法使用try-catch捕获;
 *
 */
let fs = require('fs');

try {
    let data = fs.readFileSync('content.txt', 'utf-8');
    if (data) {
        console.log(data);
    }
} catch (e) {
    console.error(e);
}



