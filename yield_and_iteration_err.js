// yield_and_iteration_err

function* getValue() {
    let list = [1, 2, 3, 4, 5];
    for (let i = 0; i < list.length; i++) {
        yield list[i];
    }
}

// 没问题，generator 都相互独立
const gen1 = getValue();
let t1;
while (t1 = gen1.next(), !t1.done) {
    for (d of getValue()) {
        console.log(d);
    }
    console.log(t1.value);
}

console.log();

// 有问题
const gen2 = getValue();
let t2;
while (t2 = gen2.next(), !t2.done) {
    for (d of gen2) { // ⚠️这里用了同一个 gen
        console.log(d);
    }
    console.log(t2.value);
}
