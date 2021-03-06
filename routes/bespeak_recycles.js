var express = require('express');
var Bespeak_recycle =require('../models').Bespeak_recycle;
var parser =require('multer')().single('photo');
var uuid =require('uuid');
var router = express.Router();
var mime = require('mime');
var fs = require('fs');

/*添加预约回收 */
router.post('/add',parser,function(req, res) {
  var bespeak_recycle =req.body;
    new Bespeak_recycle(bespeak_recycle).save(function (err, bespeak_recycle) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(bespeak_recycle);
          }
    });
});

//查找所有分类
router.post('/find_by_user_id', function (req, res) {
    var user_id =req.body.user_id;
    Bespeak_recycle.find({user_id:user_id},function(err,bespeak_recycles){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(bespeak_recycles);
        }
    });
});
//取消预约回收
router.post('/cancel_bespeak_recycle', function (req, res) {
    var id =req.body.id;
    var user_id =req.body.user_id;
    Bespeak_recycle.update({_id:id},{$set:{state:2}},function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Bespeak_recycle.find({user_id:user_id},function(err,bespeak_recycles){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(bespeak_recycles);
                }
            });
        }
    });
});
//查找未处理的预约回收
router.get('/find_unclaim', function (req, res) {
    var today =new Date();
    today =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    Bespeak_recycle.find({state:0,date:today},function(err,bespeak_recycles){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(bespeak_recycles);
        }
    });
});

//领取预约回收
router.post('/claim', function (req, res) {
    var id =req.body.id;
    Bespeak_recycle.update({_id:id},{$set:{state:1}},function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            var today =new Date();
            today =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            Bespeak_recycle.find({state:0,date:today},function(err,bespeak_recycles){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(bespeak_recycles);
                }
            });
        }
    });
});
//
////保存分类编辑
//router.post('/save_edit', function (req, res) {
//    var ware =req.body;
//    var _id = ware._id; //需要取出主键_id
//    delete ware._id;    //再将其删除
//    Ware.update({_id:_id},ware,function(err){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            Ware.find({},function(err,wares){
//                if (err) {
//                    res.status(500).json({msg: err});
//                } else {
//                    res.json(wares);
//                }
//            });
//        }
//    });
//});
module.exports = router;
