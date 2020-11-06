const { json } = require("body-parser");
const Post = require("../models/postmodel");
const Router = require("express").Router();



Router.route("/createPost").post((req, res) => {
  const newPost = new Post({
    ...Post,
    name: req.body.name,
    title: req.body.title,
    post: req.body.post,
    userID: req.body.userID,
    numberofreplires: req.body.numberofreplires,
    time: req.body.time,
    likes: req.body.likes,
  });
  newPost
    .save()
    .then(() => {
      res.json("new post Addes");
    })
    .catch((err) => res.status(400).json("Error" + " " + err));
});
Router.route("/posts").get((req, res) => {
  Post.find()
    .then((post) => res.json(post))
    .catch((err) => {
      err.status(400).json("Eror") + " " + err;
    });
});
Router.route("/:id").get((req, res) => {
  Post.findById(req.params.id)
    .then((excercis) => {
      res.json(excercis);
    })
    .catch((err) => {
      err.status(400).json("Eror") + " " + err;
    });
});
Router.route("/insertReplay/:id").put((req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },

    { $push: { replay: req.body } },

    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );
});

Router.route("/updatelikes/:id").put((req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    { $inc: { likes: 1 } },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );
});

Router.route("/updateReplylikes/:id").patch((req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.id, "replay._id": req.body.id },
    { $inc: { "replay.$.likes": 1 } },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );
});
Router.route("/updatereply/:id").patch((req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.id,"replay._id": req.body.id},
    
    {
      $set:{ "replay.$.replayername": req.body.replayername,
      "replay.$.replayerPost":req.body.replayerPost,
      "replay.$.replyertime":req.body.replyertime,
    }
    },
   
  ).then(() => {
    res.json("reply edited");
  })
  .catch((err) => res.status(400).json("Error" + " " + err));;
});
Router.route("/updatepost/:id").patch((req, res) => {
  Post.findByIdAndUpdate(req.params.id).then((post) => {
    (post.name = req.body.name),
      (post.time = req.body.time),
      (post.post = req.body.post),
      (post.title = req.body.title);
    post
      .save()
      .then(() => {
        res.json("excersice updated");
      })
      .catch((err) => {
        err.status(400).json("Eror") + " " + err;
      });
  });
});
Router.route('/delete/:id').delete((req,res)=>{
  Post.findByIdAndDelete(req.params.id).then(()=>{res.json("Post Deleted")}).catch((err)=>{err.status(400).json("Eror") + " " + err;})
})
Router.route('/deleteReplay/:id').delete((req,res)=>{
  Post.findOneAndUpdate(
    { _id: req.params.id},{$pull:{replay:{_id:req.body.id}}},
    {new:true}

  ).then(()=>res.json('replay delted')).catch((err)=>{res.status(400).json("Error" + " " + "err")})


})
module.exports = Router;
