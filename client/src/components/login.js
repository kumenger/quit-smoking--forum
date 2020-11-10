import React, { useState } from "react";

import { connect } from "react-redux";
import {useHistory} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import {setCurrentUser,logoutUser} from '../actions/index'
import { loginUser,resendVerification ,forgetPassword} from "../actions/index";
import { FormControl } from "react-bootstrap";
import { reduxForm, Field, formValueSelector } from "redux-form";
import axios from 'axios'
import {Link} from 'react-router-dom'
import Jwt_decode from "jwt-decode";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";




const renderInput = (fromProps,props) => {
 
  return (
    <div>
      <div>
        <FormControl
          {...fromProps.input}
          placeholder={fromProps.placeholder}
          type={fromProps.type}
        />
      </div>
      
    
    </div>
  );
};

const LogIn = (props) => {
 const [show,setShow]=useState(false)
 const [email,setemail]=useState('')
  
  const [ResponseError,setResponseError]=useState("")
  
  const renderlink=()=>{
  
    
    if(ResponseError.Email){
     return<div>{ ResponseError.Email}</div>
    }
    if(ResponseError.Password){
      return <div className='text-dark'> {ResponseError.Password} <button className='btn btn-info' onClick={()=>forgetccliked()} >forget PassWord?</button>  </div>
    }
    if(ResponseError.unverified){
      return <div className='text-dark'> {
      ResponseError.unverified} Check your Email &nbsp;
         <button className='btn btn-info' onClick={()=>unverfiedclicked()
        
      }>Resend Verificatiin?</button>  </div>
    }
   
    
  }
  const forgetccliked=()=>{
    setShow(true)
   props.forgetPassword(props.Email)
    //axios.post('http://localhost:8000/users/emailforget',{Email:props.Email}).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
  }
  const unverfiedclicked=()=>{
    setShow(true)
    props.resendVerification(props.Email)
   
  }
  const unverfiedclicked2=()=>{
    setShow(false)
    window.location.href='/'
    
   
  }


  
  if(localStorage.jwtToken){
    const token=localStorage.jwtToken
    setAuthToken(token)
    const decode=jwt_decode(token)
    props.dispatch(setCurrentUser(decode))
  
  }
  const onforumSubmint = (formValues) => {
   
  };
  const myobj = { email: props.Email, password: props.Password };
  const clicked = () => {
  
    if (props.Email && props.Password) {
       
      // props.loginUser(myobj);
       axios
      .post("/users/login", myobj)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decode = Jwt_decode(token);
        props.dispatch(setCurrentUser(decode));
        setResponseError("")
      })
      .catch((err) => {
        //props.dispatch({ type: "GET_ERRORS", payload: err.response.data });
        setResponseError(err.response.data.error)
        
      });
        
      
    }
   
  };
  const lougbtnclicked=()=>{
    props.logoutUser()
    window.location.href='/'
  }
 const history=useHistory()
  return (
    <div >
       <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Email Verification </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.emailverifyreducer.resend.msg?props.emailverifyreducer.resend.msg:props.emailverifyreducer.result.msg?props.emailverifyreducer.result.msg:"please wai..."}
          
  
        </Modal.Body>
        <Modal.Footer>
          
          <Button className="primary" onClick={() =>
             unverfiedclicked2()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
      {props.mongologinreduxer.isAuthenticated?<button
          className="btn btn-outline-info"
          onClick={() =>lougbtnclicked() }
        >
          {" "}
          Log out
        </button>:<form
        className="form-inline"
        onSubmit={props.handleSubmit(onforumSubmint)}
      >
        <Field
          name="Email"
          component={renderInput}
          placeholder="Enter Email"
          type="email"
          errorfromserver={ResponseError}
         
        />
        &nbsp;
        <Field
          name="Password"
          component={renderInput}
          placeholder="Enter Password"
          type="password"
         
        />
        &nbsp;
        <button className="btn btn-info" onClick={() => clicked()}>
          {" "}
          Log In
        </button>
        
      </form>}
      
     <div className='row'>
       <div className='col-md-12'> <p className='text-center text-danger'>{renderlink()} </p></div>
    
     </div>
     
    </div>
  );
};
const validate = (formValues) => {
  let error = {};

 
  return error;
};

const formWrapped = reduxForm({
  form: "LogIn",
  validate,
  destroyOnUnmount: false,
})(LogIn);
const selecteor = formValueSelector("LogIn");
const mapStateToProps = (state) => {
  return {
    Email: selecteor(state, "Email"),
    Password: selecteor(state, "Password"),
    mongologinreduxer:state.mongologinreduxer,
    emailverifyreducer:state.emailverifyreducer
    
  };
};
export default connect(mapStateToProps, { loginUser, logoutUser,resendVerification ,forgetPassword})(formWrapped);
