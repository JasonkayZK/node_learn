var express = require('express');
var router = express.Router();
var session = require('express-session');
var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');
var monent = require('moment');

/* GET home page. */
router.get('/', function (req, res, next) {
  // 测试错误返回
  // throw new Error('An error for test purposes.');

  // 获取所有用户发布内容
  Post.get(null, function (err, posts) {
    var userPosts;
    posts.forEach(function (post, index) {
      post.time = monent(
        monent(post.time).format('YYYY-MM-DD hh:mm:ss')
      ).fromNow();
    });
    userPosts = posts;
    res.render('index', {
      title: 'Welcome to Express',
      user: req.session.user,
      msg: req.session.message,
      posts: userPosts
    });
  });
});

/* 用户页 */
router.get('u/:username', (req, res) => {
  var user = req.session.user;

  // 根据username获取用户的post
  Post.get(user.name, (err, posts) => {
    // 格式化日期
    posts.forEach((post, index) => {
      post.time = monent(monent(post.time).format('YYYY-MM-DD hh:mm:ss')).fromNow();
    });

    // 返回请求
    res.render('pages/user', {
      title: 'Welcome ' + user.name,
      user: user,
      msg: req.session.message,
      posts: posts
    });
  });
});

/* 用户发表文章 */
// 用户发表文章页面路由
router.get('/post', function (req, res) {
  var user = req.session.user;
  res.render('pages/post', {
    title: '发表文章',
    user: user,
    msg: req.session.message
  });
});
// router.post('/post', checkLogin);
// 用户发表文章表单提交路由
router.post('/post', (req, res) => {
  var user = req.session.user;
  var post = new Post(user.name, req.body.post);
  post.save(function (err) {
    if (err) {
      req.ression.message = '发表失败';
      res.redirect('/post');
    }
    req.session.message = '发表成功';
    res.redirect('u/' + user.name);
  });
});

/* 注册 */
router.get('/reg', (req, res) => {
  res.render('pages/reg', {
    title: '欢迎注册',
    msg: req.session.message
  });
});
router.post('/reg', (req, res) => {
  if (req.body.password !== req.body['re-password']) {
    req.session.messages = '两次输入密码不一致';
    return res.redirect('/reg');
  }

  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  var newUser = new User({
    name: req.body.name,
    password: password,
    email: req.body.email
  });

  User.get(newUser.name, (err, user) => {
    // 用户已存在
    if (user) {
      req.session.messages = 'Username already exists.';
      return res.redirect('/reg');
    }
    newUser.save(function (err) {
      if (err) {
        req.session.messages = err;
        return res.redirect('/reg');
      }
      req.session.user = newUser;
      req.session.messages = '注册成功';
      return res.redirect('/');
    });
  });
});


/* 登录 */
router.get('/login', function (req, res) {
  res.render('pages/reg', {title: '登录'});
});
router.post('/login', function (req, res) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  User.get(req.body.name, function (err, user) {
    if (!user) {
      req.session.messages = '用户不存在';
      res.end('用户不存在');
      return;
    }
    if (user.password !== password) {
      req.session.messages = '密码错误';
      res.end('密码错误');
      return;
    }
    req.session.user = user;
    req.session.messages = '登录成功';
    // Todo 判断路径，非首页则跳回首页
    return res.redirect('/');
  });
});

/* 登出 */
router.get('/logout', function (req, res) {
  req.session.user = null;
  req.session.mesage = '登出成功';
  res.redirect('/');
});


// 测试:
// router.get('/hello', (req, res, next) => {
//   res.send('The time is ' + new Date().toString());
// });
//
// router.all('/user/:username', (req, res, next) => {
//   console.log('all methods captured');
//   next();
// });
//
// router.get('/user/:username', (req, res) => {
//   res.send('user: ' + req.params.username);
// });

module.exports = router;
