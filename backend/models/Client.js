
var mongoose=require('mongoose');
// var Jobs=require('./Jobs.js');

var ClientSchema=mongoose.Schema({
    Name:{
        required:true,
        type:String
    },
    Email:{
        required:true,
        type:String
    },
    Password:{
        required:true,
        type:String
    },
    Company:{
        required:true,
        type:String
    },
    Id:{
        required:true,
        type:Number
    }

});

module.exports=new mongoose.model('Client',ClientSchema);