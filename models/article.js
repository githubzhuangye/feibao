var mongoose =require('mongoose');
module.exports =mongoose.model('Article',new mongoose.Schema({
        name:String,
        summary:String,
        author:String,
        date:String,
        state:Number,
        photo:String,
        content:String
}));
