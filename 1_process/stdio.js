// stdin是标准输入流, 初始化时会被暂停;
// 想要读入数据必须使用resume()恢复流;
process.stdin.resume();

// 然后手动编写输入流的事件响应函数;
process.stdin.on('data', (data) => {
   process.stdout.write('read from console: ' + data.toString());
});
