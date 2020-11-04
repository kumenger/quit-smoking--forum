import React,{useEffect} from "react";

import { Field, reduxForm } from "redux-form";
import { createPost ,checkPageCreateOrReplay} from "../actions";
import { connect } from "react-redux";
import {useHistory} from 'react-router-dom'

import _ from 'lodash'

const renderInput = (fromProps) => {
  console.log({ fromProps });
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
      
    </div>
  );
};

const NewPost = (props) => {
  useEffect(()=>{
    props.checkPageCreateOrReplay(false)
  })
 
    const history=useHistory()
    const onformsubmit = (formValues) => {
      const getUserId={userID:null}
      if(props.facebookloginreducer.isLogIn){getUserId.userID=props.facebookloginreducer.resp.id}
      else if(props.mongologinreduxer.isAuthenticated){getUserId.userID=props.mongologinreduxer.user.id}
   
      
       props.createPost({...formValues,...getUserId});
   /*const {userID}=props.facebookloginreducer.resp
   axios.post("http://localhost:8000/post/createPost",{
    ..._.merge(formValues, basicobj),
    userID,
  })   */





    setTimeout(()=>{
      history.push('/')
     
    },1000)
    
  };
 
  return (
    <div style={{ paddingLeft: "10px", paddingRight: "10px"}}>
      <div className="row" >
        <div className="col-md-8 offset-md-2">
          <form onSubmit={props.handleSubmit(onformsubmit)}>
            <div>
              <lable className='text-white'>
                <strong>Name</strong>
              </lable>
              <div>
                <Field
                  name="name"
                  component={renderInput}
                  type="text"
                  placeholder="your Name"
                  id="idname"
                  className="form-control"
                />
              </div>
            </div>
            <div>
              <lable className='text-white'>
                <strong>Title</strong>
              </lable>
              <div>
                <Field
                  name="title"
                  component={renderInput}
                  type="text"
                  placeholder="post title"
                  id="idname"
                  className="form-control"
                />
              </div>
            </div>
            <div>
              <lable className='text-white'>
                <strong>Post</strong>
              </lable>
              <div>
                <Field
                  name="post"
                  
                  component={renderTextArea}
                  type="text"
                 
                  className="form-control"
                  placeholder="your post"
                  id="idname"
                  
                /><div className='text-center'>
                <button type="submit" className='btn btn-success' >Post</button>&nbsp;&nbsp;
              <button type="button" className='btn btn-warning' onClick={props.reset} >Clear Values</button></div>
              </div>
              
            </div>
          
              
           
          </form>
        </div>
      </div>
    </div>
  );
};
const validate = (formvalues) => {
  let error = {};
  if (!formvalues.name) {
    error.name =<i class="fas fa-exclamation-triangle text-warning"></i>
  }
  if (!formvalues.title) {
    error.title = <i class="fas fa-exclamation-triangle text-warning"></i>
  }
  if (!formvalues.post) {
    error.post = <i class="fas fa-exclamation-triangle text-warning"></i>
  }
  return error;
};
const formWrapped = reduxForm({ form: "NewPost", validate })(NewPost);
const mapStateToProps = (state) => {
  return {
    facebookloginreducer:state.facebookloginreducer,
    mongologinreduxer:state.mongologinreduxer,
    allposts: state.allPostsReducer,
    checkpagetypereducer:state.checkpagetypereducer,
    
  };
};
export default connect(mapStateToProps, { createPost,checkPageCreateOrReplay })(formWrapped);
