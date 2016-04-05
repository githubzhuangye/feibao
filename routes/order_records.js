var express = require('express');
var Order_record =require('../models').Order_record;
var parser =require('multer')().single('photo');
var router = express.Router();

/*���ԤԼ���ռ�¼ */
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

//������������ɷ����Ķ�����¼
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

////���ݹ��Ų���δ����ĵ�ԤԼ���ռ�¼
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
////����id����ԤԼ���ռ�¼
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
////���ڻ��ռ�¼����
//router.post('/confirm_pay', function (req, res) {
//    var cycle_recycle_record =req.body;
//    var _id = cycle_recycle_record._id; //��Ҫȡ������_id
//    delete cycle_recycle_record._id;    //�ٽ���ɾ��
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
