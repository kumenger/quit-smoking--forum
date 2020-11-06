import React ,{useEffect}from "react";
import { Field, reduxForm } from "redux-form";
import {CreatePostReplay,checkPageCreateOrReplay} from '../actions'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'


const renderInput = (fromProps) => {
 
  return (
    <div className="row">
      <div className="col-md-8">
        {" "}
        <input {...fromProps.input} className="form-control" />
        <p className='text-danger'>
          {fromProps.meta.touched && fromProps.meta.error
            ? fromProps.meta.error
            : ""}
        </p>{" "}
      </div>
      <div className="col-md-4">
       
      </div>
    </div>
  );
};
const renderTextArea = (fromProps) => {
 
  return (
    <div className="row">
      <div className="col-md-12">
        {" "}
        <textarea
          {...fromProps.input}
          type="text"
          rows="15"
          style={{ height: "75%" }}
          className="form-control"
          placeholder="your post"
          
        />
         <p className='text-danger'>
          {fromProps.meta.touched && fromProps.meta.error
            ? fromProps.meta.error
            : ""}
        </p>{" "}
      </div>
      <div >
        {" "}
       
      </div>
    </div>
  );
};

 

const ReplayTOPost = (props) => {
  useEffect(()=>{
   
    props.checkPageCreateOrReplay(false)
   
   

  })
  const history=useHistory() 
    const onformsubmit=(formValues)=>{
      
     props.CreatePostReplay(formValues,props.getIdForReplayReducer.id)
     //axios.put(`http://localhost:8000/post/insertReplay/${props.getIdForReplayReducer.id}`,formValues)
     setTimeout(()=>{history.goBack()},1000)
   
      
    }
    let d =new Date() 
    let time=d.getHours()>12?d.getHours()%12 +" "+d.getMinutes() +"PM":d.getHours()+":"+d.getMinutes()+" "+"AM"
let c=`${months[a.getMonth()]} ${a.getDate()} ${a.getFullYear()} `+ time
  return (
    <div style={{ paddingLeft: "10px", paddingRight: "10px",paddingBottom:"10px"}}>
    <div className="row" >
        <div className='col-md-8 offset-md-2'>
      <form onSubmit={props.handleSubmit(onformsubmit)} style={{padding:"20px"}}>
          <div>
              <lable className='text-black'><strong>Name</strong></lable>
            <div><Field
            name="replayername"
            component={renderInput}
            type='text'
            placeholder="your Name"
            id='idname'
           
           
          /></div>
          </div>
          <div>
              <lable className='text-black'><strong>Current date</strong></lable>
              <div><Field
            name="replyertime"
            component={renderInput}
            type='text'
          
            id='idname'
            disabled={true}
           
           // value={`${months[a.getMonth()]} ${a.getDate()} ${a.getFullYear()}`}
            
          /></div>
          </div>
          <div >
              <lable className='text-black' ><strong>Post</strong></lable>
              <div >
                  <Field
            name="replayerPost"
            rows='15'
            component={renderTextArea}
            type='text'
            style={{height:"75%"}}
            width='100%'
            placeholder="your post"
            id='idname'
           
           
          /></div>
          </div>   
          <div className='text-center'>
        <button type="submit" className='btn btn-success'>Post Replay</button>&nbsp;&nbsp;
        <button type="button"  className='btn btn-warning' onClick={props.reset} >Clear Values</button>
      </div>
         
        
      </form>
      </div>
    </div>
    </div>
  );
};
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
 
   let d =new Date() 
    let time=d.getHours()>12?d.getHours()%12 +" "+d.getMinutes() +"PM":d.getHours()+":"+d.getMinutes()+" "+"AM"
const validate = (formvalues) => {
  let error = {};
  if (!formvalues.replayername) {
    error.replayername =<i class="fas fa-exclamation-triangle text-warning"></i>;
  }
 
  if (!formvalues.replayerPost) {
    error.replayerPost =<i class="fas fa-exclamation-triangle text-warning"></i>
  }
  return error;
};
const formWrapped= reduxForm({ form: "ReplayTOPost",validate })( ReplayTOPost);
const mapStateToProps=(state,ownProps)=>{
    return {
        facebookloginreducer:state.facebookloginreducer,
        allposts:state.allPostsReducer,
        getIdForReplayReducer:state.getIdForReplayReducer,
        CreatePostReplayReducer:state.CreatePostReplayReducer,
        checkpagetypereducer:state.checkpagetypereducer,
        mongologinreduxer:state.mongologinreduxer,
        initialValues:{
          replyertime:`  ${months[a.getMonth()]} ${a.getDate()} ${a.getFullYear()}`+" "+time,
        

      }

    }
    }
export default connect(mapStateToProps,{CreatePostReplay,checkPageCreateOrReplay})(formWrapped)
