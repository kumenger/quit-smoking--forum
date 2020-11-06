import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { editPost, deletepost } from "../actions";
import { UpdateLikes } from "../actions";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Modal from "react-bootstrap/esm/Modal";
import {reduxForm} from 'redux-form';
import {useHistory} from 'react-router-dom'
import axios from "axios";
import _ from 'lodash'
const CommentBox = (props) => {
  let myobj = { name: null, title: null, post: null, time: null };
  const [editable, seteditale] = useState(false);
  const [show, setShow] = useState(false);
  const[likes,setlikes]=useState(props.totallikes)
  const one=useRef()
  const two=useRef()
  const theree=useRef()
  const four=useRef()
  

  


  const UpdateDeleteButton = () => {
    let history=useHistory()
    const handleClose = () => setShow(false);
    
    const modaldeletecliked=()=>{
      props.deletepost(props.getidfromparent)
      _.omit(props.post, props.getidfromparent)
        history.push('/')
     
    }
    if (props.currentidfromparent) {
      return (
        <div style={{ padding: "10px" }}>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Delete Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <p className="text-danger">
                are you you want delete this Post with title:<p className='text-info'> {props.ReplayPostTitle}</p> 
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button className=" btn btn-danger" onClick={()=>modaldeletecliked()}>Delete</Button>
              <Button className="primary" onClick={() => setShow(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
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
                onClick={()=>setShow(true)}
              >
                Delete
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              {editable?<Button
                style={{ backgroundColor: "#9b870c" }}
                
                onClick={()=>seteditale(false)}
              >
               Cancel
              </Button>:""}
              
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      );
    }
    return " ";
  };
  const updatebuttonclick = () => {
    seteditale(true);
    if (editable) {
      props.editPost(props.getIdForReplayReducer.id, {
        ...myobj,
        name: one.current.innerHTML,
        time: two.current.innerHTML,
        post: theree.current.innerHTML ,
        title: four.current.innerHTML,
      });
        
      seteditale(false);
      console.log(myobj)
    }
  };
  const iconclickedMain = () => {
    props.UpdateLikes(props.getidfromparent);
   // axios.put(`/post/updatelikes/${props.getidfromparent}`)
     setlikes(likes+1)           
  };

 

  return (
    <div
      className="rounded-right rounded-left rounded-bottom rounded-top "
      style={{ paddingBottom: "10px" }}
    >
      <div>
        <div className="row bg-dark   rounded-top border">
          <div className="col ">
            <p
              id="one"
              style={{fontSize:"13px"}}
              ref={one}
              className="text-white "
              contentEditable={editable}
              className={`${editable ? "blickme" : "text-white"}`}
            >
              {props.ReplayPosteName}
            </p>
          </div>
          <div className="col ">
            <p
            
              id="four"
              ref={four}
              name="time"
              style={{color:"POWDERBLUE",fontSize:"15px"}}
              className="text-white"
              contentEditable={editable}
              className={`${editable ? "blickme" : "text-warning"}`}
            >
              {props.ReplayPostTitle}
            </p>
          </div>
          <div className="col">
            <p
              id="two"
              style={{fontSize:"13px"}}
              ref={two}
              name="time"
              className="text-white "
              contentEditable={editable}
              
              className={`${editable ? "blickme" : "text-white"}`}
            >
              {props.ReplayPostTime}
            </p>
          </div>
        </div>
      </div>
      <div className="row bg-light border ">
        <div className="col " style={{ padding: "20px" }}>
          <img  src={props.avaterPic}  className="rounded-right rounded-left rounded-bottom rounded-top" />
        </div>
        <div className="col-md-10">
          <div
           style={{fontSize:"14px"}}
            id="there"
            ref={theree}
            contentEditable={editable}
            className={`${editable ? "blickme" : ""}`}
            style={{margin:0,padding:0,fontFamily:"monospace",fontSize:"15px"}}
            dangerouslySetInnerHTML={{__html:`${props.Replay}`}}
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
            disabled={props.facebookloginreducer.isLogIn ||props.mongologinreduxer.isAuthenticated ? false : true}
            onClick={() => iconclickedMain()}
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
    post: Object.values (state.allPostsReducer),
    facebookloginreducer: state.facebookloginreducer,
    getIdForReplayReducer: state.getIdForReplayReducer,
  };
};
const fromwarapeed = reduxForm({ form: "commentbox" })(CommentBox);
export default connect(mapStateToProps, { UpdateLikes, editPost, deletepost })(
  fromwarapeed
);
