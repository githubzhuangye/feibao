var mongoose =require('mongoose');
module.exports =mongoose.model('Cycle_distribution',new mongoose.Schema({
        begin_date:String,
        interval:String,
        wares:[],
        amount:Number,
        total_price:Number,
        state:Number,
        is_enabled:Number,
        end_date:String,
        pay_mode:Number,
        contact_name:String,
        contact_phone:Number,
        contact_address:String,
        user_name:String,
        user_id:String
}));
