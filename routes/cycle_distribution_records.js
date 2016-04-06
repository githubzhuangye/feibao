var express = require('express');
var Cycle_distribution_record =require('../models').Cycle_distribution_record;
var parser =require('multer')().single('photo');
var router = express.Router();

/*添加预约回收记录 */
router.post('/add',parser,function(req, res) {
  var cycle_distribution_record =req.body;
    new Cycle_distribution_record(cycle_distribution_record).save(function (err, cycle_distribution_record) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(cycle_distribution_record);
          }
    });
});

////根据工号查找未付款的的预约回收记录
//router.post('/find_by_job_number_unpay', function (req, res) {
//    var job_number =req.body.job_number;
//    Cycle_recycle_record.find({job_number:job_number,is_pay:0},function(err,cycle_recycle_records){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            res.json(cycle_recycle_records);
//        }
//    });
//});
//
//
////根据id查找预约回收记录
//router.post('/find_by_id', function (req, res) {
//    var id =req.body.id;
//    Cycle_recycle_record.findOne({_id:id},function(err,cycle_recycle_record){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            res.json(cycle_recycle_record);
//        }
//    });
//});
//
////周期回收记录付款
//router.post('/confirm_pay', function (req, res) {
//    var cycle_recycle_record =req.body;
//    var _id = cycle_recycle_record._id; //需要取出主键_id
//    delete cycle_recycle_record._id;    //再将其删除
//    Cycle_recycle_record.update({_id:_id},cycle_recycle_record,function(err){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            Cycle_recycle_record.find({job_number:cycle_recycle_record.job_number,is_pay:0},function(err,cycle_recycle_records){
//                if (err) {
//                    res.status(500).json({msg: err});
//                } else {
//                    res.json(cycle_recycle_records);
//                }
//            });
//        }
//    });
//});
//
////查找所有已完成的周期回收记录
//router.post('/find_claim_pay', function (req, res) {
//    var job_number =req.body.job_number;
//    Cycle_recycle_record.find({job_number:job_number,is_pay:1,state:4},function(err,cycle_recycle_records){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            res.json(cycle_recycle_records);
//        }
//    });
//});


module.exports = router;
