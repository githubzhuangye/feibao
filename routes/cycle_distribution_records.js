var express = require('express');
var Cycle_distribution_record =require('../models').Cycle_distribution_record;
var parser =require('multer')().single('photo');
var router = express.Router();

/*添加预约回收记录 */
router.post('/add',parser,function(req, res) {
  var cycle_distribution_record =req.body;
    new Cycle_distribution_record(cycle_distribution_record).save(function (err, cycle_distribution_record) {
          if (err) {
            res.status(500).json({msg: err});
          } else {
            res.json(cycle_distribution_record);
          }
    });
});


//查找所有已完成的周期配送记录
router.post('/find_deliver', function (req, res) {
    var job_number =req.body.job_number;
    Cycle_distribution_record.find({job_number:job_number,state:4},function(err,cycle_recycle_records){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(cycle_recycle_records);
        }
    });
});


module.exports = router;
