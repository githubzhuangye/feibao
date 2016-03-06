var mongoose =require('mongoose');
module.exports =mongoose.model('Bespeak_recycle',new mongoose.Schema({
        date:String,
        time:String,
        sort_name:String,
        weight:Number,
        state:Number,
        user_name:String,
        user_phone:Number,
        user_address:String,
        user_id:String
}));
