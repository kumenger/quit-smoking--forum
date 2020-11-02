import React, { useState, useEffect } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  loadAllPost,
  getnumberOfReplies,
  checkPageCreateOrReplay,
  getlastPOst,
  loadPost
} from "../actions";
import { getIdForReplay } from "../actions";
import axios from 'axios'
import { Link } from "react-router-dom";
import LastPost from './LastPost'

const MainBoard = (props) => {
  let myarry = [
    "f7af89",
    "e6e6fa",
    "e9a6af",
    
    "21b1ff",
     "ebffc0",
   "ebffc0",
   "1E90FF",
    "aaccee",
    "e9bfa6",
    "6aa6e1",
    "a6afe9",
   "4169E1",
    "008080",
    "808000",
  ];

  const [data, setdata] = useState([]);
  const [id, setid] = useState();

  useEffect(() => {
   
  
    props.loadAllPost();

    props.getIdForReplay(null);
    props.checkPageCreateOrReplay(true);
  }, []);

  if (!props.allposts) {
    return (
      <div class="spinner-border text-danger text-center" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    );
  }
  console.log(window.screen.width)
  return (
    <div
      className="row rounded-right rounded-left rounded-bottom rounded-top  "
      style={{
       paddingLeft:"15px",
       paddingRight:"15px",
     
      
      
      }}
    >
      
      <div
        className="col-md-8 rounded-right rounded-left rounded-bottom rounded-top  "
        style={{backgroundColor:""}}
      >
        {props.allposts.map((x, index, arr) => 
         
    
            <div key={index} style={{}} >
              <div
                className="row rounded-right rounded-left rounded-bottom rounded-top outset "
                style={{
                  backgroundColor:"#ebf1f1",
                
                  paddingTop: "5px",
                  
                 
                }}
              >
                <div className="col-md-5">
                  <Link
                    className="googlefont"
                    to={`PostReplay/${x._id}`}
                    onClick={() => props.getIdForReplay(x._id)}
                  >
                    <h5 style={{ color: "darkinfo" ,fontFamily:"revert" }}>
                      <u>{x.title}</u>
                    </h5>
                  </Link>
                  <p>{`Post by ${x.name} `}</p>
                  <p
                    style={{ color: "#0B6943", fontSize: "12px" }}
                  >{`${x.time}`}</p>
                </div>

                <div className="col">
                  <img
                    style={{ maxWidth: "100%" }}
                    className="rounded-right rounded-left rounded-bottom rounded-top img-responsive my-auto"
                    src={
                      props.facebookloginreducer.isLogIn &&
                      props.facebookloginreducer.resp.userID === x.userID &&
                      !props.facebookloginreducer.resp.error
                        ? props.facebookloginreducer.resp.picture.props.allposts.url
                        : `https://ui-avatars.com/api/?name=${
                            x.replay &&
                            x.replay.length > 0 &&
                            x.replay[x.replay.length - 1].hasOwnProperty(
                              "replayername"
                            )
                              ? x.replay[x.replay.length - 1].replayername
                              : x.name
                          }&size=64&font-size=0.2
                        
                          &background=${
                            myarry[Math.round(Math.random() * myarry.length)]
                          }
                
              
          `
                    }
                  />
                  <p style={{fontSize:"14px"}} className='text-left'>
                    {x.replay && x.replay.length > 0 ? (
                      <span
                        class="fas fa-comment "
                        style={{ color: "indigo" }}
                      >&nbsp;
                        {x.replay.length}
                      </span>
                    ) : (
                      ""
                    )}&nbsp;
                    {x.likes && x.likes > 0 ? (
                      <span
                        class="fas fa-heart"
                        style={{ color: "lightpink"}}
                      >&nbsp;
                        {x.likes}
                      </span>
                    ) : (
                      ""
                    )}{" "}
                  </p>
                </div>
                <div className="col">
                  <p style={{ fontSize: "14px" }} className='text-left'>
                    last reply by{" "}
                    {x.replay &&
                    x.replay.length > 0 &&
                    x.replay[x.replay.length - 1].hasOwnProperty("replayername")
                      ? x.replay[x.replay.length - 1].replayername
                      : x.name}
                  </p>
                  <p style={{ fontSize: "12px", color: "BLUE" }}>
                    {x.replay &&
                    x.replay[x.replay.length - 1] &&
                    x.replay[x.replay.length - 1].hasOwnProperty("replyertime")
                      ? x.replay[x.replay.length - 1].replyertime
                      : x.time}
                  </p>
                </div>
                
              </div>
            
              <br/>
            </div>
          
         
        
        
        
  
        
        )}
       
      </div>
      <div className='col-md-4'>
       

<LastPost/>
     
      </div>
      
      <div>   
     
      </div>
     
  
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    allposts: Object.values(state.allPostsReducer),
    facebookloginreducer: state.facebookloginreducer,
    getIdForReplayReducer: state.getIdForReplayReducer,
    getInsideIndexforlikesreducer: state.getInsideIndexforlikesreducer,
    checkpagetypereducer: state.checkpagetypereducer,
    mongologinreduxer: state.mongologinreduxer,
    getlastPostReducer:state.getlastPostReducer
  };
};

const formWrapped = reduxForm({ form: "MainBoard" })(MainBoard);
export default connect(mapStateToProps, {
  loadPost,
  loadAllPost,
  getIdForReplay,
  getnumberOfReplies,
  checkPageCreateOrReplay,
  getlastPOst
})(formWrapped);
