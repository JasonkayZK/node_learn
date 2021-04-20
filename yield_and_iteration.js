// yield_and_iteration

function* getValue() {
    let list = [1, 2, 3, 4, 5];
    for (let i = 0; i < list.length; i++) {
        yield list[i];
    }
}
const gen = getValue();

// 自己调用 next 的方式
let t;
while (t = gen.next(), !t.done) {
    console.log(t.value);
}

// 采用 for of 的方式
for (let t of getValue()) {
    console.log(t);
}
