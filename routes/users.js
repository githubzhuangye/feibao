var express = require('express');
var User =require('../models').User;
var crypto =require('crypto');//进行加密用
var router = express.Router();


/* 注册 */
router.post('/register', function(req, res) {
  var user =req.body;
  user.password =encrypto(user.password);
  user.balance =0;
  new User(user).save(function(err,user){
    if(err){
      res.status(500).json({msg:err});
    }else{
      res.json(user);
    }
  });
});
//登录
router.post('/login', function(req, res) {
  var user =req.body;
  User.findOne({name:user.name,password:encrypto(user.password)},function(err,user){
    if(err){
      res.status(500).json({msg:err});
    }else{
      req.session.user = user;
      res.json(user);
    }
  });
});

//校验用户是否登录
router.post('/is_login', function(req, res) {
  var user =req.session.user;
  if(user){
    res.status(200).json(user);
  }else{
    res.status(401).json({msg:'您未登陆'});
  }
});

//md5加密密码
function encrypto(str){
  return crypto.createHash('md5').update(str).digest('hex');
}
module.exports = router;
