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

//ȡ��δ��������
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

//����δ��������
router.get('/find_undeliver', function (req, res) {
    Order.find({state:1},function(err,orders){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(orders);
        }
    });
});

//��������
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
