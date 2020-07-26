var mongoose=require('mongoose');

var CandidateSchema=mongoose.Schema({
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
    Id:{
        type:Number
    },
    Accepted:[{
        id:{
            type:Number
        }
    }]


});

module.exports=new mongoose.model('Candidate',CandidateSchema);