var express = require('express');
var Cycle_distribution =require('../models').Cycle_distribution;
var router = express.Router();

/*添加购物车 */
router.post('/add',function(req, res) {
    var cycle_distribution =req.body;
    new cycle_distribution(cycle_distribution).save(function (err, cycle_distribution) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(cycle_distribution);
          }
    });
});

//根据user_id查找购物车
//router.get('/findShopCartByUserId', function (req, res) {
//    Ware.find({},function(err,wares){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            res.json(wares);
//        }
//    });
//});
//根据user_id查找购物车
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
////查找所有上架的商品
//router.get('/findPut', function (req, res) {
//    Ware.find({state:1},function(err,wares){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            res.json(wares);
//        }
//    });
//});
////分类下架
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
////分类上架
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
////分类编辑
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
