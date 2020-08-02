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
    Accepted:[
            {type:String}
    ]


});

module.exports=new mongoose.model('Candidate',CandidateSchema);