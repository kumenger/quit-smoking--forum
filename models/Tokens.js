const mongoose=require('mongoose')
const schema=require('mongoose').Schema
const user=require('./user')
const NewTokenSchema=new schema({
    _UserId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: user },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
})
module.exports=mongoose.model('Token',NewTokenSchema)