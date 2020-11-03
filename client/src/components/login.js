import React, { useState } from "react";

import { connect } from "react-redux";

import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import {setCurrentUser,logoutUser} from '../actions/index'
import { loginUser } from "../actions/index";
import { FormControl } from "react-bootstrap";
import { reduxForm, Field, formValueSelector } from "redux-form";
import axios from 'axios'
import {Link} from 'react-router-dom'
import Jwt_decode from "jwt-decode";




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
  const [ResponseError,setResponseError]=useState("")
  const renderlink=()=>{
  
    
    if(ResponseError.Email){
     return<div>{ ResponseError.Email}</div>
    }
    if(ResponseError.Password){
      return <div className='text-dark'> {ResponseError.Password} <Link className ='text-white' to='/'>forget PassWord?</Link>  </div>
    }
    
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
 
  return (
    <div >
    
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
    
  };
};
export default connect(mapStateToProps, { loginUser, logoutUser })(formWrapped);
