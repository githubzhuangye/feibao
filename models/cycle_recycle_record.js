var mongoose =require('mongoose');
module.exports =mongoose.model('Cycle_recycle_record',new mongoose.Schema({
        begin_date:String,
        time:String,
        interval:Number,
        last_cycle_date:String,
        sort_name:String,
        weight:Number,
        state:Number,
        contact_name:String,
        contact_phone:Number,
        contact_address:String,
        user_name:String,
        user_id:String,
        job_number:String,
        worker_id:String,
        pay_mode:Number,
        pay_number:Number,
        is_pay:Number
}));
