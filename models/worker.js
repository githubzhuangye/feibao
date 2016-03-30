var mongoose =require('mongoose');
module.exports =mongoose.model('Worker',new mongoose.Schema({
        name:String,
        password:String,
        job_number:String,
        type:Number
}));
