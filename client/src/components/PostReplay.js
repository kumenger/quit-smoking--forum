import React, { useState, useEffect,useRef } from "react";
import { connect } from "react-redux";
import CommentBox from "./CommentBox";
import {
  loadPost,
 
  editPost,
  checkPageCreateOrReplay,
  loadAllPost,
} from "../actions";

import RepliyListcommnetbox from "./RepliyListcommnetbox";
import _ from "lodash";

import axios from "axios";
const PostReaply = (props) => {
  let myarry = [
    "f7af89",
    "e6e6fa",
    "e9a6af",
    "ff634d",
    "21b1ff",
    "663399",
    "663399",
    "9662eb",
    "ebffc0",
    "ffd732",
    "aaccee",
    "e9bfa6",
    "6aa6e1",
  ];
  const [id, setId] = useState(0);
  const [data, setdata] = useState([]);
  const color=useRef(myarry[Math.round(Math.random() * myarry.length)]);
  const colr2=useRef(myarry[Math.round(Math.random() * myarry.length)])
  //myarry[Math.round(Math.random() * myarry.length)]
  
  

  useEffect(() => {
      let iscanced=false
       const get=()=> axios.get("http://localhost:8000/post/posts").then((res) => {
       if(!iscanced)
      {setdata(_.mapKeys(res.data, "_id"));}
     });
     setId(props.match.params.id);
     props.checkPageCreateOrReplay(true);
     get()
     props.loadAllPost()
     return ()=>{iscanced=true}
     
  }, [data]);

  if (!props.post[id]) {
    return <div className="spinner-border text-warning text-center" role="status">
    <span >Loading...</span>
  </div>;
  }

  

  
  return (
   
    <div>
      <br></br>
      <div className="container-fluid">
        <div>
          <div></div>

          <CommentBox
            ReplayPosteName={props.post[id].name}
            getidfromparent={props.match.params.id}
            getcurrentlikes={props.post[id].likes}
            totallikes={props.post[id].likes}
            ReplayPostTitle={props.post[id].title}
            //(props.mongologinreduxer.isAuthenticated){getUserId.userID=props.mongologinreduxer.user.id}
            currentidfromparent={
            props.facebookloginreducer.isLogIn &&
            props.facebookloginreducer.resp.userID === props.post[id].userID||
            props.mongologinreduxer.isAuthenticated&&props.mongologinreduxer.user.id===props.post[id].userID

                ? true
                : false
            }
            ReplayPostTime={props.post[id].time}
            avaterPic={
              props.facebookloginreducer.isLogIn &&
              props.facebookloginreducer.resp.userID === props.post[id].userID &&
              !props.facebookloginreducer.resp.error
                ? props.facebookloginreducer.resp.picture.data.url
                : `https://ui-avatars.com/api/?name=${
                    props.post[id].name
                  }&size=64&font-size=0.2&background=${
                  color.current
                  }`
            }
            Replay={props.post[id].post}
          />
        </div>
        <div>
          {props.post[id].replay ? (
            props.post[id].replay.map((x, indx, arr) => {
              if (
                props.post[id].replay[arr.indexOf(x)].replayername &&
                props.post[id].replay[arr.indexOf(x)].replayerPost
              ) {
                return (
                  <RepliyListcommnetbox
                    key={indx}
                    ReplayPosteNamex={x.replayername}
                    ReplayPostTimex={x.replyertime}
                    Replayx={x.replayerPost}
                    currentidfromparent={
                      props.facebookloginreducer.isLogIn &&
                      props.facebookloginreducer.resp.userID === x.userID|| props.mongologinreduxer.isAuthenticated&&props.mongologinreduxer.user.id===x.userID
                    }
                    totallikes={x.likes}
                    curentlikes={x.likes}
                    nestedindex={x._id}
                    getidfromparent={props.match.params.id}
                    avaterPic={
                      
                      props.facebookloginreducer.isLogIn &&
                      props.facebookloginreducer.resp.userID === x.userID &&
                      !props.facebookloginreducer.resp.error
                        ? props.facebookloginreducer.resp.picture.data.url
                        : `https://ui-avatars.com/api/?name=${
                            x.replayername
                          } &size=64&font-size=0.2&background=${
                         colr2.current
                       //colr2[Math.round(Math.random() * colr2.length)].current

  //myarry[Math.round(Math.random() * myarry.length)]

                           
                              
                              
                              
                                
                           
                            
                             
                          
                          }`
                    }
                  />
                );
              }
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    mongologinreduxer:state.mongologinreduxer,
    post:state.allPostsReducer,
    facebookloginreducer: state.facebookloginreducer,
    idrep: state.getIdForReplayReducer.id,
    whateditbuttonclikedreducer: state.whateditbuttonclikedreducer,
    checkpagetypereducer: state.checkpagetypereducer,
  };
};

export default connect(mapStateToProps, {
  loadPost,
  editPost,
  checkPageCreateOrReplay,
  loadAllPost,
})(PostReaply);
