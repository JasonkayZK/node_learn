/**
 * read函数是POSIX中read函数的封装, 相比fs.readFile提供了更底层的接口;
 *
 * read函数从指定的文件描述符中读取数据并写入buffer指向的缓冲区对象中;
 *
 * 参数:
 * 1.fd: 文件描述符;
 * 2.buffer: 读取缓冲区;
 * 3.offset: buffer写入偏移量;
 * 4.length: 从文件中读取的字节数;
 * 5.position: 文件读取起始位置, 若为null则从当前文件指针的位置读取;
 * 6.[callback(err, bytesRead, buffer)]: 回调函数, 传递读取的字节数bytesRead和缓冲区对象buffer;
 *
 * 注:
 *   一般不要使用这种方法读取文件: 要求手动管理缓冲区和文件指针
 *
 *   (尤其是文件大小未知时)
 *
 */
let fs = require('fs');

fs.open('content.txt', 'r', function (err, fd) {
  if (err) {
    console.error(err);
    return;
  }

  // 下面的分配方法已经过时, 使用Buffer.alloc(8)替代;
  // let buf = new Buffer(8);
  let buf = Buffer.alloc(8);
  fs.read(fd, buf, 0, 8, null, function (err, bytesRead, buffer) {
    if (err) {
      console.error(err);
      return;
    }

    console.log('bytesRead: ' + bytesRead);
    console.log(buffer);
  })
});

// Output:
// bytesRead: 8
// <Buffer 54 65 78 74 20 e6 96 87>
