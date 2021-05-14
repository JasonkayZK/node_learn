let p1 = Promise.resolve("p1成功");
let p2 = Promise.resolve("p2成功");
let p3 = Promise.reject("p3失败");

Promise.all([p1, p2]).then((res) => {
    console.log(res); // [ 'p1成功', 'p2成功' ]
}).catch(err => {
    console.log(err);
});

Promise.all([p1, p2, p3]).then((res) => {
    console.log(res);
}).catch(err => {
    console.log(err); // p3失败
});
