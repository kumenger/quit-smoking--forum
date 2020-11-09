import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { userVerification } from "../actions";
import Spinner from 'react-bootstrap/Spinner'

const UserVerify = (props) => {
  useEffect(() => {
    props.userVerification(props.match.params.tok);
  }, []);
     if(!props.emailverifyreducer.result&&!props.emailverifyreducer.err){
         return( <div className="text-center">
         <p className=" text-danger">Verifying Please wait......</p>
  <div className="spinner-border" role="status">
   
  </div>
</div>)
    }
  return (
  <div>
      {props.emailverifyreducer.result?<div className='text-center'>
          <div>
      <label>{props.emailverifyreducer.result.type}</label>
      <div>{props.emailverifyreducer.result.msg}</div>
          </div>
      </div>:props.emailverifyreducer.err?<div>{props.emailverifyreducer.err}</div>:""}
  </div>
  );
};
const mapStateToProps = (state) => {
  return { emailverifyreducer: state.emailverifyreducer };
};
export default connect(mapStateToProps, { userVerification })(UserVerify);
