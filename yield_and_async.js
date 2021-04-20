// yield_and_async.js

function* main() {
    yield console.log("Jasonkay准备");
    yield* drink();
    yield console.log("Jasonkay喝不动了");
}

function* drink() {
    yield console.log("Jasonkay吨吨吨");

    yield new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('过了3s');
            resolve();
        }, 3000);
    });
}

function run(gen) { // 类似 co
    const t = gen.next();
    const {value, done} = t;
    if (done) {
        console.log('End');
        return;
    }

    if (value instanceof Promise) {
        value.then((e) => run(gen))
    } else {
        run(gen);
    }
}

const gen = main();
run(gen);
