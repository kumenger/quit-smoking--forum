const mongoose=require('mongoose')
const schema=require('mongoose').Schema

const replayschema=({
      replayername: { type: String, trim: true },
      replayerPost: { type: String ,trim:true},
      replyertime: { type: String },
      likes: { type: Number,default:0 },
      userID:{type:String},
      replies:[ {
        replayername: { type: String, trim: true },
        replayerPost: { type: String ,trim:true},
        replyertime: { type: String },
        likes: { type: Number,default:0 },
        userID:{type:String}
      },] 
})

module.exports=mongoose.model('replay',replayschema)