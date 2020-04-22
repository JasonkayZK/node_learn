var mongodb = require('./db');

// 用户模型类: User
function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
}

// 数据库insert
User.prototype.save = function (callback) {
  var user = {
    name: this.name,
    password: this.password,
    email: this.email
  };

  mongodb.open((err, db) => {
    if (err) return callback(err);
    db.collection('users', (err, collection) => {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.ensureIndex('name', {unique: true});
      collection.insert(user, {safe: true}, (err, user) => {
        mongodb.close();
        if (err) return callback(err);
        callback(err, user);
      });
    });
  });
};

// 数据库select
User.get = function (name, callback) {
  mongodb.open(function (err, db) {
    if (err) return callback(err);
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.findOne({name: name}, function (err, doc) {
        mongodb.close();
        if (doc) {
          var user = new User(doc);
          callback(err, user);
        } else {
          callback(err, null);
        }
      });
    });
  });
};

module.exports = User;
