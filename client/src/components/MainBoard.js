import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { Link } from "react-router-dom";
import LastPost from "./LastPost";

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

  return (
    <div
      className="row rounded-right rounded-left rounded-bottom rounded-top  "
      style={{
        paddingLeft: "15px",
        paddingRight: "15px",
      }}
    >
      <div className="col rounded-right rounded-left rounded-bottom rounded-top  ">
        {props.allposts.map((x, index, arr) => (
          <div key={index} style={{}}>
            <div
              className="row rounded-right rounded-left rounded-bottom rounded-top outset "
              style={{
                backgroundColor: "#ebf1f1",

                paddingTop: "5px",
              }}
            >
              <div className="col-md-5">
                <Link
                  className="googlefont"
                  to={`PostReplay/${x._id}`}
                  onClick={() => props.getIdForReplay(x._id)}
                >
                  <h5 style={{ color: "darkinfo", fontFamily: "revert" }}>
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
                  className="rounded-right rounded-left rounded-bottom rounded-top img-responsive "
                  src={
                    props.facebookloginreducer.isLogIn &&
                    props.facebookloginreducer.resp.userID === x.userID &&
                    !props.facebookloginreducer.resp.error
                      ? props.facebookloginreducer.resp.picture.data.url
                      : `https://ui-avatars.com/api/?name=${
                          x.replay &&
                          x.replay.length > 0 &&
                          x.replay[x.replay.length - 1].hasOwnProperty(
                            "replayername"
                          )
                            ? x.replay[x.replay.length - 1].replayername
                            : x.name
                        }&size=50&font-size=0.4&
                        
                          &background=${
                            myarry[Math.round(Math.random() * myarry.length)]
                          }
                
              
          `
                  }
                />
                <p style={{ fontSize: "12px" }} className="text-left">
                  {x.replay && x.replay.length > 0 ? (
                    <span class="fas fa-comment " style={{ color: "indigo" }}>
                      &nbsp;
                      {x.replay.length}
                    </span>
                  ) : (
                    ""
                  )}
                  &nbsp;
                  {x.likes && x.likes > 0 ? (
                    <span class="fas fa-heart" style={{ color: "#C13584" }}>
                      &nbsp;
                      {x.likes}
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </p>
              </div>
              <div className="col">
                <p style={{ fontSize: "14px" }} className="text-left">
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
        ))}
      </div>
      <div className="col">
        <div className="row">
          <div className="col text-center">
            <h5 className="text-center" style={{color:"royalblue"}}>TimeLine </h5>
            <img
              src="https://i.ibb.co/fkQ1THj/Ignition-of-the-last-one-cigarette-Quit-smoking-concept-photography-Shutterstock-ID-1125219683-Purch.jpg"
              className="rounded-right rounded-left rounded-bottom rounded-top text-center"
              style={{ width: "50%" }}
            />
            <p
              style={{
                color: "royalblue",
                fontFamily: "monospace",
                fontSize: "16px",
              }}
            >
              <strong>After 1 hour</strong>
            </p>
            <p
              className="  text-left"
              style={{
                color: "",
                fontFamily: "monospace",
                fontSize: "16px",
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
                After 12 hours
              </strong>
            </p>
            <p
              className=" text-left"
              style={{
                color: "",
                fontFamily: "monospace",
                fontSize: "16px",
              }}
            >
              Cigarettes contain a lot of known toxins including carbon
              monoxide, a gas present in cigarette smoke. This gas can be
              harmful or fatal in high doses and prevents oxygen from entering
              the lungs and blood. When inhaled in large doses in a short time,
              suffocation can occur from lack of oxygen. After just 12 hours
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
              <strong>After 1 day</strong>
            </p>
            <p
              className="text-left"
              style={{
                color: "",
                fontFamily: "monospace",
                fontSize: "16px",
              }}
            >
              Just 1 day after quitting smoking, the risk of heart attack begins
              to decrease. Smoking raises the risk of developing coronary heart
              disease by lowering good cholesterol, which makes heart-healthy
              exercise harder to do. Smoking also raises blood pressure and
              increases blood clots, increasing the risk of stroke. In as little
              as 1 day after quitting smoking, a person’s blood pressure begins
              to drop, decreasing the risk of heart disease from smoking-induced
              high blood pressure. In this short time, a person’s oxygen levels
              will have risen, making physical activity and exercise easier to
              do, promoting heart-healthy habits.
            </p>
            <p
              style={{
                color: "royalblue",
                fontFamily: "monospace",
                fontSize: "16px",
              }}
            >
              <strong>After 2 hour</strong>
            </p>
            <p className="text-left"  style={{
                color: "",
                fontFamily: "monospace",
                fontSize: "16px",
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
