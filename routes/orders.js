var express = require('express');
var Order =require('../models').Order;
var router = express.Router();

/*添加订单 */
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

//根据user_id查找订单
router.post('/find_by_user_id', function (req, res) {
    var user_id =req.body.user_id;
    Order.find({user_id:user_id},function(err,orders){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(orders);
        }
    });
});

//取消未发货订单
router.post('/cancel_order', function (req, res) {
    var id =req.body.id;
    var user_id =req.body.user_id;
    Order.update({_id:id},{$set:{state:2}},function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Order.find({user_id:user_id},function(err,orders){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(orders);
                }
            });
        }
    });
});

//查找未发货订单
router.get('/find_undeliver', function (req, res) {
    Order.find({state:1},function(err,orders){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(orders);
        }
    });
});

//订单发货
router.post('/deliver', function (req, res) {
    var id =req.body.id;
    Order.update({_id:id},{$set:{state:4}},function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Order.find({state:1},function(err,orders){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(orders);
                }
            });
        }
    });
});
module.exports = router;
