var router=require('express').Router();
var Client=require('../models/Client.js'),
bcrypt=require('bcryptjs');

router.get('/',function(req,res){
    Client.find({},function(err,data){
        if(!err){
            console.log(data);
            res.json(data);
        }
    });
});
router.post('/add',function(req,res){
    // console.log("Port 2040 pr ye hai... " + req.body);
    // res.send(req.body);
    var password=req.body.password;
    var err;
    if(req.body.cpassword!=req.body.password){
        err="Password Doesn't match!"
        res.json(err);
    }
    if(typeof err=='undefined'){
        Client.findOne({Email:req.body.email},function(error,data){
            if(error) console.log(error);
            if(data){
                err="Email is already registed";
                res.json(err);
            }
            else{
                bcrypt.genSalt(10, (error,salt)=>{
                    if(error) console.log(error);
                    bcrypt.hash(password,salt, (error,hash)=>{
                        if(error) console.log(error);
                        password=hash;
                        Client({
                            Name:req.body.name,
                            Email:req.body.email,
                            Password:req.body.password,
                            Company:req.body.company,
                            Id:req.body.id
                        }).save((error,data)=>{
                            if(error) console.log(error);
                            else{
                                err="Successfully Registered!"
                                res.json(err);
                            } 
                        })
                    })
                })
            }
    
        })
    }

});

module.exports=router;