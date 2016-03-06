var mongoose =require('mongoose');
module.exports =mongoose.model('Cycle_recycle',new mongoose.Schema({
        begin_date:String,
        time:String,
        interval:String,
        sort_name:String,
        weight:Number,
        state:Number,
        user_name:String,
        user_phone:Number,
        user_address:String,
        user_id:String
}));
