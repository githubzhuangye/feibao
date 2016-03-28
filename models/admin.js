var mongoose =require('mongoose');
module.exports =mongoose.model('Admin',new mongoose.Schema({
        name:String,
        password:String,
        type:Number
}));
