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
    res.status(401).json({msg:'您未登录'});
  }
});

//付款
router.post('/pay', function(req, res) {
  var user_id =req.body.user_id;
  var price =-req.body.price;
  User.update({_id:user_id},{$inc:{balance:price}}, function(err){
    if (err) {
      console.log(err);
      res.status(500).json({msg: err});
    } else {
      User.findOne({_id:user_id},function(err,user){
        if (err) {
          res.status(500).json({msg: err});
        } else {
          res.json(user);
        }
      });
    }
  })
});
//修改密码
router.post('/change_password', function(req, res) {
  var user_id =req.body.user_id;
  var user =-req.body.user;
  User.update({_id:user_id},{$set:{password:user.new_password}}, function(err){
    if (err) {
      res.status(500).json({msg: err});
    } else {
      User.findOne({_id:user_id},function(err,user){
        if (err) {
          res.status(500).json({msg: err});
        } else {
          res.json(user);
        }
      });
    }
  })
});
//修改用户信息
router.post('/change_information', function(req, res) {
  var user_id =req.body.user_id;
  var user_phone =req.body.user_phone;
  var user_address =req.body.user_address;
  console.log(user_id+',,,'+user_phone+',,,'+user_address);
  User.update({_id:user_id},{$set:{phone:user_phone,address:user_address}}, function(err){
    if (err) {
      res.status(500).json({msg: err});
    } else {
      User.findOne({_id:user_id},function(err,user){
        if (err) {
          res.status(500).json({msg: err});
        } else {
          res.json(user);
        }
      });
    }
  })
});
//md5加密密码
function encrypto(str){
  return crypto.createHash('md5').update(str).digest('hex');
}
module.exports = router;
