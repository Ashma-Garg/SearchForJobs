var mongoose=require('mongoose');

var JobsSchema=mongoose.Schema({
    ClientId:{
        type:Number,
        required:true
    },
    Id:{
        required:true,
        type:Number
    },
    JoiningDate:{
        required:true,
        type:Date

    },
    Designation:{
        required:true,
        type:String

    },
    Salary:{
        required:true,
        type:String

    },
    Location:{
        required:true,
        type:String

    },
    Desc:{
        required:true,
        type:String

    },


});

module.exports=new mongoose.model("Jobs",JobsSchema);