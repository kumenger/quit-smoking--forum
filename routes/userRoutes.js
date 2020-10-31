const User = require("../models/user");
const Router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')
const keys=require('../config/key')
Router.route('/allusers').get((req,res)=>{
  User.find().then((user)=>{res.json(user)}).catch((err)=>{ err.status(400).json("Eror") + " " + err;})
});
Router.route("/register").post((req, res) => {
  User.findOne({ Email: req.body.email }).then((use) => {
    if (use) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User(req.body);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.Password, salt, (err, hash) => {
          if (err) throw err;
          newUser.Password = hash;
           newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});
Router.route('/login').post((req,res)=>{
const Email=req.body.email
const Password=req.body.password
User.findOne({Email}).then((user)=>{
    if(!user){
        return res.status(404).json({ error: {Email:"Email not found!!"} });
    }
    bcrypt.compare(Password,user.Password).then(isMatch=>{
        if(isMatch){
            const payload={id:user._id,name:user.Name}
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                return  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
        }
        else{
            return res
            .status(400)
            .json({ error: {Password:"Password incorrect!"} });
        }
    })

})
})
module.exports=Router