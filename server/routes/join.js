const express=require('express');
const app=express();
const router=express.Router();
const path=require('path');
const bucketData=require('../bucket_data');



var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

//router설정
// router.get('/',function(req,res){
//     console.log('join page called');
// })

//serialize, deserialize 설정 (세션에 값 저장)
passport.serializeUser(function(user,done){
    //console.log("passport session serialzied: ",user.id);
    done(null,user.id);
})
passport.deserializeUser(function(id,done){
    bucketData.findById(id,function(err,user){
        //console.log("passport session deserialized: ",id);
        done(err,user);
    })
})


//passport 전략
passport.use('local-join', new LocalStrategy({
    usernameField:'email', //일단 id로 둠
    passwordField:'_password',
    passReqToCallback:true
},function(req,email,_password,done){
        console.log('local-join callback called');
        var paramName=req.body.name;
        var paramNickname=req.body.nickname;
        var paramId=req.body.id;

        bucketData.query('select * from member_tb where email=?',[email],function(err,rows){
            if(err) return done(err);
            if(rows.length){
                console.log('existed user');
                return (null,false,{message:'your email is already used'})
            }else{
                // var member=new bucketData.member_tb({"email":email,"passwd":_password,"name":paramName,"nickname":paramNickname,"id":paramId});
                // member.save(function(err){
                //     if(err) throw err;
                //     console.log("data added: ");
                //     return done(null,member);
                // })

                var sql={email:email,passwd:_password,id:paramId,name:paramName,nickname:paramNickname};
                bucketData.query('insert into member_tb set ?',sql,function(err,rows){
                    if(err) throw err;
                    return done(null,{'id':id,'uid':rows.insertId})
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