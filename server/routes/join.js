const express=require('express');
const app=express();
const router=express.Router();
const path=require('path');
const mariadb=require('mariadb/callback');
const con=require('../bucket_data');
var exist;
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

//router설정
// router.get('/',function(req,res){
//     console.log('join page called');
//     res.render('pages/Join');
// })

//serialize, deserialize 설정 (세션에 값 저장)
passport.serializeUser(function(user,done){
    console.log("passport session serialzied: ",user);
    done(null,user);
})
passport.deserializeUser(function(user,done){
        console.log("passport session deserialized: ",user);
        done(err,user);
})


//passport 전략
passport.use('local-join', new LocalStrategy({
    usernameField:'email', //email로
    passwordField:'password',
    passReqToCallback:true
},function(req,email,password,done){
        //console.log('local-join callback called');
        var paramName=req.body.name||req.query.name;
        var paramNickname=req.body.nickname||req.query.nickname;
        var paramId=req.body.id||req.query.id;

        var query=con.query('select * from member_tb where email=?',[email],function(err,rows){
            if(err) return done(err);
            if(rows.length){
                console.log('existed user');
                exist=true;
                //res.status(403).send({status:403,message:'이미 존재하는 계정'});
                return done(null,false,{message:'이미 존재하는 이메일'});
            }else{
                con.query('INSERT INTO member_tb (id,passwd,email,name,nickname) values (?,?,?,?,?)',[paramId,password,email,paramName,paramNickname],function(err,rows){
                    if(err) throw err;
                    exist=false;
                    return done(null,{'email':email,'nickname':nickname});
                })
            }
        })
}))

//authenticate
// router.post('/',passport.authenticate('local-join',{
//     successRedirect:'/main',
//     failureRedirect:'/join',
//     failureFlash:true  
// }))

router.post('/',function(req,res,next){
    passport.authenticate('local-join',function(err,user,info){
        if(err)
        return next(err);
        if(exist==true){
         res.status(403).send({status:403,message:'이미 존재하는 이메일 계정입니다.'});
        }
        if(exist==false)
        return res.status(200).send({status:200,message:'join success'});
    })(req,res,next);
})


module.exports=router;