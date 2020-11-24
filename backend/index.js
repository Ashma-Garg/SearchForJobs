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
var url="mongodb+srv://ashma_garg:35J7qorOBKeAWRZf@cluster0.kh0sh.mongodb.net/<dbname>?retryWrites=true&w=majority" || "mongodb://localhost/jobs";

mongoose.connect(url,{useUnifiedTopology: true,useNewUrlParser:true,useFindAndModify: false}).then(()=>{
    console.log("DataBase Connected");
});

var client=require('./routes/client');
var job=require('./routes/jobs');
var candidate=require('./routes/candidate');
const { resolve } = require('path');
app.use('/client',client);
app.use('/jobs',job);
app.use('/candidate',candidate);

// if(process.env.NODE_ENV=="production"){
//     app.use(expres.static('jobs/buld'));
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'jobs','build','index.html'));
//     })
// }
app.listen(process.env.PORT || 2040, process.env.ID,function(req,res){
    console.log("Server Started....");
})