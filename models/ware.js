var mongoose =require('mongoose');
module.exports =mongoose.model('Ware',new mongoose.Schema({
        name:String,
        original_price:Number,
        present_price:Number,
        introduce:String,
        sort:Number,
        state:Number,
        photo:String
}));
