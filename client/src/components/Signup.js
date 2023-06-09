import React, { useState, useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { userRejister, getalluser } from "../actions/index";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";

const rednerinput = (fromProps) => {
  return (
    <div className="row">
      <div className="col-md-4">
        {fromProps.lable}
      </div>
      <div className="col-md-7">
        {" "}
        <input
          {...fromProps.input}
          className="form-control"
          type={fromProps.type}
        />
      </div>
      <div className="col-md-1 text-danger ">
        
          {fromProps.meta.touched && fromProps.meta.error
            ? fromProps.meta.error
            : ""}
        
      </div>
    </div>
  );
};

const SignUp = (props) => {
  const history = useHistory();
  const [date, setdate] = useState(new Date());
  const [checkemail, setcheckemail] = useState(" ");
  const [show,setShow]=useState(false)
  useEffect(() => {
    setcheckemail(props.mongoregistersignupreducer.err)
   const check=()=>{
     if(props.mongologinreduxer.isAuthenticated||props.facebookloginreducer.isLogIn){
       history.push('/')
     }
   }
    props.getalluser();



   check()
 
  }, []);
  const unverfiedclicked2=()=>{
    setShow(false)
    if(props.mongoregistersignupreducer.newuser){
      window.location.href='/'
    }
    
    
   
  }
  const loding=()=>{
    return(<div className="text-center">
    <p className=" text-danger">loding...</p>
<div className="spinner-border" role="status">

</div>
</div>)
  }

  const onforumSubmint = (fromValues) => {
    

    let myobj = { QuitDate: null, JoinDate: null };
    props.userRejister({
      ...fromValues,
      ...{ ...myobj, QuitDate: date, JoinDate: new Date() },
    });
    setShow(true)
  
  };

  return (
    <div
      className="rounded-right rounded-left rounded-bottom rounded-top row "
      style={{
     
        alignItems: "center",
      
       
      }}
      
    >
       <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Email Verification </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {props.mongoregistersignupreducer.newuser?props.mongoregistersignupreducer.newuser:props.mongoregistersignupreducer.err?props.mongoregistersignupreducer.err:loding()}
          
  
        </Modal.Body>
        <Modal.Footer>
          
          <Button className="primary" onClick={() =>
             unverfiedclicked2()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> 
      
      
      <div className='col-md-6 offset-md-3'>

      <form
        onSubmit={props.handleSubmit(onforumSubmint)}
        className="rounded-right rounded-left rounded-bottom rounded-top"
        style={{padding:"20px"  ,  }}
        
       
      > 
        <div className='row'>
       
        <div className='offset-md-1 col-md-10'>
        <Field name="FirstName" component={rednerinput} lable="FirstName" />
        <br></br>
        <Field name="LastName" component={rednerinput} lable="LastName" />
        <br></br>
        <Field name="Email" component={rednerinput} lable="Email" />{" "}
        <h5 className="text-center text-warning">{checkemail}</h5>
        <br></br>
        <Field
          name="Password"
          component={rednerinput}
          lable=" Password"
          type="password"
          
        />
        <br></br>
        
        <Field
          name="Password2"
          component={rednerinput}
          lable="Repet pasword"
          type="password"
        
        /> 
        <br></br>
        <div className=" row">
          <div className="  col-md-4">
             Quit date
          </div>
          <div className="col-md-6">
            {" "}
            <DatePicker
              id="datepick"
            
              required
              className="form-control"
              selected={date}
              onChange={(date) => setdate(date)}
            />
          </div>
        </div>
        <br/>
        <Field
          name="Location"
          component={rednerinput}
          lable="Location "
        />
      
        <br></br>
        <div className="row">
          <div className=" offset-md-1 col-md-5">
            <button className="btn  btn-success btn-block">Sign Up</button>
          </div>
          <div className='col-md-5'>
          <button  className='btn btn-warning btn-block' onClick={props.reset}>Clear Values</button></div>

          </div>
        </div>
    
        </div>
      </form>
    </div>
    </div>
  
  );
};

const validate = (formValues) => {
  const error = {};

  if (!formValues.FirstName) {
    error.FirstName = <i class="fas fa-exclamation-triangle text-warning"></i>;
  }
  if (!formValues.LastName) {
    error.LastName =  <i class="fas fa-exclamation-triangle text-warning"></i>;
  }

  if (!formValues.Password) {
    error.Password =  <i class="fas fa-exclamation-triangle text-warning"></i>;
  }
  if (!formValues.Password2) {
    error.Password2 =  <i class="fas fa-exclamation-triangle text-warning"></i>;
  } else if (formValues.Password != formValues.Password2) {
    error.Password2 = "password do not match";
  }
  if (!formValues.Location) {
    error.Location =  <i class="fas fa-exclamation-triangle text-warning"></i>;
  }

  if (!formValues.Email) {
    error.Email =  <i class="fas fa-exclamation-triangle text-warning"></i>;
  } else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      formValues.Email
    )
  ) {
    error.Email = "invalid format";
  }

  return error;
};
const formWarapped = reduxForm({
  form: "SignUp",
  destroyOnUnmount: false,
  validate,
})(SignUp);
const mapStateToProps = (state) => {
  return {
    mongoregistersignupreducer: state.mongoregistersignupreducer,
    form:state.form,
    facebookloginreducer: state.facebookloginreducer,
    mongologinreduxer: state.mongologinreduxer,
  };
};

export default connect(mapStateToProps, { userRejister, getalluser })(
  formWarapped
);
