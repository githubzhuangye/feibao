var mongoose =require('mongoose');
module.exports =mongoose.model('Bespeak_recycle',new mongoose.Schema({
        date:String,
        time:String,
        sort_name:String,
        weight:Number,
        state:Number,
        contact_name:String,
        contact_phone:Number,
        contact_address:String,
        user_name:String,
        user_id:String
}));
