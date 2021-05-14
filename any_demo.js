let p1 = Promise.resolve("p1成功");
let p2 = Promise.resolve("p2成功");
let p3 = Promise.reject("p3失败");
let p4 = Promise.reject("p4失败")

Promise.any([p1, p2]).then((res) => {
    console.log(res); // p1成功
}).catch(err => {
    console.log(err);
});

Promise.any([p1, p2, p3]).then((res) => {
    console.log(res); // p1成功
}).catch(err => {
    console.log(err);
});

Promise.any([p3, p4]).then((res) => {
    console.log(res);
}).catch(err => {
    console.log(err); // AggregateError: All promises were rejected
});
