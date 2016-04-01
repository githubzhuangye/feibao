var express = require('express');
var User =require('../models').User;
var crypto =require('crypto');//���м�����
var router = express.Router();


/* ע�� */
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
//��¼
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

//У���û��Ƿ��¼
router.post('/is_login', function(req, res) {
  var user =req.session.user;
  if(user){
    res.status(200).json(user);
  }else{
    res.status(401).json({msg:'��δ��¼'});
  }
});

//����
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
//�޸�����
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
//�޸��û���Ϣ
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
//md5��������
function encrypto(str){
  return crypto.createHash('md5').update(str).digest('hex');
}
module.exports = router;
