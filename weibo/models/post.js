var mongodb = require('./db');

// 微博用户博文: Post类
function Post(username, post, time) {
  this.username = username;
  this.post = post;
  this.time = time ? time : new Date();
}

// 原型链创建save函数, 向mongodb插入数据
Post.prototype.save = function(callback) {
  var post = {
    username: this.username,
    post: this.post,
    time: this.time
  };

  mongodb.open((err, db) => {
    if (err) {
      return callback(err);
    }
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.ensureIndex('username');
      collection.insert(post, {safe: true}, (err, post) => {
        mongodb.close();
        if (err) {
          //错误，返回 err 信息
          return callback(err);
        }
        callback(err, post);
      });
    });
  });
};

// 构造方法创建get函数, 从mongodb获取数据
Post.get = function(username, callback) {
  mongodb.open((err, db) => {
    if (err) return callback(err);
    db.collection('posts', (err, collection) => {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};
      if (username) {
        query.username = username;
      }
      collection.find(query)
        .sort({time: -1})
        .toArray((err, docs) => {
          mongodb.close();
          var posts = [];
          docs.forEach((doc, index) => {
            var post = new Post(doc.username, doc.post, doc.time);
            posts.push(post);
          });
          callback(err, posts);
        });
    })
  })
};

module.exports = Post;
