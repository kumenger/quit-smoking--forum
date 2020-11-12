const User = require("../models/user");
const Router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/key");
const Token = require("../models/Tokens");
const crpto=require('crypto')
const nodemailer=require('nodemailer');
const path =require('path');
const user = require("../models/user");
const { json } = require("body-parser");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2


Router.route("/allusers").get((req, res) => {
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      err.status(400).json("Eror") + " " + err;
    });
});
Router.route("/register").post((req, res) => {
  User.findOne({ Email: req.body.Email }).then((user) => {
    if (user) {
      return res.status(400).json({msg: "Email aready taken!" });
    } 
      const newUser = new User(req.body);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.Password, salt, (err, hash) => {
          if (err) throw err;
          newUser.Password = hash;
          newUser
            .save((err)=>{
              if (err) { return res.status(500).json({ msg: err.message }); }
              const newtoke = new Token({
                _UserId: newUser._id,
                token: crpto.randomBytes(16).toString('hex'),
              });
              newtoke.save(function (err) {
                if (err) {
                  return res.status(500).json({ msg: err.message });
                }
            
               
                const myouthclient=new OAuth2(
                  '75537163394-ostmdmjg0flq6u48mac0pk0t6p9q9jmo.apps.googleusercontent.com',
                  'RftAgT_DpMIVLBheeSSYPyQZ',
                  '"https://developers.google.com/oauthplayground"'
                )
                myouthclient.setCredentials(
                  {refresh_token:'1//04OBAqMUvau7YCgYIARAAGAQSNwF-L9Ir82K6LpYLlZkHT7a0uEQp4I5hz0MafU6WOerTqkxX2btbfXHvSjkIBirAYRD0zhnz7LM'})
                const myaccetoken=myouthclient.getAccessToken()
                
                  var transporter = nodemailer.createTransport({
                      
                  service: "gmail",
                  auth: {
                  type:'OAuth2',
                  user:'kumeprog@gmail.com',
                  clientId: "75537163394-ostmdmjg0flq6u48mac0pk0t6p9q9jmo.apps.googleusercontent.com",
                  clientSecret: "RftAgT_DpMIVLBheeSSYPyQZ",
                  refreshToken: "1//04OBAqMUvau7YCgYIARAAGAQSNwF-L9Ir82K6LpYLlZkHT7a0uEQp4I5hz0MafU6WOerTqkxX2btbfXHvSjkIBirAYRD0zhnz7LM"
                      }
               });
                var mailOptions = {
                  
                  from: "kumeprog@gmail.com",
                  to: newUser.Email,
                  subject: "Quit Smoking Account Verification ",
                  html:`Hello, ${newUser.FirstName} <br></br> please verify account by following this <a href='https://scary-eyeballs-76816.herokuapp.com/users/confirmation/${newtoke.token} 
   
                  
                  
                  ' ><strong>link</strong> </a> `
                  //text:'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host +'\/users' +'\/confirmation\/' + newtoke.token 
                };
                transporter.sendMail(mailOptions, function (err) {
                  if (err) {
                    return res.status(500).json({ msg: err.message });
                  }
                  res
                    .status(200)
                    .json(
                     {msg:"A verification email has been sent to " +
                      newUser.Email +" "+ "you have 12 hours to complete activation if not you have to request reactivation again"+
                      " please chek your email to activate your account."}
                    );
                });
              });
            }
            
            
            )
           
            
        });
      });
    
  });
});

