// module.js

let name;

exports.setName = function (aName) {
    name = aName;
};

exports.sayHello = function () {
    console.log('Hello ' + name);
};
