// 打印到标准输出流
console.log('Hello world');
console.log('Jasonkay %damn good');
console.log('Jasonkay %damn good', 1996);

// 打印到标准错误流
console.error('Error!');

// 向标准错误流输出当前调用栈
console.trace();

// Output:
// Hello world
// Jasonkay %damn good
// Jasonkay 1996amn good
// Error!
//     Trace
// at Object.<anonymous> (/home/zk/workspace/node_learn/2_console/console.js:10:9)
// at Module._compile (internal/modules/cjs/loader.js:955:30)
// at Object.Module._extensions..js (internal/modules/cjs/loader.js:991:10)
// at Module.load (internal/modules/cjs/loader.js:811:32)
// at Function.Module._load (internal/modules/cjs/loader.js:723:14)
// at Function.Module.runMain (internal/modules/cjs/loader.js:1043:10)
// at internal/main/run_main_module.js:17:11
