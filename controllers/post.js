const express =require('express');
const app =express();
const bodyParser =require('body-parser');
const consultant = require('../models/consultant.js');
const user = require('../models/user.js');
const client =require('../models/client');
const job =require('../models/job');
const passport        = require('passport');
const localStrategy   = require('passport-local');
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



module.exports={
    consign : (req,res)=> {
        rating =Math.random() * (4 - 1) + 1;
        const username = req.body.username;
        const password = req.body.password;
        console.log(password);
        console.log(req.files);

        user.register(new user({username: username,utype:'con'}),
            req.body.password,
            function (err, user) {
                if (!err) {
                    //errror handling

                    passport.authenticate("local")(req, res, function () {
                        const cons =new consultant({
                            username :username,
                            first :req.body.first,
                            last : req.body.last,
                            phone : req.body.phone,
                            country : req.body.country,
                            state : req.body.state,
                            desc : req.body.desc,
                            image : req.files['image'][0].filename,
                            resume : req.files['resume'][0].filename,
                            avgrating:rating
                        });
                        cons.save(function (error,data) {
                            if(!error){
                                console.log(data);

                            }else{
                                console.log(error)
                            }
                        });



                        res.redirect('/dashboard');
                    });

                }
                else{
                    console.log("passs"+err);

                }

            });
    },



    clsign : (req,res)=>{
        const username = req.body.username;
        const password = req.body.password;
        console.log(password);

        user.register(new user({username: username,utype:'cli'}),
            req.body.password,
            function (err, user) {
                if (!err) {
                    //errror handling

                    passport.authenticate("local")(req, res, function () {
                        const cli =new client({
                            username :username,
                            first :req.body.first,
                            last : req.body.last,
                            phone : req.body.phone,
                            country : req.body.country,
                            state : req.body.state,
                            city  :req.body.city,
                            cname :req.body.cname,
                            ctype : req.body.ctype,
                            desc : req.body.desc,
                            image :req.file.path,



                        });
                        cli.save(function (error,data) {
                            if(!error){
                                console.log(data);

                            }else{
                                console.log(error)
                            }
                        });



                        res.redirect('/dashboard');
                    });

                }
                else{
                    console.log("passs"+err);

                }

            });
    },
    postjob : (req,res)=>{
        u = req.user.username;

        now  =new Date().toLocaleDateString();
        j = new job({
            title : req.body.title,
            desc : req.body.desc,
            sector : req.body.sector,
            type : req.body.type,
            postedon : now,
            skill : req.body.skill,
            exp : req.body.exp,
            owner : u,
            consultant: null,
            status : 'Job Posted',
            constatus : 'Open',

        });
        j.save();
        res.redirect('/dashboard');

    }








};