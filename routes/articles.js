var express = require('express');
var Article =require('../models').Article;
var parser =require('multer')().single('photo');
var uuid =require('uuid');
var router = express.Router();
var mime = require('mime');
var fs = require('fs');

/*��ӷ�Ʒ���� */
router.post('/add',parser,function(req, res) {
  var article =req.body;
  //��ȡbase64����֮���ͼƬ
  var photoSplits =article.photo.split(',');
  var photoType = mime.extension(photoSplits[0].slice(photoSplits[0].indexOf(":") + 1, photoSplits[0].indexOf(";")));
  var photoName =uuid.v4() + '.' + photoType;
    article.photo ='/upload/' + photoName;
  fs.writeFile('./public/upload/' + photoName, photoSplits[1], 'base64', function (err, result) {
    new Article(article).save(function (err, article) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(article);
          }
    });
  });
});

//������������
router.get('/find', function (req, res) {
    Article.find({},function(err,articles){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(articles);
        }
    });
});
//�����¼�
router.post('/pull', function (req, res) {
    var id =req.body.id;
    Article.update({_id:id},{$set:{state:0}},function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Article.find({},function(err,articles){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(articles);
                }
            });
        }
    });
});
//�����ϼ�
router.post('/put', function (req, res) {
    var id =req.body.id;
    Article.update({_id:id},{$set:{state:1}},function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Article.find({},function(err,articles){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(articles);
                }
            });
        }
    });
});

//���±༭
router.post('/edit', function (req, res) {
    var id =req.body.id;
    Article.findOne({_id:id},function(err,article){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(article);
        }
    });
});
//��������id��������
router.post('/findById', function (req, res) {
    var id =req.body.id;
    Article.findOne({_id:id},function(err,article){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(article);
        }
    });
});
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
