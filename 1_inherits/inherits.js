/**
 * 通过util.inherits方法实现的继承:
 *
 * 只会继承原型中定义的内容, 而不会继承构造函数内部创建的属性和函数!
 *
 */
let util = require('util');

// 定义父类Base
function Base() {
    this.name = 'base';
    this.year = 1996;

    // 通过构造函数定义函数
    this.sayHello = function () {
        console.log('Hello ' + this.name);
    };
}
// 通过原型链定义函数
Base.prototype.showName = function () {
    console.log(this.name);
}

// 定义子类Sub
function Sub() {
    this.name = 'sub';
}

// 通过inherits继承;
util.inherits(Sub, Base);

let base = new Base();
base.showName();
base.sayHello();
console.log(base);

let sub = new Sub();
sub.showName();
// sub无sayHello函数
// sub.sayHello();
console.log(sub);

// Output:
// base
// Hello base
// Base { name: 'base', year: 1996, sayHello: [Function] }
// sub
// Sub { name: 'sub' }
