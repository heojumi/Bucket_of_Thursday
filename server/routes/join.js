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
//     var msg;
//     var errMsg=req.flash('error');
//     if(errMsg) Msg=errMsg;
//     console.log('join page called');
//     res.render('Join.js');
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
    usernameField:'id', //일단 id로 둠
    passwordField:'password',
    passReqToCallback:true
},function(req,id,password,done){
        //console.log('local-join callback called');
        var paramName=req.body.name||req.query.name;
        var paramNickname=req.body.nickname||req.query.nickname;
        var paramEmail=req.body.email||req.query.email;

        var query=con.query('select * from member_tb where id=?',[id],function(err,rows){
            if(err) return done(err);
            if(rows.length){
                console.log('existed user');
                //이미 존재하는 계정인 경우. 여기서 다음으로 안넘어감
                return (null,false,req.flash({message:'이미 있는 계정'}));
            }else{
                con.query('INSERT INTO member_tb (id,passwd,email,name,nickname) values (?,?,?,?,?)',[paramEmail,password,id,paramName,paramNickname],function(err,rows){
                    if(err) throw err;
                    console.log('create done');
                    return done(null,{'id':id});
                })
            }
        })
}))

//authenticate
router.post('/',passport.authenticate('local-join',{
    successRedirect:'/main',
    failureRedirect:'/join',
    failureFlash:true  
}))

module.exports=router;