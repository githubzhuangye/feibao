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

//�����û�id�������ڻ���
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

//ȡ�����ڻ���
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
module.exports = router;
