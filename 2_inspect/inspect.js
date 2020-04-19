/**
 * 将任意对象转换为字符串的方法(常用于调试和错误输出)
 */

let util = require('util');

function Person() {
    this.name = 'Jasonkay';

    this.toString = function () {
        return this.name;
    };
}

let person = new Person();

console.log(person);
console.log(person.toString());
console.log(util.inspect(person));
console.log(util.inspect(person, true, 2, true));

// Output:
// Person { name: 'Jasonkay', toString: [Function] }
// Jasonkay
// Person { name: 'Jasonkay', toString: [Function] }
// Person {
//     name: 'Jasonkay',
//         toString: [Function] {
//         [length]: 0,
//             [name]: '',
//             [arguments]: null,
//             [caller]: null,
//             [prototype]: { [constructor]: [Circular] }
//     }
// }
