var mongoose =require('mongoose');
module.exports =mongoose.model('Order',new mongoose.Schema({
        date:String,
        wares:[],
        amount:Number,
        total_price:Number,
        contact_name:String,
        contact_phone:Number,
        contact_address:String,
        state:Number,
        pay_mode:Number,
        user_name:String,
        user_id:String
}));
