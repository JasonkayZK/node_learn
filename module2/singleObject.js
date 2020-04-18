function Hello() {
    let name;

    this.setName = function (aName) {
        name = aName;
    };

    this.sayHello = function () {
        console.log('Hello ' + name);
    };
}

// 导出module中的单个对象
// exports.Hello = Hello;

// 或使用下面的方法
module.exports = Hello;
