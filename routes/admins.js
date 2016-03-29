var express = require('express');
var Admin =require('../models').Admin;
var crypto =require('crypto');//���м�����
var router = express.Router();

//��¼
router.post('/login', function(req, res) {
  var admin =req.body;
  Admin.findOne({name:admin.name,password:encrypto(admin.password),type:admin.type},function(err,admin){
    if(err){
      res.status(500).json({msg:err});
    }else{
      req.session.admin = admin;
      //console.log(req.session.admin);
      res.json(admin);
    }
  });
});

//У���û��Ƿ��¼
router.post('/is_login', function(req, res) {
  var admin =req.session.admin;
  if(admin){
    console.log(admin);
    res.status(200).json(admin);
  }else{
    console.log('none');
    res.status(401).json({msg:'please login'});
  }
});

//md5��������
function encrypto(str){
  return crypto.createHash('md5').update(str).digest('hex');
}
module.exports = router;
