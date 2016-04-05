var express = require('express');
var Order_record =require('../models').Order_record;
var parser =require('multer')().single('photo');
var router = express.Router();

/*添加预约回收记录 */
router.post('/add',parser,function(req, res) {
  var order_record =req.body;
    new Order_record(order_record).save(function (err, order_record) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(order_record);
          }
    });
});

//查找所有已完成发货的订单记录
router.post('/find_deliver', function (req, res) {
    var job_number =req.body.job_number;
    Order_record.find({job_number:job_number,state:4},function(err,order_records){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(order_records);
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


module.exports = router;
