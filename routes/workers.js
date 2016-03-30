var express = require('express');
var Worker =require('../models').Worker;
var crypto =require('crypto');//���м�����
var router = express.Router();

/* ע�� */
router.post('/add', function(req, res) {
  var worker =req.body;
  console.log(worker);
  worker.password =encrypto(worker.password);
  new Worker(worker).save(function(err,worker){
    if(err){
      res.status(500).json({msg:err});
    }else{
      console.log(12345+',,,,,,,,,'+worker);
      res.json(worker);
    }
  });
});

//��¼
router.post('/login', function(req, res) {
  var worker =req.body;
  Worker.findOne({job_number:worker.job_number,password:encrypto(worker.password),type:worker.type},function(err,worker){
    if(err){
      res.status(500).json({msg:err});
    }else{
      req.session.worker = worker;
      res.json(worker);
    }
  });
});

//У���û��Ƿ��¼
router.post('/is_login', function(req, res) {
  var admin =req.session.admin;
  if(admin){
    res.status(200).json(admin);
  }else{
    res.status(401).json({msg:'please login'});
  }
});

//md5��������
function encrypto(str){
  return crypto.createHash('md5').update(str).digest('hex');
}
module.exports = router;