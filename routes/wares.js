var express = require('express');
var Ware =require('../models').Ware;
var parser =require('multer')().single('photo');
var uuid =require('uuid');
var router = express.Router();
var mime = require('mime');
var fs = require('fs');

/*添加废品分类 */
router.post('/add',parser,function(req, res) {
  var ware =req.body;
  //截取base64编码之后的图片
  var photoSplits =ware.photo.split(',');
  var photoType = mime.extension(photoSplits[0].slice(photoSplits[0].indexOf(":") + 1, photoSplits[0].indexOf(";")));
  var photoName =uuid.v4() + '.' + photoType;
    ware.photo ='/upload/' + photoName;
  fs.writeFile('./public/upload/' + photoName, photoSplits[1], 'base64', function (err, result) {
    new Ware(ware).save(function (err, ware) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(ware);
          }
    });
  });
});

//查找所有商品
router.get('/find', function (req, res) {
    Ware.find({},function(err,wares){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(wares);
        }
    });
});
//根据id查找商品
router.post('/findById', function (req, res) {
    var id =req.body.id;
    Ware.findOne({_id:id},function(err,ware){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(ware);
        }
    });
});
//查找所有上架的商品
router.get('/findPut', function (req, res) {
    Ware.find({state:1},function(err,wares){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(wares);
        }
    });
});
//分类下架
router.post('/pull', function (req, res) {
    var id =req.body.id;
    Ware.update({_id:id},{$set:{state:0}},function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Ware.find({},function(err,wares){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(wares);
                }
            });
        }
    });
});
//分类上架
router.post('/put', function (req, res) {
    var id =req.body.id;
    Ware.update({_id:id},{$set:{state:1}},function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Ware.find({},function(err,wares){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(wares);
                }
            });
        }
    });
});

//分类编辑
router.post('/edit', function (req, res) {
    var id =req.body.id;
    Ware.findOne({_id:id},function(err,ware){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(ware);
        }
    });
});

//保存分类编辑
router.post('/save_edit', function (req, res) {
    var ware =req.body;
    var _id = ware._id; //需要取出主键_id
    delete ware._id;    //再将其删除
    Ware.update({_id:_id},ware,function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Ware.find({},function(err,wares){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(wares);
                }
            });
        }
    });
});
module.exports = router;
