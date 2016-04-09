var express = require('express');
var Cycle_distribution =require('../models').Cycle_distribution;
var router = express.Router();

/*��ӹ��ﳵ */
router.post('/add',function(req, res) {
    var cycle_distribution =req.body;
    new Cycle_distribution(cycle_distribution).save(function (err, cycle_distribution) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(cycle_distribution);
          }
    });
});

//�����û�id������������
router.post('/find_by_user_id', function (req, res) {
    var user_id =req.body.user_id;
    Cycle_distribution.find({user_id:user_id},function(err,cycle_distributions){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(cycle_distributions);
        }
    });
});

//ȡ����������
router.post('/cancel_cycle_distribution', function (req, res) {
    var id =req.body.id;
    var user_id =req.body.user_id;
    Cycle_distribution.update({_id:id},{$set:{state:2}},function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Cycle_distribution.find({user_id:user_id},function(err,cycle_distributions){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(cycle_distributions);
                }
            });
        }
    });
});

//��������δ�������������state==0
router.get('/find_all_undeliver', function (req, res) {
    Cycle_distribution.find({state:{$ne:2}},function(err,cycle_distributions){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(cycle_distributions);
        }
    });
});

//������������
router.post('/deliver', function (req, res) {
    var id =req.body.id;
    var last_distribution_date =req.body.last_distribution_date;
    Cycle_distribution.update({_id:id},{$set:{state:1,last_distribution_date:last_distribution_date}},function(err){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            Cycle_distribution.find({state:{$ne:2}},function(err,cycle_distributions){
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(cycle_distributions);
                }
            });
        }
    });
});


//4��֮���Զ���stateΪ1�ĸ�Ϊ0
setTimeout(function(){
    Cycle_distribution.update({state:1},{$set:{state:0}},function(err){});
},60*60*24*4);
module.exports = router;
