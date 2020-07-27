var express=require('express'),
 path = require('path'),
bodyParser = require('body-parser'),
// ejs=require('ejs'),
mongoose=require('mongoose'),
// Candidate=require('./models/Candidate.js'),

// Jobs=require('./models/Jobs.js'),
// LoginUser=require('./LoginData.js'),
methodOverride=require('method-override'),
session=require('express-session');
var cors = require('cors'),
session=require('express-session'),
cookieParser=require('cookie-parser');
var app=express();
app.use(cookieParser('secret'));
app.use(session({
    secret:'Login Data',
    resave:true,
    saveUninitialized:true
}));
// cookie=require('cookie-parser'),

// passport=require('passport'),
// localStrategy=require('passport-local').Strategy,
// bcrypt=require('bcryptjs'),
// flash=require('connect-flash');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors());
// app.use(cookie('secret'));
// app.use(session({
//     secret:'Phone-Book',
//     resave:true,
//     saveUninitialized:true
// }));
// app.use(flash());

// app.use(function(req,res,next){
//     res.locals.success_message=req.flash('success_message'),
//     res.locals.failure_message=req.flash('failure_message'),
//     res.locals.error=req.flash('error'),
//     next();
// });
// app.use(passport.initialize());
// app.use(passport.session());
var url="mongodb://localhost/jobs";

// console.log(url);

mongoose.connect(url,{useUnifiedTopology: true,useNewUrlParser:true}).then(()=>{
    console.log("DataBase Connected");
});

// var checkAuthent=function(req,res,next){
//     if(req.isAuthenticated()){
//         res.set('Cache-Control', 'no-cache,privete,no-store,must-revalidate,post-check=0,pre-checked=0');
//         return next();
//     }
//     else{
//         req.flash('failure_message',"You Need to Login First");
//         return res.redirect('/login');
//     }
// }
var client=require('./routes/client');
// var candidate=require('./routes/candidate');
app.use('/client',client);
// app.use('/candidate',candidate);
// app.post
app.listen(process.env.PORT || 2040, process.env.ID,function(req,res){
    console.log("Server Started....");
})