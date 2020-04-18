// 多次导入包指向的实际上是同一个包
let myModule1 = require('./module');
myModule1.setName('Jasonkay');

let myModule2 = require('./module');
myModule2.setName('Jasonkay2')

myModule1.sayHello();

// Output:
// Hello Jasonkay2
