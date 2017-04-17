const express =require('express');
const app = express();
const passport = require('passport');
const localStrategy   = require('passport-local');
const user = require('./models/user.js');
const port = 3000;
const path =require('path');
const gets = require('./controllers/get.js');
const posts =require('./controllers/post.js');
const bodyParser =require('body-parser');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname +'/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
});
const upload = multer({ storage : storage });
const mongoose = require('mongoose');




mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/consult');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public'))); //using public folder for front-end
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(require('express-session')({
    secret : "Secret word goes here in production",
    resave :false,
    saveUninitialized :false}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

const cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'resume', maxCount: 1 }]);
const clUpload = upload.single('image');




app.get('/',gets.home);
app.get('/dashboard',isLoggedIn,gets.dashboard);
app.get('/logout',gets.logout);



app.post('/postjob',isLoggedIn,posts.postjob);
app.post('/consign',cpUpload,posts.consign);
app.post('/clsign',clUpload,posts.clsign);
app.post('/login',function(req,res,next){
    console.log(req.body.username);
    console.log(req.body);
    next();
},passport.authenticate('local',{
    successRedirect : '/dashboard',
    failureRedirect : '/'
}),function(req,res){

});






function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}





app.listen(port,()=>{
    console.log("server running")
});