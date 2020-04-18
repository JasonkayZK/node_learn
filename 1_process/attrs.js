console.log(process.platform);

console.log(process.pid);

console.log(process.execPath);

console.log(process.memoryUsage());

// Output:
// linux
// 17063
// /opt/node-v12.14.1-linux-x64/bin/node
// {
//     rss: 30367744,
//         heapTotal: 4472832,
//     heapUsed: 2383008,
//     external: 801188
// }
