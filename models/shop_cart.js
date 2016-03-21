var mongoose =require('mongoose');
module.exports =mongoose.model('Shop_cart',new mongoose.Schema({
        date:String,
        wares:[],
        state:Number,
        user_name:String,
        user_phone:Number,
        user_address:String,
        user_id:String
}));
