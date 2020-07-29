var router=require('express').Router();
var Client=require('../models/Client.js'),
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

// Client.remove({},function(err){
//     if(err) console.log(err);
// })
router.use(passport.initialize());
router.use(passport.session());

router.get('/',function(req,res){
    Client.find({},function(err,data){
        if(!err){
            console.log(data);
            res.json(data);
        }
    });
});
router.post('/add',function(req,res){
    var password=req.body.password;
    var err;
    if(req.body.cpassword!=req.body.password){
        err="Password Doesn't match!";

        res.json({data:err,status:400});
    }
    if(typeof err=='undefined'){
        Client.findOne({Email:req.body.email},function(error,data){
            if(error) console.log(error);
            if(data){
                err="Email is already registed";
                res.json({data:err,status:400});
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
                            Password:password,
                            Company:req.body.company,
                            // Id:req.body.id
                        }).save((error,data)=>{
                            if(error) console.log(error);
                            else{
                                err="Successfully Registered!";
                                res.json(err);
                            } 
                        })
                    })
                })
            }
    
        })
    }

});

router.post('/login',function(req,res){
    var err;
    Client.findOne({Email:req.body.email},function(error,data){
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

router.get('/delete/:id',function(req,res){
    Client.findOneAndDelete({Id:req.params.id},function(err){
        if(err) console.log(err);
        console.log("Data deleted");
    })
    setTimeout(()=>{
        Client.find({},function(err,data){
        res.json(data);
        })
    },1000
    );
})
module.exports=router;