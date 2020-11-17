const mongoose = require("mongoose");
const schema = mongoose.Schema;
const replay=require('./replay')
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
const newSchema = new schema({
  name: { type: String, trim: true, required: true },
  userID: { type: String },
  title: { type: String, trim: true, required: true },
  post: { type: String, trim:true, required: true },
  time: { type: String },
  numberofreplires: { type: Number },
  likes: { type: Number,default:0 },

  replay: [
    {
      replayername: { type: String, trim: true },
      replayerPost: { type: String ,trim:true},
      replyertime: { type: String },
      likes: { type: Number,default:0 },
      userID:{type:String},
      replayreplay:[replayschema]
    },
  ],

  /*{replay
    {
      replayername: { type: String },
      replayerPost: { type: String },
      replyertime: { type: Date },
      likes: { type: Number },
    },
  ]}*/
});
module.exports = mongoose.model("NewPost", newSchema);
