var mongoose =require('mongoose');
module.exports =mongoose.model('Waste_sort',new mongoose.Schema({
        name:String,
        lowest_price:Number,
        highest_price:Number,
        include:String,
        use_for:String,
        state:Number,
        photo:String
}));
