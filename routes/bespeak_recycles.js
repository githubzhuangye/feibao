var express = require('express');
var Bespeak_recycle =require('../models').Bespeak_recycle;
var parser =require('multer')().single('photo');
var uuid =require('uuid');
var router = express.Router();
var mime = require('mime');
var fs = require('fs');

/*���ԤԼ���� */
router.post('/add',parser,function(req, res) {
  var bespeak_recycle =req.body;
    new Bespeak_recycle(bespeak_recycle).save(function (err, bespeak_recycle) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(bespeak_recycle);
          }
    });
});

//�������з���
router.post('/find_by_user_id', function (req, res) {
    var user_id =req.body.user_id;
    Bespeak_recycle.find({user_id:user_id},function(err,bespeak_recycles){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(bespeak_recycles);
        }
    });
});
//ȡ��ԤԼ����
router.post('/cancel_bespeak_recycle', function (req, res) {
    var id =req.body.id;
    var user_id =req.body.user_id;
    Bespeak_recycle.update({_id:id},{$set:{state:2}},function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Bespeak_recycle.find({user_id:user_id},function(err,bespeak_recycles){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(bespeak_recycles);
                }
            });
        }
    });
});
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
