const moongoose =require('mongoose')
const schema=moongoose.Schema
const newSchema=new schema({
  FirstName:{type:String,required:true},
  LastName:{type:String,required:true},
  Email:{type:String,required:true, unique: true},
  Password:{type:String,required:true},
  QuitDate:{type:Date},
  Location:{type:String},
  NumberOfRepaly:{type:Number},
  JoinDate:{type:Date},
  isVerfied:{type:Boolean,default:false},
  resetPassword:{type:String,expires:"30m"}
})
module.exports=moongoose.model("users",newSchema)