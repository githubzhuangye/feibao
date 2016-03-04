var express = require('express');
var Ware =require('../models').Ware;
var parser =require('multer')().single('photo');
var uuid =require('uuid');
var router = express.Router();
var mime = require('mime');
var fs = require('fs');

/*��ӷ�Ʒ���� */
router.post('/add',parser,function(req, res) {
  var ware =req.body;
  //��ȡbase64����֮���ͼƬ
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

//�������з���
router.get('/find', function (req, res) {
    Ware.find({},function(err,wares){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(wares);
        }
    });
});
////�����¼�
//router.post('/pull', function (req, res) {
//    var id =req.body.id;
//    Waste_sort.update({_id:id},{$set:{state:0}},function(err){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            Waste_sort.find({},function(err,waste_sorts){
//                if (err) {
//                    res.status(500).json({msg: err});
//                } else {
//                    res.json(waste_sorts);
//                }
//            });
//        }
//    });
//});
////�����ϼ�
//router.post('/put', function (req, res) {
//    var id =req.body.id;
//    Waste_sort.update({_id:id},{$set:{state:1}},function(err){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            Waste_sort.find({},function(err,waste_sorts){
//                if (err) {
//                    res.status(500).json({msg: err});
//                } else {
//                    res.json(waste_sorts);
//                }
//            });
//        }
//    });
//});
//
////����༭
//router.post('/edit', function (req, res) {
//    var id =req.body.id;
//    Waste_sort.findOne({_id:id},function(err,waste_sort){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            res.json(waste_sort);
//        }
//    });
//});
//
////�������༭
//router.post('/save_edit', function (req, res) {
//    var waste_sort =req.body;
//    var _id = waste_sort._id; //��Ҫȡ������_id
//    delete waste_sort._id;    //�ٽ���ɾ��
//    Waste_sort.update({_id:_id},waste_sort,function(err){
//        if (err) {
//            res.status(500).json({msg: err});
//        } else {
//            Waste_sort.find({},function(err,waste_sorts){
//                if (err) {
//                    res.status(500).json({msg: err});
//                } else {
//                    res.json(waste_sorts);
//                }
//            });
//        }
//    });
//});
module.exports = router;
