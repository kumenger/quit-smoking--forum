import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  whatEditClicked,
  editPostReplay,
  updateReplylikes,
  deleteReplay,
  loadAllPost,
} from "../actions";
import { getInsideIndexforlikes } from "../actions";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import { reduxForm } from "redux-form";
import Modal from "react-bootstrap/esm/Modal";


import axios from "axios";
import { configure } from "@testing-library/react";


const RepliyListcommnetbox = (props) => {
 
  const replayername = useRef();
  const replayerPost = useRef();
  const replyertime = useRef();
  const replpic=useRef()
  let myobj = {
    replayername: null,
    replayerPost: null,
    replyertime: null,
    id: null,
  };
  const [editable, seteditale] = useState(false);
  const [likes, setlikes] = useState(props.totallikes);
  const [show, setShow] = useState(false);
  const [render,setrender]=useState(false)
  const thisreply=useRef()
  useEffect(()=>{
    setrender(true)
  },[render])

  const myobj2 = { id: props.getInsideIndexforlikesreducer.index };
  const modelareplayclicked = () => {
    
    axios.request({
      ...configure,
      method: "delete",
      url: `http://localhost:8000/post/deleteReplay/${props.getidfromparent}`,
      data: myobj2,
    });
 
   setShow(false)
      
  };
 
  const updatebuttonclick = () => {
    let a = new Date();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let d = new Date();
    let time =
      d.getHours() > 13
        ? (d.getHours() % 12) + ":" + d.getMinutes() + "PM"
        : d.getHours() + ":" + d.getMinutes() + " " + "AM";
    const finaltime =
      ` ${months[a.getMonth()]} ${a.getDate()} ${a.getFullYear()}` + " " + time;
    seteditale(true);
    //props.whatEditClicked(props.nestedindex)

    if (editable) {
      props.editPostReplay(props.getidfromparent, {
        ...myobj,
        replayername: replayername.current.innerHTML,
        //document.getElementById("four").innerHTML,
        replyertime: finaltime,
        // document.getElementById("five").innerHTML,
        replayerPost: replayerPost.current.innerHTML,
        // document.getElementById("six").innerHTML,
        id: props.nestedindex,
      });
      seteditale(false);
      
    }
  };
  const iconclicked = () => {
    axios.patch(
      `http://localhost:8000/post/updateReplylikes/${props.getidfromparent}`,
      { id: props.getInsideIndexforlikesreducer.index  }
    );
   // props.updateReplylikes(props.getidfromparent,props.nestedindex)
    setlikes(likes + 1);
  };

 
  const UpdateDeleteButton = () => {
    if (props.currentidfromparent) {
      return (
        <div style={{ padding: "10px" }}>
          <ButtonToolbar>
            <ButtonGroup>
              <Button
                id="btnupdate"
                style={{ backgroundColor: "DARKBLUE" }}
                onClick={() => updatebuttonclick()}
              >
                {editable ? "Save" : "Edit"}
              </Button>
              {"      "}
            </ButtonGroup>
            <ButtonGroup>
              <Button
                style={{ backgroundColor: "DARKRED" }}
                className="btn text-white"
                onClick={() => deletebtnclicked()}
              >
                Delete
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              {editable ? (
                <Button
                  style={{ backgroundColor: "#9b870c" }}
                  onClick={() => seteditale(false)}
                >
                  Cancel
                </Button>
              ) : (
                ""
              )}
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      );
    }
    return " ";
  };

  const deletebtnclicked = () => {
    setShow(true);
    
    props.getInsideIndexforlikes(props.nestedindex);
  };
  return (
    <div
    ref={thisreply}
      className="rounded-right rounded-left rounded-bottom rounded-top "
      style={{ paddingBottom: "10px" }}
    >
      {" "}
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Delete Replay</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <p className="text-danger">are you you want delete this replay :</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className=" btn btn-danger"
            onClick={() => modelareplayclicked()}
          >
            Delete
          </Button>
          <Button className="primary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <div className="row bg-dark   rounded-top border">
          <div className="col">
            <p
              ref={replayername}
              id={editable ? "four" : ""}
              className="text-white r"
              contentEditable={editable}
              className={`${editable ? "blickme" : "text-white"}`}
            >
              {props.ReplayPosteNamex}
            </p>
          </div>

          <div className=" col ">
            <p
              ref={replyertime}
              id={editable ? "five" : ""}
              name="time"
              style={{ fontSize: "12px", color: "POWDERBLUE" }}
              contentEditable={editable}
              className={`${editable ? "blickme" : ""}`}
            >
              {props.ReplayPostTimex}
            </p>
          </div>
        </div>
      </div>
      <div className="row bg-light border ">
        <div className="col-md-2 " style={{ padding: "20px" }}>
          <img
            ref={replpic}

            src={props.avaterPic}
            className="rounded-right rounded-left rounded-bottom rounded-top"
          />
        </div>
        <div className="col-md-10">
          <div
           style={{fontSize:"14px"}}
            ref={replayerPost}
            id={editable ? "six" : ""}
            style={{fontFamily:"monospace",fontSize:"15px"}}
            contentEditable={editable}
            className={`${editable ? "blickme" : ""}`}
            dangerouslySetInnerHTML={{__html:`${props.Replayx}`}}
          />
           
          
        </div>
      </div>
      <div
        className="row  rounded-bottom  border"
        style={{ backgroundColor: "DARKGRAY" }}
      >
        <div className="col-md-10">{UpdateDeleteButton()}</div>{" "}
        <div className="col-md-2">
          {" "}
          <button
            style={{ backgroundColor: "DARKGRAY", fontSize: "22px" }}
            onMouseOver={()=>props.getInsideIndexforlikes(props.nestedindex)}
            onTouchMove={()=>props.getInsideIndexforlikes(props.nestedindex)}
            disabled={props.facebookloginreducer.isLogIn||props.mongologinreduxer.isAuthenticated ? false : true}
            onClick={() => iconclicked()}
            className="fas fa-thumbs-up fa-2x btn btn-block  "
          >
            {" "}
            {"  "}
            <strong style={{ color: "DARKBLUE", fontSize: "20px" }}>
              {likes}
            </strong>
          </button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    mongologinreduxer:state.mongologinreduxer,
    post: state.allPostsReducer,
    facebookloginreducer: state.facebookloginreducer,
    whateditbuttonclikedreducer: state.whateditbuttonclikedreducer,
    getIdForReplayReducer: state.getIdForReplayReducer,
    getInsideIndexforlikesreducer: state.getInsideIndexforlikesreducer,
  };
};
const fromwarapeed = reduxForm({ form: "CommentBoxReplay" })(
  RepliyListcommnetbox
);
export default connect(mapStateToProps, {
  getInsideIndexforlikes,
  whatEditClicked,
  editPostReplay,
  updateReplylikes,
  deleteReplay,
  loadAllPost,
})(fromwarapeed);
