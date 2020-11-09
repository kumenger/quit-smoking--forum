const User = require("../models/user");
const Router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/key");
const Token = require("../models/Tokens");
const crpto=require('crypto')
const nodemailer=require('nodemailer');
const path =require('path');
const { json } = require("body-parser");


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
            
               
                var transporter = nodemailer.createTransport({
                 
                  host: 'smtp.gmail.com',
                  port: 587,
                  secure: false,
                  requireTLS: true,
                 
                  auth: {
                    user:keys.Email, pass:keys.password
                  },
                });
                var mailOptions = {
                  
                  from: "kumeprog@gmail.com",
                  to: newUser.Email,
                  subject: "Quit Smoking Account Verification ",
                  html:`Hello, ${newUser.FirstName} <br></br> please verify account by following this <a href='http://localhost:3000/users/confirmation/${newtoke.token} 
   
                  
                  
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
      
         
          var transporter = nodemailer.createTransport({
           
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
           
            auth: {
              user:keys.Email, pass:keys.password
            },
          });
          var mailOptions = {
            
            from: "kumeprog@gmail.com",
            to: user.Email,
            subject: "Quit Smoking Account Verification ",
            html:`Hello, ${user.FirstName} <br></br> please verify account by following this <a href='http://localhost:3000/users/confirmation/${newtoke.token} 

            
            
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
        var transporter = nodemailer.createTransport({
           
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
         
          auth: {
            user:keys.Email, pass:keys.password
          },
        });
        var mailOptions = {
            
          from: "kumeprog@gmail.com",
          to: user.Email,
          subject: "Quit Smoking Account Verification ",
          html:`Hello, ${user.FirstName} <br></br> please verify account by following this <a href='http://localhost:3000/users/confirmation/${token.token} 

          
          
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
module.exports = Router;
