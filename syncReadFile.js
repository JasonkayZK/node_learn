// syncReadFile.js

let fs = require('fs');
let data = fs.readFileSync('file.txt', 'utf-8');
console.log(data);
console.log('end.');

// Output:
// Contents of the file.
// end.
