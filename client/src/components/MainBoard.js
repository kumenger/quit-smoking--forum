import React, { useState, useEffect } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  loadAllPost,
  getnumberOfReplies,
  checkPageCreateOrReplay,
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
    async function get(){
     await axios.get('http://localhost:8000/post/posts').then((res)=>{
        setdata(res.data)
        
      }) 
    }           
    get()
    
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

  return (
    <div
      className="row rounded-right rounded-left rounded-bottom rounded-top  "
      style={{
       paddingLeft:"15px",
       paddingRight:"15px",
       alignItems:"center"
      
      
      }}
    >
      
      <div
        className="col-md-7 col-xs-7 col-s-7 rounded-right rounded-left rounded-bottom rounded-top  "
        style={{ overflowY: "scroll", height: "100vh",backgroundColor:""}}
      >
        {props.allposts.map((x, index, arr) => {
         
         return (
            <div key={index} style={{}}>
              <div
                className="row rounded-right rounded-left rounded-bottom rounded-top border "
                style={{
                  backgroundColor:"ActiveBorder",

                  paddingTop: "5px",
                  
                 
                }}
              >
                <div className="col-md-6 ">
                  <Link
                    className="googlefont"
                    to={`PostReplay/${x._id}`}
                    onClick={() => props.getIdForReplay(x._id)}
                  >
                    <p style={{ color: "navy", fontSize: "18px" ,fontFamily:"revert" }}>
                      <u>{x.title}</u>
                    </p>
                  </Link>
                  <p>{`Post by ${x.name} `}</p>
                  <p
                    style={{ color: "blue", fontSize: "12px" }}
                  >{`${x.time}`}</p>
                </div>

                <div className="col-md-2 ">
                  <img
                    style={{ maxWidth: "100%" }}
                    className="rounded-right rounded-left rounded-bottom rounded-top  my-auto"
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
                <div className="col-md-4">
                  <p style={{ fontSize: "14px" }}>
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

            
            </div>
          );
        })}
      </div>
      <div className="col-md-5 col-xs-5 col-s-5 " style={{paddingTop:"20px"}}>   
      <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12 text-center text-primary ">
              <Link
                  onClick={() =>
                  props.getIdForReplay(
                     props.allposts[props.allposts.length-1]._id
                    )
                  }
                to={`/PostReplay/${
                  props.allposts[props.allposts.length-1]._id
                  }`}
                  style={{ fontSize: "20px" }}
                  className="text-center text-primary"
                >
                  { props.allposts[props.allposts.length-1].title}
                </Link>
              </div>

              <div className=" col-md-12">
                <div className="row">
                  
                  <div className="col-md-10 offset-md-1" style={{maxHeight:"70vh",overflow:"scroll"}}>
                    <p  style={{color:"navy",fontFamily:"monospace",fontSize:"15px"}}
                    dangerouslySetInnerHTML={{__html:`${ props.allposts[props.allposts.length-1].post}`}}
                    
                    / >
                     
                   
                  </div>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
         
          <div className="col-md-12">
          <br></br>
            <h6 className=" text-info text-center">
            Recent Post by { props.allposts[props.allposts.length-1].name} on{" "}
              { props.allposts[props.allposts.length-1].time}
            </h6>
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
  };
};

const formWrapped = reduxForm({ form: "MainBoard" })(MainBoard);
export default connect(mapStateToProps, {
  loadAllPost,
  getIdForReplay,
  getnumberOfReplies,
  checkPageCreateOrReplay,
})(formWrapped);
