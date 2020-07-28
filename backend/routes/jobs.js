var router=require('express').Router();
var Jobs=require('../models/Jobs.js'),
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

// Jobs({
//     ClientId:"10",
//     Id:"1",
//     JoiningDate:new Date(),
//     Designation:"Software Engineer",
//     Salary:"Rs. 11,00,000",
//     Location:"Bangalore",
//     Desc:"Required skills are blah blah blah"
// }).save((err,data)=>{
//     if(err) console.log(err);
//     else
//     console.log(data);
// })

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
    Id:req.body.id,
    JoiningDate:req.body.date,
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

module.exports=router;