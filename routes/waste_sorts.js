var express = require('express');
var Waste_sort =require('../models').Waste_sort;
var parser =require('multer')().single('photo');
var uuid =require('uuid');
var router = express.Router();
var mime = require('mime');
var fs = require('fs');

/*��ӷ�Ʒ���� */
router.post('/add',parser,function(req, res) {
  var waste_sort =req.body;
  //��ȡbase64����֮���ͼƬ
  var photoSplits =waste_sort.photo.split(',');
  var photoType = mime.extension(photoSplits[0].slice(photoSplits[0].indexOf(":") + 1, photoSplits[0].indexOf(";")));
  var photoName =uuid.v4() + '.' + photoType;
  waste_sort.photo ='/upload/' + photoName;
  fs.writeFile('./public/upload/' + photoName, photoSplits[1], 'base64', function (err, result) {
    new Waste_sort(waste_sort).save(function (err, waste_sort) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(waste_sort);
          }
    });
  });
});
//�������з���
router.get('/find', function (req, res) {
    Waste_sort.find({},function(err,waste_sorts){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(waste_sorts);
        }
    });
});
//�����¼�
router.post('/pull', function (req, res) {
    var id =req.body.id;
    Waste_sort.update({_id:id},{$set:{state:0}},function(err,waste_sort){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Waste_sort.find({},function(err,waste_sorts){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(waste_sorts);
                }
            });
        }
    });
});
//�����ϼ�
router.post('/put', function (req, res) {
    var id =req.body.id;
    Waste_sort.update({_id:id},{$set:{state:1}},function(err,waste_sort){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Waste_sort.find({},function(err,waste_sorts){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(waste_sorts);
                }
            });
        }
    });
});

module.exports = router;
