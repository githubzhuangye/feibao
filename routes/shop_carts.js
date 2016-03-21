var express = require('express');
var Shop_cart =require('../models').Shop_cart;
var parser =require('multer')().single('photo');
var router = express.Router();
var fs = require('fs');

/*��ӹ��ﳵ */
router.post('/add',parser,function(req, res) {
    var shop_cart =req.body;
    new Shop_cart(shop_cart).save(function (err, shop_cart) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(shop_cart);
          }
    });
});

//����user_id���ҹ��ﳵ
//router.get('/findShopCartByUserId', function (req, res) {
//    Ware.find({},function(err,wares){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            res.json(wares);
//        }
//    });
//});
//����user_id���ҹ��ﳵ
router.post('/findByUserId', function (req, res) {
    var id =req.body.id;
    Shop_cart.findOne({user_id:id},function(err,shop_cart){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(shop_cart);
        }
    });
});
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
