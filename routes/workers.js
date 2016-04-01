var express = require('express');
var Worker =require('../models').Worker;
var crypto =require('crypto');//进行加密用
var router = express.Router();


//查找所有商品
router.get('/find', function (req, res) {
  Worker.find({type:0},function(err,workers){
    if (err) {
      res.status(500).json({msg: err});
    } else {
      res.json(workers);
    }
  });
});

/* 注册 */
router.post('/add', function(req, res) {
  var worker =req.body;
  //worker.password =encrypto(worker.password);
  new Worker(worker).save(function(err,worker){
    if(err){
      res.status(500).json({msg:err});
    }else{
      res.json(worker);
    }
  });
});

//登录
router.post('/login', function(req, res) {
  var worker =req.body;
  //encrypto()
  Worker.findOne({job_number:worker.job_number,password:worker.password,type:worker.type},function(err,worker){
    if(err){
      res.status(500).json({msg:err});
    }else{
      //console.log(worker);
      req.session.worker = worker;
      res.json(worker);
    }
  });
});

//校验用户是否登录
router.post('/is_login', function(req, res) {
  var worker =req.session.worker;
  if(worker){
    res.status(200).json(worker);
  }else{
    res.status(401).json({msg:'please login'});
  }
});

//md5加密密码
function encrypto(str){
  return crypto.createHash('md5').update(str).digest('hex');
}
module.exports = router;