Router.route("/login").post((req, res) => {
  const Email = req.body.email;
  const Password = req.body.password;
  User.findOne({ Email }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: { Email: "Email not found!!" } });
    }
    if (!user.isVerfied)
      return res
        .status(404)
        .json({ error: { unverified: "This account is not verified!!" } });
    bcrypt.compare(Password, user.Password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.FirstName,
          Email: user.Email,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            if(err){res.status(500).json({error:err.message})}
            return res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ error: { Password: "Password incorrect!" } });
      }
    });
  });
});
Router.route('/confirmation/:tok').post((req,res)=>{
  Token.findOne({token:req.params.tok}).then((token)=>{
    if(!token){
     
      return res.status(200).json({type:"un-verifed",msg:"We were unable to find a valid activation. Your activation my have expired"})
    }
    User.findOne({_id:token._UserId}).then((user)=>{
      if(!user){
       
         return res.status(200).json({type:"User not found", msg: 'We were unable to find a user for this activation.' });
        }
      if (user.isVerfied) {
       
        return res.status(200).json({ type: 'already-verified', msg: 'This user has already been verified.' });
      }
      user.isVerfied=true
      user.save((err)=>{
        if(err){
         
          return res.status(500).json({type:"error", msg: err.message });
        }
        res.status(200).json({type:`Thank You ${user.FirstName} `,msg:"The account has been verified. Please log in to continue ."});
      
      
        
     
      
        
   })
    })
  })
  
})
Router.route('/resendverify').post((req,res)=>{
  User.findOne({Email:req.body.Email}).then((user)=>{
   if(!user){return res.status(200).json({msg:"Email not found chek your Email spelling"})}
   if(user){
     Token.findOne({_UserId:user._id}).then((token)=>{
       if(!token){
        const newtoke = new Token({
          _UserId: user._id,
          token: crpto.randomBytes(16).toString('hex'),
        });
        newtoke.save(function (err) {
          if (err) {
            return res.status(500).json({ msg: err.message });
          }
      
         
          const myouthclient=new OAuth2(
            '75537163394-ostmdmjg0flq6u48mac0pk0t6p9q9jmo.apps.googleusercontent.com',
            'RftAgT_DpMIVLBheeSSYPyQZ',
            '"https://developers.google.com/oauthplayground"'
          )
          myouthclient.setCredentials(
            {refresh_token:'1//04OBAqMUvau7YCgYIARAAGAQSNwF-L9Ir82K6LpYLlZkHT7a0uEQp4I5hz0MafU6WOerTqkxX2btbfXHvSjkIBirAYRD0zhnz7LM'})
          const myaccetoken=myouthclient.getAccessToken()
          
            var transporter = nodemailer.createTransport({
                
            service: "gmail",
            auth: {
            type:'OAuth2',
            user:'kumeprog@gmail.com',
            clientId: "75537163394-ostmdmjg0flq6u48mac0pk0t6p9q9jmo.apps.googleusercontent.com",
            clientSecret: "RftAgT_DpMIVLBheeSSYPyQZ",
            refreshToken: "1//04OBAqMUvau7YCgYIARAAGAQSNwF-L9Ir82K6LpYLlZkHT7a0uEQp4I5hz0MafU6WOerTqkxX2btbfXHvSjkIBirAYRD0zhnz7LM",
            accessToken: myaccetoken 
                }
         });
          var mailOptions = {
            
            from: "kumeprog@gmail.com",
            to: user.Email,
            subject: "Quit Smoking Account Verification ",
            html:`Hello, ${user.FirstName} <br></br> please verify account by following this <a href='https://scary-eyeballs-76816.herokuapp.com/users/confirmation/${newtoke.token} 

            
            
            ' ><strong>link</strong> </a> `
            //text:'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host +'\/users' +'\/confirmation\/' + newtoke.token 
          };
          transporter.sendMail(mailOptions, function (err) {
            if (err) {
              return res.status(500).json({ msg: err.message });
            }
            res
              .status(200)
              .json(
               {msg:"A verification email has been sent to " +
                newUser.Email +" "+ "you have 12 hours to complete activation if not you have to request reactivation again"+
                " please chek your email to activate your account."}
              );
          });
        })
       }
       if(token){
        const myouthclient=new OAuth2(
          '75537163394-ostmdmjg0flq6u48mac0pk0t6p9q9jmo.apps.googleusercontent.com',
          'RftAgT_DpMIVLBheeSSYPyQZ',
          '"https://developers.google.com/oauthplayground"'
        )
        myouthclient.setCredentials(
          {refresh_token:'1//04OBAqMUvau7YCgYIARAAGAQSNwF-L9Ir82K6LpYLlZkHT7a0uEQp4I5hz0MafU6WOerTqkxX2btbfXHvSjkIBirAYRD0zhnz7LM'})
        const myaccetoken=myouthclient.getAccessToken()
        
        
        var transporter = nodemailer.createTransport({
                
          service: "gmail",
          auth: {
          type:'OAuth2',
          user:'kumeprog@gmail.com',
          clientId: "75537163394-ostmdmjg0flq6u48mac0pk0t6p9q9jmo.apps.googleusercontent.com",
          clientSecret: "RftAgT_DpMIVLBheeSSYPyQZ",
          refreshToken: "1//04OBAqMUvau7YCgYIARAAGAQSNwF-L9Ir82K6LpYLlZkHT7a0uEQp4I5hz0MafU6WOerTqkxX2btbfXHvSjkIBirAYRD0zhnz7LM",
          accessToken: myaccetoken 
              }
       });
       var mailOptions = {
            
        from: "kumeprog@gmail.com",
        to: user.Email,
        subject: "Quit Smoking Account Verification ",
        html:`Hello, ${user.FirstName} <br></br> please verify account by following this <a href='https://scary-eyeballs-76816.herokuapp.com/users/confirmation/${token.token} 

        
        
        ' ><strong>link</strong> </a> `
        //text:'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host +'\/users' +'\/confirmation\/' + newtoke.token 
      };
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            return res.status(500).json({ msg: err.message });
          }
          res
            .status(200)
            .json(
             {msg:"A verification email has been sent to " +
              user.Email +" "+ "you have 12 hours to complete activation if not you have to request reactivation again"+
              " please chek your email to activate your account."}
            );
        });
      
      
      }
     }).catch((err)=>{   return res.status(500).json({ msg: err.message });})
   }
  }).catch((err)=>{   return res.status(500).json({ msg: err.message });})
})
Router.route('/emailforget').post((req,res)=>{
User.findOne({Email:req.body.Email}).then((user)=>{
 if(!user){return res.status(200).json({msg:"email not found"})}
 if(user){
   user.resetPassword=crpto.randomBytes(16).toString('hex')
   user.save((err)=>{
     if(err){return res.status(500).json({msg:err})}
     const myouthclient=new OAuth2(
       '75537163394-ostmdmjg0flq6u48mac0pk0t6p9q9jmo.apps.googleusercontent.com',
       'RftAgT_DpMIVLBheeSSYPyQZ',
       '"https://developers.google.com/oauthplayground"'
     )
     myouthclient.setCredentials({refresh_token:'1//04OBAqMUvau7YCgYIARAAGAQSNwF-L9Ir82K6LpYLlZkHT7a0uEQp4I5hz0MafU6WOerTqkxX2btbfXHvSjkIBirAYRD0zhnz7LM'})
     const myaccetoken=myouthclient.getAccessToken()
     
       var transporter = nodemailer.createTransport({
           
       service: "gmail",
       auth: {
       type:'OAuth2',
       user:'kumeprog@gmail.com',
       clientId: "75537163394-ostmdmjg0flq6u48mac0pk0t6p9q9jmo.apps.googleusercontent.com",
       clientSecret: "RftAgT_DpMIVLBheeSSYPyQZ",
       refreshToken: "1//04OBAqMUvau7YCgYIARAAGAQSNwF-L9Ir82K6LpYLlZkHT7a0uEQp4I5hz0MafU6WOerTqkxX2btbfXHvSjkIBirAYRD0zhnz7LM",
       accessToken: myaccetoken 
           }
    });
    var mailOptions = {
        
      from: "kumeprog@gmail.com",
      to: user.Email,
      subject: "Reset Password Request ",
      html:`Hello, ${user.FirstName} <br></br> please follow the link to reset password <a href='https://scary-eyeballs-76816.herokuapp.com/users/emailforget/${user.resetPassword} 

      
      
      ' ><strong>link</strong> </a> `
      //text:'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host +'\/users' +'\/confirmation\/' + newtoke.token 
    };
    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
      res
        .status(200)
        .json(
         {msg:"A reset password link sent to  " +
          user.Email +" "+ 
          " please chek your email to reset password."}
        );
    });
  
   })
 }
}).catch(()=>{

})
})
Router.route('/emailforget/:resendToken').patch((req,res)=>{
  User.findOne({resetPassword:req.params.resendToken}).then((user)=>{
   if(!user){return res.status(200).json({msg:"activation not found"})}
   if(user){
     const newPassword=req.body.Password
      bcrypt.genSalt(10,(err,salt)=>{
        if(err){return res.status(500).json({msg:err.message})}
        bcrypt.hash(newPassword,salt,(err,hash)=>{
          if(err){return res.status(500).json({msg:err.message})}
          user.Password=hash
          user.save((err)=>{
            if(err){return json.status(500).json({msg:err.message})}
            return res.status(200).json({msg:"Password successfully changed" +" ,"+ user.FirstName})
          })

        })
      })
   }
  }).catch((err)=>{
    return json.status(200).json({msg:err.message})
  })

})
module.exports = Router;
