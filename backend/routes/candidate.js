var router=require('express').Router(),
bcrypt=require('bcryptjs');
var Candidate=require('../models/Candidate');
const Client = require('../models/Client');
var Jobs=require('../models/Jobs')
// const { default: Jobs } = require('../../src/components/Jobs');


// Candidate.remove({},function(err){
//     console.log("Dleete");
// })
router.get('/',function(req,res){
    Candidate.find({},function(err,data){
        res.json(data);
    })
})
router.get('/data/:candid',function(req,res){
    Candidate.findById(req.params.candid,function(err,data){
        res.json(data);
    })
})
router.post('/',function(req,res){

    var err;
    if(req.body.password!=req.body.cpassword){
        err="Password Doesn't Match";
        res.json({data:err,status:400});
    }
    if(typeof err=='undefined'){
        Candidate.findOne({Email:req.body.email},function(error,data){
            if(error) console.log(error);
            if(data){
                err="Email Already Exists...";
                res.json({data:err,status:400});
            }
            else{
                bcrypt.genSalt(10,(err,salt)=>{
                    if(err) console.log(err);
                    bcrypt.hash(req.body.password,salt,(err,hash)=>{
                        if(err) console.log(err);
                        req.body.password=hash;
                        Candidate({
                            Name:req.body.name,
                            Email:req.body.email,
                            Password:req.body.password,
                            // Id:req.body.id
                        }).save((error,data)=>{
                            if(error) console.log(error);
                            else res.json(data);
                        })

                    })
                })
            }
        })
    }
    
})
router.post('/login',function(req,res){
    var err;
    Candidate.findOne({Email:req.body.email},function(error,data){
        if(error) console.log(error);
        if(!data){
            err="Email is not registered";
            res.json({err:err,status:400});
        }
        if(typeof err=='undefined'){
            bcrypt.compare(req.body.password,data.Password,(error,match)=>{
                if(err){
                    console.log(error);
                }
                if(!match){
                    err="Password Doesn't Match";
                    res.json({err:err,status:400});
                }
                if(match){
                    err="Successfully Login";
                    // console.log(data._id);
                    res.json({err:err,status:200,id:data._id});
                }
            })
        }
    })
});

router.post('/addAppliedJob/:candid',function(req,res){
    var candId=req.params.candid;
    // Candidate.findByIdAndUpdate(candId,{$pullAll:{Accepted:["899"]}},function(err,data){
    //     if(err) console.log(err);
    //     else
    //     res.send(data);
    // })
    var length;
    Candidate.findById(candId,function(err,data){
        length=data.Accepted.length;
    })

    setTimeout(()=>{
        console.log(length);
        if(length<5){
            Candidate.findByIdAndUpdate(candId,{$push:{Accepted:req.body.JobId}},function(err,data){
                    res.json(data);
            })
            }
            else{
                res.json({err:"You Can Only Apply For maximum 5 jobs",status:400});
            }
    },1000);    

})
router.post('/deleteapplied/:id',function(req,res){
    console.log(req.body.jobId);
    Jobs.findByIdAndUpdate(req.body.jobId,{$pullAll:{CandidateId:[req.params.id]}},function(err,data){
        if(err) console.log(err);
    })
    Candidate.findByIdAndUpdate(req.params.id,{$pullAll:{Accepted:[req.body.jobId]}},function(err,data){
            res.json(data);
    })
    
})

module.exports=router;







