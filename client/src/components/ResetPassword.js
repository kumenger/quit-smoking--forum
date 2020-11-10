import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { changePassword } from "../actions";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
const renderInput = (formProps) => {
 
  console.log(formProps);
  return (
    <div className="row">
      <div className="col-md-2 offset-md-2">
        <label>{formProps.label}</label>
      </div>
      <div className="col-md-6">
        <input {...formProps.input} className="form-control" />
      </div>
      <div className="col-md-12 text-center text-danger">
        {formProps.meta.error && formProps.meta.touched
          ? formProps.meta.error
          : ""}
      </div>
    </div>
  );
};


const ResetPassword = (props) => {
    const unverfiedclicked2=()=>{
        setShow(false)
        window.location.href='/'
        
       
      }
    const [show,setShow]=useState(false)
  const onforumSubmint = (formValues) => {
    props.changePassword(props.match.params.resendToken,formValues.pass);
    setShow(true)
  };
  return (
    <div>
         <Modal show={show}>
        <Modal.Header>
          <Modal.Title>ChangePassword </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.changePasswordReducer.result.msg?props.changePasswordReducer.result.msg:"Please Wait......"}
          
  
        </Modal.Body>
        <Modal.Footer>
          
          <Button className="primary" onClick={() =>
             unverfiedclicked2()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <form onSubmit={props.handleSubmit(onforumSubmint)}>
        <Field name="pass" component={renderInput} label="New Password" />
        <br></br>
        <Field
          name="passrepet"
          component={renderInput}
          label="Repet Password"
        />

        <br></br>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <button className="btn btn-warning">Change Password</button>
          </div>
        </div>
      </form>
    </div>
  );
};
const validate = (formValues) => {
  const error = {};
  if (!formValues.pass) {
    error.pass = <i class="fas fa-exclamation-triangle text-warning"></i>;
  }
  if (!formValues.passrepet) {
    error.passrepet = <i class="fas fa-exclamation-triangle text-warning"></i>;
  }
  if (formValues.pass != formValues.passrepet) {
    error.passrepet = "Password do not match";
  }
  return error;
};
const formWrapped = reduxForm({ form: "resetPassword", validate })(
  ResetPassword
);
//changePassword
const mapStateToProps = (state) => {
  return { changePasswordReducer: state.changePasswordReducer };
};
export default connect(mapStateToProps, { changePassword })(formWrapped);
