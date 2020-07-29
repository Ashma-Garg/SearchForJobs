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
    // Id:{
    //     required:true,
    //     type:Number
    // },
    Accepted:[
            {type:String}
    ]


});

module.exports=new mongoose.model('Candidate',CandidateSchema);