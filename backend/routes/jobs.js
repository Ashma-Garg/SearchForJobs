const { json } = require('body-parser');
const { route } = require('./client.js');

var router=require('express').Router();
var Jobs=require('../models/Jobs.js'),
Candidate=require('../models/Candidate.js'),
bcrypt=require('bcryptjs'),
session=require('express-session'),
passport=require('passport'),
LocalStrategy=require('passport-local').Strategy,
cookieParser=require('cookie-parser');

router.use(cookieParser('secret'));
router.use(session({
    secret: 'secret',
    maxAge: 3600000,  // user can be logged in for 2 week (cookies will be preserved for 2 week)
    resave: true,
    saveUninitialized: true,
}));
router.use(passport.initialize());
router.use(passport.session());

// Jobs.remove({},function(err){
//     if(err) console.log(err);
// })

router.get('/',function(req,res){
    Jobs.find({},function(err,data){
        if(err) console.log(err);
        res.json(data);
    })
})
router.get('/data/:id',function(req,res){
    Jobs.findById(req.params.id,function(err,data){
        res.json(data);
    })
})
router.post('/addAppliedJob/:candid',function(req,res){
    var length;
    Candidate.findById(req.params.candid,function(err,data){
        length=data.Accepted.length;
    })

    setTimeout(()=>{
        // console.log(length);
        if(length<5){
            Jobs.findByIdAndUpdate(req.body.JobId,{$push:{CandidateId:req.params.candid}},function(err,data){
                if(err) console.log(err);
                res.json(data);
            })
            }
            else{
                res.json({err:"You Can Only Apply For maximum 5 jobs",status:400});
            }
    },1000); 

    // Jobs.findByIdAndUpdate(req.body.JobId,{$pullAll:{CandidateId:[req.params.candid]}},function(err,data){
    //     if(err) console.log(err);
    //     res.json(data);
    // })
})
router.get('/appliedList/:candid',function(req,res){
    Jobs.find({CandidateId:{$elemMatch:{$eq:req.params.candid}}},function(err,data){
        if(err) console.log(err);
        else res.json(data);
    })
})
router.get('/:id',function(req,res){
    var jobId=req.params.id;
    Jobs.find({ClientId:jobId},function(err,data){
        if(err) console.log(err);
        if(data){
            res.json(data);
        }
    })
})
router.post('/add',function(req,res){
    Jobs({
    ClientId:req.body.clientid,
    // Id:req.body.jobid,
    JoiningDate:req.body.date,
    Company:req.body.company,
    Designation:req.body.desg,
    Salary:req.body.salary,
    Location:req.body.location,
    Desc:req.body.desc
}).save((err,data)=>{
    if(err) console.log(err);
    else
    res.json(data);
})
})
router.post('/edit/:id',function(req,res){

    Jobs.findByIdAndUpdate(req.params.id,{$set: 
        {
            JoiningDate:req.body.date,
            Company:req.body.company,
            Designation:req.body.desg,
            Salary:req.body.salary,
            Location:req.body.location,
            Desc:req.body.desc
        }
        },function(err,data){
            if(err) console.log(err);
            else res.json(data);
        })
})
// ,{$pullAll:{Accepted:[req.params.id]}}
router.get('/delete/:id',function(req,res){
    Jobs.findByIdAndDelete(req.params.id,function(err){
        console.log("Job Deleted");
    })

    Candidate.updateMany({Accepted:{$elemMatch:{$eq:req.params.id}}},{$pullAll:{Accepted:[req.params.id]}},function(err,data){
            res.json(data);
    })

})

module.exports=router;