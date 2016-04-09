var express = require('express');
var Cycle_recycle =require('../models').Cycle_recycle;
var parser =require('multer')().single('photo');
var uuid =require('uuid');
var router = express.Router();
var mime = require('mime');
var fs = require('fs');

/*��ӷ�Ʒ���� */
router.post('/add',parser,function(req, res) {
  var cycle_recycle =req.body;
    new Cycle_recycle(cycle_recycle).save(function (err, cycle_recycle) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(cycle_recycle);
          }
    });
});
//�����û�id�������ڻ���
router.post('/find_by_user_id', function (req, res) {
    var user_id =req.body.user_id;
    Cycle_recycle.find({user_id:user_id},function(err,cycle_recycles){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(cycle_recycles);
        }
    });
});

//ȡ�����ڻ���
router.post('/cancel_cycle_recycle', function (req, res) {
    var id =req.body.id;
    var user_id =req.body.user_id;
    Cycle_recycle.update({_id:id},{$set:{state:2}},function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Cycle_recycle.find({user_id:user_id},function(err,cycle_recycles){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(cycle_recycles);
                }
            });
        }
    });
});

//��������δ��������ڻ���state==0
router.get('/find_all_unclaim', function (req, res) {
    Cycle_recycle.find({state:0},function(err,cycle_recycles){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(cycle_recycles);
        }
    });
});

//��ȡ���ڻ���
router.post('/claim', function (req, res) {
    var id =req.body.id;
    var last_cycle_date =req.body.last_cycle_date;//������ʱ��
    Cycle_recycle.update({_id:id},{$set:{state:1,last_cycle_date:last_cycle_date}},function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Cycle_recycle.find({state:0},function(err,cycle_recycles){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(cycle_recycles);
                }
            });
        }
    });
});

//4��֮���Զ���stateΪ1�ĸ�Ϊ0
setTimeout(function(){
    Cycle_recycle.update({state:{$ne:2}},{$set:{state:0}},function(err){
        //if (err) {
        //    res.status(500).json({msg: err});
        //}
    });
},60*60*24*4);

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
