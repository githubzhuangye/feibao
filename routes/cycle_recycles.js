var express = require('express');
var Cycle_recycle =require('../models').Cycle_recycle;
var parser =require('multer')().single('photo');
var uuid =require('uuid');
var router = express.Router();
var mime = require('mime');
var fs = require('fs');

/*添加废品分类 */
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
//根据用户id查找周期回收
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

//取消周期回收
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

//查找所有未处理的周期回收state==0
router.get('/find_all_unclaim', function (req, res) {
    Cycle_recycle.find({state:0},function(err,cycle_recycles){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(cycle_recycles);
        }
    });
});

//领取周期回收
router.post('/claim', function (req, res) {
    var id =req.body.id;
    var last_cycle_date =req.body.last_cycle_date;//最后更新时间
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

//4天之后自动将state为1的改为0
setTimeout(function(){
    Cycle_recycle.update({state:{$ne:2}},{$set:{state:0}},function(err){
        //if (err) {
        //    res.status(500).json({msg: err});
        //}
    });
},60*60*24*4);

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
