// asyncReadFile.js

let fs = require('fs');
fs.readFile('file.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});

console.log('end.');

// Output:
// end.
// Contents of the file.
