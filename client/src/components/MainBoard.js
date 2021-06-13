import React, { useState, useEffect,useRef } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  loadAllPost,
  getnumberOfReplies,
  checkPageCreateOrReplay,
  getlastPOst,
  loadPost,
} from "../actions";
import { getIdForReplay } from "../actions";

import { Link } from "react-router-dom";

import _ from 'lodash'
const MainBoard = (props) => {
  const getfirst=(name=" ")=>{
    let s=name.split(" ")
    return s[0]
  }
  let myarry = [
    "#f7af89",
    
    "#e9a6af",

    "#21b1ff",
    
   
    "#1E90FF",
    "#aaccee",
    "#e9bfa6",
    "#6aa6e1",
    "#a6afe9",
    "#4169E1",
    "#008080",
    "#808000",
  ];
  let myarr2=['red','pink','brown']

  const [data, setdata] = useState([]);
  const [id, setid] = useState();
  const color=useRef(myarry[Math.round(Math.random()*myarry.length)])
  useEffect(() => {
    props.loadAllPost();

    props.getIdForReplay(null);
    props.checkPageCreateOrReplay(true);
  }, []);

  if (!props.allposts) {
    return (
      <div className="spinner-border text-danger text-center" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
 //flex-nowrap
  return (

    <div
      className="row rounded-right rounded-left rounded-bottom rounded-top "
      style={{
        
        
      }}
    >
     
      <div className="col-md-7   rounded-right rounded-left rounded-bottom rounded-top   "  >
         
        {props.allposts.map((x, index, arr) => (
          
          <div key={index} style={{}}>
            <div
              className="row rounded-right rounded-left rounded-bottom rounded-top border  "
              style={{
                backgroundColor: "white",

                paddingTop: "5px",
              }}
            >
              <div className="col-7">
                <Link
                  className="googlefont"
                  to={`PostReplay/${x._id}`}
                  onClick={() => props.getIdForReplay(x._id)}
                >
                  <h6 style={{ color:"royalblue", fontFamily: "revert" }}>
                    <u>{x.title}</u>
                  </h6>
                </Link>
                <p>{`Post by ${x.name} `}</p>
                <p
                  style={{ color: "gray", fontSize: "12px" }}
                >{`${x.time}`}</p>
              </div>

              <div className="col-2">
             {props.facebookloginreducer.isLogIn &&
                    props.facebookloginreducer.resp.userID === x.userID &&
                    !props.facebookloginreducer.resp.error?
                     <img
                  style={{ maxWidth: "100%" }}
                  className="rounded-right rounded-left rounded-bottom rounded-top img-responsive "
                  src={props.facebookloginreducer.resp.picture.data.url}
                       />: 
                      <img src={`https://ui-avatars.com/api/?background=random&name=${x.name}&font-size=0.33`} className='rounded'/>
                
              
          
                  } 
               
                <p style={{ fontSize: "12px" }} className="text-left">
                  {x.replay && x.replay.length > 0 ? (
                    <span className="fas fa-comment " style={{ color: "darkslateblue" }}>
                      &nbsp;
                      {x.replay.length}
                    </span>
                  ) : (
                    ""
                  )}
                  &nbsp;
                  {x.likes && x.likes > 0 ? (
                    <span className="fas fa-heart" style={{ color: "darkslateblue" }}>
                      &nbsp;
                      {x.likes}
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </p>
              </div>
              <div className="col-3">
                <p style={{ fontSize: "14px",color:"darkslateblue" }} className="text-left">
                <i class="fas fa-reply-all"></i>&nbsp; 
                  {x.replay &&
                  x.replay.length > 0 &&
                  x.replay[x.replay.length - 1].hasOwnProperty("replayername")
                    ? getfirst( x.replay[x.replay.length - 1].replayername)
                    : getfirst(x.name)}
                </p>
                <p style={{ fontSize: "12px", color: "royalblue" }}>
                  {x.replay &&
                  x.replay[x.replay.length - 1] &&
                  x.replay[x.replay.length - 1].hasOwnProperty("replyertime")
                    ? x.replay[x.replay.length - 1].replyertime
                    : x.time}
                </p>
              </div>
            </div>
          
          </div>
        ))}
      </div>
      
      <div className="col-md-5">
        <div className="row">
          <div className="col text-center">
            <div className='row' style={{paddingTop:"10px"}}>
            <div className='col'><img
              src="https://i.ibb.co/fkQ1THj/Ignition-of-the-last-one-cigarette-Quit-smoking-concept-photography-Shutterstock-ID-1125219683-Purch.jpg"
              className="rounded-right rounded-left rounded-bottom rounded-top text-center"
              style={{ width: "75%" }}
            /></div>
           
            
            </div>
            <p
              style={{
                color: "royalblue",
                fontFamily: "monospace",
                fontSize: "16px",
              }}
            >
              <strong>after 1 hour Quit Smoking...</strong>
            </p>
            <p
                className="  text-left"
                style={{
                color: "",
                fontFamily: "monospace",
                fontSize:"14px",
              
              }}
            >
              In as little as 20 minutes after the last cigarette is smoked, the
              heart rate drops and returns to normal. Blood pressure begins to
              drop, and circulation may start to improve.
            </p>
            <p>
              <strong
                style={{
                  color: "royalblue",
                  fontFamily: "monospace",
                  fontSize: "16px",
                }}
              >
                  In 12 hours...
              </strong>
            </p>
            <p
              className=" text-left"
              style={{
                color: "",
                fontFamily: "monospace",
                fontSize:"14px",
             
              }}
            >
              After just 12 hours
              without a cigarette, the body cleanses itself of the excess carbon
              monoxide from the cigarettes. The carbon monoxide level returns to
              normal, increasing the body’s oxygen levels
            </p>
            <p
              style={{
                color: "royalblue",
                fontFamily: "monospace",
                fontSize: "16px",
              }}
            >
              <strong>In 1  day...</strong>
            </p>
            <p
              className="text-left"
              style={{
                color: "",
                fontFamily: "monospace",
                fontSize:"14px",
               
              }}
            >
              Just 1 day after quitting smoking, the risk of heart attack begins
              to decrease. Smoking raises the risk of developing coronary heart
              disease by lowering good cholesterol, which makes heart-healthy
              exercise harder to do.
            </p>
            <p
              style={{
                color: "royalblue",
                fontFamily: "monospace",
                fontSize: "16px",
              }}
            >
              <strong>In 2  day....</strong>
            </p>
            <p className="text-left"  style={{
                color: "",
                fontSize:"14px",
                fontFamily: "monospace",
              
              }}>
              Smoking damages the nerve endings responsible for the senses of
              smell and taste. In as little as 2 days after quitting, a person
              may notice a heightened sense of smell and more vivid tastes as
              these nerves heal.
            </p>
          </div>
        </div>
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
    getlastPostReducer: state.getlastPostReducer,
  };
};

const formWrapped = reduxForm({ form: "MainBoard" })(MainBoard);
export default connect(mapStateToProps, {
  loadPost,
  loadAllPost,
  getIdForReplay,
  getnumberOfReplies,
  checkPageCreateOrReplay,
  getlastPOst,
})(formWrapped);
