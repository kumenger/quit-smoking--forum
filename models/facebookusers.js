const mongoose =require('mongoose');
const schema=require('mongoose').Schema
const newUserSChema=new schema({
    uid:{type:String},
    name:{type:String},
    pic:{type:String},
    email:{type:String},
    token:{type:String},
 
})
module.exports=mongoose.model('fbuser',newUserSChema)