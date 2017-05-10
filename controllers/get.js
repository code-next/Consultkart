const express = require('express');
const app =express();
const job =require('../models/job');
const consultant = require('../models/consultant')

module.exports={

    home : (req,res)=>{
        res.render("index")
    },




    dashboard : (req,res)=>{
        u = req.user;
        if(u){
            if(u.utype == 'con'){
                job.find({consultant : u.username},function(error,jobs){
                    job.find({consultant : null},function(err,njobs) {
                       console.log(jobs);
                       console.log(njobs);
                        res.render('cons',{
                            jobs : jobs,
                            featured : njobs
                        });
                    });
                });

            }else{
                job.find({owner : u.username},function(error,jobs){
                       consultant.find({},function(err,cons){
                           console.log(cons);
                          res.render("client",{
                                jobs: jobs,
                                cons: cons
                          }) ;
                       });

                    console.log(jobs);
                });


            }
        }else{
            console.log("who are you");
            res.redirect('/');
        }


    },

    logout : (req,res)=>{
        req.logout();
        res.redirect('/');
    }


};


