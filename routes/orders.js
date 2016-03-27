var express = require('express');
var Order =require('../models').Order;
var router = express.Router();

/*��Ӷ��� */
router.post('/add',function(req, res) {
    var order =req.body;
    order.state =1;
    new Order(order).save(function (err, order) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(order);
          }
    });
});

//����user_id���Ҷ���
router.get('/findByUserId', function (req, res) {
    Order.find({},function(err,orders){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(orders);
        }
    });
});
//����user_id���ҹ��ﳵ
//router.post('/findByUserId', function (req, res) {
//    var id =req.body.id;
//    Shop_cart.findOne({user_id:id},function(err,shop_cart){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            res.json(shop_cart);
//        }
//    });
//});
////���������ϼܵ���Ʒ
//router.get('/findPut', function (req, res) {
//    Ware.find({state:1},function(err,wares){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            res.json(wares);
//        }
//    });
//});
////�����¼�
//router.post('/pull', function (req, res) {
//    var id =req.body.id;
//    Ware.update({_id:id},{$set:{state:0}},function(err){
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
////�����ϼ�
//router.post('/put', function (req, res) {
//    var id =req.body.id;
//    Ware.update({_id:id},{$set:{state:1}},function(err){
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
//
////����༭
//router.post('/edit', function (req, res) {
//    var id =req.body.id;
//    Ware.findOne({_id:id},function(err,ware){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            res.json(ware);
//        }
//    });
//});
//
////�������༭
//router.post('/save_edit', function (req, res) {
//    var ware =req.body;
//    var _id = ware._id; //��Ҫȡ������_id
//    delete ware._id;    //�ٽ���ɾ��
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
