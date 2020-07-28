var express=require('express'),
 path = require('path'),
bodyParser = require('body-parser'),
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


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors());
var url="mongodb://localhost/jobs";

mongoose.connect(url,{useUnifiedTopology: true,useNewUrlParser:true}).then(()=>{
    console.log("DataBase Connected");
});

var client=require('./routes/client');
var job=require('./routes/jobs');
app.use('/client',client);
app.use('/jobs',job);
app.listen(process.env.PORT || 2040, process.env.ID,function(req,res){
    console.log("Server Started....");
})