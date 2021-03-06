var express = require('express');
var Bespeak_recycle_record =require('../models').Bespeak_recycle_record;
var parser =require('multer')().single('photo');
var router = express.Router();

/*添加预约回收记录 */
router.post('/add',parser,function(req, res) {
  var bespeak_recycle_record =req.body;
    new Bespeak_recycle_record(bespeak_recycle_record).save(function (err, bespeak_recycle_record) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(bespeak_recycle_record);
          }
    });
});

//根据id查找预约回收记录
router.post('/find_by_id', function (req, res) {
    var id =req.body.id;
    Bespeak_recycle_record.findOne({_id:id},function(err,bespeak_recycle_record){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(bespeak_recycle_record);
        }
    });
});

//预约回收记录付款
router.post('/confirm_pay', function (req, res) {
    var bespeak_recycle_record =req.body;
    var _id = bespeak_recycle_record._id; //需要取出主键_id
    delete bespeak_recycle_record._id;    //再将其删除
    Bespeak_recycle_record.update({_id:_id},bespeak_recycle_record,function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Bespeak_recycle_record.find({job_number:bespeak_recycle_record.job_number,is_pay:0},function(err,bespeak_recycle_records){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(bespeak_recycle_records);
                }
            });
        }
    });
});
//根据工号查找未付款的的预约回收记录
router.post('/find_by_job_number', function (req, res) {
    var job_number =req.body.job_number;
    Bespeak_recycle_record.find({job_number:job_number,is_pay:0},function(err,bespeak_recycle_records){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(bespeak_recycle_records);
        }
    });
});

//查找所有已完成的预约回收记录
router.post('/find_claim_pay', function (req, res) {
    var job_number =req.body.job_number;
    Bespeak_recycle_record.find({job_number:job_number,is_pay:1,state:4},function(err,bespeak_recycle_records){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(bespeak_recycle_records);
        }
    });
});


////领取预约回收
//router.post('/claim', function (req, res) {
//    var id =req.body.id;
//    Bespeak_recycle.update({_id:id},{$set:{state:1}},function(err){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            var today =new Date();
//            today =today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();
//            Bespeak_recycle.find({state:0,date:today},function(err,bespeak_recycles){
//                if (err) {
//                    res.status(500).json({msg: err});
//                } else {
//                    res.json(bespeak_recycles);
//                }
//            });
//        }
//    });
//});
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
