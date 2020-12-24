const express=require('express');
const app=express();
const router=express.Router();
const path=require('path');
const mariadb=require('mariadb/callback');
const con=require('../bucket_data');

var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

//router설정
// router.get('/',function(req,res){
//     console.log('login page called');
//     res.render('pages/Login');
// })


passport.serializeUser(function(user,done){
    console.log("passport session serialzied: ",user);
    done(null,user);
})
passport.deserializeUser(function(user,done){
        console.log("passport session deserialized: ",user);
        done(err,user);
})

passport.use('local-login',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},function(req,email,password,done){
    console.log('local-login callback called');
    var query=con.query('select * from member_tb where email=? and passwd=?',[email,password],function(err,rows){
        if(err)
        return done(err);
        if(rows.length){
            console.log("exist");
            return done(null,{'email':email,'nickname':nickname},{'message':'login success'})
        }
        else{
            console.log("no user");
            return done(null,false,{'message':'이메일이나 비밀번호를 다시 확인해주세요.'})
        }
    })
}
));

router.post('/',function(req,res,next){
    passport.authenticate('local-login',function(err,user,info){
        if(err)
        res.status(403).json(err);
        if(!user)
        return res.status(401).json(info.message);
        else{
            req.logIn(user,function(err){
                if(err)
                return next(err);
                return res.status(200).json(user);
            })
        }
    })(req,res,next);
})

module.exports=router;